import { readFileSync } from 'node:fs';

const { dirname } = import.meta;
const collectionsArr = JSON.parse(
  readFileSync(`${dirname}/../resources/collections.json`),
);

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
const createCollection = (req, res) => { };
const updateCollection = (req, res) => { };
const deleteCollection = (req, res) => { };

export default {
  getAllCollections,
  getCollection,
  checkId,
};
