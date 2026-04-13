// ==================== DARK MODE TOGGLE ==================== //
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update toggle icon
function updateThemeIcon() {
    const theme = html.getAttribute('data-theme');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// Set initial icon
updateThemeIcon();

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });
}

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
        const isOpen = navMenu.classList.toggle('open');
        mobileMenuToggle.setAttribute('aria-expanded', isOpen);
        mobileMenuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileMenuToggle.setAttribute('aria-expanded', false);
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// ==================== SMOOTH SCROLLING ====================
 //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== FORM SUBMISSION ==================== //
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields!');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// ==================== ACTIVE NAV LINK ==================== //
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== SCROLL ANIMATIONS ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .stat-item, .security-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== MOBILE MENU TOGGLE ==================== //
// Add mobile menu functionality if needed
document.addEventListener('DOMContentLoaded', function() {
    // Check if we need mobile menu (for future enhancement)
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});

// ==================== PROGRESS BAR ANIMATION ==================== //
const progressBars = document.querySelectorAll('.progress');

const animateProgressBars = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0%';
            
            setTimeout(() => {
                progressBar.style.transition = 'width 1s ease';
                progressBar.style.width = width;
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
};

const progressObserver = new IntersectionObserver(animateProgressBars, observerOptions);
progressBars.forEach(bar => progressObserver.observe(bar));

// ==================== TYPING EFFECT (Optional Enhancement) ==================== //
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment below to add typing effect to hero title
// const heroTitle = document.querySelector('.hero-content h1');
// if (heroTitle) {
//     const originalText = heroTitle.innerHTML;
//     heroTitle.innerHTML = '';
//     typeWriter(heroTitle, originalText);
// }

// ==================== TOOL PREVIEW LOADER ====================
const toolPreviewData = {
    networkAnalysis: {
        title: 'Network Analysis',
        description: 'Professional-grade network monitoring and vulnerability scanning tools.',
        image: '',
        commands: [],
        warning: ''
    },
    systemSecurity: {
        title: 'System Security',
        description: 'Linux hardening and security auditing utilities.',
        image: '',
        commands: [],
        warning: ''
    },
    passwordTesting: {
        title: 'Password Testing',
        description: 'Password strength analysis and secure testing tools.',
        image: '',
        commands: [],
        warning: ''
    },
    webSecurity: {
        title: 'Web Security',
        description: 'Web application security testing platforms.',
        image: '',
        commands: [],
        warning: ''
    },
    forensics: {
        title: 'Forensics',
        description: 'Digital forensics and incident investigation tools.',
        image: '',
        commands: [],
        warning: ''
    },
    monitoring: {
        title: 'Monitoring',
        description: 'Intrusion detection and security information management.',
        image: '',
        commands: [],
        warning: ''
    },
    nexoTech: {
        title: 'NEXO-TECH Suite',
        description: 'Comprehensive Linux tool suite for system diagnostics and security testing.',
        image: '',
        commands: [],
        warning: ''
    },
    whatsappBot: {
        title: 'WhatsApp Bot',
        description: 'Advanced WhatsApp multi-purpose bot for automated messaging and social engineering testing.',
        image: '',
        commands: [],
        warning: ''
    },
    ddos: {
        title: 'DDoS Tool',
        description: 'This DDoS Tool NEXO-TECH IP Flooder is a low level ddos attack designed to only take down weak websites... the traffic limit for this tool is low.',
        image: 'ip-flooder.jpeg',
        commands: [
            'pkg update && pkg upgrade',
            'pkg install git -y',
            'pkg install python -y',
            'git clone https://github.com/demonalexander526-alt/DEMONIC_TOOLS.git',
            'pip install scapy',
            'cd DEMONIC_TOOLS',
            'python3 ip-stresser.py'
        ],
        warning: 'WARNING: This tool generates massive UDP packet floods to overwhelm network resources. Unauthorized use is illegal and may result in severe legal consequences.'
    }
};

function loadToolPreview(toolKey) {
    const tool = toolPreviewData[toolKey];
    if (!tool) return;

    const previewImage = document.getElementById('preview-image');
    const previewTitle = document.getElementById('preview-title');
    const previewDescription = document.getElementById('preview-description');
    const previewCommandList = document.getElementById('preview-command-list');
    const previewWarning = document.getElementById('preview-warning');

    previewTitle.textContent = tool.title;
    previewDescription.textContent = tool.description;

    if (tool.image) {
        previewImage.src = tool.image;
        previewImage.alt = tool.title;
        previewImage.style.display = 'block';
    } else {
        previewImage.style.display = 'none';
    }

    previewCommandList.innerHTML = '';
    if (tool.commands && tool.commands.length) {
        tool.commands.forEach(command => {
            const codeBlock = document.createElement('code');
            codeBlock.textContent = command;
            previewCommandList.appendChild(codeBlock);
        });
    }

    if (tool.warning) {
        previewWarning.textContent = tool.warning;
        previewWarning.style.display = 'block';
    } else {
        previewWarning.style.display = 'none';
    }
}

