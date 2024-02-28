import { AwsClient } from "aws4fetch";

const aws = new AwsClient({
  accessKeyId: process.env.R2ACCESSID as string,
  secretAccessKey: process.env.R2SECRETKEY,
});
export default aws;
