import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { writeJSON } from '../utils/writeJSON.js';

const { dirname } = import.meta;

// Data
// TODO: Read inside of the request
let dbsArr = JSON.parse(
  readFileSync(`${dirname}/../resources/databases.json`, 'utf8'),
);

// Middlewares

// Validate ID
const checkId = (req, res, next, val) => {
  const database = dbsArr.find((db) => db.name === val);

  // Validate database
  if (!database) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid name',
    });
  }

  next();
};

// Validate body
const checkBody = (req, res, next) => {
  if (!req.body || !req.body?.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Property name is required',
    });
  }

  next();
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
      data: {
        database,
      },
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
      data: {
        database: newDatabase,
      },
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

// Get All Collections
const getAllCollectionsByDatabase = async (req, res) => {
  const { name } = req.params;

  // Get database
  const database = dbsArr.find((db) => db.name === name);

  // Read collections JSON
  const collectionsArr = JSON.parse(
    await readFile(`${dirname}/../resources/collections.json`, 'utf8'),
  );

  // Get collections
  const collections = collectionsArr.filter((col) => col.dbId === database.id);

  res.status(200).json({
    status: 'success',
    results: collections.length,
    data: {
      collections,
    },
  });
};

// Get All Collections
const getAllDocumentsByCollectionByDatabase = async (req, res) => {
  const { db_name, col_name } = req.params;
  console.log(db_name, col_name);

  // Get database
  const database = dbsArr.find((db) => db.name === db_name);

  // Read collections JSON
  const collectionsArr = JSON.parse(
    await readFile(`${dirname}/../resources/collections.json`, 'utf8'),
  );

  // Get collections
  const collection = collectionsArr.find(
    (col) => col.dbId === database.id && col.name === col_name,
  );

  // Read documents JSON
  const documentsArr = JSON.parse(
    await readFile(`${dirname}/../resources/documents.json`, 'utf8'),
  );

  // Get documents
  const documents = documentsArr.filter(
    (doc) => doc.collection_id === collection.id,
  );

  res.status(200).json({
    status: 'success',
    results: documents.length,
    data: {
      documents,
    },
  });
};

// Get collection by database
const getCollectionByDatabase = async (req, res) => {
  // TODO: Create middleware for validate db_name and col_name
  const { db_name, col_name } = req.params;

  // Get database
  const database = dbsArr.find((db) => db.name === db_name);

  // Read collections JSON
  const collectionsArr = JSON.parse(
    await readFile(`${dirname}/../resources/collections.json`, 'utf8'),
  );

  // Get collection
  const collection = collectionsArr.find(
    (col) => col.dbId === database.id && col.name === col_name,
  );

  if (!collection) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid collection name',
    });
  }

  // Get database
  res.status(200).json({
    status: 'success',
    data: {
      collection,
    },
  });
};

export default {
  getAllDatabases,
  getDatabase,
  createDatabase,
  updateDatabase,
  deleteDatabase,
  checkId,
  checkBody,
  getAllCollectionsByDatabase,
  getCollectionByDatabase,
  getAllDocumentsByCollectionByDatabase,
};
