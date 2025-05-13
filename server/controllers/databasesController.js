import { readFileSync, writeFile } from 'node:fs';

const { dirname } = import.meta;

// Data
const dbsArr = JSON.parse(
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
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// Update
const updateDatabase = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// Delete
const deleteDatabase = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

export default {
  getAllDatabases,
  getDatabase,
  createDatabase,
  updateDatabase,
  deleteDatabase,
};
