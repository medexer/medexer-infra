import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations41733400836965 implements MigrationInterface {
    name = 'DbMigrations41733400836965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "signupVerificationHash" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "signupVerificationHash"`);
    }

}
