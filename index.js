const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import semua routes
const bukuRoutes = require('./routes/buku');
const anggotaRoutes = require('./routes/anggota');
const peminjamanRoutes = require('./routes/peminjaman');
const karyawanRoutes = require('./routes/karyawan');
const kbukuRoutes = require('./routes/kbuku');
const penerbitRoutes = require('./routes/penerbit');
const dendaRoutes = require('./routes/denda');

// Gunakan routes
app.use('/buku', bukuRoutes);
app.use('/anggota', anggotaRoutes);
app.use('/peminjaman', peminjamanRoutes);
app.use('/karyawan', karyawanRoutes);
app.use('/kbuku', kbukuRoutes);
app.use('/penerbit', penerbitRoutes);
app.use('/denda', dendaRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
