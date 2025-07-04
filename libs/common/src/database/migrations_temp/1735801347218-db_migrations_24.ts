import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations241735801347218 implements MigrationInterface {
    name = 'DbMigrations241735801347218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "cancelledAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "cancelledAt"`);
    }

}
