import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  await client.connect();
  const database = client.db('shaun-charlotte');
  const guests = database.collection('guests');

  const result = await guests.findOneAndUpdate({ id: req.body?.id }, {
    $set:{
      ...req.body
    }
  });

  if (!result.lastErrorObject?.updatedExisting || !result.value) {
    return res.status(404).json({error: 'guest not found'});
  } else {
    return res.status(200).json({ name: 'Thomas Anderson' });
  }
};
export default (handler);
