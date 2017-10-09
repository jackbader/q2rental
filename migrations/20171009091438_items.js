'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments();
    table.varchar('title').notNullable().defaultTo('');
    table.text('desc').notNullable().defaultTo('');
    table.varchar('img_url').notNullable().defaultTo('')
    table.varchar('cat').notNullable().defaultTo('');
    table.integer('owner_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index();
    table.boolean('rented').notNullable().defaultTo(false)
    table.integer('daily_price').notNullable().defaultTo('')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
