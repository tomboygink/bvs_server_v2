import nodemailer from 'nodemailer';
import crypto from 'crypto';
//import { CONFIG } from '../../xcore/config';
import { UserTable } from '../dbase/Users';
import config from '../../config.json'


export class SendMail {
    args: any;
    sess_code: string;
    constructor(_args: any, _sess_code: string) {
        this.args = _args;
        this.sess_code = _sess_code;

    }

    async sendConfirmMail() {
        let a = ''
        a = crypto.createHmac('sha256', config.config_server.key_code).update(this.args.login+"_"+this.args.email).digest('hex')
        const transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'noreplay@bvs45.ru', // generated ethereal user
                pass: 'TH0TMx2F' // generated ethereal password
            }
        });

        await transporter.sendMail({
            from: 'noreplay@bvs45.ru',
            //Получение email от пользователя 
            to: this.args.email,
            subject: 'Activate mail',
            //Отправка ссылки с кодом для подтверждения
            html: 'This message was sent from bvs_server to activate mail. <h1><a href="http://'+config.config_server.host+':'+config.config_server.port+'/confirm_mail?code= '+ a +'">Click this link</a></h1>',
        })

    }

    async sendRePassword(){
        var ut = new UserTable(this.args, this.sess_code);
        var data = await ut.selectUserLoginEmail();

        const transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'noreplay@bvs45.ru', // generated ethereal user
                pass: 'TH0TMx2F' // generated ethereal password
            }
        });
        
        await transporter.sendMail({
            from: 'noreplay@bvs45.ru',
            //Получение email от пользователя 
            to: this.args.email,
            subject: 'Forgot password',
            //Отправка ссылки с кодом для подтверждения
            html: 'This message was sent from bvs_server to reset your password. <h1><a href="http://'+config.config_server.host+':'+config.config_server.port+'/forgot_pass?code= '+ data[0].re_password_code +'">Click this link</a></h1>',
        })
    }
}

