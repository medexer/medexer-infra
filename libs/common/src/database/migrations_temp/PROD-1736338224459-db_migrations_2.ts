import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations21736338224459 implements MigrationInterface {
    name = 'DbMigrations21736338224459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "donation_center_rating" ("id" SERIAL NOT NULL, "rating" character varying DEFAULT '0', "comment" character varying DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "donationCenter" bigint, "account" bigint, CONSTRAINT "PK_f4825c6025561303168d8cf7743" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."blood_inventory_bloodgroup_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')`);
        await queryRunner.query(`CREATE TABLE "blood_inventory" ("id" BIGSERIAL NOT NULL, "bloodGroup" "public"."blood_inventory_bloodgroup_enum" NOT NULL, "description" character varying DEFAULT '', "units" character varying DEFAULT '0', "price" character varying DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "donationCenter" bigint, CONSTRAINT "PK_29f99b6a5a088d1f47c48df633a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "acceptingAppointments"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "isAcceptingAppointments" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "isAppointmentNotificationsEnabled" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "maxAppointmentsPerDay" integer DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "hasCompletedReview" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "rejectedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "cancelledAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "acceptedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "processingAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "testResultsUploadedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "completedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TYPE "public"."appointment_status_enum" RENAME TO "appointment_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."appointment_status_enum" AS ENUM('pending', 'accepted', 'processing', 'completed', 'cancelled', 'missed', 'no_show', 'rejected', 'expired')`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" TYPE "public"."appointment_status_enum" USING "status"::"text"::"public"."appointment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."appointment_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "donation_center_rating" ADD CONSTRAINT "FK_ba98e839ac4d71954c3d8c846a5" FOREIGN KEY ("donationCenter") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation_center_rating" ADD CONSTRAINT "FK_70eb0231e0b6a515ec6be916589" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blood_inventory" ADD CONSTRAINT "FK_33e53bafc8dbfd7eac720e9e9e0" FOREIGN KEY ("donationCenter") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blood_inventory" DROP CONSTRAINT "FK_33e53bafc8dbfd7eac720e9e9e0"`);
        await queryRunner.query(`ALTER TABLE "donation_center_rating" DROP CONSTRAINT "FK_70eb0231e0b6a515ec6be916589"`);
        await queryRunner.query(`ALTER TABLE "donation_center_rating" DROP CONSTRAINT "FK_ba98e839ac4d71954c3d8c846a5"`);
        await queryRunner.query(`CREATE TYPE "public"."appointment_status_enum_old" AS ENUM('pending', 'completed', 'cancelled', 'missed', 'no_show', 'rejected', 'expired')`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" TYPE "public"."appointment_status_enum_old" USING "status"::"text"::"public"."appointment_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."appointment_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."appointment_status_enum_old" RENAME TO "appointment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "completedAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "testResultsUploadedAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "processingAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "acceptedAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "cancelledAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "rejectedAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "hasCompletedReview"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "maxAppointmentsPerDay"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "isAppointmentNotificationsEnabled"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "isAcceptingAppointments"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "acceptingAppointments" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`DROP TABLE "blood_inventory"`);
        await queryRunner.query(`DROP TYPE "public"."blood_inventory_bloodgroup_enum"`);
        await queryRunner.query(`DROP TABLE "donation_center_rating"`);
    }

}
