import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations71733918213208 implements MigrationInterface {
    name = 'DbMigrations71733918213208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."donation_center_status_enum" AS ENUM('pending', 'active', 'inactive', 'shadow_banned', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "donation_center" ("id" BIGSERIAL NOT NULL, "name" character varying DEFAULT '', "phone" character varying DEFAULT '', "newPhone" character varying DEFAULT '', "email" character varying NOT NULL DEFAULT '', "newEmail" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL DEFAULT '', "address" character varying DEFAULT '', "state" character varying DEFAULT '', "stateArea" character varying DEFAULT '', "latitude" character varying DEFAULT '', "longitude" character varying DEFAULT '', "logo" character varying DEFAULT 'https://medexer.s3.amazonaws.com/avatars/avatar.png', "coverPhoto" character varying DEFAULT 'https://medexer.s3.amazonaws.com/avatars/avatar.png', "shortDescription" character varying DEFAULT '', "longDescription" character varying DEFAULT '', "status" "public"."donation_center_status_enum" NOT NULL DEFAULT 'pending', "referralCode" character varying DEFAULT '', "referredBy" character varying DEFAULT '', "activationCode" character varying DEFAULT '', "activationCodeExpires" TIMESTAMP, "passwordResetCode" character varying DEFAULT '', "passwordResetToken" character varying DEFAULT '', "passwordResetCodeExpires" TIMESTAMP, "temporalAccessToken" character varying DEFAULT '', "lastLogin" TIMESTAMP, "isComplianceUploaded" boolean DEFAULT false, "isComplianceApproved" boolean DEFAULT false, "signupVerificationHash" character varying DEFAULT '', "verificationDeclineReason" character varying DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_b26f796295c3ab98504ba1fe488" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "opening_hours" ("id" SERIAL NOT NULL, "open" character varying DEFAULT '09:00', "close" character varying DEFAULT '21:00', "alwaysOpen" boolean NOT NULL DEFAULT false, "closed" boolean NOT NULL DEFAULT false, "donation_center" bigint, CONSTRAINT "PK_09415e2b345103b1f5971464f85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "days_of_work" ("id" SERIAL NOT NULL, "mondayId" integer, "tuesdayId" integer, "wednesdayId" integer, "thursdayId" integer, "fridayId" integer, "saturdayId" integer, "sundayId" integer, "donation_center" bigint, CONSTRAINT "REL_fd0b86361b6765fa640ade9bfb" UNIQUE ("mondayId"), CONSTRAINT "REL_ff87aabec2931df23af68fb2c3" UNIQUE ("tuesdayId"), CONSTRAINT "REL_4f322be052f48134b1a8e24f8c" UNIQUE ("wednesdayId"), CONSTRAINT "REL_4d2206d930d6d4c6172244a71e" UNIQUE ("thursdayId"), CONSTRAINT "REL_9efb14c77f6effc3c3ceb0723a" UNIQUE ("fridayId"), CONSTRAINT "REL_9fe5996db273b80301dc2a8326" UNIQUE ("saturdayId"), CONSTRAINT "REL_b950e052633cb74110c00f4430" UNIQUE ("sundayId"), CONSTRAINT "REL_dea30a9029fe20d107210a6b9d" UNIQUE ("donation_center"), CONSTRAINT "PK_91f082b5a01e5db7fa77074cfa8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "donation_center_config" ("id" SERIAL NOT NULL, "closureReason" character varying, "isClosed" boolean NOT NULL DEFAULT false, "newOrderRequiresAction" boolean NOT NULL DEFAULT false, "acceptingOrders" boolean NOT NULL DEFAULT true, "daysOfWorkId" integer, "donation_center" bigint, CONSTRAINT "REL_324f4f7d50288013a57881722c" UNIQUE ("daysOfWorkId"), CONSTRAINT "REL_27989f013ab2f91c951b820017" UNIQUE ("donation_center"), CONSTRAINT "PK_65ab95a914ec62bf05a5b0b5b85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "opening_hours" ADD CONSTRAINT "FK_0508ef8d2eef6700849eb898f48" FOREIGN KEY ("donation_center") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days_of_work" ADD CONSTRAINT "FK_fd0b86361b6765fa640ade9bfb3" FOREIGN KEY ("mondayId") REFERENCES "opening_hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days_of_work" ADD CONSTRAINT "FK_ff87aabec2931df23af68fb2c3e" FOREIGN KEY ("tuesdayId") REFERENCES "opening_hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days_of_work" ADD CONSTRAINT "FK_4f322be052f48134b1a8e24f8c2" FOREIGN KEY ("wednesdayId") REFERENCES "opening_hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days_of_work" ADD CONSTRAINT "FK_4d2206d930d6d4c6172244a71ec" FOREIGN KEY ("thursdayId") REFERENCES "opening_hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days_of_work" ADD CONSTRAINT "FK_9efb14c77f6effc3c3ceb0723a8" FOREIGN KEY ("fridayId") REFERENCES "opening_hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days_of_work" ADD CONSTRAINT "FK_9fe5996db273b80301dc2a83266" FOREIGN KEY ("saturdayId") REFERENCES "opening_hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days_of_work" ADD CONSTRAINT "FK_b950e052633cb74110c00f44309" FOREIGN KEY ("sundayId") REFERENCES "opening_hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days_of_work" ADD CONSTRAINT "FK_dea30a9029fe20d107210a6b9df" FOREIGN KEY ("donation_center") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD CONSTRAINT "FK_324f4f7d50288013a57881722c9" FOREIGN KEY ("daysOfWorkId") REFERENCES "days_of_work"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD CONSTRAINT "FK_27989f013ab2f91c951b8200174" FOREIGN KEY ("donation_center") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP CONSTRAINT "FK_27989f013ab2f91c951b8200174"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP CONSTRAINT "FK_324f4f7d50288013a57881722c9"`);
        await queryRunner.query(`ALTER TABLE "days_of_work" DROP CONSTRAINT "FK_dea30a9029fe20d107210a6b9df"`);
        await queryRunner.query(`ALTER TABLE "days_of_work" DROP CONSTRAINT "FK_b950e052633cb74110c00f44309"`);
        await queryRunner.query(`ALTER TABLE "days_of_work" DROP CONSTRAINT "FK_9fe5996db273b80301dc2a83266"`);
        await queryRunner.query(`ALTER TABLE "days_of_work" DROP CONSTRAINT "FK_9efb14c77f6effc3c3ceb0723a8"`);
        await queryRunner.query(`ALTER TABLE "days_of_work" DROP CONSTRAINT "FK_4d2206d930d6d4c6172244a71ec"`);
        await queryRunner.query(`ALTER TABLE "days_of_work" DROP CONSTRAINT "FK_4f322be052f48134b1a8e24f8c2"`);
        await queryRunner.query(`ALTER TABLE "days_of_work" DROP CONSTRAINT "FK_ff87aabec2931df23af68fb2c3e"`);
        await queryRunner.query(`ALTER TABLE "days_of_work" DROP CONSTRAINT "FK_fd0b86361b6765fa640ade9bfb3"`);
        await queryRunner.query(`ALTER TABLE "opening_hours" DROP CONSTRAINT "FK_0508ef8d2eef6700849eb898f48"`);
        await queryRunner.query(`DROP TABLE "donation_center_config"`);
        await queryRunner.query(`DROP TABLE "days_of_work"`);
        await queryRunner.query(`DROP TABLE "opening_hours"`);
        await queryRunner.query(`DROP TABLE "donation_center"`);
        await queryRunner.query(`DROP TYPE "public"."donation_center_status_enum"`);
    }

}
