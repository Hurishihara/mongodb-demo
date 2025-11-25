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

const insertOneDocument = async (client) => {
    const result = await client.db('school')
        .collection('grades')
        .insertOne({
            student_id: 654321,
            products: [
                {
                    type: 'exam',
                    score: 90
                },
                {
                    type: 'homework',
                    score: 59
                },
                {
                    type: 'quiz',
                    score: 75
                },
                {
                    type: 'homework',
                    score: 88
                }
            ],
            class_id: 550,
        })
    console.log(`New document inserted with the following id: ${result.insertedId}`);
}

const upsertOneDocument = async (client) => {
    const result = await client.db('school').collection('grades')
        .updateOne(
            { student_id: 112333 },
            { $set: { student_id: 112333, class_id: 777, } },
            { upsert: true }
        )
    console.log(`${result.matchedCount} document(s) matched the filter, ${result.upsertedCount} document(s) upserted, ${result.modifiedCount} document(s) modified.`);
}

const countDocuments = async (client) => {
    const count = await client.db('school').collection('grades')
        .countDocuments()
    
    console.log(`Total documents in the collection: ${count}`);
}

const updatePushDocument = async (client) => {
    const result = await client.db('school').collection('grades')
        .updateOne(
            { student_id: 654321 },
            { $push: { products: { type: 'Assessment Test', score: 98 } } }
        )
    console.log(`${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} document(s) modified.`)
}

const run = async () => {
    try {
        await client.connect();
        //await listDatabases(client);
        //await insertOneDocument(client);
        //await upsertOneDocument(client);
        //await updatePushDocument(client);
        await countDocuments(client);
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);