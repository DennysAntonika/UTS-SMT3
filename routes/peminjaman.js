const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All Peminjaman
router.get('/', (req, res) => {
  connection.query('SELECT * FROM peminjaman', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Peminjaman',
        data: rows,
      });
    }
  });
});

// GET Peminjaman by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM peminjaman WHERE id_peminjaman = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Peminjaman not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Peminjaman',
        data: rows[0],
      });
    }
  });
});

// POST Peminjaman
router.post('/', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO peminjaman SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_peminjaman = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data Peminjaman berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH Peminjaman by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE peminjaman SET ? WHERE id_peminjaman = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Peminjaman not found',
      });
    } else {
      updatedData.id_peminjaman = id;
      return res.status(200).json({
        status: true,
        message: 'Data Peminjaman berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE Peminjaman by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM peminjaman WHERE id_peminjaman = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Peminjaman not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Peminjaman berhasil dihapus',
      });
    }
  });
});

module.exports = router;
