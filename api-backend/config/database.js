const { create } = require('ipfs-http-client');

const ipfs = create({
  host: 'infura-ipfs.io', // Replace with your IPFS provider or node
  port: 5001,
  protocol: 'https',
});

module.exports = ipfs;
