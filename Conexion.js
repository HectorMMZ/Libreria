const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const configSql = {
    user: 'sa',
    password: '12345',
    server: '127.0.0.1',
    database: 'LibreriaQuimera',
    options: {
        encrypt: false,
        trustServerCertificate: true
}
};

app.listen(3000, () => {
    console.log('SERVIDOR CORRIENDO EN EL PUERTO 3000');
});