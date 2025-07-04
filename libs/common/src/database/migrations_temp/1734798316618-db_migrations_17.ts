import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigrations171734798316618 implements MigrationInterface {
    name = 'DbMigrations171734798316618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "ratingOne" character varying DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "ratingTwo" character varying DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "ratingThree" character varying DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "ratingFour" character varying DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "donation_center" ADD "ratingFive" character varying DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "ratingFive"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "ratingFour"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "ratingThree"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "ratingTwo"`);
        await queryRunner.query(`ALTER TABLE "donation_center" DROP COLUMN "ratingOne"`);
    }

}
