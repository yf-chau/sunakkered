require("dotenv").config();

const request = require('supertest');
const apiServer = require('../../api');


global.request = request 
global.app = apiServer