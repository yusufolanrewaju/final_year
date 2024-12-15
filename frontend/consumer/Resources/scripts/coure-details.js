document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".categories li");
    const mainDivs = document.querySelectorAll(".main > div:not(.categories)"); 
    const specialPart = document.querySelector('.course-pad');
    let accordion = document.querySelector('p.accordion');
    const container = document.querySelector('.modules-container');


    const initializePage = () => {
        categories.forEach((category) => {
          if (category.classList.contains("active")) {
            const categoryToShow = category.getAttribute("data-category");
    
            mainDivs.forEach((div) => {
              if (div.classList.contains(categoryToShow)) {
                div.style.display = "block";
              } else {
                div.style.display = "none";
              }
            });
    
            // if (categoryToShow === "description") {
            //   specialPart.style.display = "block";
            // } else {
            //   specialPart.style.display = "none";
            // }
          }
        }
      );
    };
    
      initializePage();


    categories.forEach((category) => {
        category.addEventListener("click", () => {
            
            categories.forEach((cat) => cat.classList.remove("active"));
            
            category.classList.add("active");

            const categoryToShow = category.getAttribute("data-category");


            mainDivs.forEach((div) => {
                if (div.classList.contains(categoryToShow)) {
                    div.style.display = "block"; 
                } else {
                    div.style.display = "none"; 
                }
            });

            if (categoryToShow === "description") {
                specialPart.style.display = "block";
            } else {
                specialPart.style.display = "none"; 
            }

        });
    });

    // document.querySelector(".categories li.active").click();

});



const container = document.querySelectorAll('.sub-section p');

container.forEach(subSection => {
  subSection.addEventListener('click', function () {
    const modulesContainer = this.closest('.sub-section').querySelector('.modules-container');
const chevron = this.querySelector('.bx-chevron-down');
    
    if (modulesContainer.classList.contains('shrink')) {
      
      modulesContainer.style.height = modulesContainer.scrollHeight + 'px'; 
      modulesContainer.classList.remove('shrink');
      chevron.classList.remove('normal');
      chevron.classList.add('accordion');
    } else {
      modulesContainer.style.height = modulesContainer.scrollHeight + 'px'; 
      setTimeout(() => {
        modulesContainer.style.height = '0'; 
      }, 0); 
      modulesContainer.classList.add('shrink');
      chevron.classList.remove('accordion');
      chevron.classList.add('normal');
    }
  });
});
