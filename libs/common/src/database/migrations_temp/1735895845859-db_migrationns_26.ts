import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrationns261735895845859 implements MigrationInterface {
    name = 'DbMigrationns261735895845859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."blood_inventory_bloodgroup_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')`);
        await queryRunner.query(`CREATE TABLE "blood_inventory" ("id" BIGSERIAL NOT NULL, "bloodGroup" "public"."blood_inventory_bloodgroup_enum" NOT NULL, "description" character varying DEFAULT '', "units" character varying DEFAULT '0', "price" character varying DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "donationCenter" bigint, CONSTRAINT "PK_29f99b6a5a088d1f47c48df633a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blood_inventory" ADD CONSTRAINT "FK_33e53bafc8dbfd7eac720e9e9e0" FOREIGN KEY ("donationCenter") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blood_inventory" DROP CONSTRAINT "FK_33e53bafc8dbfd7eac720e9e9e0"`);
        await queryRunner.query(`DROP TABLE "blood_inventory"`);
        await queryRunner.query(`DROP TYPE "public"."blood_inventory_bloodgroup_enum"`);
    }

}
