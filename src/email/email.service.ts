import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendUserConfirmation(user: any, token: string) {
        const url = `http://localhost:3000/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Confirm your Email',
            template: './confirmation',
            context: {
                name: user.name,
                url,
            },
        });
    }
}
