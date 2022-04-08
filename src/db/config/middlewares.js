import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import { resolve } from 'path';

import config from './config.js';

const { isDev, isLocal } = config;

export default (app) => {
  app.use(morgan(isDev || isLocal ? 'dev' : 'common'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(resolve(__dirname, 'src/public')));
  app.use(cors());
};
