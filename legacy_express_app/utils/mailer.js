const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send a promotion request notification email.
 * @param {Object} data — promotion form data
 * @returns {Promise<void>}
 */
async function sendPromotionNotification(data) {
  const {
    businessName,
    ownerName,
    phone,
    email,
    category,
    promotionType,
    budget,
    message,
    referralSource,
  } = data;

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0F0F2A; color: #F0EDE8; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #F5C842 0%, #E8593C 100%); padding: 32px 40px;">
        <h1 style="margin: 0; font-size: 24px; color: #0A0A1A; font-weight: 700;">
          🚀 New Promotion Request
        </h1>
        <p style="margin: 8px 0 0; color: rgba(10,10,26,0.7); font-size: 14px;">
          Gadag Info — Business Promotion
        </p>
      </div>

      <div style="padding: 32px 40px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(240,237,232,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Business</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;">${businessName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(240,237,232,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Contact</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;">${ownerName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(240,237,232,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;">
              <a href="tel:${phone}" style="color: #38BDF8; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(240,237,232,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;">
              <a href="mailto:${email}" style="color: #38BDF8; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(240,237,232,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Category</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;">${category}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(240,237,232,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Promo Type</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;">
              <span style="background: rgba(245,200,66,0.2); color: #F5C842; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${promotionType}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(240,237,232,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Budget</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px; font-weight: 600; color: #F5C842;">${budget}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(240,237,232,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Source</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;">${referralSource}</td>
          </tr>
        </table>

        ${
          message
            ? `
        <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
          <p style="margin: 0 0 8px; color: rgba(240,237,232,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6;">${message}</p>
        </div>`
            : ''
        }
      </div>

      <div style="padding: 20px 40px; background: rgba(255,255,255,0.03); text-align: center;">
        <p style="margin: 0; font-size: 12px; color: rgba(240,237,232,0.3);">
          Gadag Info • @gadag_info • ${new Date().toLocaleDateString('en-IN')}
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Gadag Info" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `🚀 New Promotion Request — ${businessName}`,
    html,
  });
}

module.exports = { sendPromotionNotification };
