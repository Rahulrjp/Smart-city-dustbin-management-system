import axios from 'axios';

const sendEmail = async (targetEmail, subject, message) => {
    const data = {
        // This MUST be the Gmail address you verified in Step 1
        sender: { name: "Smart Bin Management System", email: process.env.ORIGIN_EMAIL },
        to: [{ email: targetEmail }],
        subject: subject,
        htmlContent: `<!DOCTYPE html>
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
          <p><strong>${message}</strong></p>
        </div>
      </body>
    </html>`
    };

    try {
        console.log("Api Key: ", process.env.BREVO_API_KEY);
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', data, {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log("Success! Message ID:", response.data.messageId);
    } catch (error) {
        console.error("Brevo Error:", error.response ? error.response.data : error.message);
    }
};

export default sendEmail;

// Usage Example:
// sendEmail('friend@example.com', 'Hello!', '<h1>It works on Render!</h1>');