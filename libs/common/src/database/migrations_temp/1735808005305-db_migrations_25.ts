import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations251735808005305 implements MigrationInterface {
    name = 'DbMigrations251735808005305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "rejectedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "rejectedAt"`);
    }

}
