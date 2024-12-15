const { smartContract: certificateContract } = require('../config/blockchain');

exports.getUserCertificates = async (req, res) => {
  const { walletAddress } = req.body;

  try {
    const tokenIds = await certificateContract.methods.getCertificates(walletAddress).call();
    const certificates = await Promise.all(
      tokenIds.map(async (tokenId) => {
        const certificateURI = await certificateContract.methods.getCertificateData(tokenId).call();
        return { tokenId, certificateURI };
      })
    );

    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates', error });
  }
};
