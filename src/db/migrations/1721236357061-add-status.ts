import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatus1721236357061 implements MigrationInterface {
    name = 'AddStatus1721236357061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL DEFAULT 'Active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
    }

}
