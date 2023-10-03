const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All Transaksi Denda
router.get('/', (req, res) => {
  connection.query('SELECT * FROM transaksi_denda', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Transaksi Denda',
        data: rows,
      });
    }
  });
});

// GET Transaksi Denda by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM transaksi_denda WHERE id_transaksi_denda = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Transaksi Denda not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Transaksi Denda',
        data: rows[0],
      });
    }
  });
});

// POST Transaksi Denda
router.post('/', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO transaksi_denda SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_transaksi_denda = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data Transaksi Denda berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH Transaksi Denda by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE transaksi_denda SET ? WHERE id_transaksi_denda = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Transaksi Denda not found',
      });
    } else {
      updatedData.id_transaksi_denda = id;
      return res.status(200).json({
        status: true,
        message: 'Data Transaksi Denda berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE Transaksi Denda by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM transaksi_denda WHERE id_transaksi_denda = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Transaksi Denda not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Transaksi Denda berhasil dihapus',
      });
    }
  });
});

module.exports = router;
