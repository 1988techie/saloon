
function previewImage(event, id) {
    const file = event.target.files[0];
    const preview = document.getElementById(`preview${id}`);
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

/**
 * 
 * @param {string} pageId 
 */
function navigatePage(pageId) {
    // Get all menu items inside the left menu
    const menuItems = document.querySelectorAll('.left > div');

    // Loop through each item and reset its background color to blue
    menuItems.forEach(item => {
      if (item.id === pageId) {
        item.style.backgroundColor = 'green';
        item.style.fontWeight = 'bold';
      } else {
        item.style.backgroundColor = '#3383ff';
        item.style.fontWeight = 'normal';
      }
    });
    if(pageId == 'home') {
      renderUploadSection('Upload Your Lead', [
      '', '', '', '', ''  // or initial URLs if you have them
      ]);
    } else if(pageId == 'pending') {
      renderUploadSection('Pending Leads', [
      './images/1.png', './images/1.png', './images/1.png', './images/1.png', './images/1.png'  // or initial URLs if you have them
      ]);
    } else if(pageId == 'rejected') {
      renderUploadSection('Rejected Leads', [
      './images/2.png', './images/2.png', './images/2.png', './images/2.png', './images/2.png'  // or initial URLs if you have them
      ]);
    } else if(pageId == 'approved') {
      renderUploadSection('Approved Leads', [
        './images/3.jpg', './images/3.jpg', './images/3.jpg', './images/3.jpg', './images/3.jpg'  // or initial URLs if you have them

      ]);
    }
    console.log("Navigated to:", pageId);
  }

  /**
     * Renders upload section dynamically.
     * @param {string} headerText - Title text.
     * @param {Array} imageValues - Array of 5 initial image URLs or empty strings.
     */
    function renderUploadSection(headerText, imageValues) {
      const container = document.getElementById('app');
      container.innerHTML = ''; // clear previous content

      // Header
      const header = document.createElement('h1');
      header.textContent = headerText;
      container.appendChild(header);

      // Labels for inputs
      const labels = [
        "Front Side View | ",
        "Customer Side View | ",
        "Cleanliness View | ",
        "AC / Cooler View | ",
        "Entrance View | "
      ];

      for (let i = 0; i < 5; i++) {
        const uploadDiv = document.createElement('div');
        uploadDiv.className = 'upload-container';

        const labelSpan = document.createElement('span');
        labelSpan.textContent = labels[i];
        uploadDiv.appendChild(labelSpan);

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        // Always add onchange
        input.onchange = (event) => previewImage(event, `preview${i+1}`);

        uploadDiv.appendChild(input);

        const img = document.createElement('img');
        img.id = `preview${i+1}`;
        img.alt = 'Preview';

        // If there is an initial image value, show it
        if (imageValues[i]) {
          img.src = imageValues[i];
          img.style.display = 'inline';
        }

        uploadDiv.appendChild(img);
        container.appendChild(uploadDiv);
      }

      // Submit button
      const btn = document.createElement('button');
      btn.textContent = 'Submit Lead';
      container.appendChild(btn);
    }