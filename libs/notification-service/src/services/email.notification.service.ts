import axios from 'axios';
import { CommandBus } from '@nestjs/cqrs';
import { EmailRequest } from '../interface';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { Account } from 'libs/common/src/models/account.model';
import { AppLogger } from '../../../common/src/logger/logger.service';
import { AccountStatus, AccountType } from 'libs/common/src/constants/enums';
import { reset_password_html_content } from '../templates/emails/reset_password_template';
import { welcome_donor_email_html_content } from '../templates/emails/welcome_donor_email_template';
import { forgot_password_html_content } from '../templates/emails/donor_forgot_password_template';
import { email_verification_html_content } from '../templates/emails/email_verification_template';
import { donor_compliance_email_html_content } from '../templates/emails/donor_compliance_email_template';
import { donor_update_account_email_html_content } from '../templates/emails/donor_update_account_email_template';
import { welcome_donation_center_email_html_content } from '../templates/emails/welcome_donation_center_email_template';
import { new_appointment_email_html_content } from '../templates/emails/new_appointment_email_template';
import { EmailSenderService } from 'libs/helper-service/src/services/email-sender.service';

@Injectable()
export class EmailNotificationService {
  constructor(
    public commandBus: CommandBus,
    private configService: ConfigService,
    private emailSenderService: EmailSenderService,
    @Inject('Logger') private readonly logger: AppLogger,
  ) {}


  async donorComplianceNotification(account: Account) {
    const htmlContent = await donor_compliance_email_html_content(
      account.firstName,
    );

    return this.emailSenderService.sendEmail({
      html: htmlContent,
      sub: 'KYC Compliance',
      to_email: account.email,
    });
  }
 
  async newAppointmentNotification(account: Account, centerName: string) {
    const htmlContent = await new_appointment_email_html_content(
      account.firstName,
      centerName,
    );

    return this.emailSenderService.sendEmail({
      html: htmlContent,
      sub: 'New Appointment',
      to_email: account.email,
    });
  }

  async verifyNewAccountEmailNotification(account: Account) {
    const htmlContent = await donor_update_account_email_html_content(
      account.firstName,
      account.activationCode,
    );

    return this.emailSenderService.sendEmail({
      html: htmlContent,
      sub: 'Verify Account Email',
      to_email: account.newEmail,
    });
  }

  async resetPasswordNotification(account: Account) {
    const htmlContent = await reset_password_html_content();

    return this.emailSenderService.sendEmail({
      html: htmlContent,
      sub: 'Password Reset',
      to_email: account.email,
    });
  }

  async forgotPasswordNotification(account: Account) {
    const htmlContent = await forgot_password_html_content(
      account.passwordResetCode,
    );

    return this.emailSenderService.sendEmail({
      html: htmlContent,
      sub: 'Reset Your Password',
      to_email: account.email,
    });
  }

  async newAccountNotifications(account: Account) {
    switch (account.accountType) {
      case AccountType.INDIVIDUAL:
        if (account.status === AccountStatus.ACTIVE) {
          const htmlContent = await welcome_donor_email_html_content(
            account.firstName,
          );

          return this.emailSenderService.sendEmail({
            html: htmlContent,
            sub: 'Welcome to Medexer!',
            to_email: account.email,
          });
        } else if (account.status === AccountStatus.PENDING) {
          const htmlContent = await email_verification_html_content(
            account.firstName,
            account.activationCode,
          );

          return this.emailSenderService.sendEmail({
            html: htmlContent,
            sub: 'Email Verification',
            to_email: account.email,
          });
        }
      default:
        return;
    }
  }

  async newDonationCenterAccountNotification(account: Account) {
    const htmlContent1 = await welcome_donation_center_email_html_content();

    return this.emailSenderService.sendEmail({
      html: htmlContent1,
      sub: 'Welcome to Medexer!',
      to_email: account.email,
    });
  }
}
