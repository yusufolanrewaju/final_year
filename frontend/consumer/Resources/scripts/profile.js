const ctx = document.getElementById("myChart").getContext("2d");

const chartConfig = {
  type: "line",
  data: {
    labels: ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // Initial labels
    datasets: [
      {
        label: "Points",
        data: [5, 50, 100, 50, 405, 50,500], // Initial data
        borderColor: "#4c9baf",
        borderWidth: 2,
        fill: true,
        backgroundColor: "rgba(10, 93, 189, 0.1)", // Light fill
        tension: 0.4, // Smooth curve
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const day = tooltipItem.label;
            return `${day}: ${value} Points`;
          },
        },
      },
      legend: {
        display: false, // Hide legend
      },
    },
    elements: {
      point: {
        radius: 0, // Hide circles by default
        hoverRadius: 5, // Show circles on hover
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid lines
        },
      },
      y: {
        display: false, 
        beginAtZero: true, // Start y-axis at 0
      },
    },
  },
};

const myChart = new Chart(ctx, chartConfig);


// Array to hold progress data (fetched from backend eventually)
let progressData = [
    { label: "Web Development", percentage: 80 },
    { label: "Data Science", percentage: 65 },
    { label: "AI", percentage: 45 },
    { label: "Blockchain", percentage: 30 },
    { label: "Cybersecurity", percentage: 10 },
  ];
  
  // Map to retain assigned colors for each progress bar
  const colorMap = new Map();
  
  // Generate a random HEX color
  function generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  // Convert HEX to RGBA with opacity
  function hexToRGBA(hex, opacity) {
    let r = 0, g = 0, b = 0;
  
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
  
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  // Create a single progress bar
  function createProgressBar({ label, percentage }) {
    // Generate or reuse the assigned color
    let color = colorMap.get(label);
    if (!color) {
      color = generateRandomColor();
      colorMap.set(label, color);
    }
  
    // Create the SVG structure
    return `
      <div class="progress-circle">
        <svg width="200" height="200" viewBox="0 0 36 36">
          <!-- Background trail -->
          <circle
            cx="18"
            cy="18"
            r="15.91549431"
            fill="none"
            stroke="${hexToRGBA(color, 0.1)}"
            stroke-width="3"
          ></circle>
          <!-- Foreground progress -->
          <circle
            cx="18"
            cy="18"
            r="15.91549431"
            fill="none"
            stroke="${color}"
            stroke-width="3"
            stroke-dasharray="${(percentage / 100) * 100} 100"
            stroke-linecap="round"
          ></circle>
        </svg>
        <div class="progress-text">
          <p class="percentage">${percentage}%</p>
          <p class="label">${label}</p>
        </div>
      </div>
    `;
  }
  
  // Render progress bars in the container
  function renderProgressBars() {
    const container = document.getElementById("progress-container");
    container.innerHTML = "";
  
    progressData.forEach((data) => {
      container.innerHTML += createProgressBar(data);
    });
  }
  
  // Function to update progress for a specific course
  function updateProgress(courseLabel, newPercentage) {
    const courseIndex = progressData.findIndex((course) => course.label === courseLabel);
  
    if (courseIndex !== -1) {
      // Update progress if the course exists
      progressData[courseIndex].percentage = Math.min(newPercentage, 100);
    } else {
      console.warn(`Course "${courseLabel}" not found.`);
    }
  
    // Remove completed courses
    progressData = progressData.filter((course) => course.percentage < 100);
  
    renderProgressBars();
  }
  
  // Function to add a new course
  function addNewCourse(courseLabel, initialPercentage) {
    // Check if the course already exists
    const courseExists = progressData.some((course) => course.label === courseLabel);
  
    if (!courseExists) {
      // Add the new course
      progressData.push({ label: courseLabel, percentage: initialPercentage });
  
      // If the number of courses exceeds 5, remove the oldest course
      if (progressData.length > 5) {
        progressData.shift(); // Remove the first (oldest) course
      }
  
      renderProgressBars();
    } else {
      console.warn(`Course "${courseLabel}" already exists.`);
    }
  }
  
  renderProgressBars();