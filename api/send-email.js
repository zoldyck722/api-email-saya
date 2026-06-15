import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Hanya POST' });
    }

    const { to_email, subject, body, sender_user, sender_pass } = req.body;

    if (!to_email || !subject || !body || !sender_user || !sender_pass) {
        return res.status(400).json({ success: false, message: 'Data tidak lengkap' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { user: sender_user, pass: sender_pass }
    });

    try {
        await transporter.sendMail({
            from: `"Support" <${sender_user}>`,
            to: to_email,
            subject: subject,
            text: body,
            html: body.replace(/\n/g, '<br>')
        });
        res.status(200).json({ success: true, message: 'Email terkirim' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
