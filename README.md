Created for Udemy course:  
"The Complete Web Developer 2020" w/ Andrei Neagoie.  

## Frontend
React  
State management: class components  
Navigation: conditional rendering
Connect to backend: Fetch 

## Backend
Backend: node.js  
Web server: express  
Connect backend to db: Kinex

## Database
PostgreSQL  

The following SQL commands were entered in the psql command line to create the database required for this application:  

CREATE DATABASE smartbrain;  

CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email text UNIQUE NOT NULL, entries BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL);  

CREATE TABLE login (id SERIAL PRIMARY KEY, hash VARCHAR(100) NOT NULL, email text UNIQUE NOT NULL);  
