import { readFileSync } from 'node:fs';
import { writeJSON } from '../utils/writeJSON.js';

const { dirname } = import.meta;
let collectionsArr = JSON.parse(
  readFileSync(`${dirname}/../resources/collections.json`),
);

// Middlewares
const checkId = (req, res, next, val) => {
  const collection = collectionsArr.find((col) => col.id === +val);

  if (!collection) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

const checkBody = (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.dbId)
    return res.status(400).json({
      status: 'fail',
      message: 'Properties dbId and name are required',
    });

  next();
};

// Get all
const getAllCollections = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: collectionsArr.length,
    data: {
      collections: collectionsArr,
    },
  });
};

// Get collection
const getCollection = (req, res) => {
  const { id } = req.params;
  const collection = collectionsArr.find((col) => col.id === +id);

  res.status(200).json({
    status: 'success',
    data: {
      collection,
    },
  });
};

// Create
const createCollection = async (req, res) => {
  const { dbId, name } = req.body;

  // Get id
  const id = collectionsArr.length + 1;

  // Build object
  const newCollection = {
    id,
    dbId,
    name,
  };

  // Add to collections arr
  collectionsArr.push(newCollection);

  // Save json
  try {
    await writeJSON('collections', collectionsArr);
    res.status(201).json({
      status: 'success',
      data: {
        collection: newCollection,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Update
const updateCollection = async (req, res) => {
  // Get id
  const { id } = req.params;

  // Get database
  const collection = collectionsArr.find((col) => col.id === +id);

  // Build new object
  const newData = req.body;
  const newCollection = {
    ...collection,
    ...newData,
  };

  // New databases object
  collectionsArr = collectionsArr.map((col) => {
    if (col.id !== +id) return col;

    return newCollection;
  });

  // SavecollectionsArr
  try {
    await writeJSON('collections', collectionsArr);
    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        collection: newCollection,
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
const deleteCollection = async (req, res) => {
  // Get id
  const { id } = req.params;

  // New databases object
  collectionsArr = collectionsArr.filter((col) => col.id !== +id);

  // Save collectionsArr
  try {
    await writeJSON('collections', collectionsArr);
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
  getAllCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
  checkId,
  checkBody,
};
