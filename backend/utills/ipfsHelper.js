const { create } = require('ipfs-http-client');

// Connect to IPFS using the Infura gateway or your own node
const ipfs = create({
  host: 'infura-ipfs.io', // Replace with your IPFS host if needed
  port: 5001,
  protocol: 'https',
});

// Upload a file to IPFS
async function uploadFile(buffer) {
  try {
    const result = await ipfs.add(buffer);
    return result.path; // Return the CID of the uploaded file
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw new Error('Failed to upload file to IPFS');
  }
}

// Retrieve a file from IPFS
async function getFile(cid) {
  try {
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks); // Return the file as a buffer
  } catch (error) {
    console.error('Error retrieving file from IPFS:', error);
    throw new Error('Failed to retrieve file from IPFS');
  }
}

module.exports = {
  uploadFile,
  getFile,
};
