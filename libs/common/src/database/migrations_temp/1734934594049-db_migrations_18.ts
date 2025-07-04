import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations181734934594049 implements MigrationInterface {
    name = 'DbMigrations181734934594049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."medical_history_bloodgroup_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')`);
        await queryRunner.query(`CREATE TYPE "public"."medical_history_genotype_enum" AS ENUM('AA', 'AS', 'SS', 'AC', 'SC')`);
        await queryRunner.query(`CREATE TABLE "medical_history" ("id" BIGSERIAL NOT NULL, "bloodGroup" "public"."medical_history_bloodgroup_enum", "genotype" "public"."medical_history_genotype_enum", "hiv1" boolean DEFAULT false, "hiv2" boolean DEFAULT false, "hepatitisB" boolean DEFAULT false, "hepatitisC" boolean DEFAULT false, "syphilis" boolean DEFAULT false, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "accountId" bigint, "appointmentId" bigint, CONSTRAINT "PK_b74f21cb30300ddf41a00623568" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" BIGSERIAL NOT NULL, "subject" character varying DEFAULT '', "message" character varying DEFAULT '', "isRead" boolean DEFAULT false, "type" character varying DEFAULT 'default', "createdAt" TIMESTAMP DEFAULT now(), "appointmentId" bigint, "accountId" bigint, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD CONSTRAINT "FK_9224fa621c2d2061a825224e808" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD CONSTRAINT "FK_7d7da75bb2a08c95d9043b15943" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_d2d676e2bce3164a0b017e91adf" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_00abcf7b2089a5c05f0aedc5676" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_00abcf7b2089a5c05f0aedc5676"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_d2d676e2bce3164a0b017e91adf"`);
        await queryRunner.query(`ALTER TABLE "medical_history" DROP CONSTRAINT "FK_7d7da75bb2a08c95d9043b15943"`);
        await queryRunner.query(`ALTER TABLE "medical_history" DROP CONSTRAINT "FK_9224fa621c2d2061a825224e808"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "medical_history"`);
        await queryRunner.query(`DROP TYPE "public"."medical_history_genotype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."medical_history_bloodgroup_enum"`);
    }

}
