CREATE DATABASE gestion_recette;
use gestion_recette;
CREATE TABLE recipes(
   id INT PRIMARY KEY AUtO_INCREMENT NOT NULL,
   titre  VARCHAR(50) NOT NULL UNIQUE,
   ingredients VARCHAR(50) NOT NULL,
   type VARCHAR(50) NOT NULL
);
