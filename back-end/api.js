const express = require('express')
const app = express()
const port = 3000
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://olusmain:paR0r7oIQ82eM9PI@cluster0.ztby1wg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

let apiExecutionsInTotal = 0

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`, 'http://localhost:' + port);
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})

app.get('/', async (req, res) => {
  try {
    res.send({'OK': 'API is working!'})
    apiExecutionsInTotal++
    console.log(`[${apiExecutionsInTotal}] Executed main route!`)
  } catch (error) {
    console.log('Default path to API is not working.')
  }
})

app.get('/get')