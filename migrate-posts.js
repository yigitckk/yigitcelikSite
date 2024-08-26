const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const postsDir = path.join(process.cwd(), '_posts'); // Path to your posts directory

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
    const collection = db.collection('posts'); // Replace with your collection name

    // Read all files in the _posts directory
    const files = fs.readdirSync(postsDir);

    for (const file of files) {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      // Prepare the blog post object
      const blogPost = {
        title: data.title,
        content,
        date: data.date,
        tagline: data.tagline,
        image: data.image,
        createdAt: new Date(),
      };

      // Check if the blog post already exists in MongoDB
      const existingPost = await collection.findOne({ title: blogPost.title });

      if (existingPost) {
        console.log(`Post already exists: ${blogPost.title}`);
      } else {
        // Insert the blog post into MongoDB
        const result = await collection.insertOne(blogPost);
        console.log('Inserted blog post with _id:', result.insertedId);
      }
    }
  } catch (error) {
    console.error('Error migrating posts:', error);
  } finally {
    await client.close();
  }
}

run();
