document.addEventListener("DOMContentLoaded", () => {
    const subSectionsContainer = document.getElementById("subSections");
    const addSubSectionBtn = document.getElementById("addSubSectionBtn");

    // Add more files button
    subSectionsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("addFileBtn")) {
            const filesContainer = e.target.previousElementSibling;
            const fileEntry = document.createElement("div");
            fileEntry.classList.add("file-entry");

            fileEntry.innerHTML = `
                <label>File Title:</label>
                <input type="text" class="fileTitle" name="fileTitle[]" required />
                
                <label>Upload File:</label>
                <input type="file" class="fileInput" name="files[]" required />
            `;
            filesContainer.appendChild(fileEntry);
        }
    });

    // Add more sub-section button
    addSubSectionBtn.addEventListener("click", () => {
        const subSection = document.createElement("div");
        subSection.classList.add("sub-section");

        subSection.innerHTML = `
            <label>Sub-section Title:</label>
            <input type="text" class="subSectionTitle" name="subSectionTitle[]" required />
            
            <!-- Files under Sub-section -->
            <div class="files">
                <div class="file-entry">
                    <label>File Title:</label>
                    <input type="text" class="fileTitle" name="fileTitle[]" required />
                    
                    <label>Upload File:</label>
                    <input type="file" class="fileInput" name="files[]" required />
                </div>
            </div>

            <!-- Add more files button -->
            <button type="button" class="addFileBtn">Add more files</button>
        `;
        subSectionsContainer.appendChild(subSection);
    });
});
