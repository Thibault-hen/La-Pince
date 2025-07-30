import { Hono } from "hono";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";

// Mock de Prisma Client complet pour user, color, category
vi.mock("../db/client", () => ({
	default: {
		user: {
			findUnique: vi.fn(),
			create: vi.fn(),
		},
		color: {
			findFirst: vi.fn(),
		},
		category: {
			create: vi.fn(),
		},
	},
}));

// Mock d'argon2 (hash uniquement si tu veux, ici pas besoin car hash est dans la route)
vi.mock("argon2", () => ({
	default: {
		hash: vi.fn().mockResolvedValue("hashed-password"),
	},
}));

describe("Auth Router - Register", () => {
	let prisma: typeof import("../db/client").default;
	let mockFindUnique: Mock;
	let mockCreateUser: Mock;
	let mockFindFirstColor: Mock;
	let mockCreateCategory: Mock;
	let authRouter: any;
	let app: Hono;

	beforeEach(async () => {
		vi.resetModules();

		prisma = (await import("../db/client")).default;
		mockFindUnique = prisma.user.findUnique as Mock;
		mockCreateUser = prisma.user.create as Mock;
		mockFindFirstColor = prisma.color.findFirst as Mock;
		mockCreateCategory = prisma.category.create as Mock;

		authRouter = (await import("../controllers/auth")).default;

		app = new Hono();
		app.route("/api/v1", authRouter);

		vi.clearAllMocks();
	});

	// it("should register a new user and create categories", async () => {
	// 	// Aucun utilisateur existant
	// 	mockFindUnique.mockResolvedValue(null);

	// 	// Création de l’utilisateur simulée
	// 	mockCreateUser.mockResolvedValue({
	// 		id: "user-123",
	// 		email: "newuser@example.com",
	// 		name: "New User",
	// 		password: "hashed-password",
	// 		alert: true,
	// 		currency: "EUR",
	// 	});

	// 	// Simule que chaque couleur existe
	// 	mockFindFirstColor.mockResolvedValue({ id: "color-1" });

	// 	// Simule la création de catégories
	// 	mockCreateCategory.mockResolvedValue({ id: "category-1" });

	// 	const res = await app.request("/api/v1/auth/register", {
	// 		method: "POST",
	// 		body: JSON.stringify({
	// 			email: "newuser@example.com",
	// 			password: "password123",
	// 			name: "New User",
	// 		}),
	// 		headers: { "Content-Type": "application/json" },
	// 	});

	// 	expect(res.status).toBe(201);

	// 	const json = await res.json();

	// 	expect(json.message).toBe("User registered successfully");
	// 	expect(json.user.email).toBe("newuser@example.com");

	// 	// Vérifie que les catégories ont bien été créées
	// 	expect(mockFindFirstColor).toHaveBeenCalledTimes(13);
	// 	expect(mockCreateCategory).toHaveBeenCalledTimes(13);

	// 	// Vérifie que la création de catégories contient le userId
	// 	expect(mockCreateCategory.mock.calls[0][0]).toMatchObject({
	// 		data: expect.objectContaining({ userId: "user-123" }),
	// 	});
	// });

	it("should return 409 if user already exists", async () => {
		mockFindUnique.mockResolvedValue({
			id: "user-exists",
			email: "exists@example.com",
			password: "hashed-password",
			name: "Existing User",
		});

		const res = await app.request("/api/v1/auth/register", {
			method: "POST",
			body: JSON.stringify({
				email: "exists@example.com",
				password: "password",
				name: "Existing User",
			}),
			headers: { "Content-Type": "application/json" },
		});

		expect(res.status).toBe(409);
	});
});
