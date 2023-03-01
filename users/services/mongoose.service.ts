import mongoose from 'mongoose';
import debug from 'debug';

import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
    private mongooseParameters = {
        serverSelectionTimeoutMS: 5000
    };

    constructor() {
        log('Attemping to connec to MongoDB');
        mongoose
            .connect('mongodb://' +process.env.DB_HOST + ':' + process.env.DB_PORT + '/api-db', this.mongooseParameters)
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                log('MongoDB connection unsuccessful : ',err);
            });
    }

    getMongoose() {
        return mongoose;
    }

}
export default new MongooseService();
