// Dummy data for testing
const dummyCertificates = [
    {
      tokenId: "1",
      courseTitle: "Introduction to HTML",
      issuedDate: "2024-12-01",
      certificateURI: "../../images/awards/rb_12054 2.png",
    },
    {
      tokenId: "2",
      courseTitle: "Advanced CSS Techniques",
      issuedDate: "2024-12-05",
      certificateURI: "../../images/awards/rb_12054 3.png",
    },
    {
      tokenId: "3",
      courseTitle: "JavaScript Fundamentals",
      issuedDate: "2024-12-10",
      certificateURI: "../../images/awards/rb_12054 1.png",
    },
  ];

  async function displayAwards(walletAddress) {
    // Temporarily use dummy data for testing
    const certificates = dummyCertificates; // Replace this with the real function call later
  
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
  
  window.addEventListener('DOMContentLoaded', async () => {
    try {
      const walletAddress = "0x0000000000000000000000000000000000000000"; // Dummy address for testing
      await displayAwards(walletAddress);
    } catch (error) {
      console.error("Error displaying awards:", error);
    }
  });
  