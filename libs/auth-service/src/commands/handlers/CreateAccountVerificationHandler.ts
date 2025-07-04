import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { AuthService } from '../../services/auth.service';
import { CreateAccountVerificationCommand } from '../impl';
import { Inject, NotFoundException } from '@nestjs/common';
import { Account } from 'libs/common/src/models/account.model';
import { AccountStatus } from 'libs/common/src/constants/enums';
import { AppLogger } from 'libs/common/src/logger/logger.service';
import { SignupVerificationResponsePayload } from '../../interface';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EmailNotificationService } from 'libs/notification-service/src/services/email.notification.service';

@CommandHandler(CreateAccountVerificationCommand)
export class CreateAccountVerificationHandler
  implements
    ICommandHandler<
      CreateAccountVerificationCommand,
      SignupVerificationResponsePayload
    >
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly authService: AuthService,
    @Inject('Logger') private readonly logger: AppLogger,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly emailNotificationService: EmailNotificationService,
  ) {}

  async execute(command: CreateAccountVerificationCommand) {
    try {
      this.logger.log(`[CREATE-ACCOUNT-VERIFICATION-HANDLER-PROCESSING]`);

      const { payload, origin } = command;

      const account = await this.accountRepository.findOne({
        where: {
          activationCode: payload.otp,
          activationCodeExpires: MoreThanOrEqual(new Date()),
          signupVerificationHash: payload.signupVerificationHash,
        },
      });

      if (!account) {
        throw new NotFoundException('Invalid OTP');
      }

      Object.assign(account, {
        activationCode: '',
        signupVerificationHash: '',
        status: AccountStatus.ACTIVE,
      });

      await this.accountRepository.save(account);

      this.emailNotificationService.newAccountNotifications(account);

      this.logger.log(`[CREATE-ACCOUNT-VERIFICATION-HANDLER-SUCCESS]`);

      return {
        token: await this.authService.generateUserJWT(account),
      } as SignupVerificationResponsePayload;
    } catch (error) {
      this.logger.log(
        `[CREATE-ACCOUNT-VERIFICATION-HANDLER-ERROR] :: ${error}`,
      );
      console.log(error);

      throw error;
    }
  }
}
