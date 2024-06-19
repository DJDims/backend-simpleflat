import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendUserConfirmation(user: User) {
        const url = `http://localhost:3000/api/auth/email/${user.token}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Confirm your Email',
            text: url,
        });
    }
}
