import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const dbName = "Portfolio"; // Replace with your actual database name
  const collectionName = "posts"; // Replace with your collection name

  if (process.env.NODE_ENV === "development") {
    try {
      const client = await clientPromise;
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      if (req.method === "POST") {
        // Handle POST request: insert or update portfolio data
        const { body } = req;

        // You might want to add some validation here
        const result = await collection.updateOne(
          { _id: "portfolioData" }, // You can use a specific identifier or schema for portfolio data
          { $set: body },
          { upsert: true } // Create the document if it does not exist
        );

        res.status(200).json({ status: "SUCCESS", result });
      } else {
        res.status(405).json({ error: "Method Not Allowed" });
      }
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(200).json({ name: "This route works in development mode only" });
  }
}
