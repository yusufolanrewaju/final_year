const { PDFDocument } = require('pdf-lib');

async function createPDF(userData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  page.drawText(`Profile Report`, { x: 50, y: 750 });
  page.drawText(`Username: ${userData.username}`, { x: 50, y: 700 });
  page.drawText(`Games Played: ${userData.gamesPlayed}`, { x: 50, y: 650 });
  page.drawText(`Courses Completed: ${userData.coursesCompleted}`, { x: 50, y: 600 });
  page.drawText(`Total Points: ${userData.totalPoints}`, { x: 50, y: 550 });

  return pdfDoc.save();
}

module.exports = { createPDF };
