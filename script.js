document.addEventListener("DOMContentLoaded", function () {
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");

    // Line art to be displayed at the top
    const lineArt = `
________                                          .__           
\\______ \\   ____  ____ ___________    ____   _____|  |__  __ __ 
 |    |  \\_/ __ \\/ __ \\\\____ \\__  \\  /    \\ /  ___/  |  \\|  |  \\
 |    \`   \\  ___|  ___/|  |_> > __ \\|   |  \\\\___ \\|   Y  \\  |  /
/_______  /\\___  >___  >   __(____  /___|  /____  >___|  /____/ 
        \\/     \\/    \\/|__|       \\/     \\/     \\/     \\/        
`;

    // Intro content to be typed out with class assignments for color
    const introText = [
        { text: "> Hello, I'm Deepanshu", class: "command" },
        { text: "# Full Stack Developer | Data Engineer", class: "comment" },
        { text: "> Projects", class: "command" },
        { text: "# Project 1 - Description...", class: "comment" },
        { text: "# Project 2 - Description...", class: "comment" },
        { text: "> Skills", class: "command" },
        { text: "* Terraform", class: "skill" },
        { text: "* Ansible", class: "skill" },
        { text: "> Contact", class: "command" },
        { text: "# Email: youremail@example.com", class: "comment" },
        { text: "# LinkedIn: linkedin.com/in/yourprofile", class: "comment" }
    ];

    let currentLine = 0;
    let currentChar = 0;
    const typingSpeed = 50; // Adjust typing speed

    // Typing effect for the line art and intro text
    function typeLineArt() {
        terminalOutput.innerHTML += `<pre>${lineArt}</pre>`;
        setTimeout(typeIntroText, typingSpeed);
    }

    function typeIntroText() {
        if (currentLine < introText.length) {
            const lineObj = introText[currentLine];
            const lineText = lineObj.text;
            const lineClass = lineObj.class;

            if (currentChar < lineText.length) {
                const currentCharHTML = lineText.charAt(currentChar);

                if (currentChar === 0) {
                    terminalOutput.innerHTML += `<span class="${lineClass}">`;
                }

                terminalOutput.innerHTML += currentCharHTML;
                currentChar++;
                setTimeout(typeIntroText, typingSpeed); // Recursive typing effect
            } else {
                terminalOutput.innerHTML += "</span><br>"; // Close the span after the line is done
                currentChar = 0; // Reset character index for the next line
                currentLine++; // Move to the next line
                setTimeout(typeIntroText, typingSpeed); // Continue to the next line
            }
        }
    }

    // Start typing line art first, then intro
    typeLineArt();

    // Handle user input
    terminalInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const command = terminalInput.value.trim();
            appendCommandToOutput(command);
            processCommand(command);
            terminalInput.value = ""; // Clear input after command is entered
        }
    });

    // Append the typed command to the terminal output
    function appendCommandToOutput(command) {
        const commandLine = `
<span class="path">~/deepanshu_tuli</span><span class="symbol">> ${command}</span>`;
        terminalOutput.innerHTML += commandLine + "<br>";
    }

    // Process the command and append its output
    function processCommand(command) {
        const commands = {
            ls: `
Projects
Skills
Experience
Contact`,
            cat: {
                Projects: "Project 1 - Description...\nProject 2 - Description...",
                Skills: "Skills:\n- Terraform\n- Ansible",
                Experience: "Experience:\n- Job 1\n- Job 2",
                Contact: "Email: youremail@example.com\nLinkedIn: linkedin.com/in/yourprofile",
            }
        };

        if (command === "ls") {
            appendOutput(commands.ls);
        } else if (command.startsWith("cat ")) {
            const item = command.split(" ")[1];
            if (commands.cat[item]) {
                appendOutput(commands.cat[item]);
            } else {
                appendOutput(`cat: ${item}: No such file or directory`);
            }
        } else {
            appendOutput(`command not found: ${command}`);
        }
    }

    // Append command output to terminal
    function appendOutput(output) {
        terminalOutput.innerHTML += `<span>${output}</span><br><br>`;
        // Scroll terminal output to the bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});
