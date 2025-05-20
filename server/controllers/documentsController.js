import { readFileSync } from 'node:fs';
import { writeJSON } from '../utils/writeJSON.js';

const { dirname } = import.meta;

// Get data
let documentsArr = JSON.parse(
  readFileSync(`${dirname}/../resources/documents.json`, 'utf8'),
);

// Middlewares

// Check ID
const checkId = (req, res, next, val) => {
  const document = documentsArr.find((doc) => doc.id === Number(val));

  // Validate id
  if (!document)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  next();
};

// Check body
const checkBody = (req, res, next) => {
  if (!req.body || !req.body.dbId || !req.body.collectionId)
    return res.status(400).json({
      status: 'fail',
      message: 'Properties dbId and collectionId are required',
    });

  next();
};

// Get All Documents
const getAllDocuments = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: documentsArr.length,
    data: {
      documents: documentsArr,
    },
  });
};

// Get Document
const getDocument = (req, res) => {
  const { id } = req.params;
  const document = documentsArr.find((doc) => doc.id === Number(id));

  res.status(200).json({
    status: 'success',
    data: {
      document,
    },
  });
};

// Create document
const createDocument = async (req, res) => {
  const { body } = req;

  // Get id
  const id = documentsArr.length + 1;

  // Build new document
  const newDocument = {
    id,
    ...body,
  };

  // Push to documentsArr
  documentsArr.push(newDocument);

  // Save documentsArr.json
  try {
    await writeJSON('documents', documentsArr);
    res.status(201).json({
      status: 'success',
      data: {
        document: newDocument,
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
const updateDocument = async (req, res) => {
  // Get id
  const { id } = req.params;

  // Get database
  const document = documentsArr.find((doc) => doc.id === +id);

  // Build new object
  const newData = req.body;
  const newDocument = {
    ...document,
    ...newData,
  };

  // New documents object
  documentsArr = documentsArr.map((doc) => {
    if (doc.id !== +id) return doc;

    return newDocument;
  });

  // Save documentsArr
  try {
    await writeJSON('documents', documentsArr);
    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        document: newDocument,
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
const deleteDocument = async (req, res) => {
  // Get id
  const { id } = req.params;

  // New databases object
  documentsArr = documentsArr.filter((doc) => doc.id !== +id);

  // Save documentsArr
  try {
    await writeJSON('documents', documentsArr);
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
  getAllDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  checkId,
  checkBody,
};
