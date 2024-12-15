let tabs = document.querySelector('.tab')
let hamburger = document.querySelector('#hamburger')
let DropDown = document.querySelector('#clicker')
let profile = document.querySelector('.profile')
const categories = document.querySelectorAll('.categories li');
const coursePadContainer = document.querySelector('.course-pad-container');
const slider = document.querySelector('.slider');

hamburger.addEventListener('click', () => {
    tabs.classList.toggle('display');
    hamburger.classList.toggle('rotate');
    hamburger.classList.toggle('rotate2');
})

DropDown.addEventListener('click', () => {
    // Toggle the display style directly
  if (profile.style.display === 'none' || profile.style.display === '') {
   profile.style.setProperty('display', 'flex', 'important'); 
  } else {
    profile.style.setProperty('display', 'none', 'important');
  }
});


//SLIDER FUNCTION
function moveSlider(activeCategory) {
  const categoryRect = activeCategory.getBoundingClientRect();
  const parentRect = activeCategory.parentElement.getBoundingClientRect();

  slider.style.width = `${categoryRect.width}px`; 
  slider.style.left = `${categoryRect.left - parentRect.left}px`;
}

// Initialize the slider position
document.addEventListener('DOMContentLoaded', () => {
  const activeCategory = document.querySelector('.categories li.active');
  if (activeCategory) {
    moveSlider(activeCategory);
  }
});


categories.forEach(category => {
  category.addEventListener('click', function () {
      categories.forEach(cat => cat.classList.remove('active'));

      this.classList.add('active');
      moveSlider(this);

      const selectedCategory = this.getAttribute('data-category');
      coursePadContainer.innerHTML = courseData[selectedCategory] || '<p>No courses available for this category.</p>';
    });
});