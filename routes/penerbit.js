const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All Penerbit
router.get('/', (req, res) => {
  connection.query('SELECT * FROM penerbit', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Penerbit',
        data: rows,
      });
    }
  });
});

// GET Penerbit by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM penerbit WHERE id_penerbit = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Penerbit not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Penerbit',
        data: rows[0],
      });
    }
  });
});

// POST Penerbit
router.post('/', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO penerbit SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_penerbit = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data Penerbit berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH Penerbit by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE penerbit SET ? WHERE id_penerbit = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Penerbit not found',
      });
    } else {
      updatedData.id_penerbit = id;
      return res.status(200).json({
        status: true,
        message: 'Data Penerbit berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE Penerbit by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM penerbit WHERE id_penerbit = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Penerbit not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Penerbit berhasil dihapus',
      });
    }
  });
});

module.exports = router;
