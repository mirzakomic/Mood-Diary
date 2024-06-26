import crypto from "crypto";
import { Schema, model } from "mongoose";
import User from "../models/userModel.js";
import { passwordResetMailTemplate } from "../lib/mailTemplates.js";
import { sendMail } from "../lib/sendMail.js";

const resetTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 7200,
  },
});

export const ResetToken = model("ResetToken", resetTokenSchema);

export const createResetToken = async (userEmail) => {
  // Check if user exists
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new Error("No User with this email");
  }

  // if token is already present delete it
  // there should be only one reset token per user
  let token = await ResetToken.findOne({ userId: user.id });
  if (token) await token.deleteOne();

  const resetToken = crypto.randomBytes(64).toString("hex");

  await ResetToken.create({
    userId: user.id,
    token: resetToken,
    // Optional dank default value
    createdAt: Date.now(),
  });

  // URL von unserer Render APP (local via .env setzen)
  const clientURL = process.env.RENDER_EXTERNAL_URL;
  const resetURL = new URL(
    `/passwordReset?token=${resetToken}&id=${user.id}`,
    clientURL
  );

  // Create Email template
  const mailHTML = passwordResetMailTemplate({
    name: user.name,
    resetLink: resetURL,
  });

  await sendMail({
    to: [user.email],
    subject: `${process.env.APP_NAME} Password Reset!`,
    html: mailHTML,
  });
};

export const validateResetToken = async (userId, resetToken) => {
  const passwordResetToken = await ResetToken.findOne({ userId }).populate(
    "userId"
  );

  if (!passwordResetToken) {
    throw new Error("Token expired");
  }

  const isValid = resetToken === passwordResetToken.token;

  return isValid;
};
