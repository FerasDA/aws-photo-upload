require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client();

exports.handler = async (event) => {
  const bucketName = process.env.S3_BUCKET_NAME;
  const files = JSON.parse(event.body).files;

  try {
    const uploadPromises = files.map((file) => {
      const params = {
        Bucket: bucketName,
        Key: file.filename,
        Body: Buffer.from(file.content, "base64"),
        ContentType: file.contentType,
      };
      const command = new PutObjectCommand(params);
      return s3.send(command);
    });

    const results = await Promise.all(uploadPromises);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Files uploaded successfully",
        files: results.map((result) => result.Location),
      }),
    };
  } catch (error) {
    console.error("Error uploading files:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error uploading files" }),
    };
  }
};
