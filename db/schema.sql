CREATE DATABASE servo; 

CREATE TABLE stations (
    id PRIMARY KEY SERIAL, 
    name TEXT NOT NULL, 
    owner TEXT, 
    address TEXT, 
    latitude float, 
    longtitude float, 
    logo_url TEXT
);