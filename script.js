document.addEventListener("DOMContentLoaded", function() {
    const terminalOutput = document.getElementById("terminal-output");
    const terminalInput = document.getElementById("terminal-input");

    // Initialize the intro with a typing effect
    const intro = ` 
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
    typeIntro(intro);

    function typeIntro(text, index = 0) {
        if (index < text.length) {
            terminalOutput.innerHTML += text.charAt(index);
            setTimeout(() => typeIntro(text, index + 1), 15); // Adjust typing speed
        } else {
            terminalOutput.innerHTML += '\n'; // New line after intro
            terminalInput.focus(); // Focus on the input
        }
    }

    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === 'Enter') {
            const input = terminalInput.value.trim();
            terminalOutput.innerHTML += `\n> ${input}`; // Echo the command

            if (input === 'ls') {
                terminalOutput.innerHTML += "\nProjects\nSkills\nExperience\nContact\n";
            } else if (input.startsWith('cat ')) {
                const topic = input.split(' ')[1];
                if (topic === 'Projects') {
                    terminalOutput.innerHTML += "\nProject 1 - WebAutomation.io: The project consisted of many complex responsibilities which included setting up the Linux and Windows servers in the cloud. This included creating the necessary instances, configuring the necessary security settings, and installing the necessary packages. Configuring the autoscaling solution involved setting up the necessary triggers, rules, and policies for the autoscaling solution. Deploying the necessary services involved deploying the web server, database server, and other backend services that were necessary for the application. Configuring the necessary monitoring tools included setting up the necessary metrics, alarms, and notifications for the system. Running tests and validating the system included testing the system for performance, scalability, and other parameters. Implementing the necessary optimizations involved optimizing the system for better performance and scalability. Troubleshooting and resolving any issues included troubleshooting and resolving any issues that arose during the implementation.\n\nProject 2 - Solana Labs: This project focused on building decentralized applications (dApps) on the Solana blockchain. The responsibilities included setting up a Solana validator node, participating in the network consensus, and deploying smart contracts. The project aimed to leverage Solana's high throughput and low transaction fees to create scalable solutions for various industries. Additionally, the implementation of security audits and performance optimization techniques was crucial to ensure the integrity and efficiency of the deployed applications.\n";
                } else if (topic === 'Skills') {
                    terminalOutput.innerHTML += "\n* Terraform\n* Ansible\n";
                } else if (topic === 'Experience') {
                    terminalOutput.innerHTML += "\n# 4+ years in Full Stack and Data Engineering roles\n";
                } else if (topic === 'Contact') {
                    terminalOutput.innerHTML += "\n# Email: youremail@example.com\n# LinkedIn: linkedin.com/in/yourprofile\n";
                } else {
                    terminalOutput.innerHTML += `\nUnknown topic: ${topic}\n`;
                }
            } else if (input === 'clear') {
                clearTerminal();
            } else {
                terminalOutput.innerHTML += `\nUnknown command: ${input}\n`;
            }

            terminalInput.value = ''; // Clear input field
            terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto scroll to bottom
        }
    });

    function clearTerminal() {
        const introLines = 6; // Adjust this number if you change the intro
        terminalOutput.innerHTML = terminalOutput.innerHTML.split('\n').slice(0, introLines).join('\n'); // Keep intro
        terminalInput.value = ''; // Clear input field
    }

    // Tab completion for `cat` command
    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === 'Tab') {
            event.preventDefault(); // Prevent the default tab behavior
            const input = terminalInput.value.trim();
            if (input.startsWith('cat ')) {
                const options = ['Projects', 'Skills', 'Experience', 'Contact'];
                const lastWord = input.split(' ').pop();
                const matches = options.filter(option => option.startsWith(lastWord));
                if (matches.length > 0) {
                    terminalInput.value = input.replace(lastWord, matches[0]);
                }
            }
        }
    });
});
