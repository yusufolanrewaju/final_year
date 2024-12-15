async function fetchCourses() {
    try {
      const response = await fetch("/api/courses");
      const courses = await response.json();
  
      const container = document.getElementById("course-pad-container");
  
      courses.forEach((course) => {
        const totalHours = Math.floor(course.totalDuration / 60);
        const totalMinutes = course.totalDuration % 60;
  
        container.innerHTML += `
          <div class="course-pad">
            <img src="/${course.thumbnail}" class="course-image"> <!-- Thumbnail -->
            <div class="course-details">
              <p class="category">${course.category}</p>
              <h3 class="course-title">${course.title}</h3>
              <p class="course-description">${course.description}</p>
              <div class="content-desc">
                <li class="modules">
                  <p><i class='bx bxs-data'></i> <span class="counter">${course.modules.length}</span> Modules</p>
                  <p><i class='bx bxs-time-five'></i> <span class="hour">${totalHours}</span> hr <span class="mins">${totalMinutes}</span> min</p>
                </li>
                <li class="price">
                  <span class="bold">Total Cost</span> <i class='bx bxl-bitcoin'></i> 
                  <span><span class="cost">${course.price === 0 ? "Free" : course.price}</span> <small>points</small></span>
                </li>
              </div>
            </div>
          </div>
        `;
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }
  
  fetchCourses();
  