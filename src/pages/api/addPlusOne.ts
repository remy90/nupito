import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { withSentry } from '@sentry/nextjs';

const client = new MongoClient(process.env.MONGODB_URI!);

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  await client.connect();
  const database = client.db('shaun-charlotte');
  const guests = database.collection('guests');

  const result = await guests.insertOne({ ...req.body });

  if (!result.acknowledged || !result.insertedId) {
    return res.status(500).json({error: `plus one may not be persisted, \n ${JSON.stringify(req.body)}`});
  } else {
    return res.status(200).json({ status: 'OK' });
  }
};
export default (handler);
