import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations131734597284676 implements MigrationInterface {
    name = 'DbMigrations131734597284676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."donor_compliance_identificationtype_enum" RENAME TO "donor_compliance_identificationtype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."donor_compliance_identificationtype_enum" AS ENUM('passport', 'voter_card', 'national_identity_card')`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ALTER COLUMN "identificationType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ALTER COLUMN "identificationType" TYPE "public"."donor_compliance_identificationtype_enum" USING "identificationType"::"text"::"public"."donor_compliance_identificationtype_enum"`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ALTER COLUMN "identificationType" SET DEFAULT 'voter_card'`);
        await queryRunner.query(`DROP TYPE "public"."donor_compliance_identificationtype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."donor_compliance_identificationtype_enum_old" AS ENUM('voter_card', 'national_identity_card')`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ALTER COLUMN "identificationType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ALTER COLUMN "identificationType" TYPE "public"."donor_compliance_identificationtype_enum_old" USING "identificationType"::"text"::"public"."donor_compliance_identificationtype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ALTER COLUMN "identificationType" SET DEFAULT 'voter_card'`);
        await queryRunner.query(`DROP TYPE "public"."donor_compliance_identificationtype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."donor_compliance_identificationtype_enum_old" RENAME TO "donor_compliance_identificationtype_enum"`);
    }

}
