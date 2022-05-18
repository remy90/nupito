import { NextApiResponse, NextApiRequest } from 'next';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
export const getGuest = async (req: NextApiRequest, res: NextApiResponse) => {
  await client.connect();
  const database = client.db('shaun-charlotte');
  const guests = database.collection('guests');
  const result = await guests.findOne({ id: req.body.id });

  if (!result) {
    return res.status(404).json({error: `guest not found, \n ${JSON.stringify(req.body)}`});
  }

  return res.status(200).json({ status: 'OK', ...result });
};
