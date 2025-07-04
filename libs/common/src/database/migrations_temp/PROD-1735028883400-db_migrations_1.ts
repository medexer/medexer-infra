import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations11735028883400 implements MigrationInterface {
    name = 'DbMigrations11735028883400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_accounttype_enum" AS ENUM('donation_center', 'individual', 'admin', 'super_admin', 'system')`);
        await queryRunner.query(`CREATE TYPE "public"."account_status_enum" AS ENUM('pending', 'active', 'inactive', 'shadow_banned', 'disabled')`);
        await queryRunner.query(`CREATE TYPE "public"."account_bloodgroup_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')`);
        await queryRunner.query(`CREATE TYPE "public"."account_genotype_enum" AS ENUM('AA', 'AS', 'SS', 'AC', 'SC')`);
        await queryRunner.query(`CREATE TABLE "account" ("id" BIGSERIAL NOT NULL, "firstName" character varying DEFAULT '', "lastName" character varying DEFAULT '', "phone" character varying DEFAULT '', "newPhone" character varying DEFAULT '', "email" character varying NOT NULL DEFAULT '', "newEmail" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL DEFAULT '', "state" character varying DEFAULT '', "stateArea" character varying DEFAULT '', "latitude" character varying DEFAULT '', "longitude" character varying DEFAULT '', "profilePhoto" character varying DEFAULT 'https://medexer.s3.amazonaws.com/avatars/avatar.png', "accountType" "public"."account_accounttype_enum" NOT NULL DEFAULT 'individual', "status" "public"."account_status_enum" NOT NULL DEFAULT 'pending', "fcmToken" character varying DEFAULT '', "referralCode" character varying DEFAULT '', "referredBy" character varying DEFAULT '', "activationCode" character varying DEFAULT '', "activationCodeExpires" TIMESTAMP, "passwordResetCode" character varying DEFAULT '', "passwordResetToken" character varying DEFAULT '', "passwordResetCodeExpires" TIMESTAMP, "temporalAccessToken" character varying DEFAULT '', "lastLogin" TIMESTAMP, "lastDonationDate" TIMESTAMP, "inRecovery" boolean DEFAULT false, "bloodGroup" "public"."account_bloodgroup_enum" DEFAULT 'AB-', "genotype" "public"."account_genotype_enum" DEFAULT 'AA', "hasTattoos" boolean DEFAULT false, "isComplianceUploaded" boolean DEFAULT false, "signupVerificationHash" character varying DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."donation_center_status_enum" AS ENUM('pending', 'active', 'inactive', 'shadow_banned', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "donation_center" ("id" BIGSERIAL NOT NULL, "name" character varying DEFAULT '', "phone" character varying DEFAULT '', "email" character varying NOT NULL DEFAULT '', "address" character varying DEFAULT '', "buildingNumber" character varying DEFAULT '', "nearestLandMark" character varying DEFAULT '', "state" character varying DEFAULT '', "stateArea" character varying DEFAULT '', "latitude" character varying DEFAULT '', "longitude" character varying DEFAULT '', "logo" character varying DEFAULT 'https://medexer.s3.amazonaws.com/avatars/avatar.png', "coverPhoto" character varying DEFAULT 'https://medexer.s3.amazonaws.com/avatars/avatar.png', "shortDescription" character varying DEFAULT '', "longDescription" character varying DEFAULT '', "status" "public"."donation_center_status_enum" NOT NULL DEFAULT 'pending', "isComplianceUploaded" boolean DEFAULT false, "isComplianceApproved" boolean DEFAULT false, "verificationDeclineReason" character varying DEFAULT '', "ratingOne" character varying DEFAULT '0', "ratingTwo" character varying DEFAULT '0', "ratingThree" character varying DEFAULT '0', "ratingFour" character varying DEFAULT '0', "ratingFive" character varying DEFAULT '0', "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "account" bigint, CONSTRAINT "REL_53af46870e928558f5285241ad" UNIQUE ("account"), CONSTRAINT "PK_b26f796295c3ab98504ba1fe488" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "donation_center_compliance" ("id" SERIAL NOT NULL, "cacCertificate" character varying DEFAULT 'https://medexer.s3.amazonaws.com/avatars/avatar.png', "proofOfAddress" character varying DEFAULT 'https://medexer.s3.amazonaws.com/avatars/avatar.png', "donation_center" bigint, CONSTRAINT "REL_b492845048b5010f200a1a9557" UNIQUE ("donation_center"), CONSTRAINT "PK_5ecfea14dd51156e76eab566fe0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "opening_hours" ("id" SERIAL NOT NULL, "open" character varying DEFAULT '09:00', "close" character varying DEFAULT '21:00', "alwaysOpen" boolean NOT NULL DEFAULT false, "closed" boolean NOT NULL DEFAULT false, "donation_center" bigint, CONSTRAINT "PK_09415e2b345103b1f5971464f85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "days_of_work" ("id" SERIAL NOT NULL, "mondayId" integer, "tuesdayId" integer, "wednesdayId" integer, "thursdayId" integer, "fridayId" integer, "saturdayId" integer, "sundayId" integer, "donation_center" bigint, CONSTRAINT "REL_fd0b86361b6765fa640ade9bfb" UNIQUE ("mondayId"), CONSTRAINT "REL_ff87aabec2931df23af68fb2c3" UNIQUE ("tuesdayId"), CONSTRAINT "REL_4f322be052f48134b1a8e24f8c" UNIQUE ("wednesdayId"), CONSTRAINT "REL_4d2206d930d6d4c6172244a71e" UNIQUE ("thursdayId"), CONSTRAINT "REL_9efb14c77f6effc3c3ceb0723a" UNIQUE ("fridayId"), CONSTRAINT "REL_9fe5996db273b80301dc2a8326" UNIQUE ("saturdayId"), CONSTRAINT "REL_b950e052633cb74110c00f4430" UNIQUE ("sundayId"), CONSTRAINT "REL_dea30a9029fe20d107210a6b9d" UNIQUE ("donation_center"), CONSTRAINT "PK_91f082b5a01e5db7fa77074cfa8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "donation_center_config" ("id" SERIAL NOT NULL, "closureReason" character varying, "isClosed" boolean NOT NULL DEFAULT false, "newAppointmentRequiresAction" boolean NOT NULL DEFAULT false, "acceptingAppointments" boolean NOT NULL DEFAULT true, "daysOfWorkId" integer, "donation_center" bigint, CONSTRAINT "REL_324f4f7d50288013a57881722c" UNIQUE ("daysOfWorkId"), CONSTRAINT "REL_27989f013ab2f91c951b820017" UNIQUE ("donation_center"), CONSTRAINT "PK_65ab95a914ec62bf05a5b0b5b85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."appointment_status_enum" AS ENUM('pending', 'completed', 'cancelled', 'missed', 'no_show', 'rejected', 'expired')`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" BIGSERIAL NOT NULL, "appointmentId" character varying, "time" character varying DEFAULT '', "date" TIMESTAMP, "verificationCode" character varying DEFAULT '', "status" "public"."appointment_status_enum" DEFAULT 'pending', "cancellationReason" character varying DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "donation_center" bigint, "donor" bigint, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum" AS ENUM('default', 'support_inquiry', 'appointment_reminder', 'appointment_confirmation')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" BIGSERIAL NOT NULL, "subject" character varying DEFAULT '', "message" character varying DEFAULT '', "isRead" boolean DEFAULT false, "type" "public"."notification_type_enum" DEFAULT 'default', "createdAt" TIMESTAMP DEFAULT now(), "appointmentId" bigint, "accountId" bigint, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."medical_history_bloodgroup_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')`);
        await queryRunner.query(`CREATE TYPE "public"."medical_history_genotype_enum" AS ENUM('AA', 'AS', 'SS', 'AC', 'SC')`);
        await queryRunner.query(`CREATE TABLE "medical_history" ("id" BIGSERIAL NOT NULL, "bloodGroup" "public"."medical_history_bloodgroup_enum", "genotype" "public"."medical_history_genotype_enum", "hiv1" boolean DEFAULT false, "hiv2" boolean DEFAULT false, "hepatitisB" boolean DEFAULT false, "hepatitisC" boolean DEFAULT false, "syphilis" boolean DEFAULT false, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "accountId" bigint, "appointmentId" bigint, CONSTRAINT "PK_b74f21cb30300ddf41a00623568" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."donor_compliance_bloodgroup_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')`);
        await queryRunner.query(`CREATE TYPE "public"."donor_compliance_genotype_enum" AS ENUM('AA', 'AS', 'SS', 'AC', 'SC')`);
        await queryRunner.query(`CREATE TYPE "public"."donor_compliance_identificationtype_enum" AS ENUM('passport', 'voter_card', 'national_identity_card')`);
        await queryRunner.query(`CREATE TABLE "donor_compliance" ("id" BIGSERIAL NOT NULL, "bloodGroup" "public"."donor_compliance_bloodgroup_enum" DEFAULT 'AB-', "genotype" "public"."donor_compliance_genotype_enum" DEFAULT 'AA', "hasPreviouslyDonatedBlood" boolean DEFAULT false, "lastDonatedBloodDate" TIMESTAMP, "hasTattoos" boolean DEFAULT false, "identificationType" "public"."donor_compliance_identificationtype_enum" NOT NULL DEFAULT 'voter_card', "identificationDocument" character varying DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "account" bigint, CONSTRAINT "REL_320300d6cc0e3d95949614de14" UNIQUE ("account"), CONSTRAINT "PK_3810bc57039932577d197a897df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."list_items_itemtype_enum" AS ENUM('favorite', 'like', 'viewed', 'wishlist', 'search-history-entry')`);
        await queryRunner.query(`CREATE TYPE "public"."list_items_entitytype_enum" AS ENUM('donation-center', 'campaign')`);
        await queryRunner.query(`CREATE TABLE "list_items" ("id" BIGSERIAL NOT NULL, "itemType" "public"."list_items_itemtype_enum", "entityType" "public"."list_items_entitytype_enum", "itemId" character varying DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "account" bigint, CONSTRAINT "PK_26260957b2b71a1d8e2ecd005f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD CONSTRAINT "FK_53af46870e928558f5285241ad3" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation_center_compliance" ADD CONSTRAINT "FK_b492845048b5010f200a1a95573" FOREIGN KEY ("donation_center") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_075467dcc7a85efe9626a710f0b" FOREIGN KEY ("donation_center") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_a55bc4faefecd7f1a0697a08d3f" FOREIGN KEY ("donor") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_d2d676e2bce3164a0b017e91adf" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_00abcf7b2089a5c05f0aedc5676" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD CONSTRAINT "FK_9224fa621c2d2061a825224e808" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD CONSTRAINT "FK_7d7da75bb2a08c95d9043b15943" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ADD CONSTRAINT "FK_320300d6cc0e3d95949614de140" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list_items" ADD CONSTRAINT "FK_05d690843ec4d0575dfd4aef6fe" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list_items" DROP CONSTRAINT "FK_05d690843ec4d0575dfd4aef6fe"`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" DROP CONSTRAINT "FK_320300d6cc0e3d95949614de140"`);
        await queryRunner.query(`ALTER TABLE "medical_history" DROP CONSTRAINT "FK_7d7da75bb2a08c95d9043b15943"`);
        await queryRunner.query(`ALTER TABLE "medical_history" DROP CONSTRAINT "FK_9224fa621c2d2061a825224e808"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_00abcf7b2089a5c05f0aedc5676"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_d2d676e2bce3164a0b017e91adf"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_a55bc4faefecd7f1a0697a08d3f"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_075467dcc7a85efe9626a710f0b"`);
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
        await queryRunner.query(`ALTER TABLE "donation_center_compliance" DROP CONSTRAINT "FK_b492845048b5010f200a1a95573"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP CONSTRAINT "FK_53af46870e928558f5285241ad3"`);
        await queryRunner.query(`DROP TABLE "list_items"`);
        await queryRunner.query(`DROP TYPE "public"."list_items_entitytype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."list_items_itemtype_enum"`);
        await queryRunner.query(`DROP TABLE "donor_compliance"`);
        await queryRunner.query(`DROP TYPE "public"."donor_compliance_identificationtype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."donor_compliance_genotype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."donor_compliance_bloodgroup_enum"`);
        await queryRunner.query(`DROP TABLE "medical_history"`);
        await queryRunner.query(`DROP TYPE "public"."medical_history_genotype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."medical_history_bloodgroup_enum"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TYPE "public"."appointment_status_enum"`);
        await queryRunner.query(`DROP TABLE "donation_center_config"`);
        await queryRunner.query(`DROP TABLE "days_of_work"`);
        await queryRunner.query(`DROP TABLE "opening_hours"`);
        await queryRunner.query(`DROP TABLE "donation_center_compliance"`);
        await queryRunner.query(`DROP TABLE "donation_center"`);
        await queryRunner.query(`DROP TYPE "public"."donation_center_status_enum"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_genotype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_bloodgroup_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_accounttype_enum"`);
    }

}
