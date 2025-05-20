import { readFileSync } from 'node:fs';
import { writeJSON } from '../utils/writeJSON.js';

const { dirname } = import.meta;

// Get data
const documentsArr = JSON.parse(
  readFileSync(`${dirname}/../resources/documents.json`, 'utf8'),
);

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

  // Validate id
  if (!document)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

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

  if (!body || !body.dbId || !body.collectionId)
    return res.status(400).json({
      status: 'fail',
      message: 'Properties dbId and collectionId are required',
    });

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

export default {
  getAllDocuments,
  getDocument,
  createDocument,
};
