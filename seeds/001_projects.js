exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        { name: "Project1", description: "Project 1 Desc", completed: false },
        { name: "Project2", description: "Project 2 Desc", completed: false },
        { name: "Project3", description: "Project 3 Desc", completed: true }
      ]);
    });
};
