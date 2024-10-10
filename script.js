document.addEventListener("DOMContentLoaded", function() {
    const terminalOutput = document.getElementById("terminal-output");
    const terminalInput = document.getElementById("terminal-input");

    // Store the intro text as a variable
    const introText = ` 
 
▗▄▄▄ ▗▄▄▄▖▗▄▄▄▖▗▄▄▖  ▗▄▖ ▗▖  ▗▖ ▗▄▄▖▗▖ ▗▖▗▖ ▗▖    ▗▄▄▄▖▗▖ ▗▖▗▖   ▗▄▄▄▖
▐▌  █▐▌   ▐▌   ▐▌ ▐▌▐▌ ▐▌▐▛▚▖▐▌▐▌   ▐▌ ▐▌▐▌ ▐▌      █  ▐▌ ▐▌▐▌     █  
▐▌  █▐▛▀▀▘▐▛▀▀▘▐▛▀▘ ▐▛▀▜▌▐▌ ▝▜▌ ▝▀▚▖▐▛▀▜▌▐▌ ▐▌      █  ▐▌ ▐▌▐▌     █  
▐▙▄▄▀▐▙▄▄▖▐▙▄▄▖▐▌   ▐▌ ▐▌▐▌  ▐▌▗▄▄▞▘▐▌ ▐▌▝▚▄▞▘      █  ▝▚▄▞▘▐▙▄▄▖▗▄█▄▖
                                                                      
                                                                      
                                                                      
       
> Hello, I'm Deepanshu
# I am a Devops Engineer
I am a dependable person who is great at time management. I love working in technically challenging environments
and serving to the best of my abilities, contributing towards the growth of the organisation as well as my own growth
as an individual in all aspects.

Take some time to explore this terminal website made by me. You can list the pages by typing ls. Tab Completion also works and you can also use clear command
`;

    let introTyped = false;

    function typeIntro(text, index = 0) {
        if (index < text.length) {
            terminalOutput.innerHTML += text.charAt(index);
            setTimeout(() => typeIntro(text, index + 1), 15); // Adjust typing speed here
        } else {
            introTyped = true;
            terminalOutput.innerHTML += '\n'; // New line after intro
            terminalInput.focus(); // Focus on the input after typing
        }
    }

    if (!introTyped) {
        typeIntro(introText);
    }

    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === 'Enter') {
            const input = terminalInput.value.trim();
            terminalOutput.innerHTML += `\n> ${input}`; // Echo the command

            if (input === 'ls') {
                terminalOutput.innerHTML += "\nProjects\nSkills\nExperience\nContact\nResume\n";
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
                } else if (topic === 'Resume') {
                    terminalOutput.innerHTML += "\nType vim Resume to view Resume\n";
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

        if (event.ctrlKey && event.key === 'l') {
            event.preventDefault(); // Prevent default Ctrl + L behavior
            clearTerminal();
        }
    });

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

    function loadPage(topic) {
        const pageMap = {
            'Projects': 'projects.html',
            'Skills': 'skills.html',
            'Experience': 'experience.html',
            'Contact': 'contact.html',
            'Resume': 'resume.pdf'
        };

        if (pageMap[topic]) {
            if (topic === 'Resume') {
                terminalOutput.innerHTML = `<iframe src="resume.pdf" width="100%" height="600px"></iframe>`; // Load PDF in an iframe
            } else {
                fetch(pageMap[topic])
                    .then(response => response.text())
                    .then(data => {
                        terminalOutput.innerHTML = data;
                        terminalInput.style.display = 'none'; // Hide input in the detailed page
                    })
                    .catch(err => {
                        terminalOutput.innerHTML += `\nError loading page: ${topic}\n`;
                    });
            }
        } else {
            terminalOutput.innerHTML += `\nUnknown page: ${topic}\n`;
        }
    }

    function backToTerminal() {
        terminalOutput.innerHTML = introText;
        terminalInput.style.display = 'block';
        terminalInput.focus();
    }

    function clearTerminal() {
        terminalOutput.innerHTML = introText;
        terminalInput.value = '';
        terminalInput.focus();
    }

    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === 'Tab') {
            event.preventDefault(); 
            const input = terminalInput.value.trim();
            if (input.startsWith('cat ') || input.startsWith('vim ')) {
                const options = ['Projects', 'Skills', 'Experience', 'Contact', 'Resume'];
                const lastWord = input.split(' ').pop();
                const matches = options.filter(option => option.startsWith(lastWord));
                if (matches.length > 0) {
                    terminalInput.value = input.replace(lastWord, matches[0]);
                }
            }
        }
    });

    document.body.addEventListener('click', function(event) {
        if (event.target.tagName === 'A' && event.target.innerText === 'Back to Terminal') {
            event.preventDefault();
            backToTerminal();
        }
    });
});
