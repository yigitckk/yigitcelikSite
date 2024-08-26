const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Define the path to your resume file or data
const resumeFilePath = path.join(process.cwd(), '/data/portfolio.json'); // Update this path if needed

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('Portfolio'); // Replace with your database name
    const collection = db.collection('resume'); // Replace with your collection name

    // Read resume data from a JSON file
    const resumeData = JSON.parse(fs.readFileSync(resumeFilePath, 'utf8'));

    // Insert resume data into MongoDB
    const result = await collection.updateOne(
      {}, 
      { $set: resumeData }, 
      { upsert: true }
    );
    console.log('Upserted resume data with result:', result);
  } catch (error) {
    console.error('Error migrating resume data:', error);
  } finally {
    await client.close();
  }
}

run();
