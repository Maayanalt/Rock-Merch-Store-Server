import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';

export const mailerAsyncConfig: MailerAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<MailerOptions> => ({
    transport: {
      service: configService.get('MAIL_SERVICE'),
      secure: true,
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    },
    template: {
      dir: __dirname + './../reset-password/mail-templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
};
