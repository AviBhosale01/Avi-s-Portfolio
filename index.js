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
            <div class="neofetch-user">avishkar@sde-pune</div>
            <div class="neofetch-stats">
                <span class="neofetch-label">OS:</span><span class="neofetch-value">B.Tech IT (AISSMS IOIT, Pune)</span>
                <span class="neofetch-label">Kernel:</span><span class="neofetch-value">SDE & AI/ML Portfolio v1.0</span>
                <span class="neofetch-label">Packages:</span><span class="neofetch-value">LeetCode, TryHackMe, Coding Ninjas</span>
                <span class="neofetch-label">Host:</span><span class="neofetch-value">ASUS TUF Gaming A15</span>
                <span class="neofetch-label">Shell:</span><span class="neofetch-value">powershell (pwsh)</span>
                <span class="neofetch-label">DE:</span><span class="neofetch-value">Visual Studio Code</span>
                <span class="neofetch-label">CPU:</span><span class="neofetch-value">AMD Ryzen 5 4600H (12)</span>
                <span class="neofetch-label">GPU:</span><span class="neofetch-value">NVIDIA GeForce GTX 1650</span>
                <span class="neofetch-label">Uptime:</span><span class="neofetch-value" id="neofetchUptime">0h 0m 0s</span>
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

// Simulate terminal output typing
let typingInterval = null;
function simulateTerminalCommand(fileName) {
    const typedCommandElem = document.getElementById('typedCommand');
    if (!typedCommandElem) return;

    // Clear any active typing intervals
    if (typingInterval) clearInterval(typingInterval);

    let command = '';
    if (fileName.endsWith('.py')) {
        command = `python ${fileName}`;
    } else if (fileName.endsWith('.json')) {
        command = `cat ${fileName}`;
    } else if (fileName.endsWith('.log') || fileName.endsWith('.txt')) {
        command = `type ${fileName}`;
    } else {
        command = `cat ${fileName}`;
    }

    typedCommandElem.innerText = '';
    let idx = 0;
    
    typingInterval = setInterval(() => {
        if (idx < command.length) {
            typedCommandElem.innerText += command[idx];
            idx++;
        } else {
            clearInterval(typingInterval);
        }
    }, 40);
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
    simulateTerminalCommand(fileName);
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

    // Open initial tab
    switchTab(activeTab);
});