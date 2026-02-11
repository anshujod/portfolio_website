import { useState, useEffect, useRef } from 'react';
import anshuImage from '../anshu_dp.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import '../styles.css';

// Add all icons to library
library.add(fas, fab);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobile menu toggle handler
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Set initial theme from localStorage
  // Scroll effects and intersection observer
  const headerRef = useRef(null);
  const scrollUpRef = useRef(null);
  const sectionsRef = useRef([]);
  const navLinksRef = useRef([]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Header styling
      if (headerRef.current) {
        headerRef.current.classList.toggle('scrolled', window.scrollY > 50);
      }

      // Scroll up button
      if (scrollUpRef.current) {
        scrollUpRef.current.classList.toggle('show-scroll', window.scrollY >= 600);
      }

      // Active nav link
      const scrollY = window.pageYOffset;
      const headerHeight = headerRef.current?.offsetHeight || 70;

      sectionsRef.current.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        if (sectionTop <= scrollY) {
          const sectionId = section.getAttribute('id');
          navLinksRef.current.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || '0';
          entry.target.style.transitionDelay = `${delay}s`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
    return () => revealElements.forEach(el => observer.unobserve(el));
  }, []);

  // Remove preload class
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove('preload');
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {/* Date Display */}
      <div className="current-date-display">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>

      {/* Header */}
      <header className="main-header" ref={headerRef}>
        <nav className="container header-nav">
          <button
            className={`hamburger-menu ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <div className="header-links" ref={el => {
            if (el) navLinksRef.current = Array.from(el.querySelectorAll('.nav-link'));
          }}>
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#experience" className="nav-link">Journey</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#achievements" className="nav-link">Achievements</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#about" className="mobile-nav-link" onClick={toggleMobileMenu}>About</a>
          <a href="#skills" className="mobile-nav-link" onClick={toggleMobileMenu}>Skills</a>
          <a href="#experience" className="mobile-nav-link" onClick={toggleMobileMenu}>Journey</a>
          <a href="#projects" className="mobile-nav-link" onClick={toggleMobileMenu}>Projects</a>
          <a href="#achievements" className="mobile-nav-link" onClick={toggleMobileMenu}>Achievements</a>
          <a href="#contact" className="mobile-nav-link" onClick={toggleMobileMenu}>Contact</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content" ref={el => {
        if (el) sectionsRef.current = Array.from(el.querySelectorAll('.section[id]'));
      }}>
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <div className="hero-background-shapes"></div>
          <div className="container hero__container">
            <div className="hero__content">
              <img src={anshuImage} alt="Anshu Prakash Hindoyar" className="hero__photo" />
              <h1 className="hero__name">Anshu Prakash Hindoyar</h1>
              <p className="hero__title">Full Stack Developer</p>
              <p className="hero__tagline">
                Passionate and curious Final year B.Tech student at Ramaiah Institute of Technology, Bangalore with a knack for building creative tech solutions.
                Strong foundation in DSA and problem-solving with a growing portfolio of real-world applications.
                Currently exploring full-stack development and AI-driven projects.
                Always open to learning, collaborating, and turning ideas into impact.
              </p>
              <div className="hero__links">
                <a href="https://www.linkedin.com/in/anshu-prakash-496a641b9/" target="_blank" rel="noopener noreferrer" className="hero__link" aria-label="LinkedIn" title="LinkedIn">
                  <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                </a>
                <a href="https://github.com/anshujod/" target="_blank" rel="noopener noreferrer" className="hero__link" aria-label="GitHub" title="GitHub">
                  <FontAwesomeIcon icon={['fab', 'github']} />
                </a>
                <a href="https://leetcode.com/u/anshujod/" target="_blank" rel="noopener noreferrer" className="hero__link" aria-label="LeetCode" title="LeetCode">
                  <FontAwesomeIcon icon="code" />
                </a>
                <a href="https://www.instagram.com/_anshuprakash_21_/" target="_blank" rel="noopener noreferrer" className="hero__link" aria-label="Instagram" title="Instagram">
                  <FontAwesomeIcon icon={['fab', 'instagram']} />
                </a>
                <a href="mailto:anshuprakash55@gmail.com" className="hero__link" aria-label="Email" title="Email">
                  <FontAwesomeIcon icon="envelope" />
                </a>
              </div>
              <div className="hero__cta">
                <a href="Anshu_Resume_SWE.pdf" target="_blank" className="button button--primary">
                  <FontAwesomeIcon icon="file-alt" /> View Resume
                </a>
                <a href="#projects" className="button button--secondary">Explore Projects</a>
              </div>
            </div>
          </div>
          <a href="#about" className="scroll-down-indicator" aria-label="Scroll down">
            <FontAwesomeIcon icon="chevron-down" />
          </a>
        </section>


        {/* About Section */}
        <section id="about" className="about section">
          <div className="container about-container">
            <div className="about-content card">
              <h2 className="section__title">About Me</h2>
              <div className="section-divider"></div>
              <p>
                I’m a passionate and curious developer with strong problem-solving skills, especially in <strong>C++</strong> where I’ve tackled numerous Data Structures and Algorithms challenges on platforms like LeetCode and Codeforces.
              </p>
              <p>
                My interests go beyond competitive coding—I also build full-stack web applications using the <strong>MERN stack (MongoDB, Express.js, React, Node.js)</strong>.
              </p>
              <p>
                I also have foundational knowledge in <strong>Computer Vision</strong> and <strong>Machine Learning</strong>, having worked with tools like OpenCV and YOLOv8. I enjoy building intelligent systems that blend hardware and software.
              </p>
              <p>
                I’m continuously learning, building, and striving to grow as a developer—excited about both clean code and creative innovation.
              </p>

            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills section">
          <div className="container">
            <h2 className="section__title">Technical Proficiency</h2>
            <div className="section-divider"></div>
            <div className="skills__grid">
              <div className="skill__card card">
                <div className="skill__icon"><FontAwesomeIcon icon={['fab', 'react']} /></div>
                <h3 className="skill__title">Frontend</h3>
                <ul className="skill__list">
                  <li>React.js</li>
                  <li>JavaScript (ES6+)</li>
                  <li>HTML5 & CSS3</li>
                  <li>Tailwind CSS</li>

                </ul>
              </div>
              <div className="skill__card card">
                <div className="skill__icon"><FontAwesomeIcon icon="server" /></div>
                <h3 className="skill__title">Backend</h3>
                <ul className="skill__list">
                  <li>Node.js / Express</li>
                  <li>Java </li>
                  <li>Python </li>
                  <li>RESTful APIs</li>
                </ul>
              </div>
              <div className="skill__card card">
                <div className="skill__icon"><FontAwesomeIcon icon="database" /></div>
                <h3 className="skill__title">Databases</h3>
                <ul className="skill__list">
                  <li>MongoDB</li>
                  <li>SQL</li>
                  <li>Supabase</li>
                  <li>PostgreSQL</li>
                </ul>
              </div>
              <div className="skill__card card">
                <div className="skill__icon"><FontAwesomeIcon icon="code" /></div>
                <h3 className="skill__title">Languages</h3>
                <ul className="skill__list">
                  <li>JavaScript</li>
                  <li>C++ / C</li>
                  <li>Python</li>
                  <li>SQL</li>
                </ul>
              </div>
              <div className="skill__card card">
                <div className="skill__icon"><FontAwesomeIcon icon="tools" /></div>
                <h3 className="skill__title">Tools & DevOps</h3>
                <ul className="skill__list">
                  <li>Git & GitHub</li>
                  <li>Visual Studio Code</li>
                  <li>Vercel</li>
                  <li>Postman</li>
                  <li>AWS S3</li>
                </ul>
              </div>
              <div className="skill__card card">
                <div className="skill__icon"><FontAwesomeIcon icon="robot" /></div>
                <h3 className="skill__title">ML & Computer-Vision</h3>
                <ul className="skill__list">
                  <li>OpenCV</li>
                  <li>Keras</li>
                  <li>NumPy</li>
                  <li>TensorFlow</li>
                  <li>Yolo-V8</li>
                </ul>
              </div>
              <div className="skill__card card">
                <div className="skill__icon"><FontAwesomeIcon icon="brain" /></div>
                <h3 className="skill__title">Foundations</h3>
                <ul className="skill__list">
                  <li>Data Structures</li>
                  <li>Algorithms</li>
                  <li>OOP Principles</li>
                  <li>Problem Solving</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience section">
          <div className="container">
            <h2 className="section__title">Professional Journey</h2>
            <div className="section-divider"></div>
            <div className="experience__timeline">
              <div className="timeline__item">
                <div className="timeline__point"></div>
                <div className="timeline__content card">
                  <span className="timeline__date">Mar 2025 - Apr 2025 (Projected)</span>
                  <h3 className="timeline__title">Internship Trainee @ Tata Steel UISL</h3>
                  <p className="timeline__company">Jamshedpur</p>
                  <p className="timeline__description">One of the key projects I worked on was counting the number of people present in an office environment—an application with significant potential in workforce analytics and space optimization. From data labeling to model training and deployment, this experience enhanced my understanding of AI-driven surveillance solutions.</p>
                </div>
              </div>
              <div className="timeline__item">
                <div className="timeline__point"></div>
                <div className="timeline__content card">
                  <span className="timeline__date">Education</span>
                  <h3 className="timeline__title">Academic Background</h3>
                  <p className="timeline__company">Ramaiah Institute of Technology, Bangalore</p>
                  <p className="timeline__description">
                    B.E. Electronics & Telecommunications (2022 - 2026 Expected)
                  </p>
                  <hr className="timeline-divider" />
                  <p className="timeline__company">Narbheram Hansraj English School, Jamshedpur</p>
                  <p className="timeline__description">ISC - (2020 - 2022)</p>
                  <hr className="timeline-divider" />
                  <p className="timeline__company">Carmel Junior College, Jamshedpur</p>
                  <p className="timeline__description">ICSE - (2007 - 2020)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="achievements section">
          <div className="container">
            <h2 className="section__title">Achievements</h2>
            <div className="section-divider"></div>
            <div className="achievements__grid">
              <div className="achievement__card card">
                <h3>Capture the Flag 3rd position</h3>
                <p>Secured 3rd position in Capture the Flag organised by Google Developers Students Club (GDSC) RIT.</p>
              </div>
              <div className="achievement__card card">
                <h3>RIT Techfest AAVISHKAAR 1st position</h3>
                <p>Secured 1st postion in the event organised by Medical Electronics in RIT Techfest-AAVISHKAR 2025.</p>
              </div>
              <div className="achievement__card card">
                <h3>Problem solving enthusiast</h3>
                <p>
                  Solved 300+ problems on platforms like LeetCode, Codeforces and Geek for Geeks honing my algorithmic thinking and coding skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects section">
          <div className="container">
            <h2 className="section__title">Featured Projects</h2>
            <div className="section-divider"></div>
            <div className="projects__grid">
              <article className="project__card card">
                <div className="project__image-container">
                  <img src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80" alt="Chatify Visual" loading="lazy" className="project__image" />
                  <div className="project__overlay">
                    <a href="https://chatify-app-a66h.onrender.com/" target="_blank" rel="noopener noreferrer" className="project__icon-link" aria-label="Chatify Live Demo" title="Live Demo">
                      <FontAwesomeIcon icon="external-link-alt" />
                    </a>
                    <a href="https://github.com/anshujod/Chat_App" target="_blank" rel="noopener noreferrer" className="project__icon-link" aria-label="Chatify GitHub" title="GitHub">
                      <FontAwesomeIcon icon={['fab', 'github']} />
                    </a>
                  </div>
                </div>
                <div className="project__content">
                  <h3 className="project__title">Chatify - A Messaging App</h3>
                  <p className="project__description">A messaging platform built using the MERN stack with a focus on secure and scalable communication. Features real-time chat with Socket.IO, secure backend with JWT & Arcjet, and optimized state management using Zustand.</p>
                  <div className="project__tags">
                    <span>MERN</span><span>Socket.IO</span><span>JWT</span><span>Zustand</span><span>Arcjet</span>
                  </div>
                </div>
              </article>
              <article className="project__card card">
                <div className="project__image-container">
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80" alt="AI ThumbnailGen Visual" loading="lazy" className="project__image" />
                  <div className="project__overlay">
                    <a href="https://github.com/anshujod/AI_thumbnail" target="_blank" rel="noopener noreferrer" className="project__icon-link" aria-label="AI ThumbnailGen GitHub">
                      <FontAwesomeIcon icon={['fab', 'github']} />
                    </a>
                  </div>
                </div>
                <div className="project__content">
                  <h3 className="project__title">AI ThumbnailGen</h3>
                  <p className="project__description">A SaaS application that uses AI to create thumbnails based on video concepts. Integrates OpenAI DALL·E 3, AWS S3, Supabase, and Razorpay for a complete credit-based system.</p>
                  <div className="project__tags">
                    <span>React</span><span>OpenAI</span><span>AWS S3</span><span>Supabase</span><span>Razorpay</span>
                  </div>
                </div>
              </article>
              <article className="project__card card">
                <div className="project__image-container">
                  <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Project 2 Visual" loading="lazy" className="project__image" />
                  <div className="project__overlay">
                    <a href="https://github.com/anshujod/mern_auth.git" target="_blank" rel="noopener noreferrer" className="project__icon-link" aria-label="Project 2 GitHub">
                      <FontAwesomeIcon icon={['fab', 'github']} />
                    </a>
                  </div>
                </div>
                <div className="project__content">
                  <h3 className="project__title">MERN Authentication System</h3>
                  <p className="project__description">Developed RESTful APIs with Node.js, Express, and MongoDB for user authentication workflows including signup, login,
                    email verification, password reset, and logout.</p>
                  <div className="project__tags">
                    <span>Javascript</span><span>Node.js</span><span>Express.js</span><span>MongoDB</span><span>Mailtrap</span>
                  </div>
                </div>
              </article>
              <article className="project__card card">
                <div className="project__image-container">
                  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Project 1 Visual" loading="lazy" className="project__image" />
                  <div className="project__overlay">
                    <a href="https://github.com/anshujod/expensetracker.git" target="_blank" rel="noopener noreferrer" className="project__icon-link" aria-label="Project 1 GitHub">
                      <FontAwesomeIcon icon={['fab', 'github']} />
                    </a>
                  </div>
                </div>
                <div className="project__content">
                  <h3 className="project__title">Expense Tracker</h3>
                  <p className="project__description">A full-stack web application to manage daily expenses. Users can securely log in, add income and expenses, view transaction history, and track their financial balance in real time — all with an intuitive and responsive UI.</p>
                  <div className="project__tags">
                    <span>JavaScript</span><span>HTML/CSS</span><span>Node.js</span><span>MongoDB</span><span>React</span>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact section">
          <div className="container contact-container">
            <div className="contact-content card">
              <h2 className="section__title">Get In Touch</h2>
              <div className="section-divider"></div>
              <p>I'm actively exploring new opportunities and enjoy connecting with fellow developers and potential collaborators. Let's build something great together!</p>
              <a href="mailto:anshuprakash55@gmail.com" className="button button--primary contact__button">
                <FontAwesomeIcon icon="paper-plane" /> Send Email
              </a>
              <div className="contact__social-links">
                <a href="https://www.linkedin.com/in/anshu-prakash-496a641b9/" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="LinkedIn" title="LinkedIn">
                  <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                </a>
                <a href="https://github.com/anshujod/" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="GitHub" title="GitHub">
                  <FontAwesomeIcon icon={['fab', 'github']} />
                </a>
                <a href="https://leetcode.com/u/anshujod/" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="LeetCode" title="LeetCode">
                  <FontAwesomeIcon icon="code" />
                </a>
                <a href="https://www.instagram.com/_anshuprakash_21_/" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="Instagram" title="Instagram">
                  <FontAwesomeIcon icon={['fab', 'instagram']} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container footer__container">
            <p>© 2024 Anshu Prakash Hindoyar. Designed & Built with <FontAwesomeIcon icon="heart" className="pulse" />.</p>
          </div>
        </footer>
      </div>
      {/* Scroll Up Button */}
      <a href="#"
        className="scrollup"
        id="scroll-up"
        aria-label="Scroll to top"
        title="Scroll to top"
        ref={scrollUpRef}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
        <FontAwesomeIcon icon="chevron-up" />
      </a>
    </div>
  );
}

export default App;
