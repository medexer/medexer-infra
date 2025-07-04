import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations31733141250424 implements MigrationInterface {
    name = 'DbMigrations31733141250424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."donor_compliance_identificationtype_enum" AS ENUM('voter_card', 'national_identity_card')`);
        await queryRunner.query(`CREATE TABLE "donor_compliance" ("id" BIGSERIAL NOT NULL, "bloodGroup" character varying DEFAULT '', "genotype" character varying DEFAULT '', "hasPreviouslyDonatedBlood" boolean DEFAULT false, "lastDonatedBloodDate" TIMESTAMP, "hasTattoos" boolean DEFAULT false, "identificationType" "public"."donor_compliance_identificationtype_enum" NOT NULL DEFAULT 'voter_card', "identificationDocument" character varying DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "account" bigint, CONSTRAINT "REL_320300d6cc0e3d95949614de14" UNIQUE ("account"), CONSTRAINT "PK_3810bc57039932577d197a897df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ADD CONSTRAINT "FK_320300d6cc0e3d95949614de140" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donor_compliance" DROP CONSTRAINT "FK_320300d6cc0e3d95949614de140"`);
        await queryRunner.query(`DROP TABLE "donor_compliance"`);
        await queryRunner.query(`DROP TYPE "public"."donor_compliance_identificationtype_enum"`);
    }

}
