import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
export const getGuestData = async (id: string) => {
  await client.connect();
  const database = client.db('shaun-charlotte');
  const guests = database.collection('guests');
  const result = await guests.findOne({ id });

  return result;
};
