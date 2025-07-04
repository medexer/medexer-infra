import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigration201734973671044 implements MigrationInterface {
    name = 'DbMigration201734973671044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."list_items_itemtype_enum" AS ENUM('DONATION_CENTER', 'CAMPAIGN')`);
        await queryRunner.query(`CREATE TABLE "list_items" ("id" BIGSERIAL NOT NULL, "itemType" "public"."list_items_itemtype_enum", "itemId" character varying DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "account" bigint, CONSTRAINT "PK_26260957b2b71a1d8e2ecd005f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "list_items" ADD CONSTRAINT "FK_05d690843ec4d0575dfd4aef6fe" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list_items" DROP CONSTRAINT "FK_05d690843ec4d0575dfd4aef6fe"`);
        await queryRunner.query(`DROP TABLE "list_items"`);
        await queryRunner.query(`DROP TYPE "public"."list_items_itemtype_enum"`);
    }

}
