CREATE SCHEMA `Imagenes_favoritas`;
USE Imagenes_favoritas;

CREATE TABLE imagenes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo varchar(250) NOT NULL,
  Imagen varchar(250) NOT NULL
);