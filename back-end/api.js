const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = "mongodb+srv://olusmain:paR0r7oIQ82eM9PI@cluster0.ztby1wg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

let apiExecutionsInTotal = 0;
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', false);
app.use(cors());
app.use(express.json());


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

app.get('/api/checkLoginCredentials/:fullname/:password', async (req, res) => {
  const { fullname, password } = req.params;
  try {
    const database = client.db('savespehere');
    const collection = database.collection('admins');
    const user = await collection.findOne({ fullname });
    if (!user) {
      res.send({'error': 'User not found.'});
      return;
    }

    const passwordMatch = bcrypt.compare(password.toString(), user.password.toString());
    if (passwordMatch) {
      res.send({'success': 'User found and password matches.'});
    } else {
      res.send({'error': 'Password incorrect.'});
    }

    apiExecutionsInTotal++;
    console.log(`[${apiExecutionsInTotal}] Executed checkLoginCredentials route!`);
  } catch(error) {
    console.log('Error fetching users from database.', error);
    res.send({'error': 'Error fetching users from database.'});
  }
});

app.post('/api/addUserActivityToLog/', async (req, res) => {
  try {
    const database = client.db('savespehere');
    const collection = database.collection('logs');
    const result = await collection.insertOne(req.body);
    res.send(result);

    apiExecutionsInTotal++;
    console.log(`[${apiExecutionsInTotal}] Executed addUserActivityToLog route!`);
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).send('Error logging activity');
  }
});

app.get('/api/getUserActivityLog/', async (req, res) => {
  try {
    const database = client.db('savespehere');
    const collection = database.collection('logs');
    const cursor = collection.find({}).sort({ _id: -1 }).limit(30);
    const results = await cursor.toArray();
    res.send(results);

    apiExecutionsInTotal++;
    console.log(`[${apiExecutionsInTotal}] Executed getUserActivityLog route!`);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).send('Error fetching logs');
  }
});


// app.get('/api/insertProducts/', async (req, res) => {
//   return; // Disable this route to prevent inserting products into database
//   try {
//     console.log('Inserting products into database...');
//     const database = client.db('savespehere');
//     const collection = database.collection('products');
//     const results = await collection.insertMany(projects);
//     res.send(results);
//   } catch(error) {
//     console.log('Error inserting products into database.');
//     res.send({'error': 'Error inserting products into database.'});
//   }
// });