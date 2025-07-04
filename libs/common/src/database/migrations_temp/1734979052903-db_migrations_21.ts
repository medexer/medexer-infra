import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations211734979052903 implements MigrationInterface {
    name = 'DbMigrations211734979052903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."list_items_entitytype_enum" AS ENUM('donation-center', 'campaign')`);
        await queryRunner.query(`ALTER TABLE "list_items" ADD "entityType" "public"."list_items_entitytype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."list_items_itemtype_enum" RENAME TO "list_items_itemtype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."list_items_itemtype_enum" AS ENUM('favorite', 'like', 'viewed', 'wishlist', 'search-history-entry')`);
        await queryRunner.query(`ALTER TABLE "list_items" ALTER COLUMN "itemType" TYPE "public"."list_items_itemtype_enum" USING "itemType"::"text"::"public"."list_items_itemtype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."list_items_itemtype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."list_items_itemtype_enum_old" AS ENUM('DONATION_CENTER', 'CAMPAIGN')`);
        await queryRunner.query(`ALTER TABLE "list_items" ALTER COLUMN "itemType" TYPE "public"."list_items_itemtype_enum_old" USING "itemType"::"text"::"public"."list_items_itemtype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."list_items_itemtype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."list_items_itemtype_enum_old" RENAME TO "list_items_itemtype_enum"`);
        await queryRunner.query(`ALTER TABLE "list_items" DROP COLUMN "entityType"`);
        await queryRunner.query(`DROP TYPE "public"."list_items_entitytype_enum"`);
    }

}
