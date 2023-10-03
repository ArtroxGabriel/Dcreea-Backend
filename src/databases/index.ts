import config from 'config';
import { dbConfig } from '@interfaces/db.interface';

const { host, port, database }: dbConfig = config.get('dbConfig');

export const dbConnection = {
  url: process.env['MONGODB_URL'],
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
