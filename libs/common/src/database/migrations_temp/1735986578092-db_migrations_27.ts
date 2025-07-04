import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations271735986578092 implements MigrationInterface {
    name = 'DbMigrations271735986578092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "acceptingAppointments"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "isAcceptingAppointments" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "isAppointmentNotificationsEnabled" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "maxAppointmentPerDay" integer DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "maxAppointmentPerDay"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "isAppointmentNotificationsEnabled"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "isAcceptingAppointments"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "acceptingAppointments" boolean NOT NULL DEFAULT true`);
    }

}
