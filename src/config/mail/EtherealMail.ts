import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
    name: string,
    email: string
}

interface ISendMail {
    to: IMailContact,
    from?: IMailContact,
    subject: string,
    templateData: IParseMailTemplate
}

interface ITemplateVariable {
    [key: string]: string | number
}

interface IParseMailTemplate {
    file: string,
    variables: ITemplateVariable;
}

export default class EtherealMail {
    static async sendMail({to, from, subject, templateData}: ISendMail): Promise<void>{
        const handlebarsMailTemplate = new HandlebarsMailTemplate();
        const account = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe suporte',
                address: from?.email || 'equipe@suporte.com'

            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await handlebarsMailTemplate.parse(templateData)
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}