import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations191734934758249 implements MigrationInterface {
    name = 'DbMigrations191734934758249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum" AS ENUM('default', 'support_inquiry', 'appointment_reminder', 'appointment_confirmation')`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "type" "public"."notification_type_enum" DEFAULT 'default'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "type" character varying DEFAULT 'default'`);
    }

}
