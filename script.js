// ============================================
// PROJECT DATA (Dynamic Content)
// ============================================
const projectsData = {
    2022: [
        {
            title: "None",
            description: "No projects completed this year.",
            role: "N/A"
        }
    ],
    2023: [
        {
            title: "None",
            description: "No projects completed this year.",
            role: "N/A"
        }
    ],
    2024: [
        {
            title: "None",
            description: "No projects completed this year.",
            role: "N/A"
        }
    ],
    2025: [
        {
            title: "None",
            description: "No projects completed this year.",
            role: "N/A"
        }
    ]
};

// ============================================
// DOM ELEMENTS
// ============================================
const projectsContent = document.getElementById('projects-content');
const yearSlider = document.getElementById('yearSlider');
const currentYearDisplay = document.getElementById('currentYearDisplay');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const darkModeToggle = document.getElementById('darkModeToggle');

// Current selected year
let currentYear = 2025;

// ============================================
// FUNCTION: Display Projects (Dynamic Loading)
// NO MOVEMENT - fixed container height
// ============================================
function displayProjects(year) {
    // Show loading spinner
    projectsContent.innerHTML = '<div class="loading-spinner"></div>';
    
    setTimeout(() => {
        const projects = projectsData[year];
        
        if (!projects || projects.length === 0) {
            projectsContent.innerHTML = `<p style="text-align:center; padding:2rem;">No projects found for ${year}. Check back soon!</p>`;
            return;
        }
        
        // Build HTML for all projects in that year
        let projectsHTML = '';
        projects.forEach(project => {
            projectsHTML += `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-role">${project.role}</div>
                </div>
            `;
        });
        
        projectsContent.innerHTML = projectsHTML;
        
        // Add animation to each card
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.4s ease ${index * 0.1}s forwards`;
        });
        
        // CRITICAL FIX: Scroll position stays exactly the same
        // No scroll adjustment needed because height never changes
        
    }, 300);
}

// ============================================
// FUNCTION: Update Slider Value
// ============================================
function updateSlider(year) {
    if (yearSlider) {
        yearSlider.value = year;
    }
}

// ============================================
// FUNCTION: Update Year Display Badge
// ============================================
function updateYearDisplay(year) {
    if (currentYearDisplay) {
        currentYearDisplay.textContent = year;
    }
}

// ============================================
// FUNCTION: Set Year (Main Controller)
// ============================================
function setYear(year) {
    currentYear = year;
    
    // Update all UI components
    updateSlider(year);
    updateYearDisplay(year);
    displayProjects(year);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Slider input
if (yearSlider) {
    yearSlider.addEventListener('input', (e) => {
        const year = parseInt(e.target.value);
        setYear(year);
    });
}

// Previous button
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        let newYear = currentYear - 1;
        if (newYear < 2022) newYear = 2022;
        setYear(newYear);
    });
}

// Next button
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        let newYear = currentYear + 1;
        if (newYear > 2025) newYear = 2025;
        setYear(newYear);
    });
}

// ============================================
// DARK MODE TOGGLE
// ============================================
function initDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        darkModeToggle.textContent = '☀️';
    } else {
        darkModeToggle.textContent = '🌙';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';
        }
    });
}

// ============================================
// SCROLL ANIMATIONS (Fade-in on scroll)
// ============================================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// MOBILE HAMBURGER MENU
// ============================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const experienceSection = document.getElementById('experience');
        const rect = experienceSection.getBoundingClientRect();
        const isExperienceVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isExperienceVisible) {
            if (e.key === 'ArrowLeft') {
                let newYear = currentYear - 1;
                if (newYear >= 2022) setYear(newYear);
            } else if (e.key === 'ArrowRight') {
                let newYear = currentYear + 1;
                if (newYear <= 2025) setYear(newYear);
            }
        }
    });
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
function init() {
    initDarkMode();
    initScrollAnimations();
    initMobileMenu();
    initKeyboardNavigation();
    setYear(2025);
}

init();