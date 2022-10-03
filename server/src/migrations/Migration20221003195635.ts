import { Migration } from '@mikro-orm/migrations';

export class Migration20221003195635 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "name" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "name";');
  }

}
