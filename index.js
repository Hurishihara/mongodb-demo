import { MongoClient, ServerApiVersion } from 'mongodb';
import { uri } from './test.uri.js';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const listDatabases = async (client) => {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

const run = async () => {
    try {
        await client.connect();
        await listDatabases(client);
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);