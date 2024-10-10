document.addEventListener("DOMContentLoaded", function() {
    const textArray = [
        "> Hello, I'm Deepanshu",
        "# Full Stack Developer | Data Engineer",
        "> Projects",
        "# Project 1 - Description...",
        "# Project 2 - Description...",
        "> Skills",
        "* Terraform",
        "* Ansible",
        "> Contact",
        "# Email: youremail@example.com",
        "# LinkedIn: linkedin.com/in/yourprofile"
    ];

    let textPosition = 0;
    let arrayIndex = 0;
    const speed = 50;  // typing speed in milliseconds

    const typingTextElement = document.getElementById('typing-text');
    const cursorElement = document.getElementById('cursor');

    function type() {
        if (arrayIndex < textArray.length) {
            if (textPosition < textArray[arrayIndex].length) {
                const currentChar = textArray[arrayIndex].charAt(textPosition);
                typingTextElement.innerHTML += currentChar;
                textPosition++;
                setTimeout(type, speed);
            } else {
                const currentLine = textArray[arrayIndex];
                if (currentLine.startsWith('>')) {
                    typingTextElement.innerHTML = `<span class="command">${typingTextElement.innerHTML}</span>\n`; // Add 'command' class
                } else if (currentLine.startsWith('#')) {
                    typingTextElement.innerHTML = `<span class="comment">${typingTextElement.innerHTML}</span>\n`; // Add 'comment' class
                } else if (currentLine.startsWith('*')) {
                    typingTextElement.innerHTML = `<span class="skill">${typingTextElement.innerHTML}</span>\n`; // Add 'skill' class for lines starting with '*'
                } else {
                    typingTextElement.innerHTML += '\n'; // For other lines, just move to the next line
                }
                arrayIndex++;
                textPosition = 0;
                setTimeout(type, 500);  // Pause between lines
            }
        } else {
            cursorElement.style.animation = 'blink 1s infinite';  // Enable cursor blinking after typing finishes
        }
    }

    type();  // Start typing effect
});
