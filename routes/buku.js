const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All Buku
router.get('/', (req, res) => {
  connection.query('SELECT * FROM buku', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Buku',
        data: rows,
      });
    }
  });
});

// GET Buku by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM buku WHERE id_buku = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Buku not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Buku',
        data: rows[0],
      });
    }
  });
});

// POST Buku
router.post('/', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO buku SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_buku = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data Buku berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH Buku by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE buku SET ? WHERE id_buku = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Buku not found',
      });
    } else {
      updatedData.id_buku = id;
      return res.status(200).json({
        status: true,
        message: 'Data Buku berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE Buku by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM buku WHERE id_buku = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Buku not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Buku berhasil dihapus',
      });
    }
  });
});

module.exports = router;
