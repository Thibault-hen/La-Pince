import { Hono } from "hono";
import { sendMail } from "../services/mailer";

export const contactController = new Hono();

contactController.post("/contact", async (c) => {
	try {
		const { firstName, lastName, email, subject, message } = await c.req.json();

		const htmlContent = `
      <h1>Nouveau message</h1>
      <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${subject}</p>
      <p><strong>Message :</strong><br>${message}</p>
    `;

		await sendMail({
			to: process.env.GMAIL_TO || "lapince@gmail.com",
			subject: `La Pince : ${subject}`,
			html: htmlContent,
		});

		return c.json({ message: "EMAIL_SENT" }, 200);
	} catch (error) {
		console.error("Erreur envoi mail :", error);
		return c.json({ message: "EMAIL_FAILED" }, 500);
	}
});
