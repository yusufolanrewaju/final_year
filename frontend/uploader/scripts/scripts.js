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
                <p><label>File Title:</label>
                <input type="text" class="fileTitle" name="fileTitle[]" required /></p>
                                    
                <p><label>Upload File:</label>
                <input type="file" class="fileInput" name="files[]" required /></p>
            `;
            filesContainer.appendChild(fileEntry);
        }
    });

    // Add more sub-section button
    addSubSectionBtn.addEventListener("click", () => {
        const subSection = document.createElement("div");
        subSection.classList.add("sub-section");

        subSection.innerHTML = `
            <p><label>Sub-section Title:</label>
                <input type="text" class="subSectionTitle" name="subSectionTitle[]" required /></p>
                            
                <div class="files">
                    <div class="file-entry">
                        <p><label>File Title:</label>
                        <input type="text" class="fileTitle" name="fileTitle[]" required /></p>
                                    
                        <p><label>Upload File:</label>
                        <input type="file" class="fileInput" name="files[]" required /></p>
                    </div>
                </div>
                
                <button type="button" class="addFileBtn">Add more files</button>
        `;
        subSectionsContainer.appendChild(subSection);
    });
});
