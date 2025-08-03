const titleText = "Hello, I'm Abhishek Kumar Vikrant 👋";
    const paraText = "I’m a passionate developer with skills in React, JavaScript, HTML, and CSS. \nI love building engaging web experiences, learning new technologies, and solving real-world problems through code.";

    const titleEl = document.getElementById('typingTitle');
    const paraEl = document.getElementById('typingPara');
    const exploreSection = document.getElementById('exploreSection');

    let titleIndex = 0;
    let paraIndex = 0;

    // Typing effect for title
    function typeTitle() {
      if (titleIndex < titleText.length) {
        titleEl.textContent += titleText.charAt(titleIndex);
        titleIndex++;
        setTimeout(typeTitle, 80);
      } else {
        titleEl.style.borderRight = 'none';
        setTimeout(typeParagraph, 500); // Delay before paragraph starts
      }
    }

    // Typing effect for paragraph
    function typeParagraph() {
      if (paraIndex < paraText.length) {
        paraEl.textContent += paraText.charAt(paraIndex);
        paraIndex++;
        setTimeout(typeParagraph, 30);
      } else {
        setTimeout(() => {
          exploreSection.classList.add('visible');
        }, 300); // Reveal after typing done
      }
    }

    typeTitle();

    // Dropdown logic
    document.getElementById('linkSelect').addEventListener('change', function () {
      const url = this.value;
      if (url) {
        window.open(url, '_blank');
        this.selectedIndex = 0;
      }
    });
 