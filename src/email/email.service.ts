import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService: MailerService,
        private configService: ConfigService,
    ) {}

    async sendUserConfirmation(user: User) {
        const baseUrl = this.configService.get<string>('DOMAIN');
        const url = `${baseUrl}/api/auth/email/${user.token}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Confirm your Email',
            text: url,
        });
    }
}
