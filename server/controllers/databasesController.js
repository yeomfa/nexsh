import { readFileSync } from 'node:fs';

const { dirname } = import.meta;

// Data
const dbsArr = JSON.parse(
  readFileSync(`${dirname}/../resources/databases.json`, 'utf8'),
);

const getAllDatabases = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: dbsArr.length,
    data: {
      databases: dbsArr,
    },
  });
};

const createDatabase = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getDatabase = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateDatabase = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

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
