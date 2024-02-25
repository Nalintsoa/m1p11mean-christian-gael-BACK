const moment = require("moment");

const alertRdvTemplate = (customerName, date, startHour, serviceName, employeeName) => {
  return `
  <!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <style>
      table, td, div, h1, p {font-family: Arial, sans-serif;}
    </style>
  </head>
  <body style="margin:0;padding:0;">
    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
      <tr>
        <td align="center" style="padding:0;">
          <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
            <tr>
              <td align="center" style="padding:40px 0 30px 0;background:white;">
                <img src="cid:logo1" alt="" width="300" style="height:auto;display:block;" />
              </td>
            </tr>
            <tr>
              <td style="padding:36px 30px 42px 30px;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                  <tr>
                  <td style="padding:0 0 36px 0;color:#153643;">
                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Rappel de rendez-vous</h1>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                      <p style="line-height: 170%;"><strong>Bonjour à vous
                        ${customerName}, </strong><br /><br />Nous espérons que ce message vous trouve
                      bien. Nous tenons à vous rappeler de votre rendez-vous prévu le ${moment(new Date(date)).format("DD-MM-YYYY")} à ${startHour} heures. Nous
                      sommes impatients de vous accueillir pour vous offrir une expérience beauté
                      exceptionnelle.<br /><br /></p>
                    <p style="line-height: 170%;">Voici les détails de votre rendez-vous :</p>
                    <ul style="list-style-type: disc;">
                      <li style="line-height: 23.8px;">Date : ${moment(date).format("DD-MM-YYYY")}</li>
                      <li style="line-height: 23.8px;">Heure : ${startHour}H</li>
                      <li style="line-height: 23.8px;">Service réservé : ${serviceName}</li>
                      <li style="line-height: 23.8px;">Agent : ${employeeName}</li>
                    </ul>
                    <p style="line-height: 170%;">Nous sommes impatients de vous accueillir. Si vous avez
                      des questions ou des requêtes à nous transmettre, n'hésitez pas à nous contacter au
                      034 71 768 74 dès que possible.</p>
                    <p style="line-height: 170%;"> </p>
                    <p style="line-height: 170%;">Cordialement,</p>
                    <p style="line-height: 170%;">TOVONALINTSOA Antonny Christian,</p>
                    <p style="line-height: 170%;">RASOAMAHENINA Sambatra Gaël,</p>
                    <p style="line-height: 170%;">M1P11-MEAN</p>
                    </p>
                  </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;background:#F689A0;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                  <tr>
                    <td style="padding:0;width:50%;" align="left">
                      <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                        &reg; M1P11 MEAN<br/><a href="${process.env.PROJECT_HOST}" style="color:#ffffff;text-decoration:underline;">Se connecter</a>
                      </p>
                    </td>
                    <td style="padding:0;width:50%;" align="right">
                      <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                        <tr>
                          <td style="padding:0 0 0 10px;width:38px;">
                            <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                          </td>
                          <td style="padding:0 0 0 10px;width:38px;">
                            <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
}


module.exports = alertRdvTemplate;