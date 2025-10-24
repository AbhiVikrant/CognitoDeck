const inputBox = document.getElementById('text');
        const paraBox = document.querySelector('.typing-text p');
        const timeBox = document.querySelector('.time span b');
        const mistakeBox = document.querySelector('.mistake span b');
        const wpmBox = document.querySelector('.wpm span b');
        const cpmBox = document.querySelector('.cpm span b');
        const completionMsg = document.getElementById('completionMsg');

        const paragraphs = [
            "This is the first paragraph, a concise statement designed for single-line display in a typing text application.",
            "The second paragraph provides additional content, ensuring it remains brief enough to fit within a designated line.",
            "Paragraph three continues the sequence, delivering information without exceeding the single-line constraint.",
            "Here is the fourth paragraph, structured to be presented as a distinct, self-contained unit of text.",
            "The fifth paragraph offers more text, carefully crafted to adhere to the one-line display requirement.",
            "Paragraph six maintains the pattern, providing another segment of information for the typing interface.",
            "This seventh paragraph presents its message clearly and efficiently, suitable for a single-line presentation.",
            "The eighth paragraph adds to the collection, ensuring each entry serves its purpose within the array.",
            "Paragraph nine delivers its content, formatted specifically for efficient single-line rendering.",
            "Finally, the tenth paragraph concludes this array of text, ready for sequential display in a typing application."
        ];

        function loadParagraph() {
            paraBox.innerHTML = '';
            completionMsg.classList.remove('show');
            
            const randomIndex = Math.floor(Math.random() * paragraphs.length);
            
            for (const char of paragraphs[randomIndex]) {
                paraBox.innerHTML += `<span>${char}</span>`;
            }
            
            const spans = paraBox.querySelectorAll('span');
            if (spans.length > 0) {
                spans[0].classList.add('active');
            }
        }

        let timer;
        let maxTime = 60;
        let leftTime = maxTime;
        let charIndex = 0;
        let mistake = 0;
        let isTyping = false;

        function userIsTyping() {
            const charSelected = paraBox.querySelectorAll('span');
            const typedChar = inputBox.value.charAt(charIndex);
            
            if (charIndex < charSelected.length && leftTime > 0) {
                if (!isTyping) {
                    timer = setInterval(initTime, 1000);
                    isTyping = true;
                }
                
                // Check if typed character matches
                if (charSelected[charIndex].innerText === typedChar) {
                    charSelected[charIndex].classList.add('correct');
                } else {
                    mistake++;
                    charSelected[charIndex].classList.add('incorrect');
                }
                
                charIndex++;
                
                // Update mistake count
                mistakeBox.innerText = mistake;
                
                // Update CPM (Characters Per Minute)
                cpmBox.innerText = Math.max(0, charIndex - mistake);
                
                // Remove active class from all spans
                charSelected.forEach(span => span.classList.remove('active'));
                
                // Add active class to next character
                if (charIndex < charSelected.length) {
                    charSelected[charIndex].classList.add('active');
                }
                
                // Check if paragraph is completed
                if (charIndex >= charSelected.length) {
                    clearInterval(timer);
                    inputBox.value = '';
                    inputBox.disabled = true;
                    completionMsg.classList.add('show');
                }
            } else {
                clearInterval(timer);
                inputBox.value = '';
            }
        }

        function initTime() {
            if (leftTime > 0) {
                leftTime--;
                timeBox.innerText = leftTime;
                
                // Calculate WPM (Words Per Minute) - avoid division by zero
                const timeElapsed = maxTime - leftTime;
                let calWPM = 0;
                
                if (timeElapsed > 0) {
                    calWPM = Math.round(((charIndex - mistake) / 5) / timeElapsed * 60);
                }
                
                wpmBox.innerText = Math.max(0, calWPM);
            } else {
                clearInterval(timer);
                inputBox.disabled = true;
                completionMsg.classList.add('show');
            }
        }

        function handleReset() {
            clearInterval(timer);
            leftTime = maxTime;
            charIndex = 0;
            mistake = 0;
            isTyping = false;
            
            // Reset display values
            timeBox.innerText = 60;
            mistakeBox.innerText = 0;
            cpmBox.innerText = 0;
            wpmBox.innerText = 0;
            
            // Clear and enable input
            inputBox.value = '';
            inputBox.disabled = false;
            
            // Load new paragraph
            loadParagraph();
            
            // Focus input
            inputBox.focus();
        }

        // Add input event listener
        inputBox.addEventListener('input', userIsTyping);

        // Focus input on any keydown
        document.addEventListener('keydown', () => {
            inputBox.focus();
        });

        // Initialize on load
        loadParagraph();
        inputBox.focus();