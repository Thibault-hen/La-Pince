import nodemailer from 'nodemailer';
import { getEnv } from './env';

const { GMAIL_USER, GMAIL_PASS, GMAIL_FROM } = getEnv();

const transporter: nodemailer.Transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: GMAIL_USER,
		pass: GMAIL_PASS,
	},
});

export async function sendMail({
	to,
	subject,
	html,
}: {
	to: string;
	subject: string;
	html: string;
}) {
	const from = GMAIL_FROM;

	return transporter.sendMail({
		from,
		to,
		subject,
		html,
	});
}
