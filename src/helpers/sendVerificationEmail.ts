import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { Apiresponse } from "@/types/Apiresponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<Apiresponse> {
  console.log(email, username);

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Keyboards | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    console.log(response);

    return {
      success: true,
      message: "Verification email send successfully",
    };
  } catch (emailErr) {
    console.error("Error sending verification email", emailErr);
    return {
      success: false,
      message: "Failed to send verification emai",
    };
  }
}
