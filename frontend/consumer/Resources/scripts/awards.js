import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x3a8734A6aD5dABBee19672A2b95Aa6DC7562e5c8'; 
const ABI = [
  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getUserCertificates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "courseTitle",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "issuedTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "certificateURI",
              "type": "string"
            }
          ],
          "internalType": "struct CertificateManager.Certificate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "courseTitle",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "certificateURI",
          "type": "string"
        }
      ],
      "name": "mintCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
];

async function fetchCertificatesFromBlockchain(walletAddress) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const certificates = await contract.getUserCertificates(walletAddress);

    // Map the certificates to include necessary details
    return certificates.map((cert) => ({
      tokenId: cert.tokenId.toString(),
      courseTitle: cert.courseTitle, 
      issuedDate: new Date(cert.issuedTimestamp * 1000).toLocaleDateString(),
      certificateURI: cert.certificateURI,
    }));
  } catch (error) {
    console.error('Error fetching certificates from blockchain:', error);
    return [];
  }
}

// Call this function when the profile page loads
async function displayAwards(walletAddress) {
  const certificates = await fetchCertificatesFromBlockchain(walletAddress);

  const awardsContainer = document.getElementById('awards-container');
  awardsContainer.innerHTML = ''; // Clear previous content

  if (certificates.length === 0) {
    awardsContainer.innerHTML = '<p>No awards yet.</p>';
    return;
  }

  certificates.forEach((cert) => {
    const certDiv = document.createElement('div');
    certDiv.classList.add('award');

    certDiv.innerHTML = `
      <img src="${cert.certificateURI}" class="award-image">
      <div class="award-title">${cert.courseTitle} <span><br>Completion</span></div>
      <p><span>Cert ID: ${cert.tokenId}</span>
      <span>Issued On: ${cert.issuedDate}</span></p>
    `;

    awardsContainer.appendChild(certDiv);
  });
}

// Retrieve wallet address dynamically
async function getWalletAddress() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return await signer.getAddress();
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const walletAddress = await getWalletAddress();
    await displayAwards(walletAddress);
  } catch (error) {
    console.error('Error fetching wallet address or displaying awards:', error);
  }
});
