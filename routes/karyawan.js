const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All Karyawan
router.get('/', (req, res) => {
  connection.query('SELECT * FROM karyawan', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Karyawan',
        data: rows,
      });
    }
  });
});

// GET Karyawan by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM karyawan WHERE id_karyawan = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Karyawan not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Karyawan',
        data: rows[0],
      });
    }
  });
});

// POST Karyawan
router.post('/', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO karyawan SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_karyawan = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data Karyawan berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH Karyawan by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE karyawan SET ? WHERE id_karyawan = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Karyawan not found',
      });
    } else {
      updatedData.id_karyawan = id;
      return res.status(200).json({
        status: true,
        message: 'Data Karyawan berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE Karyawan by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM karyawan WHERE id_karyawan = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Karyawan not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Karyawan berhasil dihapus',
      });
    }
  });
});

module.exports = router;
