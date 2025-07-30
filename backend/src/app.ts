import { createNodeWebSocket } from "@hono/node-ws";
import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { getSignedCookie } from "hono/cookie";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { secureHeaders } from "hono/secure-headers";
import { openAPISpecs } from "hono-openapi";
import { ZodError } from "zod";
import { authentify } from "./middlewares/auth.middleware";
import router from "./router";
import { getEnv } from "./utils/env";
import { initRedis } from "./utils/redis";
import { notifiableUsers } from "./websockets/notifiableUsers";

const app = new Hono();
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });

const { FRONTEND_URL, NODE_ENV } = getEnv();

console.log(`Starting App Atelier API in ${NODE_ENV} mode...`);

initRedis();

app.use(
	secureHeaders({
		strictTransportSecurity: `max-age=31536000; includeSubDomains`,
		referrerPolicy: "strict-origin-when-cross-origin",
	}),
);

app.use(
	"*",
	cors({
		origin: FRONTEND_URL,
		allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		credentials: true,
		maxAge: 86400,
	}),
);

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return c.json({ message: err.message }, err.status);
	}
	if (err instanceof ZodError) {
		return c.json({ message: "Validation Error", errors: err.errors }, 400);
	}
	return c.json({ message: "Internal Server Error", error: err.message }, 500);
});

app.route("/", router);

app.get(
	"/openapi",
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "App Atelier API",
				version: "1.0.0",
				description: "Greeting API",
			},
			servers: [{ url: "http://localhost:3000", description: "Local Server" }],
		},
	}),
);

app.get(
	"/docs",
	Scalar({
		url: "/openapi",
		theme: "saturn",
	}),
);

app.get(
	"/ws",
	upgradeWebSocket(async (c) => {
		const { SECRET_JWT } = getEnv();
		try {
			const token = await getSignedCookie(
				c,
				getEnv().SECRET_JWT,
				getEnv().TOKEN_JWT_NAME,
			);

			if (!token) {
				throw new HTTPException(401, {
					message: "You are not logged in.",
				});
			}

			const payload = (await authentify(token, SECRET_JWT, c)) as {
				userId: string;
				exp: number;
			};

			return {
				onOpen: async (_, ws) => {
					if (notifiableUsers.has(payload.userId)) {
						notifiableUsers.get(payload.userId)?.add(ws);
					} else {
						notifiableUsers.set(payload.userId, new Set([ws]));
					}
				},
				onClose: async (_, ws) => {
					notifiableUsers.get(payload.userId)?.delete(ws);
				},
			};
		} catch (error) {
			console.error("WebSocket connection error:", error);
			return {
				onOpen: async () => {},
				onClose: async () => {},
			};
		}
	}),
);
export { app, injectWebSocket };
