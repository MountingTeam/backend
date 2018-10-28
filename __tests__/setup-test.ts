import * as mongoose from 'mongoose';

process.env.NODE_ENV = 'test';

const COMPOSE_URI_DEFAULT = "mongodb://localhost:27017/test";

async function connect() {
    mongoose.connect(
        process.env.COMPOSE_URI || COMPOSE_URI_DEFAULT,
        (error) => {
            if (error) console.error(error);
        });
}

function clearDatabase() {
    return new Promise(resolve => {
        let cont = 0;
        let max = Object.keys(mongoose.connection.collections).length;
        for (const i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {
                cont++;
                if (cont >= max) {
                    resolve();
                }
            });
        }
    });
}

export default async function setupTest() {
    await connect();
    await clearDatabase();
}