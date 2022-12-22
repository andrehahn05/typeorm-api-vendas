import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server started on port ${process.env.PORT || 3001}!`);
  });
});
