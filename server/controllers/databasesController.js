import { readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

const { dirname } = import.meta;

// Data
let dbsArr = JSON.parse(
  readFileSync(`${dirname}/../resources/databases.json`, 'utf8'),
);

// Write JSON
const writeJSON = async (resource, object) => {
  try {
    await writeFile(
      `${dirname}/../resources/${resource}.json`,
      JSON.stringify(object),
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

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
const createDatabase = async (req, res) => {
  // Get id
  const id = dbsArr.length + 1;

  // Build object
  const database = {
    id,
    name: req.body.name,
  };

  // Push to dbsArr
  dbsArr.push(database);

  // Save dbsArr
  try {
    await writeJSON('databases', dbsArr);
    // Send response
    res.status(201).json({
      status: 'success',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
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
const updateDatabase = async (req, res) => {
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
  try {
    await writeJSON('databases', dbsArr);
    // Send response
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Delete
const deleteDatabase = async (req, res) => {
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
  try {
    await writeJSON('databases', dbsArr);
    // Send response
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

export default {
  getAllDatabases,
  getDatabase,
  createDatabase,
  updateDatabase,
  deleteDatabase,
};
