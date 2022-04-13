
// https://mongodb.github.io/node-mongodb-native/3.6/tutorials/gridfs/streaming/
// https://docs.mongodb.com/drivers/node/master/fundamentals/gridfs/
import { MongoClient, GridFSBucket } from 'mongodb';
import fs from 'fs';
import assert from 'assert';

const fileDownload = async (filename: string, bucketName: string, outputDirectory: string) => {
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();

  const db = client.db(process.env.MONGODB_DB);
  const bucket = new GridFSBucket(db, { bucketName });
    
  return new Promise<void>(resolve => {
    bucket.openDownloadStreamByName(filename)
      .pipe(fs.createWriteStream(outputDirectory))
      .on('error', assert.ifError)
      .on('finish', resolve);
  });
};

export { fileDownload };
