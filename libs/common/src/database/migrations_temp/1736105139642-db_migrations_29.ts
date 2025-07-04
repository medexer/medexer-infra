import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations291736105139642 implements MigrationInterface {
    name = 'DbMigrations291736105139642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "donation_center_rating" ("id" SERIAL NOT NULL, "rating" character varying DEFAULT '0', "comment" character varying DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "donationCenter" bigint, "account" bigint, CONSTRAINT "PK_f4825c6025561303168d8cf7743" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "donation_center_rating" ADD CONSTRAINT "FK_ba98e839ac4d71954c3d8c846a5" FOREIGN KEY ("donationCenter") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation_center_rating" ADD CONSTRAINT "FK_70eb0231e0b6a515ec6be916589" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center_rating" DROP CONSTRAINT "FK_70eb0231e0b6a515ec6be916589"`);
        await queryRunner.query(`ALTER TABLE "donation_center_rating" DROP CONSTRAINT "FK_ba98e839ac4d71954c3d8c846a5"`);
        await queryRunner.query(`DROP TABLE "donation_center_rating"`);
    }

}
