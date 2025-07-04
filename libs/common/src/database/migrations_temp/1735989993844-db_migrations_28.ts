import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations281735989993844 implements MigrationInterface {
    name = 'DbMigrations281735989993844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center_config" RENAME COLUMN "maxAppointmentPerDay" TO "maxAppointmentsPerDay"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center_config" RENAME COLUMN "maxAppointmentsPerDay" TO "maxAppointmentPerDay"`);
    }

}
