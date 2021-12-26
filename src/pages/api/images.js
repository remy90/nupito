import { connectToDatabase } from '../../util/mongodb';

const imageFromId = async (req, res) => {
  const { db } = await connectToDatabase();

  const image = await db
    .collection('images')
    .find({});

  res.json(image);
};

export default imageFromId;