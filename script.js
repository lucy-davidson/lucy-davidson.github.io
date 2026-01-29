// =============================================
// Load content from data.js
// =============================================

function loadContent() {
    // Name
    document.getElementById('nav-name').textContent = siteContent.name;
    document.getElementById('footer-name').textContent = siteContent.name;

    // Email
    document.getElementById('email-btn').href = `mailto:${siteContent.email}`;

    // About
    const aboutText = document.getElementById('about-text');
    siteContent.about.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        aboutText.appendChild(p);
    });

    // Experience
    const experienceList = document.getElementById('experience-list');
    siteContent.experience.forEach(item => {
        experienceList.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-content">
                    <h4>${item.title}</h4>
                    <p class="timeline-company">${item.company}</p>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });

    // Education
    const educationList = document.getElementById('education-list');
    siteContent.education.forEach(item => {
        educationList.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-content">
                    <h4>${item.title}</h4>
                    <p class="timeline-company">${item.institution}</p>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });

    // Skills
    const skillsList = document.getElementById('skills-list');
    siteContent.skills.forEach(skill => {
        skillsList.innerHTML += `<span class="skill-tag">${skill}</span>`;
    });

    // Projects
    const projectsList = document.getElementById('projects-list');
    siteContent.projects.forEach(project => {
        const links = project.links.map(link =>
            `<a href="${link.url}" class="project-link">${link.label}</a>`
        ).join('');

        projectsList.innerHTML += `
            <article class="project-card">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">${links}</div>
                </div>
            </article>
        `;
    });

    // Social links
    const socialLinks = document.getElementById('social-links');
    if (siteContent.social.github) {
        socialLinks.innerHTML += `<a href="${siteContent.social.github}">GitHub</a>`;
    }
    if (siteContent.social.linkedin) {
        socialLinks.innerHTML += `<a href="${siteContent.social.linkedin}">LinkedIn</a>`;
    }
    if (siteContent.social.twitter) {
        socialLinks.innerHTML += `<a href="${siteContent.social.twitter}">Twitter</a>`;
    }
    if (siteContent.social.scholar) {
        socialLinks.innerHTML += `<a href="${siteContent.social.scholar}">Google Scholar</a>`;
    }
}

// Load content when page loads
loadContent();

// =============================================
// Mobile Menu Toggle
// =============================================

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// =============================================
// Header scroll effect
// =============================================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// =============================================
// Smooth scroll for anchor links
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// Fade-in animations
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// Make about section visible immediately
document.querySelector('.about').style.opacity = '1';

// =============================================
// Active navigation link highlighting
// =============================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = '';
            });
            navLink.style.color = 'var(--color-accent)';
        }
    });
});
