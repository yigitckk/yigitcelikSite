import clientPromise from '/lib/mongodb.js';

export default async function handler(req, res) {
  try {
    // Await the connection to the MongoDB client
    const client = await clientPromise;

    // Specify your MongoDB database name
    const db = client.db('Portfolio'); // Replace with your actual database name
    
    // Specify your MongoDB collection name
    const collection = db.collection('resume'); // Replace with your actual collection name

    if (req.method === 'GET') {
      // Fetch resume data from the collection
      const resumeData = await collection.findOne({});
      
      if (resumeData) {
        res.status(200).json(resumeData); // Return the resume data if found
      } else {
        res.status(404).json({ error: 'Resume not found' }); // Return a 404 error if no data found
      }
    } else {
      // Handle unsupported HTTP methods
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching resume data:', error);

    // Return a 500 Internal Server Error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
