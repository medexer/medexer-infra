import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations11733113895523 implements MigrationInterface {
    name = 'DbMigrations11733113895523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_accounttype_enum" AS ENUM('donation_center', 'individual', 'admin', 'super_admin', 'system')`);
        await queryRunner.query(`CREATE TYPE "public"."account_accountstatus_enum" AS ENUM('pending', 'active', 'inactive', 'shadow_banned', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "account" ("id" BIGSERIAL NOT NULL, "firstName" character varying DEFAULT '', "lastName" character varying DEFAULT '', "phone" character varying DEFAULT '', "newPhone" character varying DEFAULT '', "email" character varying NOT NULL DEFAULT '', "newEmail" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL DEFAULT '', "state" character varying DEFAULT '', "stateArea" character varying DEFAULT '', "latitude" character varying DEFAULT '', "longitude" character varying DEFAULT '', "profilePhoto" character varying DEFAULT 'https://medexer.s3.amazonaws.com/avatars/avatar.png', "accountType" "public"."account_accounttype_enum" NOT NULL DEFAULT 'individual', "accountStatus" "public"."account_accountstatus_enum" NOT NULL DEFAULT 'pending', "fcmToken" character varying DEFAULT '', "referralCode" character varying DEFAULT '', "referredBy" character varying DEFAULT '', "activationCode" character varying DEFAULT '', "activationCodeExpires" TIMESTAMP, "passwordResetCode" character varying DEFAULT '', "passwordResetToken" character varying DEFAULT '', "passwordResetCodeExpires" TIMESTAMP, "temporalAccessToken" character varying DEFAULT '', "lastLogin" TIMESTAMP, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_accountstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_accounttype_enum"`);
    }

}
