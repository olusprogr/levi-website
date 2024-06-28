const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://olusmain:paR0r7oIQ82eM9PI@cluster0.ztby1wg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

let apiExecutionsInTotal = 0;

app.set('trust proxy', true);
app.use(cors());

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`, 'http://localhost:' + port);
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

app.get('/', async (req, res) => {
  try {
    res.send({'OK': 'API is working!'});
    apiExecutionsInTotal++;
    console.log(`[${apiExecutionsInTotal}] Executed main route!`);
  } catch (error) {
    console.log('Default path to API is not working.');
    console.log(error);
  }
});

app.get('/api/getProducts/', async (req, res) => {
  try {
    const database = client.db('savespehere');
    const collection = database.collection('products');
    const cursor = collection.find({});
    const results = await cursor.toArray();
    res.send(results);
    apiExecutionsInTotal++;
    console.log(`[${apiExecutionsInTotal}] Executed getProducts route!`);
  } catch(error) {
    console.log('Error fetching products from database.');
    res.send({'error': 'Error fetching products from database.'});
  }
})


app.get('/api/insertProducts/', async (req, res) => {
  return; // Disable this route to prevent inserting products into database
  try {
    console.log('Inserting products into database...');
    const database = client.db('savespehere');
    const collection = database.collection('products');
    const results = await collection.insertMany(projects);
    res.send(results);
  } catch(error) {
    console.log('Error inserting products into database.');
    res.send({'error': 'Error inserting products into database.'});
  }
});