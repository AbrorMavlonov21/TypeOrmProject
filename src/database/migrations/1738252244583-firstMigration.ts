import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1738252244583 implements MigrationInterface {
  name = 'FirstMigration1738252244583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_details" ("id" SERIAL NOT NULL, "full_name" character varying(128) NOT NULL, "age" integer NOT NULL, "gender" character varying(128) NOT NULL, "userId" integer NOT NULL, "user_id" integer, CONSTRAINT "UQ_bedfc3b131f6f761cb0f7ecbd90" UNIQUE ("full_name"), CONSTRAINT "UQ_89eb69e59963054dd4cdad4002f" UNIQUE ("userId"), CONSTRAINT "REL_9c53278f03fdaaf92e685f3951" UNIQUE ("user_id"), CONSTRAINT "PK_05b6d195a298be51e8fd56e8bc5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "login" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "roles" text DEFAULT '["user"]', CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "price" numeric NOT NULL, "category_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_product" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "user_id" integer, "product_id" integer, CONSTRAINT "PK_7eb455f41e1a19b0f70f27e41ec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_details" ADD CONSTRAINT "FK_9c53278f03fdaaf92e685f39510" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_product" ADD CONSTRAINT "FK_743893c0c8936b585085e95df8e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_product" ADD CONSTRAINT "FK_dadf8ea672e01452c23d6da9112" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_product" DROP CONSTRAINT "FK_dadf8ea672e01452c23d6da9112"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_product" DROP CONSTRAINT "FK_743893c0c8936b585085e95df8e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_details" DROP CONSTRAINT "FK_9c53278f03fdaaf92e685f39510"`,
    );
    await queryRunner.query(`DROP TABLE "user_product"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "users_details"`);
  }
}
