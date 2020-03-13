
DROP TABLE IF EXISTS Autori;
CREATE TABLE Autori (
    Id INTEGER PRIMARY KEY,
    Nome TEXT,
    Cognome TEXT NOT NULL
);

INSERT INTO Autori (nome, cognome) values ('Giovanni', 'Pascoli');
INSERT INTO Autori (cognome) values ('Bariccò');




DROP TABLE IF EXISTS Libri;
CREATE TABLE Libri (
    Id INTEGER PRIMARY KEY,
    Titolo TEXT NOT NULL,
    Id_Autore INTEGER
);

INSERT INTO Libri (titolo) values ('Poemetti');
INSERT INTO Libri (titolo, id_autore) values ('Oceano Mare', 2);

SELECT * FROM Libri;
SELECT * FROM Autori;
