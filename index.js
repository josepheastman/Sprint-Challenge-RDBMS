const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const server = express();

server.use(express.json());
server.use(helmet());

const db = knex(knexConfig.development);
const port = 5000;

// ** PROJECTS **
server.get("/api/projects", (req, res) => {
  db("projects")
    .then(projects => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ error: "Projects not found" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved." })
    );
});

server.get("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .where({ id: id })
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ error: "Project not found" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." })
    );
});

server.get("/api/projects/:id/actions", (req, res) => {
  const { id } = req.params;
  db("projects")
    .where({ id })
    .then(project => {
      db("actions")
        .where({ project_id: id })
        .then(action => {
          res.status(200).json({ ...project, actions: action });
        });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." })
    );
});

server.post("/api/projects", (req, res) => {
  const changes = req.body;

  db.insert(changes)
    .into("projects")
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the project to the database."
      });
    });
});

server.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .where({ id: id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ error: "Project not found" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The project could not be removed." })
    );
});

server.put("/api/projects/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("projects")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The project information could not be modified." })
    );
});

// ** ACTIONS **
server.get("/api/actions", (req, res) => {
  db("actions")
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ error: "Actions not found" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." })
    );
});

server.get("/api/actions/:id", (req, res) => {
  const { id } = req.params;
  db("actions")
    .where({ id: id })
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ error: "Action not found" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." })
    );
});

server.post("/api/actions", (req, res) => {
  const changes = req.body;

  db.insert(changes)
    .into("actions")
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the action to the database."
      });
    });
});

server.delete("/api/actions/:id", (req, res) => {
  const { id } = req.params;
  db("actions")
    .where({ id: id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ error: "Action not found" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The action could not be removed." })
    );
});

server.put("/api/actions/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("actions")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The action information could not be modified." })
    );
});

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
