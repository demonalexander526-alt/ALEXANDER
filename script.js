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

// Fix mobile viewport units on mobile browsers (Android address-bar resize)
(function setMobileVH(){
    function updateVh(){
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    updateVh();
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateVh);
    }
})();

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
        image: 'bot.jpeg',
        commands: [
            'pkg updatee && pkg upgrade',
            'pkg install git -y',
            'pkg install nodejs',
            'git clone https://github.com/demonalexander526-alt/DEMONIC-BOT.git',
            'cd DEMONIC-BOT',
            'ls',
            'clear',
            'npm install'
        ],
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
        }); n
    }

    if (tool.warning) {
        previewWarning.textContent = tool.warning;
        previewWarning.style.display = 'block';
    } else {
        previewWarning.style.display = 'none';
    }
}

// ==================== INTENSE HACKING EFFECTS ==================== //

// Matrix Rain Effect for Dark Web Section
function createMatrixRain() {
    const darkWebSection = document.querySelector('.dark-web-section');
    if (!darkWebSection) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.1';
    canvas.style.zIndex = '0';

    darkWebSection.style.position = 'relative';
    darkWebSection.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = darkWebSection.offsetWidth;
    canvas.height = darkWebSection.offsetHeight;

    const matrix = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const matrixArray = matrix.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#FF4500';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Glitch Effect for Dark Web Cards
function addGlitchEffect() {
    const darkWebCards = document.querySelectorAll('.dark-web-card');

    darkWebCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s infinite';
        });

        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

// Add CSS for glitch effect
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }

    .pulse-glow {
        animation: pulseGlow 2s infinite;
    }

    @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(139, 0, 0, 0.3); }
        50% { box-shadow: 0 0 40px rgba(255, 69, 0, 0.6); }
    }
`;
document.head.appendChild(glitchStyle);

// Typing Effect for Dark Web Warning
function typeDarkWebWarning() {
    const warningElement = document.querySelector('.dark-web-warning p');
    if (!warningElement) return;

    const originalText = warningElement.textContent;
    warningElement.textContent = '';
    warningElement.style.borderRight = '2px solid #FF0000';

    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            warningElement.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            warningElement.style.borderRight = 'none';
        }
    }, 50);
}

// Particle Effect for Dark Web Section
function createParticles() {
    const darkWebSection = document.querySelector('.dark-web-section');
    if (!darkWebSection) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#FF4500';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = Math.random();
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float${i % 3} ${3 + Math.random() * 4}s infinite linear`;

        darkWebSection.appendChild(particle);
    }

    // Add floating animations
    const floatStyles = document.createElement('style');
    floatStyles.textContent = `
        @keyframes float0 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(120deg); }
        }
        @keyframes float2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(240deg); }
        }
    `;
    document.head.appendChild(floatStyles);
}

// Initialize intense effects when DOM loads
// Visitor counter: counts unique visitors globally using CountAPI, with local dedupe.
(function() {
    const LOCAL_KEY = 'alexander_counted_v1';
    const NS = encodeURIComponent(location.hostname || 'local');
    const KEY = 'visitors';

    function updateElements(value) {
        document.querySelectorAll('#visitor-count').forEach(el => {
            el.textContent = value;
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = 'pulse 0.6s ease-out';
            }, 100);
        });
    }

    function fetchCount() {
        fetch(`https://api.countapi.xyz/get/${NS}/${KEY}`)
            .then(res => res.json())
            .then(data => {
                if (data && typeof data.value !== 'undefined') {
                    updateElements(data.value);
                }
            })
            .catch(() => {
                const fallback = localStorage.getItem('visitor_fallback') || '0';
                updateElements(fallback);
            });
    }

    function hitAndUpdate() {
        fetch(`https://api.countapi.xyz/hit/${NS}/${KEY}`)
            .then(res => res.json())
            .then(data => {
                const value = data.value || 0;
                localStorage.setItem('visitor_fallback', String(value));
                updateElements(value);
                localStorage.setItem(LOCAL_KEY, '1');
            })
            .catch(() => {
                fetchCount();
            });
    }

    // Add pulse keyframes style once
    const visitorStyle = document.createElement('style');
    visitorStyle.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(visitorStyle);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (!localStorage.getItem(LOCAL_KEY)) {
                hitAndUpdate();
            } else {
                fetchCount();
            }
        });
    } else {
        if (!localStorage.getItem(LOCAL_KEY)) {
            hitAndUpdate();
        } else {
            fetchCount();
        }
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    const navbar = document.querySelector('.navbar');

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Add intense hacking effects
    setTimeout(() => {
        createMatrixRain();
        addGlitchEffect();
        createParticles();
        typeDarkWebWarning();
    }, 1000);

    // Add pulse glow to security categories on scroll
    const securityCategories = document.querySelectorAll('.security-category');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('pulse-glow');
            }
        });
    });

    securityCategories.forEach(category => observer.observe(category));
});

