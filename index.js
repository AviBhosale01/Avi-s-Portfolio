// 
// VS Code / IDE Portfolio Redesign logic
// Handles file tab switching, syntax highlighting, terminal simulation, and neofetch calculations
//

// Start time for Uptime calculation
const START_TIME = Date.now();

// Data representing files in explorer
const FILE_DATA = {
    'README.md': {
        type: 'markdown',
        iconClass: 'markdown-color',
        content: `# Avishkar Pramod Bhosale

Software Development Engineer | B.Tech Information Technology student specializing in Python, full-stack web development, and applied AI/ML projects. 
Strong foundation in data structures, algorithms, and object-oriented programming.
Active track record on LeetCode and Coding Ninjas, and rank Voyager on TryHackMe.

## Core Interests
* AI/ML & Computer Vision
* Software Development (SDE)
* Ethical Hacking & Cybersecurity
* Competitive Programming

## Custom Tag Pills
[SDE] [Python] [AI/ML] [Cybersecurity] [Arch btw!]`
    },
    'skills.json': {
        type: 'json',
        iconClass: 'json-color',
        content: `{
  "languages": ["C++", "Python", "JavaScript", "C"],
  "frameworks": ["ReactJS", "NextJS", "HTML5", "CSS3"],
  "developerTools": ["Git", "GitHub", "Kali Linux", "OpenCV"],
  "coreCS": [
    "Data Structures & Algorithms",
    "OOP",
    "Operating Systems",
    "DBMS",
    "Computer Networks",
    "Cybersecurity"
  ],
  "areasOfInterest": [
    "DSA",
    "Competitive Programming",
    "Web Development",
    "Ethical Hacking"
  ]
}`
    },
    'projects.py': {
        type: 'python',
        iconClass: 'python-color',
        content: `class PersonalProjects:
    def __init__(self):
        self.location = "Pune, Maharashtra, India"

    def get_featured_projects(self):
        return [
            {
                "name": "Crime Analytics Platform",
                "tagline": "Geospatial AI for Public Safety",
                "tech_stack": ["Python", "Machine Learning", "Geospatial Analysis"],
                "details": "Built an AI-powered geospatial analytics platform combining suspect risk profiling with criminal social-network linkage analysis. Mapped relationships between incidents, locations, and suspects.",
                "github": "https://github.com/AviBhosale01/Crime-Project"
            },
            {
                "name": "CGAN-Model",
                "tagline": "Near-Infrared Image Restoration",
                "tech_stack": ["Python", "PyTorch", "Conditional GANs", "Attention (CBAM)", "Streamlit"],
                "details": "A state-of-the-art progressive CGAN with CBAM attention and a Streamlit HD panel to colorize and restore Infrared (IR) images.",
                "github": "https://github.com/AviBhosale01/CGAN-Model"
            },
            {
                "name": "Agrirent",
                "tagline": "Agricultural Equipment Rental Platform",
                "tech_stack": ["JavaScript", "Full-Stack Web Dev", "Rapid Prototyping"],
                "details": "Full-stack web platform enabling farmers to rent agricultural equipment. Won Second Runner-Up at a college Ideathon (3rd out of 160+ teams).",
                "github": "https://github.com/AviBhosale01/AgrirentPlatform"
            },
            {
                "name": "Text-to-Custom-Handwriting Generator",
                "tagline": "Computer Vision Handwriting Synthesizer",
                "tech_stack": ["Python", "OpenCV", "Image Composition"],
                "details": "Developed a Python tool that converts typed text into custom handwriting-style output. Implemented image composition and glyph mapping with word-wrap, custom spacing, baseline alignment, and multi-page export.",
                "github": "https://github.com/AviBhosale01/Text-To-Handwriting"
            }
        ]`
    },
    'experience.log': {
        type: 'log',
        iconClass: 'log-color',
        content: `[2025-07-01] INTERNSHIP STARTED: Python Programming Intern @ CodeAlpha
[2025-08-31] INTERNSHIP COMPLETED: Delivered multiple Python-based tasks under project deadlines. Work tracked in public repo (codealpha_tasks).
--------------------------------------------------------------------------------
[2025-09-15] EVENT COORDINATOR: IOIT TENET (ACM Student Chapter)
[2025-10-30] Volunteer coordinator supporting hackathon & CTF logistics, registrations, and communication. Ensured smooth on-ground execution.`
    },
    'achievements.py': {
        type: 'python',
        iconClass: 'python-color',
        content: `# Coding stats and competitive achievements

leetcode_stats = {
    "rating": 2534,
    "percentile": "Top 18.98% of users",
    "global_rank": 144816,
    "problems_solved": "35+"
}

coding_ninjas_rank = {
    "title": "Ninja Dominator",
    "xp": "6,500+",
    "problems_solved": "147+"
}

tryhackme_ranking = {
    "rank": "VOYAGER (0x6)",
    "completed_rooms": 19,
    "badges_earned": 5,
    "focus": ["Offensive Security", "Defensive Security", "Networking Fundamentals"]
}

ideathon_2026 = "Second Runner-Up (3rd out of 160+ competing teams)"`
    },
    'certifications.txt': {
        type: 'txt',
        iconClass: 'txt-color',
        content: `=========================================
 PROFESSIONAL CERTIFICATIONS & TRAINING
=========================================

* Tata Cybersecurity
  - Security Analyst Job Simulation
  - Organized by Forage (Jul 2025)

* Reliance Skilling Academy
  - IoT-Network Specialist Certificate Programme (Jul 2025)

* Udemy
  - The Complete Full-Stack Web Development Bootcamp

* Microsoft
  - Build Web Pages with HTML and CSS for Beginners (Jun 2025)`
    },
    'contact.json': {
        type: 'json',
        iconClass: 'json-color',
        content: `{
  "email": "avishkarbhosale1982@gmail.com",
  "linkedin": "https://www.linkedin.com/in/avibhosale404/",
  "github": "https://github.com/AviBhosale01",
  "location": "Pune, Maharashtra, India"
}`
    }
};

// State variables
let openTabs = ['README.md'];
let activeTab = 'README.md';
let executingFromTerminal = false;

// Render the entire file view with line numbering and syntax styling
function renderFileContent(fileName) {
    const file = FILE_DATA[fileName];
    if (!file) return '';

    const lines = file.content.split('\n');
    let html = '';

    // If it's README.md, render the custom system neofetch card at the top
    if (fileName === 'README.md') {
        html += getNeofetchHTML();
    }

    lines.forEach((line, index) => {
        let highlighted = line;
        
        // Highlight logic by extension type
        if (file.type === 'json') {
            highlighted = highlightJSON(line);
        } else if (file.type === 'python') {
            highlighted = highlightPython(line);
        } else if (file.type === 'markdown') {
            highlighted = highlightMarkdown(line);
        } else {
            highlighted = escapeHTML(line);
        }

        // Add line row layout
        html += `
        <div class="editor-row">
            <span class="line-number" style="display:inline-block; width: 3rem; color:#4b5263; text-align:right; padding-right:1rem; user-select:none;">${index + 1}</span>
            <span class="code-line">${highlighted}</span>
        </div>`;
    });

    // Update status line count
    document.getElementById('editorLineCount').innerText = `Ln ${lines.length}, Col 1`;

    return html;
}

// Return Neofetch details HTML
function getNeofetchHTML() {
    return `
    <div class="neofetch-card">
        <div class="neofetch-avatar-box">
            <img src="./img.jpg" alt="Avishkar Bhosale profile illustration" />
        </div>
        <div class="neofetch-info">
            <div class="neofetch-user">avishkar@avi-vivobook</div>
            <div class="neofetch-stats">
                <span class="neofetch-label">OS:</span><span class="neofetch-value">Windows 11 / Kali Linux</span>
                <span class="neofetch-label">Host:</span><span class="neofetch-value">ASUS Vivobook K3605VC</span>
                <span class="neofetch-label">Kernel:</span><span class="neofetch-value">SDE & AI/ML Portfolio v1.0.0</span>
                <span class="neofetch-label">Uptime:</span><span class="neofetch-value" id="neofetchUptime">0h 0m 0s</span>
                <span class="neofetch-label">Packages:</span><span class="neofetch-value">LeetCode (2534), TryHackMe (Voyager), Coding Ninjas</span>
                <span class="neofetch-label">Shell:</span><span class="neofetch-value">powershell (pwsh) / zsh</span>
                <span class="neofetch-label">DE:</span><span class="neofetch-value">Windows Explorer / KDE Plasma</span>
                <span class="neofetch-label">CPU:</span><span class="neofetch-value">13th Gen Intel Core i5-13420H (12 threads)</span>
                <span class="neofetch-label">GPU:</span><span class="neofetch-value">NVIDIA GeForce RTX 3050 Laptop GPU (4GB)</span>
                <span class="neofetch-label">Memory:</span><span class="neofetch-value">16.0 GB RAM (Speed: 3200 MT/s)</span>
            </div>
            <div class="neofetch-colors">
                <span class="color-block cb-red"></span>
                <span class="color-block cb-green"></span>
                <span class="color-block cb-yellow"></span>
                <span class="color-block cb-blue"></span>
                <span class="color-block cb-magenta"></span>
                <span class="color-block cb-cyan"></span>
                <span class="color-block cb-white"></span>
            </div>
        </div>
    </div>`;
}

// Uptime Tick Calculation
function updateUptime() {
    const uptimeElem = document.getElementById('neofetchUptime');
    if (!uptimeElem) return;

    const diff = Date.now() - START_TIME;
    const hrs = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    uptimeElem.innerText = `${hrs}h ${mins}m ${secs}s`;
}
setInterval(updateUptime, 1000);

// Basic Syntax Highlighter Functions
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function highlightJSON(line) {
    let escaped = escapeHTML(line);
    // Keys
    escaped = escaped.replace(/(&quot;[^&]+&quot;)(\s*:)/g, '<span class="tag">$1</span>$2');
    // String values
    escaped = escaped.replace(/(:\s*)(&quot;[^&]+&quot;)/g, '$1<span class="str">$2</span>');
    // Numbers
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
    return escaped;
}

function highlightPython(line) {
    let escaped = escapeHTML(line);

    if (escaped.trim().startsWith('#')) {
        return `<span class="cmt">${escaped}</span>`;
    }

    // Keywords
    const keywords = ['class', 'def', 'return', 'self', 'import', 'from', 'in', 'and', 'or', 'not', 'if', 'else', 'for'];
    keywords.forEach(kw => {
        const reg = new RegExp(`\\b${kw}\\b`, 'g');
        escaped = escaped.replace(reg, `<span class="kw">${kw}</span>`);
    });

    // Strings
    escaped = escaped.replace(/(&quot;.*?&quot;)/g, '<span class="str">$1</span>')
                     .replace(/(&#39;.*?&#39;)/g, '<span class="str">$1</span>');

    // Numbers
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');

    return escaped;
}

function highlightMarkdown(line) {
    let escaped = escapeHTML(line);

    if (escaped.startsWith('#')) {
        return `<span class="kw" style="font-weight:700;">${escaped}</span>`;
    }
    if (escaped.trim().startsWith('*') || escaped.trim().startsWith('-')) {
        return `<span class="var">${escaped}</span>`;
    }
    
    // Highlight custom tag pills in readme
    escaped = escaped.replace(/(\[.*?\])/g, '<span class="tag-pill">$1</span>');

    return escaped;
}

// Execute Interactive Terminal Command
function executeTerminalCommand(cmdString) {
    const history = document.getElementById('terminalHistory');
    if (!history) return;

    // Append command prompt line to history
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span class="terminal-prompt">PS C:\\Users\\ASUS\\Portfolio&gt;</span> <span>${escapeHTML(cmdString)}</span>`;
    history.appendChild(commandLine);

    const trimmed = cmdString.trim();
    if (!trimmed) {
        scrollToBottom();
        return;
    }

    const args = trimmed.split(/\s+/);
    const cmd = args[0].toLowerCase();
    const arg = args[1] ? args[1] : '';

    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line';

    let outputHTML = '';

    switch (cmd) {
        case 'help':
            outputHTML = `
            <div>Available commands:</div>
            <div style="margin-left: 2rem; margin-top: 0.5rem; line-height: 1.8;">
              <strong>ls</strong>              - List all available portfolio files<br>
              <strong>cat &lt;file&gt;</strong>      - Open and display file contents in the editor (e.g., cat skills.json)<br>
              <strong>clear</strong>           - Clear the terminal console history<br>
              <strong>whoami</strong>          - Display profile details for Avishkar Bhosale<br>
              <strong>uptime</strong>          - Show active browser session session time<br>
              <strong>python &lt;file&gt;</strong>   - Execute mock python scripts (achievements.py, projects.py)<br>
              <strong>help</strong>            - Display this manual reference page
            </div>`;
            break;
        case 'clear':
            history.innerHTML = '';
            scrollToBottom();
            return;
        case 'whoami':
            outputHTML = `
            <div style="margin-bottom: 0.5rem;"><strong>avishkar\\avi-vivobook</strong></div>
            <div>----------------------</div>
            <div><strong>Role</strong>: Software Development Engineer (SDE)</div>
            <div><strong>College</strong>: AISSMS Institute of Information Technology, Pune (B.Tech IT)</div>
            <div><strong>DSA Rankings</strong>: Rating 2534 on LeetCode, Ninja Dominator on Coding Ninjas</div>
            <div><strong>Interests</strong>: AI/ML, Computer Vision, Cybersecurity, Offensive Security (THM Voyager)</div>`;
            break;
        case 'uptime':
            const diff = Date.now() - START_TIME;
            const hrs = Math.floor(diff / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            outputHTML = `<div>System Uptime: ${hrs}h ${mins}m ${secs}s (active website session)</div>`;
            break;
        case 'ls':
            outputHTML = `
            <div class="color-fg-muted" style="margin-bottom: 0.5rem;">Directory: C:\\Users\\ASUS\\Portfolio\\src</div>
            <div>Mode                 LastWriteTime         Length Name</div>
            <div>----                 -------------         ------ ----</div>
            <div>-a---          2026-07-18    10:00           1088 README.md</div>
            <div>-a---          2026-07-18    10:00            512 skills.json</div>
            <div>-a---          2026-07-18    10:00           2048 projects.py</div>
            <div>-a---          2026-07-18    10:00            512 experience.log</div>
            <div>-a---          2026-07-18    10:00           1024 achievements.py</div>
            <div>-a---          2026-07-18    10:00           1024 certifications.txt</div>
            <div>-a---          2026-07-18    10:00            256 contact.json</div>
            <div>-a---          2026-07-18    10:00        221669 mj_bg.jpg</div>`;
            break;
        case 'cat':
        case 'type':
            if (!arg) {
                outputHTML = `<div style="color: #ff5555;">cat : Missing operand. Specify a valid filename (e.g. cat skills.json).</div>`;
            } else if (FILE_DATA[arg]) {
                outputHTML = `<div style="color: var(--accent-color);">cat: File loaded. Displaying '${arg}' in workspace editor pane.</div>`;
                openFileFromTerminal(arg);
            } else if (arg === 'mj_bg.jpg') {
                outputHTML = `<div style="color: #ffb86c;">cat: mj_bg.jpg: Cannot display binary image data inside a text console.</div>`;
            } else {
                outputHTML = `<div style="color: #ff5555;">cat: '${arg}': File not found in current directory directory.</div>`;
            }
            break;
        case 'python':
            if (!arg) {
                outputHTML = `<div style="color: #ff5555;">python : No script specified. Use: python projects.py</div>`;
            } else if (arg === 'projects.py') {
                outputHTML = `
                <div>Running projects.py...</div>
                <div style="color: var(--syntax-variable);">Initializing PersonalProjects class...</div>
                <div style="color: var(--syntax-class);">Loaded 4 featured projects:</div>
                <div style="margin-left: 2rem; color: var(--syntax-string); line-height: 1.8;">
                  - <strong>Crime Analytics Platform</strong> (Geospatial ML Profiling Platform)<br>
                  - <strong>CGAN-Model</strong> (IR Image Restoration with attention block)<br>
                  - <strong>Agrirent Platform</strong> (Ideathon MVP Equipment Rental portal)<br>
                  - <strong>Text-to-Handwriting</strong> (Python OpenCV custom compositor)
                </div>`;
                openFileFromTerminal('projects.py');
            } else if (arg === 'achievements.py') {
                outputHTML = `
                <div>Running achievements.py...</div>
                <div style="color: var(--syntax-class); margin-top: 0.5rem;">[LeetCode]</div>
                <div style="margin-left: 2rem;">Rating: <strong>2534</strong> (Top 18.98% of users, Ninja status)</div>
                <div style="color: var(--syntax-class); margin-top: 0.3rem;">[Coding Ninjas]</div>
                <div style="margin-left: 2rem;">Title: <strong>Ninja Dominator</strong> (147+ problems solved, 6,500+ XP)</div>
                <div style="color: var(--syntax-class); margin-top: 0.3rem;">[TryHackMe]</div>
                <div style="margin-left: 2rem;">Rank: <strong>VOYAGER (0x6)</strong> (19 security labs completed)</div>
                <div style="color: var(--syntax-class); margin-top: 0.3rem;">[Ideathon]</div>
                <div style="margin-left: 2rem;">Award: <strong>2nd Runner-Up</strong> (3rd out of 160+ competing teams)</div>`;
                openFileFromTerminal('achievements.py');
            } else {
                outputHTML = `<div style="color: #ff5555;">python: error: script not found or not executable: '${arg}'</div>`;
            }
            break;
        default:
            outputHTML = `
            <div style="color: #ff5555;">
              ${cmd} : The term '${cmd}' is not recognized as the name of a cmdlet, function, script file, or operable program.<br>
              Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
            </div>`;
    }

    outputLine.innerHTML = outputHTML;
    history.appendChild(outputLine);
    scrollToBottom();
}

function scrollToBottom() {
    const terminalBody = document.getElementById('terminalBody');
    if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}

// Open file from terminal cmdlet action
function openFileFromTerminal(fileName) {
    executingFromTerminal = true;
    openFile(fileName);
    executingFromTerminal = false;
}

// Simulate terminal output typing
let typingInterval = null;
function simulateTerminalCommand(fileName) {
    const inputField = document.getElementById('terminalInput');
    if (!inputField) return;

    // Clear any active typing intervals
    if (typingInterval) clearInterval(typingInterval);

    let command = '';
    if (fileName.endsWith('.py')) {
        command = `python ${fileName}`;
    } else if (fileName.endsWith('.json')) {
        command = `cat ${fileName}`;
    } else if (fileName.endsWith('.log') || fileName.endsWith('.txt')) {
        command = `cat ${fileName}`;
    } else {
        command = `cat ${fileName}`;
    }

    inputField.value = '';
    let idx = 0;
    
    typingInterval = setInterval(() => {
        if (idx < command.length) {
            inputField.value += command[idx];
            idx++;
        } else {
            clearInterval(typingInterval);
            // Execute it in history!
            executeTerminalCommand(command);
            inputField.value = '';
        }
    }, 45);
}

// Render open tabs bar
function renderTabs() {
    const tabsContainer = document.getElementById('editorTabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = '';
    openTabs.forEach(tab => {
        const file = FILE_DATA[tab];
        const isActive = tab === activeTab ? 'active' : '';
        
        const tabEl = document.createElement('div');
        tabEl.className = `editor-tab ${isActive}`;
        tabEl.setAttribute('data-tab', tab);
        
        tabEl.innerHTML = `
            <span>${tab}</span>
            <span class="tab-close" data-close="${tab}">&times;</span>
        `;

        // Click to switch tabs
        tabEl.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-close')) {
                e.stopPropagation();
                closeTab(tab);
            } else {
                switchTab(tab);
            }
        });

        tabsContainer.appendChild(tabEl);
    });
}

// Switch active file tab
function switchTab(fileName) {
    activeTab = fileName;
    
    // Update sidebar selection styling
    document.querySelectorAll('.file-item').forEach(item => {
        if (item.getAttribute('data-file') === fileName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    renderTabs();
    document.getElementById('editorContent').innerHTML = renderFileContent(fileName);
    
    if (!executingFromTerminal) {
        simulateTerminalCommand(fileName);
    }
}

// Close an active tab
function closeTab(fileName) {
    openTabs = openTabs.filter(t => t !== fileName);
    
    if (activeTab === fileName) {
        activeTab = openTabs.length > 0 ? openTabs[openTabs.length - 1] : '';
    }

    renderTabs();
    if (activeTab) {
        switchTab(activeTab);
    } else {
        document.getElementById('editorContent').innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height: 100%; color:#4b5263; font-size:1.8rem; margin-top:10rem;">
            <svg viewBox="0 0 16 16" width="64" height="64" style="margin-bottom:1.5rem;"><path fill="currentColor" d="M11 5V3H5v2H3v6h2v2h6v-2h2V5h-2ZM5 11v-2H4V6h1V5h6v1h1v3h-1v2H5Z"/></svg>
            No File Open
        </div>`;
        document.getElementById('editorLineCount').innerText = 'Ln 0, Col 0';
    }
}

// Open file from Sidebar list
function openFile(fileName) {
    if (!openTabs.includes(fileName)) {
        openTabs.push(fileName);
    }
    switchTab(fileName);
}

// Set up UI listeners
document.addEventListener('DOMContentLoaded', () => {
    // File list explorer clicks
    document.querySelectorAll('.file-item').forEach(item => {
        const file = item.getAttribute('data-file');
        if (file) {
            item.addEventListener('click', () => openFile(file));
        }
    });

    // Premium cursor spotlight effect
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        });
    }

    // Terminal click forces focus on terminal input
    const terminalBody = document.getElementById('terminalBody');
    if (terminalBody) {
        terminalBody.addEventListener('click', () => {
            const inputField = document.getElementById('terminalInput');
            if (inputField) inputField.focus();
        });
    }

    // Capture enter commands keypress
    const terminalInput = document.getElementById('terminalInput');
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value;
                executeTerminalCommand(cmd);
                terminalInput.value = '';
            }
        });
    }

    // Open initial tab
    switchTab(activeTab);
});