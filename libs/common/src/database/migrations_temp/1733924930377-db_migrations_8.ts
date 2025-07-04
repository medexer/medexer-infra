import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations81733924930377 implements MigrationInterface {
    name = 'DbMigrations81733924930377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "newOrderRequiresAction"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "acceptingOrders"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "newAppointmentRequiresAction" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "acceptingAppointments" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "acceptingAppointments"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" DROP COLUMN "newAppointmentRequiresAction"`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "acceptingOrders" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "donation_center_config" ADD "newOrderRequiresAction" boolean NOT NULL DEFAULT false`);
    }

}
