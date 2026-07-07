import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const r2Client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT || "",
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
});
/**
 * Uploads a buffer (e.g., converted WebP image) to Cloudflare R2
 * and returns its public access URL.
 *
 * @param filePath The destination path within the bucket (e.g., 'IG_Images/file.webp')
 * @param buffer The file content buffer
 * @param contentType The MIME content type of the file (e.g., 'image/webp')
 */
export async function uploadToR2(filePath, buffer, contentType) {
    const bucketName = process.env.R2_BUCKET_NAME || "sup69";
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: filePath,
        Body: buffer,
        ContentType: contentType,
    });
    await r2Client.send(command);
    // Construct the public URL.
    // Example base URL: https://894df2ee46e1279e8499573d3c22949b.r2.cloudflarestorage.com/sup69
    // Resulting URL: https://894df2ee46e1279e8499573d3c22949b.r2.cloudflarestorage.com/sup69/IG_Images/file.webp
    const publicUrlBase = process.env.R2_PUBLIC_URL || `https://${process.env.R2_ENDPOINT}/${bucketName}`;
    const cleanBase = publicUrlBase.replace(/\/$/, ""); // Remove trailing slash if any
    const cleanPath = filePath.replace(/^\//, ""); // Remove leading slash if any
    return `${cleanBase}/${cleanPath}`;
}
