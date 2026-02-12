import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, subject, message, botcheck } = body;

    // 1. HONEYPOT: Jika field tersembunyi 'botcheck' diisi, anggap itu bot
    if (botcheck) {
      return NextResponse.json({ success: true, message: "Spam detected" });
    }

    // 2. VALIDASI INPUT
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const DISCORD_URL = process.env.DISCORD_WEBHOOK_URL;

    if (!DISCORD_URL) {
      console.error("Discord Webhook URL is missing in .env");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 3. KIRIM KE DISCORD DENGAN FORMAT EMBED (BIAR RAPI)
    const discordPayload = {
      embeds: [
        {
          title: `📩 Pesan Baru: ${subject}`,
          color: 0x06b6d4, // Warna Cyan sesuai tema webmu
          fields: [
            { name: "Dari", value: `\`${email}\``, inline: true },
            { 
              name: "Waktu", 
              value: new Date().toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
                dateStyle: "medium",
                timeStyle: "short",
              }), 
              inline: true 
            },
            { name: "Isi Pesan", value: message },
          ],
          footer: { text: "Michael's Portfolio Notification" },
        },
      ],
    };

    const response = await fetch(DISCORD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: "Sent to Discord" });
    } else {
      throw new Error("Discord API failed");
    }

  } catch (error) {
    console.error("Contact Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}