import nodemailer from 'nodemailer';
import config from '../config'; // Ensure you have your SMTP configuration in your config file

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser, // Your Gmail address
    pass: config.emailPassword, // Your Gmail password or App password
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${config.frontendUrl}/reset-password/${token}`;
  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: 'Reset your password within 10 mins!',
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetUrl}">${resetUrl}</a>
           <p>If you didn't request this, please ignore this email.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};
