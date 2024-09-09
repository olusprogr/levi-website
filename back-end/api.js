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
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
    const cursor = collection.find({}, { projection: { _id: 0 } });
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

app.delete('/api/deleteSpecificProductFromDatabase/', async (req, res) => {
  try {
    const { id, name } = req.query;
    const database = client.db('savespehere');
    const collection = database.collection('products');
    const result = await collection.deleteOne({ id: parseInt(id), name: name });

    if (result.deletedCount === 1) {
      res.status(200).json({ success: 'Product successfully deleted' });
    } else {
      res.status(404).send('Product not found');
    }

    apiExecutionsInTotal++;
    console.log(`[${apiExecutionsInTotal}] Executed deleteSpecificProductFromDatabase route!`);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Error deleting product');
  }
});

app.put('/api/editSpecificProductInDatabase/', async (req, res) => {
  try {
    const originalProduct = req.body.original;
    const editedProduct = req.body.updated;

    const database = client.db('savespehere');
    const collection = database.collection('products');
    
    const originalProductFromDB = await collection.findOne({ id: originalProduct.id, name: originalProduct.name });
    if (!originalProductFromDB) {return res.status(404).json({ error: 'Original products not found.' })}

    let asw = await collection.updateOne({ id: originalProduct.id, name: originalProduct.name }, { $set: editedProduct });
    if (asw.modifiedCount === 1) {
      res.status(200).json({ success: 'Product successfully edited.' });
    }

    apiExecutionsInTotal++;
    console.log(`[${apiExecutionsInTotal}] Executed editSpecificProductInDatabase route!`);
  } catch (error) {
    console.error('Error handling PUT request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/addProductToDatabase/', async (req, res) => {
  try {
    const product = req.body;
    const database = client.db('savespehere');
    const collection = database.collection('products');

    const maxProduct = await collection.findOne({}, { sort: { id: -1 } });

    let nextProductId;
    if (maxProduct) {
      nextProductId = maxProduct.id + 1;
    } else {nextProductId = 1}

    const result = await collection.insertOne({ ...product, id: nextProductId });
    res.send(result);

    apiExecutionsInTotal++;
    console.log(`[${apiExecutionsInTotal}] Executed addProductToDatabase route!`);
  } catch(error) {
    console.log('Error inserting products into database.');
    res.send({'error': 'Error inserting products into database.'});
  }
});

app.get('/api/requestGPT-API/:message', async (req, res) => {
  // Until we have a better way to handle the API key, we will disable this endpoint.
  return res.send({'error': 'API is disabled for now.'});
  try {
    const msg = req.params.message;

    (async () => {
      const chatCompletion = await openai.chat.completions.create({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          { role: "system", content: "You are a travel agent. Be descriptive and helpful" },
          { role: "user", content: msg }
        ],
        temperature: 0.7,
        max_tokens: 128,
      });
      console.log("AI/ML API:\n", chatCompletion.choices[0].message.content);
    })();
    

    apiExecutionsInTotal++;
    console.log(`[${apiExecutionsInTotal}] Executed requestGPT-API route!`);
  } catch(error) {
    console.log('Error fetching GPT-3 API.');
    res.send({'error': 'Error fetching GPT-3 API.'});
  }
});