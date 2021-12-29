
// https://mongodb.github.io/node-mongodb-native/3.6/tutorials/gridfs/streaming/
// https://docs.mongodb.com/drivers/node/master/fundamentals/gridfs/
import { MongoClient, GridFSBucket } from 'mongodb';
import fs from 'fs';
import assert from 'assert';

const fileUpload = (filename: string, bucketName: string, outputDirectory: string) => {
  const client = new MongoClient(process.env.MONGODB_URI!);
  client.connect((err: any) => {
    assert.ifError(err);

    const db = client.db(process.env.MONGODB_DB);
    const bucket = new GridFSBucket(db, { bucketName: bucketName });
    
    bucket.openDownloadStreamByName(filename)
      .pipe(fs.createWriteStream(outputDirectory))
      .on('error', (error) => assert.ifError(error))
      .on('finish', () => {
        console.log('done!');
        process.exit(0);
      });
  });
};
export { fileUpload };
