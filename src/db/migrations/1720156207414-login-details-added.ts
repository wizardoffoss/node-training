import { MigrationInterface, QueryRunner } from "typeorm";

export class LoginDetailsAdded1720156207414 implements MigrationInterface {
    name = 'LoginDetailsAdded1720156207414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
