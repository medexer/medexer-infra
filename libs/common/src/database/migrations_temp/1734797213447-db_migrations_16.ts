import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations161734797213447 implements MigrationInterface {
    name = 'DbMigrations161734797213447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "appointmentId" character varying`);
        await queryRunner.query(`ALTER TYPE "public"."appointment_status_enum" RENAME TO "appointment_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."appointment_status_enum" AS ENUM('pending', 'completed', 'cancelled', 'missed', 'no_show', 'rejected', 'expired')`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" TYPE "public"."appointment_status_enum" USING "status"::"text"::"public"."appointment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."appointment_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."appointment_status_enum_old" AS ENUM('pending', 'completed', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" TYPE "public"."appointment_status_enum_old" USING "status"::"text"::"public"."appointment_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."appointment_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."appointment_status_enum_old" RENAME TO "appointment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "appointmentId"`);
    }

}
