import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations21733139341461 implements MigrationInterface {
    name = 'DbMigrations21733139341461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "lastDonationDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "account" ADD "inRecovery" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "inRecovery"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "lastDonationDate"`);
    }

}
