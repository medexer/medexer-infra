import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations231735794263469 implements MigrationInterface {
    name = 'DbMigrations231735794263469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "acceptedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "processingAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "testResultsUploadedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "completedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "completedAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "testResultsUploadedAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "processingAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "acceptedAt"`);
    }

}
