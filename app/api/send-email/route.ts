import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { parentName, email, phone, concern, outcome } = body;

    console.log("EMAIL FUNCTION CALLED");
    const data = await resend.emails.send({
      from: "Parenteva <onboarding@resend.dev>",
      to: ["ipsaluja50@gmail.com"],
      subject: "New Parenteva Lead",
      html: `
        <h2>New Lead Received</h2>

        <p><strong>Name:</strong> ${parentName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Concern:</strong> ${concern}</p>
        <p><strong>Outcome:</strong> ${outcome}</p>
      `,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}