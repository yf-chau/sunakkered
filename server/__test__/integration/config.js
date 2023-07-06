require("dotenv").config();

const request = require('supertest');
const apiServer = require('../../app');


global.request = request 
global.app = apiServer