import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations91733994700780 implements MigrationInterface {
    name = 'DbMigrations91733994700780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "newPhone"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "newEmail"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "referralCode"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "referredBy"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "activationCode"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "activationCodeExpires"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "passwordResetCode"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "passwordResetToken"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "passwordResetCodeExpires"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "temporalAccessToken"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "signupVerificationHash"`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "account" bigint`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD CONSTRAINT "UQ_53af46870e928558f5285241ad3" UNIQUE ("account")`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD CONSTRAINT "FK_53af46870e928558f5285241ad3" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center" DROP CONSTRAINT "FK_53af46870e928558f5285241ad3"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP CONSTRAINT "UQ_53af46870e928558f5285241ad3"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "account"`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "signupVerificationHash" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "lastLogin" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "temporalAccessToken" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "passwordResetCodeExpires" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "passwordResetToken" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "passwordResetCode" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "activationCodeExpires" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "activationCode" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "referredBy" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "referralCode" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "password" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "newEmail" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "newPhone" character varying DEFAULT ''`);
    }

}
