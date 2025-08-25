import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, subject, data } = await req.json();

    // Buat transporter (pakai Gmail / SMTP lain)
    const transporter = nodemailer.createTransport({
      service: "gmail", // atau pakai host SMTP lain
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format data jadi CSV/JSON
    const formattedData = JSON.stringify(data, null, 2);

    // Kirim email
    await transporter.sendMail({
      from: `"Commodity Dashboard" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: "Berikut data exchange rate & commodity",
      attachments: [
        {
          filename: "commodity-data.json",
          content: formattedData,
        },
      ],
    });

    return NextResponse.json({ success: true, message: "Email terkirim!" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
