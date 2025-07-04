import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations51733662868205 implements MigrationInterface {
    name = 'DbMigrations51733662868205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "accountStatus"`);
        await queryRunner.query(`DROP TYPE "public"."account_accountstatus_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."account_status_enum" AS ENUM('pending', 'active', 'inactive', 'shadow_banned', 'disabled')`);
        await queryRunner.query(`ALTER TABLE "account" ADD "status" "public"."account_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "account" ADD "isComplianceUploaded" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "isComplianceUploaded"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."account_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."account_accountstatus_enum" AS ENUM('pending', 'active', 'inactive', 'shadow_banned', 'disabled')`);
        await queryRunner.query(`ALTER TABLE "account" ADD "accountStatus" "public"."account_accountstatus_enum" NOT NULL DEFAULT 'pending'`);
    }

}
