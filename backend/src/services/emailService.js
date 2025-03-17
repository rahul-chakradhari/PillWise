import nodemailer from 'nodemailer';

const sendEmail = async (user, reminder) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Example for Gmail, but you can use any service
    auth: {
      user: process.env.EMAIL, // Your email from environment variable
      pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: `Medicine Reminder: ${reminder.medicineName}`,
    text: `Hello ${user.name},\n\nThis is a reminder to take your medicine "${reminder.medicineName}".
           \nDosage: ${reminder.dosage}\nTime: ${reminder.time.join(', ')}\n\nRegards, Your Health App`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
