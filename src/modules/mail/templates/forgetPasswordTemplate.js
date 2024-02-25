const moment = require("moment");

const forgetPasswordTemplate = (customer, temporaryPassword) => {
  console.log(customer);
  return (`
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
                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Mot de passe temporaire</h1>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                      <p style="line-height: 170%;"><strong>Bonjour à vous
                        ${customer.pseudo}, </strong><br /><br />
                        Suite à votre demande de réinitialisation de mot de passe, nous vous avons généré un mot de passe temporaire qui vous permettra d'accéder à votre compte.
                        Veuillez utiliser les informations ci-dessous pour vous connecter :
                        <br /><br />
                      </p>
                    <p style="line-height: 170%;">Mot de passe temporaire : ${temporaryPassword}</p>
                    <p style="line-height: 170%;">
                      Nous vous recommandons de vous connecter dès que possible et de mettre à jour votre mot de passe.
                      Si vous n'avez pas effectué cette demande ou si vous avez des questions, n'hésitez pas à nous contacter ou répondre à ce message.
                      </p>
                    <p style="line-height: 170%;">
                      Nous vous remercions de votre compréhension et de votre coopération.
                    </p>
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
  `);
}


module.exports = forgetPasswordTemplate;