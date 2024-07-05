import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToEmployee1720085301455 implements MigrationInterface {
    name = 'AddAgeToEmployee1720085301455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
