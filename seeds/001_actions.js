exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          description: "Action Desc 1",
          notes: "note 1",
          completed: false,
          project_id: 1
        },
        {
          description: "Action Desc 2",
          notes: "note 2",
          completed: false,
          project_id: 1
        },
        {
          description: "Action Desc 3",
          notes: "note 3",
          completed: false,
          project_id: 2
        },
        {
          description: "Action Desc 4",
          notes: "note 4",
          completed: true,
          project_id: 3
        },
        {
          description: "Action Desc 5",
          notes: "note 5",
          completed: true,
          project_id: 3
        }
      ]);
    });
};
