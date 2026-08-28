import nodemailer from "nodemailer";

export function getSmtpTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !from) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendForgotPasswordEmail(email: string, password: string) {
  const transport = getSmtpTransport();
  if (!transport) {
    throw new Error("SMTP email configuration is missing.");
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) {
    throw new Error("SMTP sender is missing.");
  }

  await transport.sendMail({
    from,
    to: email,
    subject: "Your temporary Blue Islet password",
    text: `Your temporary password is: ${password}\n\nPlease sign in and change it as soon as possible.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
        <h2 style="margin-bottom: 12px;">Blue Islet</h2>
        <p>Your temporary password is:</p>
        <p style="font-size: 22px; font-weight: 700; letter-spacing: 0.04em;">${password}</p>
        <p>Please sign in and change the password as soon as possible.</p>
      </div>
    `,
  });
}
