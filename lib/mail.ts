"use server";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

export async function sendVerificationTokenMail(email: string, token: string) {
	const link = `${process.env.ORIGIN}/new-verification?token=${token}`;

	await transporter.sendMail({
		from: "Authjs Template",
		to: email,
		subject: "Verify Your Email",
		html: `<h2>Click <a href="${link}">Here</a> to verify your email account</h2>`,
	});
}

export async function sendPasswordResetTokenMail(email: string, token: string) {
	const link = `${process.env.ORIGIN}/new-password?token=${token}`;

	await transporter.sendMail({
		from: "Authjs Template",
		to: email,
		subject: "Reset Your Password",
		html: `<h2>Click <a href="${link}">Here</a> to reset your password</h2>`,
	});
}

export async function sendTwoFactorTokenMail(email: string, token: string) {
	await transporter.sendMail({
		from: "Authjs Template",
		to: email,
		subject: "Two Factor Authentication Code",
		html: `<h2>This is your Two Factor Authentication Code :<br/> <h1>${token}</h1></h2>`,
	});
}
