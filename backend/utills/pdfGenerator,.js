const fs = require('fs');
const { createPDF } = require('./pdfHelper');

async function generateProfilePDF(userData) {
  const pdfBytes = await createPDF(userData);
  const filename = `${userData.username}_profile.pdf`;
  fs.writeFileSync(filename, pdfBytes);
  console.log(`PDF saved as ${filename}`);
}

module.exports = { generateProfilePDF };
