document.addEventListener("DOMContentLoaded", function() {
    const terminalOutput = document.getElementById("terminal-output");
    const terminalInput = document.getElementById("terminal-input");

    // Store the intro text as a variable
    const introText = ` 
 ________                                          .__           
 \\______ \\   ____  ____ ___________    ____   _____|  |__  __ __ 
  |    |  \\_/ __ \\/ __ \\\\____ \\__  \\  /    \\ /  ___/  |  \\|  |  \\
  |    \`   \\  ___|  ___/|  |_> > __ \\|   |  \\\\___ \\|   Y  \\  |  /
 /_______  /\\___  >___  >   __(____  /___|  /____  >___|  /____/ 
         \\/     \\/    \\/|__|       \\/     \\/     \\/     \\/       
> Hello, I'm Deepanshu
# I am a Devops Engineer
I am a dependable person who is great at time management. I love working in technically challenging environments
and serving to the best of my abilities, contributing towards the growth of the organisation as well as my own growth
as an individual in all aspects.

Take some time to explore this terminal website made by me. You can list the pages by typing ls. Tab Completion also works and you can also use clear command
`;

    let introTyped = false; // To check if intro has been typed

    // Type the intro if it's not typed already
    function typeIntro(text, index = 0) {
        if (index < text.length) {
            terminalOutput.innerHTML += text.charAt(index);
            setTimeout(() => typeIntro(text, index + 1), 15); // Adjust typing speed here
        } else {
            introTyped = true; // Mark the intro as typed
            terminalOutput.innerHTML += '\n'; // New line after intro
            terminalInput.focus(); // Focus on the input after typing
        }
    }

    // Load the intro when the page first loads with typing effect
    if (!introTyped) {
        typeIntro(introText);
    }

    // Handle terminal input commands
    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === 'Enter') {
            const input = terminalInput.value.trim();
            terminalOutput.innerHTML += `\n> ${input}`; // Echo the command

            if (input === 'ls') {
                terminalOutput.innerHTML += "\nProjects\nSkills\nExperience\nContact\n";
            } else if (input.startsWith('cat ')) {
                const topic = input.split(' ')[1];
                if (topic === 'Projects') {
                    terminalOutput.innerHTML += "\n- WebAutomation.io\n- Solana Labs\n- BlueSpice MediaWiki\n";
                } else if (topic === 'Skills') {
                    terminalOutput.innerHTML += "\n* Terraform\n* Ansible\n";
                } else if (topic === 'Experience') {
                    terminalOutput.innerHTML += "\n# 4+ years in Full Stack and Data Engineering roles\n";
                } else if (topic === 'Contact') {
                    terminalOutput.innerHTML += "\n# Email: youremail@example.com\n# LinkedIn: linkedin.com/in/yourprofile\n";
                } else {
                    terminalOutput.innerHTML += `\nUnknown topic: ${topic}\n`;
                }
            } else if (input.startsWith('vim ')) {
                const topic = input.split(' ')[1];
                loadPage(topic);
            } else if (input === '//') {
                displayHelpMenu();
            } else if (input === 'clear') {
                clearTerminal();
            } else {
                terminalOutput.innerHTML += `\nUnknown command: ${input}\n`;
            }

            terminalInput.value = ''; // Clear input field
            terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto scroll to bottom
        }

        // Clear terminal on Ctrl + L
        if (event.ctrlKey && event.key === 'l') {
            event.preventDefault(); // Prevent default Ctrl + L behavior
            clearTerminal();
        }
    });

    // Display the help menu
    function displayHelpMenu() {
        terminalOutput.innerHTML += `\nHELP MENU\n`;
        terminalOutput.innerHTML += `\nNavigation Commands:\n`;
        terminalOutput.innerHTML += `ls                 - List all available pages\n`;
        terminalOutput.innerHTML += `cat <page>         - View summary of a page (e.g. 'cat Projects')\n`;
        terminalOutput.innerHTML += `vim <page>         - Open detailed view of a page (e.g. 'vim Projects')\n`;
        terminalOutput.innerHTML += `clear              - Clear the terminal\n`;
        terminalOutput.innerHTML += `Ctrl + L           - Clear the terminal\n`;
        terminalOutput.innerHTML += `//                 - Show this help menu\n`;
    }

    // Load content dynamically into the terminal
    function loadPage(topic) {
        const pageMap = {
            'Projects': 'projects.html',
            'Skills': 'skills.html',
            'Experience': 'experience.html',
            'Contact': 'contact.html'
        };

        if (pageMap[topic]) {
            fetch(pageMap[topic])
                .then(response => response.text())
                .then(data => {
                    terminalOutput.innerHTML = data;
                    terminalInput.style.display = 'none'; // Hide input in the detailed page
                })
                .catch(err => {
                    terminalOutput.innerHTML += `\nError loading page: ${topic}\n`;
                });
        } else {
            terminalOutput.innerHTML += `\nUnknown page: ${topic}\n`;
        }
    }

    // Restore terminal with full intro without typing effect
    function backToTerminal() {
        terminalOutput.innerHTML = introText; // Show the intro directly without typing effect
        terminalInput.style.display = 'block'; // Show input
        terminalInput.focus(); // Focus on input
    }

    // Clear terminal and restore intro without typing effect
    function clearTerminal() {
        terminalOutput.innerHTML = introText; // Reset terminal to show only the intro text without typing
        terminalInput.value = ''; // Clear input field
        terminalInput.focus(); // Re-focus on input
    }

    // Tab completion for `cat` and `vim` commands
    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === 'Tab') {
            event.preventDefault(); // Prevent the default tab behavior
            const input = terminalInput.value.trim();
            if (input.startsWith('cat ') || input.startsWith('vim ')) {
                const options = ['Projects', 'Skills', 'Experience', 'Contact'];
                const lastWord = input.split(' ').pop();
                const matches = options.filter(option => option.startsWith(lastWord));
                if (matches.length > 0) {
                    terminalInput.value = input.replace(lastWord, matches[0]);
                }
            }
        }
    });

    // Add a listener for "Back to Terminal" button
    document.body.addEventListener('click', function(event) {
        if (event.target.tagName === 'A' && event.target.innerText === 'Back to Terminal') {
            event.preventDefault(); // Prevent default navigation
            backToTerminal(); // Restore terminal
        }
    });
});
