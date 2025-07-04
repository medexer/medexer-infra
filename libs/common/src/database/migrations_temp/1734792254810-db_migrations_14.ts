import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations141734792254810 implements MigrationInterface {
    name = 'DbMigrations141734792254810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."appointment_status_enum" AS ENUM('pending', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" BIGSERIAL NOT NULL, "time" character varying DEFAULT '', "date" TIMESTAMP, "verificationCode" character varying DEFAULT '', "status" "public"."appointment_status_enum" DEFAULT 'pending', "cancellationReason" character varying DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "donation_center" bigint, "donor" bigint, CONSTRAINT "REL_075467dcc7a85efe9626a710f0" UNIQUE ("donation_center"), CONSTRAINT "REL_a55bc4faefecd7f1a0697a08d3" UNIQUE ("donor"), CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_075467dcc7a85efe9626a710f0b" FOREIGN KEY ("donation_center") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_a55bc4faefecd7f1a0697a08d3f" FOREIGN KEY ("donor") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_a55bc4faefecd7f1a0697a08d3f"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_075467dcc7a85efe9626a710f0b"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TYPE "public"."appointment_status_enum"`);
    }

}
