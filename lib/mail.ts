"use server";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // true for port 465, false for other ports
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

export async function sendVerificationTokenMail(email: string, token: string) {
	const link = `http://localhost:3000/new-verification?token=${token}`;

	await transporter.sendMail({
		from: "Authjs Template",
		to: email,
		subject: "Verify Your Email",
		html: `<p>Click <a href="${link}">Here</a> to verify your email account`,
	});
}

export async function sendPasswordResetTokenMail(email: string, token: string) {
	const link = `http://localhost:3000/new-password?token=${token}`;

	await transporter.sendMail({
		from: "Authjs Template",
		to: email,
		subject: "Reset Your Password",
		html: `<p>Click <a href="${link}">Here</a> to reser your password`,
	});
}
