import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMiigrations151734794657966 implements MigrationInterface {
    name = 'DbMiigrations151734794657966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_075467dcc7a85efe9626a710f0b"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_a55bc4faefecd7f1a0697a08d3f"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "REL_075467dcc7a85efe9626a710f0"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "REL_a55bc4faefecd7f1a0697a08d3"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_075467dcc7a85efe9626a710f0b" FOREIGN KEY ("donation_center") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_a55bc4faefecd7f1a0697a08d3f" FOREIGN KEY ("donor") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_a55bc4faefecd7f1a0697a08d3f"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_075467dcc7a85efe9626a710f0b"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "REL_a55bc4faefecd7f1a0697a08d3" UNIQUE ("donor")`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "REL_075467dcc7a85efe9626a710f0" UNIQUE ("donation_center")`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_a55bc4faefecd7f1a0697a08d3f" FOREIGN KEY ("donor") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_075467dcc7a85efe9626a710f0b" FOREIGN KEY ("donation_center") REFERENCES "donation_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
