const RDV = require("../../../schema/rdv");
const MailService = require("../service/mail.service");
const path = require("path");
const alertRdvTemplate = require("../templates/alertRdvTemplate");
const nodemailer = require("nodemailer");

class MailController {
	constructor(){
		this.mailService = new MailService();
	}

	sendAlertRdvMail = async (req, res) => {
		const { id } = req.body;
		try {
			const rdv = await RDV.findById(id)
			 .populate("customer")
			 .populate("employee")
			 .populate("service");

			const { date, startHour, customer, service, employee } = rdv;

			const imagePath = path.join(__dirname.replace(/src[\\/]modules[\\/]mail[\\/]controller/, 'mailImages'), 'mail-logo.png');

			const attachments = [{
				filename: 'mail-logo.png',
				path: `${imagePath}`,
				cid: 'logo1'
			}]
			const alertRdvHTMLContent = alertRdvTemplate(customer.pseudo, date, startHour, service.name, employee.name);
			const subject = 'Rappel du rendez-vous';

			const mailOptions = {
				from: {
					name: 'Christian et Gaël',
					address: process.env.USER_MAIL
				},
				to: customer.email,
				subject,
				html: alertRdvHTMLContent,
				attachments
			}

			// TODO Verify PORT
			const transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false,
				auth: {
					user: process.env.USER_MAIL,
					pass: process.env.MAIL_RDV_KEY,
				},
			});

			await transporter.sendMail(mailOptions);

			await this.mailService.sendAlertRdvMail(rdv);
			res.status(200).send({ message: "Mail sent" });
		} catch (err) {
			res.status(500).send('Unable to send mail alert');
			console.log(err);
		}
	}
}

module.exports = MailController;