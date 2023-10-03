const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All Anggota
router.get('/', (req, res) => {
  connection.query('SELECT * FROM anggota', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Anggota',
        data: rows,
      });
    }
  });
});

// GET Anggota by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM anggota WHERE id_anggota = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Anggota not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Anggota',
        data: rows[0],
      });
    }
  });
});

// POST Anggota
router.post('/', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO anggota SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_anggota = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data Anggota berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH Anggota by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE anggota SET ? WHERE id_anggota = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Anggota not found',
      });
    } else {
      updatedData.id_anggota = id;
      return res.status(200).json({
        status: true,
        message: 'Data Anggota berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE Anggota by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM anggota WHERE id_anggota = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Anggota not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Anggota berhasil dihapus',
      });
    }
  });
});

module.exports = router;
