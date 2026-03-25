import { createTransport } from "nodemailer";

// Create a transporter
const transporter = createTransport({
    service: "gmail", // You can use other services or SMTP
    auth: {
        user: process.env.ORIGIN_EMAIL, // your email
        pass: process.env.EMAIL_APP_PASSWORD,     // use an app password, not your real password
    }
});

const sendMail = (email, otp) => {

    const mailOptions = {
        from: process.env.ORIGIN_EMAIL,       // sender address
        to: email,       // recipient address
        subject: "One Time password for sign up ",     // subject line
        // text: `Hello, Your one time password is: ${otp}`, // plain text body
        html: `<!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; }
          h1 { color: #333; }
          p { font-size: 16px; }
          .btn { display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello User!</h1>
          <p>Welcome to our platform. Here is the One Time Password to verify your account:</p>
          <p><strong>${otp}</strong></p>
        </div>
      </body>
    </html>
` // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
}

export default sendMail;