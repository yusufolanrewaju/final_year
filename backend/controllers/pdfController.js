const { createPDF } = require('./pdfHelper');

async function generateProfilePDF(req, res) {
  const { username, gamesPlayed, coursesCompleted, totalPoints } = req.body;

  try {
    const pdfBytes = await createPDF({ username, gamesPlayed, coursesCompleted, totalPoints });
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);
  } catch (error) {
    res.status(500).json({ message: "Error generating PDF", error });
  }
}

module.exports = { generateProfilePDF };
