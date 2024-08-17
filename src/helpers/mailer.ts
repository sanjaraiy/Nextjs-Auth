import User from "@/models/user.Model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    //TODO: configure mail for usage
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 1 * 60 * 60 * 1000,
        }
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { 
        $set: {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 1 * 60 * 60 * 1000,
      }
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.AUTH_USER_MAIL_TRAP,
        pass: process.env.AUTH_PASSWORD_MAIL_TRAP,
      },
    });
     
    const verifyHtml = `<p>Click <a href="${process.env.DOMAIN}/verifymail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifymail?token=${hashedToken}</p>`;
    const resetHtml = `<p>Click <a href="${process.env.DOMAIN}/resetpasswordmail?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/resetpasswordmail?token=${ hashedToken}</p>`;

    const mailOptions = {
      from: "sanjay@gmail.com", // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: emailType === "VERIFY" ? verifyHtml : resetHtml,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
