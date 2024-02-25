const nodemailer = require("nodemailer");
const moment = require("moment");
const alertRdvTemplate = require("../templates/alertRdvTemplate");
const makeId = require("../../../utils/generateRandomPassword");
const Customer = require("../../../schema/customer");
const forgetPasswordTemplate = require("../templates/forgetPasswordTemplate");
const bcrypt = require("bcryptjs");

class MailService {
	constructor(){
		this.transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.USER_MAIL,
				pass: process.env.MAIL_KEY,
			},
		});
	}

	// to: "mail@gmail.com"
	// subject: "text"
	// HYMLContent
	sendMail = async (to, subject, HTMLContent, text, attachments) => {
		const mailOptions = {
			from: {
				name: 'Christian et Gaël',
				address: process.env.USER_MAIL
			},
			to,
			subject,
			text,
			html: HTMLContent,
			attachments
		}
		
		try {
			console.log(mailOptions);
			await this.transporter.sendMail(mailOptions);
			console.log('mail Sent to', to);
		} catch (err){
			console.log(err);
		}
	}

	sendAlertRdvMail = async (rdv)	=> {
		const { date, startHour, customer, service, employee } = rdv;

		const attachments = [{
			filename: 'mail-logo.png',
			path: `${__dirname.replace("src/modules/mail/service", "mailImages")}/mail-logo.png`,
			cid: 'logo1'
		}]
		const alertRdvHTMLContent = alertRdvTemplate(customer.pseudo, date, startHour, service.name, employee.name);
		const subject = 'Rappel du rendez-vous';

		try {
			await this.sendMail(customer.email, subject, alertRdvHTMLContent, undefined, attachments);
		} catch (err) {
			console.log(err);
		}
	}

	sendForgetPasswordMail = async (customerEmail) => {
		try {
			const salt = await bcrypt.genSalt(10);
			const temporaryPassword = makeId(10);
			const hashedPassword = await bcrypt.hash(temporaryPassword, salt);

			await Customer.findOneAndUpdate({ email: customerEmail }, { temporaryPassword: hashedPassword });

			const attachments = [{
				filename: 'mail-logo.png',
				path: `${__dirname.replace("src/modules/mail/service", "mailImages")}/mail-logo.png`,
				cid: 'logo1'
			}];

			const updatedCustomer = await Customer.findOne({ email: customerEmail });
			const forgetPasswordHTMLContent = forgetPasswordTemplate(updatedCustomer, temporaryPassword);
			const subject = 'Mot de passe temporaire pour réinitialisation de compte';

			const mailOptions = {
				from: {
					name: 'Christian et Gaël',
					address: process.env.USER_MAIL
				},
				to: customerEmail,
				subject,
				html: forgetPasswordHTMLContent,
				attachments
			}

			const transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false,
				auth: {
					user: process.env.USER_MAIL,
					pass: process.env.FORGET_PASSWORD_MAIL_KEY,
				},
			});
			await transporter.sendMail(mailOptions);
			return updatedCustomer;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = MailService;