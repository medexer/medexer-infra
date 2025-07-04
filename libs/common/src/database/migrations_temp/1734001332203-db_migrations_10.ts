import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations101734001332203 implements MigrationInterface {
    name = 'DbMigrations101734001332203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "donation_center_compliance" ("id" SERIAL NOT NULL, "cacCertificate" character varying DEFAULT 'https://medexer.s3.amazonaws.com/avatars/avatar.png', "proofOfAddress" character varying DEFAULT 'https://medexer.s3.amazonaws.com/avatars/avatar.png', "donation_center" bigint, CONSTRAINT "REL_b492845048b5010f200a1a9557" UNIQUE ("donation_center"), CONSTRAINT "PK_5ecfea14dd51156e76eab566fe0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "donation_center_compliance" ADD CONSTRAINT "FK_b492845048b5010f200a1a95573" FOREIGN KEY ("donation_center") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center_compliance" DROP CONSTRAINT "FK_b492845048b5010f200a1a95573"`);
        await queryRunner.query(`DROP TABLE "donation_center_compliance"`);
    }

}
