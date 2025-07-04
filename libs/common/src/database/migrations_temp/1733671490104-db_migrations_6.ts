import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations61733671490104 implements MigrationInterface {
    name = 'DbMigrations61733671490104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_bloodgroup_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')`);
        await queryRunner.query(`ALTER TABLE "account" ADD "bloodGroup" "public"."account_bloodgroup_enum" DEFAULT 'AB-'`);
        await queryRunner.query(`CREATE TYPE "public"."account_genotype_enum" AS ENUM('AA', 'AS', 'SS', 'AC', 'SC')`);
        await queryRunner.query(`ALTER TABLE "account" ADD "genotype" "public"."account_genotype_enum" DEFAULT 'AA'`);
        await queryRunner.query(`ALTER TABLE "account" ADD "hasTattoos" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" DROP COLUMN "bloodGroup"`);
        await queryRunner.query(`CREATE TYPE "public"."donor_compliance_bloodgroup_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ADD "bloodGroup" "public"."donor_compliance_bloodgroup_enum" DEFAULT 'AB-'`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" DROP COLUMN "genotype"`);
        await queryRunner.query(`CREATE TYPE "public"."donor_compliance_genotype_enum" AS ENUM('AA', 'AS', 'SS', 'AC', 'SC')`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ADD "genotype" "public"."donor_compliance_genotype_enum" DEFAULT 'AA'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donor_compliance" DROP COLUMN "genotype"`);
        await queryRunner.query(`DROP TYPE "public"."donor_compliance_genotype_enum"`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ADD "genotype" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" DROP COLUMN "bloodGroup"`);
        await queryRunner.query(`DROP TYPE "public"."donor_compliance_bloodgroup_enum"`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ADD "bloodGroup" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "hasTattoos"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "genotype"`);
        await queryRunner.query(`DROP TYPE "public"."account_genotype_enum"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "bloodGroup"`);
        await queryRunner.query(`DROP TYPE "public"."account_bloodgroup_enum"`);
    }

}
