import { readFileSync, writeFile } from 'node:fs';

const { dirname } = import.meta;

// Data
let dbsArr = JSON.parse(
  readFileSync(`${dirname}/../resources/databases.json`, 'utf8'),
);

// Get all
const getAllDatabases = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: dbsArr.length,
    data: {
      databases: dbsArr,
    },
  });
};

// Create
const createDatabase = (req, res) => {
  // Get id
  const id = dbsArr.length + 1;

  // Build object
  const database = {
    id,
    name: req.body.name,
  };

  // Push to dbsArr
  dbsArr.push(database);

  // Save dbsArr in databases.json
  writeFile(
    `${dirname}/../resources/databases.json`,
    JSON.stringify(dbsArr),
    (err) => {
      if (err)
        return res.status(500).json({
          status: 'error',
          message: err.message,
        });

      // Send response
      res.status(201).json({
        status: 'success',
        data: {
          database,
        },
      });
    },
  );
};

// Get
const getDatabase = (req, res) => {
  // Get name
  const { name } = req.params;

  // Get database
  const database = dbsArr.find((db) => db.name === name);

  // Validate database
  if (!database) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid name',
    });
  }

  // Send response
  res.status(200).json({
    status: 'success',
    data: {
      database,
    },
  });
};

// Update
const updateDatabase = (req, res) => {
  // Get name
  const { name } = req.params;

  // Get database
  const database = dbsArr.find((db) => db.name === name);

  // Validate database
  if (!database) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid name',
    });
  }

  // Build new object
  const newData = req.body;
  const newDatabase = {
    ...database,
    ...newData,
  };

  // New databases object
  dbsArr = dbsArr.map((db) => {
    if (db.name !== name) return db;

    return newDatabase;
  });

  // Save dbsArr
  writeFile(
    `${dirname}/../resources/databases.json`,
    JSON.stringify(dbsArr),
    (err) => {
      if (err)
        return res.status(500).json({
          status: 'error',
          message: err.message,
        });

      // Send response
      res.status(200).json({
        status: 'success',
        data: {
          database: newDatabase,
        },
      });
    },
  );
};

// Delete
const deleteDatabase = (req, res) => {
  // Get name
  const { name } = req.params;

  // Get database
  const database = dbsArr.find((db) => db.name === name);

  // Validate database
  if (!database) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid name',
    });
  }

  // New databases object
  dbsArr = dbsArr.filter((db) => db.name !== name);

  // Save dbsArr
  writeFile(
    `${dirname}/../resources/databases.json`,
    JSON.stringify(dbsArr),
    (err) => {
      if (err)
        return res.status(500).json({
          status: 'error',
          message: err.message,
        });

      // Send response
      res.status(204).json({
        status: 'success',
      });
    },
  );
};

export default {
  getAllDatabases,
  getDatabase,
  createDatabase,
  updateDatabase,
  deleteDatabase,
};
