'use server'

import { Resend as resendEmail } from 'resend';

const resend = new resendEmail(process.env.RESEND_API_KEY);
const domain = process.env.DEPLOYMENT_URL;

export const sendVT = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verify-email?token=${token}`
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "BroadHub - Verify your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
  })
}

export const sendPR = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "BroadHub - Reset your password",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`,
  })
}