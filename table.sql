-- CREATE USER 'tiny'@'localhost' IDENTIFIED BY 'password';
-- GRANT ALL PRIVILEGES ON * . * TO 'tiny'@'localhost';

CREATE DATABASE URLredirects;

CREATE TABLE urls (
    ID int AUTO_INCREMENT NOT NULL,
    unique_key varchar(20) NOT NULL,
    actual varchar(10000) NOT NULL,
    PRIMARY KEY (ID)
);
