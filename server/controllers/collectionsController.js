import { readFileSync } from 'node:fs';

const { dirname } = import.meta;
const collectionsArr = JSON.parse(
  readFileSync(`${dirname}/../resources/collections.json`),
);

const getAllCollections = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: collectionsArr.length,
    data: {
      collections: collectionsArr,
    },
  });
};
const getCollection = (req, res) => {};
const createCollection = (req, res) => {};
const updateCollection = (req, res) => {};
const deleteCollection = (req, res) => {};

export default {
  getAllCollections,
};
