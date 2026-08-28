import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { sendForgotPasswordEmail } from "@/lib/email";

const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
});

function generateTemporaryPassword() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let password = "";
  for (let i = 0; i < 12; i += 1) {
    password += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return password;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid email." }, { status: 400 });
  }

  const { email } = parsed.data;

  try {
    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      return NextResponse.json({
        ok: true,
        message: "If this email is registered, a temporary password has been sent.",
      });
    }

    const temporaryPassword = generateTemporaryPassword();
    const passwordHash = await hashPassword(temporaryPassword);

    await prisma.customer.update({
      where: { email },
      data: { password_hash: passwordHash },
    });

    try {
      await sendForgotPasswordEmail(email, temporaryPassword);
    } catch (emailError) {
      console.error("Forgot password email failed:", emailError);
      return NextResponse.json({ error: "Unable to send the temporary password right now. Please try again later." }, { status: 503 });
    }

    return NextResponse.json({
      ok: true,
      message: "A new temporary password has been sent to your email.",
    });
  } catch (error) {
    console.error("Forgot password failed:", error);
    return NextResponse.json({ error: "Password reset service is unavailable right now." }, { status: 503 });
  }
}
