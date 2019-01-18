
exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', tbl => {
      tbl.increments();
      tbl.string('description').notNullable();
      tbl.string('notes');
      tbl.boolean('completed').notNullable();
      tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('actions')
};
