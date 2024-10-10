function typeWriter(text, element, delay = 50, callback) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, delay);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// The line art
const lineArt = `
________                                          .__           
\\______ \\   ____  ____ ___________    ____   _____|  |__  __ __ 
 |    |  \\_/ __ \\/ __ \\\\____ \\__  \\  /    \\ /  ___/  |  \\|  |  \\
 |    \`   \\  ___|  ___/|  |_> > __ \\|   |  \\\\___ \\|   Y  \\  |  /
/_______  /\\___  >___  >   __(____  /___|  /____  >___|  /____/ 
        \\/     \\/    \\/|__|       \\/     \\/     \\/     \\/       
`;

const introText = `
> Hello, I'm Deepanshu
# Devops Engineer
> Projects
# Project 1 - Description...
# Project 2 - Description...
> Skills
* Terraform
* Ansible
> Contact
# Email: youremail@example.com
# Type ls to Navigate and cat to view the page, tab completion also works
`;

const availableCommands = ['Projects', 'Skills', 'Experience', 'Contact'];

const terminalOutput = document.querySelector("#terminal-output");

// Typing the intro and line art initially
typeWriter(lineArt, terminalOutput, 10, () => {
    typeWriter(introText, terminalOutput, 50);
});

function handleCommand(event) {
    if (event.key === 'Enter') {
        const input = event.target.value.trim();
        if (input === 'ls') {
            terminalOutput.innerHTML += "\nProjects\nSkills\nExperience\nContact\n";
        } else if (input.startsWith('cat ')) {
            const target = input.split(' ')[1];
            if (target === 'Projects') {
                terminalOutput.innerHTML += "\nProject 1 - Description...\nProject 2 - Description...\n";
            }
        } else if (input === 'clear') {
            clearTerminal();
        }
        event.target.value = ''; // Clear input field
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto scroll to bottom
    }
}

function handleTabCompletion(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        const input = event.target.value;
        const matching = availableCommands.find(command => command.startsWith(input.split(' ')[1]));
        if (matching) {
            event.target.value = `cat ${matching}`;
        }
    }
}

function clearTerminal() {
    // Clear everything but keep the intro
    terminalOutput.innerHTML = `${lineArt}${introText}`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Listen for Ctrl + L to trigger the clear action
window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'l') {
        event.preventDefault(); // Prevent the default browser behavior for Ctrl + L
        clearTerminal();
    }
});
