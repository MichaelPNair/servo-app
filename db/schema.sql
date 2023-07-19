CREATE DATABASE servo; 

CREATE TABLE stations (
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    owner TEXT, 
    address TEXT, 
    suburb TEXT,
    state TEXT,
    latitude float, 
    longitude float, 
    logo_url TEXT
);

-- add this to database to setup lat, lng to distance calculation
create extension cube;
create extension earthdistance;