import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations301736150175326 implements MigrationInterface {
    name = 'DbMigrations301736150175326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "hasCompletedReview" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "hasCompletedReview"`);
    }

}
