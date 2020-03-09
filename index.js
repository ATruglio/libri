const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();

const db = new sqlite3.Database('libri.db', function () {
    app.listen(3000);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use( bodyParser.urlencoded( { extended: false } ) );

app.get('/', function (req, res) {
    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});

app.get('/autori', function (req, res) {
    const sql = "SELECT * FROM Autori ORDER BY Cognome;";
    db.all(sql, function (err, rows) {
        res.render('autori', {
            autori: rows
        });
    });
});

app.post('/nuovo-autore', function (req, res) {
    const sql = "INSERT INTO Autori (Nome, Cognome) VALUES (?, ?);";
    db.run(sql, [req.body.nome, req.body.cognome], function () {
        res.redirect('/autori');
    });
});

app.get('/autore/:id/edit', function (req, res) {
    const sql = "SELECT * FROM Autori WHERE Id=?;";
    db.get(sql, [req.params.id], function (err, row) {
        res.render('autore', {
            autore: row
        });
    });
});

app.post('/edit-autore', function (req, res) {
    const sql = "UPDATE Autori SET Nome=?, Cognome=? WHERE Id=?;";
    db.run(sql, [req.body.nome, req.body.cognome, req.body.id], function () {
        res.redirect('/autori');
    });
});

app.get('/libri', function (req, res) {
    const sql_libri = "SELECT libri.id, libri.titolo, autori.cognome FROM Libri LEFT JOIN autori ON Libri.Id_Autore=Autori.Id ORDER BY titolo;";
    const sql_autori = "SELECT * FROM Autori ORDER BY Cognome;";
    db.all(sql_autori, function (err, Autori) {
        db.all(sql_libri, function (err, Libri) {
            res.render('libri', {
                Autori: Autori,
                Libri: Libri
            });
        });
    });
});

app.post('/nuovo-libro', function (req, res) {
    const sql = "INSERT INTO Libri (Titolo, Id_Autore) VALUES (?, ?);";
    db.run(sql, [req.body.titolo, req.body.autore], function () {
        res.redirect('/libri');
    });
});

app.get('/libro/:id/edit', function (req, res) {
    const sql_libri = "SELECT * FROM Libri WHERE Id=?;";
    const sql_autori = "SELECT * FROM Autori ORDER BY Cognome;";
    db.all(sql_autori, function (err, autori) {
        db.get(sql_libri, [req.params.id], function (err, libro) {
            res.render('libro', {
                Autori: autori,
                libro: libro
            });
        });
    });
});

app.post('/edit-libro', function (req, res) {
    const sql = "UPDATE Libri SET Yitolo=?, Id_Autore=? WHERE Id=?;";
    db.run(sql, [req.body.titolo, req.body.autore, req.body.id], function () {
        res.redirect('/libri');
    });
});

app.post('/delete-libro', function (req, res) {
    const sql = "DELETE FROM Libri WHERE id=?;";
    db.run(sql, [req.body.id], function () {
        res.redirect('/libri');
    });
});

app.use(function (req, res) {
    res.status(404).sendFile(
        path.join(__dirname, 'public', '404.html')
    );
});