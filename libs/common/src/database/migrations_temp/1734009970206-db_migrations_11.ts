import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations111734009970206 implements MigrationInterface {
    name = 'DbMigrations111734009970206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "buildingNumber" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "nearestLandMark" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "nearestLandMark"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "buildingNumber"`);
    }

}
