import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigraions121734428873007 implements MigrationInterface {
    name = 'DbMigraions121734428873007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donor_compliance" DROP CONSTRAINT "FK_320300d6cc0e3d95949614de140"`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ADD CONSTRAINT "FK_320300d6cc0e3d95949614de140" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donor_compliance" DROP CONSTRAINT "FK_320300d6cc0e3d95949614de140"`);
        await queryRunner.query(`ALTER TABLE "donor_compliance" ADD CONSTRAINT "FK_320300d6cc0e3d95949614de140" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
