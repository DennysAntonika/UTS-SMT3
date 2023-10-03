const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All Kategori Buku
router.get('/', (req, res) => {
  connection.query('SELECT * FROM kategori_buku', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Kategori Buku',
        data: rows,
      });
    }
  });
});

// GET Kategori Buku by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM kategori_buku WHERE id_kategori_buku = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Kategori Buku not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Kategori Buku',
        data: rows[0],
      });
    }
  });
});

// POST Kategori Buku
router.post('/', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO kategori_buku SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_kategori_buku = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data Kategori Buku berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH Kategori Buku by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE kategori_buku SET ? WHERE id_kategori_buku = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Kategori Buku not found',
      });
    } else {
      updatedData.id_kategori_buku = id;
      return res.status(200).json({
        status: true,
        message: 'Data Kategori Buku berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE Kategori Buku by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM kategori_buku WHERE id_kategori_buku = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Kategori Buku not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Kategori Buku berhasil dihapus',
      });
    }
  });
});

module.exports = router;
