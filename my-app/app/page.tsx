"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href")!);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Fade in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });

    // Header background change on scroll
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 100) {
          header.style.background = "rgba(255, 255, 255, 0.98)";
        } else {
          header.style.background = "rgba(255, 255, 255, 0.95)";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Add hover effects to project cards
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        (e.currentTarget as HTMLElement).style.transform =
          "translateY(-10px) scale(1.02)";
      });

      card.addEventListener("mouseleave", (e) => {
        (e.currentTarget as HTMLElement).style.transform =
          "translateY(0) scale(1)";
      });
    });

    // Mobile menu functionality
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu .nav-links a");

    const toggleMenu = () => {
      hamburger?.classList.toggle("active");
      mobileMenu?.classList.toggle("active");
      document.body.style.overflow = mobileMenu?.classList.contains("active")
        ? "hidden"
        : "";
    };

    hamburger?.addEventListener("click", toggleMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger?.classList.remove("active");
        mobileMenu?.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close mobile menu on resize if open
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenu?.classList.contains("active")) {
        hamburger?.classList.remove("active");
        mobileMenu?.classList.remove("active");
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("resize", handleResize);

    // Current year for footer
    const footerYear = document.querySelector(".footer-bottom p");
    if (footerYear) {
      footerYear.innerHTML = `&copy; ${new Date().getFullYear()} Muhammad Faizan Shurjeel. All rights reserved.`;
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      hamburger?.removeEventListener("click", toggleMenu);
      // Clean up other event listeners if necessary
    };
  }, []);

  return (
    <>
      <header>
        <nav>
          <div className="logo">MFS</div>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#education">Education</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
          </ul>
          <div className="hamburger">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
        <div className="mobile-menu">
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#education">Education</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
          </ul>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Muhammad Faizan Shurjeel</h1>
            <p>Computer Engineering Student & Software Developer</p>

            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/fieryfaizy/"
                target="_blank"
                aria-label="LinkedIn Profile"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/Faizan-Shurjeel"
                target="_blank"
                aria-label="GitHub Profile"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>

            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+92-336-7865823</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>muhammadfaizanshurjeel@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Lahore, Punjab, Pakistan</span>
              </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <a href="#projects" className="cta-button">
                View My Work
              </a>
              <a href="/Faizy-CV.pdf" download className="resume-button">
                <i className="fas fa-download"></i> Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="education">
        <div className="container">
          <h2 className="section-title fade-in">Education</h2>
          <div className="education-card fade-in">
            <h3>Bachelor of Science in Computer Engineering</h3>
            <p>
              <strong>COMSATS University Islamabad, Lahore Campus</strong>
            </p>
            <p>
              <strong>Duration:</strong> Fall 2022 – June 2026
            </p>
            <div className="coursework">
              <span className="course-tag">Operating Systems</span>
              <span className="course-tag">Databases</span>
              <span className="course-tag">Data Structures & Algorithms</span>
              <span className="course-tag">Programming Languages</span>
              <span className="course-tag">Computer Architecture</span>
              <span className="course-tag">Artificial Intelligence</span>
              <span className="course-tag">Computer Networks</span>
              <span className="course-tag">Mobile App Development</span>
              <span className="course-tag">Engineering Entrepreneurship</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <h2 className="section-title fade-in">Projects</h2>
          <div className="projects-grid">
            <div className="project-card fade-in">
              <div className="project-content">
                <h3>GUI Calculator in Pure Rust</h3>
                <p>
                  Dralculator is a graphical user interface calculator
                  application built using the Druid framework in Rust. Offers a
                  simple and interactive way to perform basic arithmetic
                  operations.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">Rust</span>
                  <span className="tech-tag">Druid Framework</span>
                  <span className="tech-tag">GUI</span>
                </div>
                <a
                  href="https://github.com/Faizan-Shurjeel/dralculator"
                  className="github-link"
                >
                  <i className="fab fa-github"></i> View on GitHub
                </a>
              </div>
            </div>

            <div className="project-card fade-in">
              <div className="project-content">
                <h3>Packet Sniffer GUI</h3>
                <p>
                  A network packet sniffer with GUI built using Python&apos;s
                  tkinter. Features customizable sniffing options, real-time
                  packet display, and protocol filtering capabilities.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Tkinter</span>
                  <span className="tech-tag">Network Security</span>
                </div>
                <a
                  href="https://github.com/Faizan-Shurjeel/CodeAlpha_Tasks"
                  className="github-link"
                >
                  <i className="fab fa-github"></i> View on GitHub
                </a>
              </div>
            </div>

            <div className="project-card fade-in">
              <div className="project-content">
                <h3>Pak-Blood-Donors</h3>
                <p>
                  Cross-platform mobile app developed using Flutter to provide
                  blood donors&apos; records. Features clean, responsive UI with
                  Cupertino Design and Supabase backend integration.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">Flutter</span>
                  <span className="tech-tag">Dart</span>
                  <span className="tech-tag">Supabase</span>
                  <span className="tech-tag">Mobile App</span>
                </div>
                <a
                  href="https://github.com/Faizan-Shurjeel/Pak-Blood-Donors"
                  className="github-link"
                >
                  <i className="fab fa-github"></i> View on GitHub
                </a>
              </div>
            </div>

            <div className="project-card fade-in">
              <div className="project-content">
                <h3>Fretch - Video Downloader</h3>
                <p>
                  Flutter and Rust based video downloader application with HTTP
                  server backend. Utilizes yt-dlp for downloading media content
                  from various platforms.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">Flutter</span>
                  <span className="tech-tag">Rust</span>
                  <span className="tech-tag">HTTP Server</span>
                  <span className="tech-tag">yt-dlp</span>
                </div>
                <a
                  href="https://github.com/Faizan-Shurjeel/Fretch"
                  className="github-link"
                >
                  <i className="fab fa-github"></i> View on GitHub
                </a>
              </div>
            </div>

            <div className="project-card fade-in">
              <div className="project-content">
                <h3>Wi-Fi Controlled RC Car</h3>
                <p>
                  Designed and built a WLAN-controlled car using ESP32
                  microcontroller. Competed in IEEE RAS Robo Wars 2024
                  competition.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">ESP32</span>
                  <span className="tech-tag">Wi-Fi</span>
                  <span className="tech-tag">IoT</span>
                  <span className="tech-tag">Robotics</span>
                </div>
              </div>
            </div>

            <div className="project-card fade-in">
              <div className="project-content">
                <h3>QuizMasterPro-Web</h3>
                <p>
                  Collaborated on UI design for a web-based quiz management
                  system built with MERN stack. Features comprehensive quiz
                  creation and management capabilities.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">MongoDB</span>
                  <span className="tech-tag">Express.js</span>
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                </div>
                <a
                  href="https://github.com/Abdullah-Mian/QuizMasterPro_WebEdition"
                  className="github-link"
                >
                  <i className="fab fa-github"></i> View on GitHub
                </a>
              </div>
            </div>

            <div className="project-card fade-in">
              <div className="project-content">
                <h3>Blockchain Experiment</h3>
                <p>
                  Decentralized application developed using Golang and Ethereum
                  blockchain technology. Explores smart contracts and
                  decentralized systems.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">Golang</span>
                  <span className="tech-tag">Ethereum</span>
                  <span className="tech-tag">Blockchain</span>
                  <span className="tech-tag">Smart Contracts</span>
                </div>
                <a
                  href="https://github.com/Faizan-Shurjeel/Blockchain-Experiment-Developing-a-decentralized-application-using-Golang-and-Ethereum"
                  className="github-link"
                >
                  <i className="fab fa-github"></i> View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2 className="section-title fade-in">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category fade-in">
              <i className="fas fa-code"></i>
              <h3>Programming Languages</h3>
              <div className="skill-list">
                <span className="skill-item">C++</span>
                <span className="skill-item">C</span>
                <span className="skill-item">Java</span>
                <span className="skill-item">JavaScript</span>
                <span className="skill-item">Python</span>
                <span className="skill-item">Dart</span>
                <span className="skill-item">Rust</span>
                <span className="skill-item">Golang</span>
              </div>
            </div>

            <div className="skill-category fade-in">
              <i className="fas fa-laptop-code"></i>
              <h3>Web Technologies</h3>
              <div className="skill-list">
                <span className="skill-item">HTML</span>
                <span className="skill-item">CSS</span>
                <span className="skill-item">React JS</span>
                <span className="skill-item">Vue JS</span>
                <span className="skill-item">Express JS</span>
                <span className="skill-item">Node.js</span>
              </div>
            </div>

            <div className="skill-category fade-in">
              <i className="fas fa-mobile-alt"></i>
              <h3>Mobile & Desktop</h3>
              <div className="skill-list">
                <span className="skill-item">Flutter</span>
                <span className="skill-item">Android Studio</span>
                <span className="skill-item">Embedded C/C++</span>
              </div>
            </div>

            <div className="skill-category fade-in">
              <i className="fas fa-database"></i>
              <h3>Databases & Backend</h3>
              <div className="skill-list">
                <span className="skill-item">SQL Server</span>
                <span className="skill-item">PostgreSQL</span>
                <span className="skill-item">Firebase</span>
                <span className="skill-item">Supabase</span>
              </div>
            </div>

            <div className="skill-category fade-in">
              <i className="fas fa-tools"></i>
              <h3>Tools & Software</h3>
              <div className="skill-list">
                <span className="skill-item">Git/GitHub</span>
                <span className="skill-item">GitLab</span>
                <span className="skill-item">Visual Studio</span>
                <span className="skill-item">Wireshark</span>
                <span className="skill-item">MATLAB</span>
                <span className="skill-item">AutoCAD</span>
              </div>
            </div>

            <div className="skill-category fade-in">
              <i className="fas fa-network-wired"></i>
              <h3>Systems & Networks</h3>
              <div className="skill-list">
                <span className="skill-item">GNU/Linux</span>
                <span className="skill-item">Cisco Packet Tracer</span>
                <span className="skill-item">Proteus</span>
                <span className="skill-item">Altera Quartus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="container">
          <h2 className="section-title fade-in">Experience & Activities</h2>
          <div className="experience-timeline">
            <div className="experience-item fade-in">
              <h3>Team Head - Lightroom</h3>
              <p>
                <strong>RAS (Robotics & Automation Society)</strong>
              </p>
              <p>
                Led the Lightroom team, managing photography and visual content
                creation for robotics events and competitions.
              </p>
            </div>

            <div className="experience-item fade-in">
              <h3>Activity Organizer</h3>
              <p>
                <strong>ACM (Association for Computing Machinery)</strong>
              </p>
              <p>
                Organized various computing and technology-related activities,
                workshops, and events for students.
              </p>
            </div>

            <div className="experience-item fade-in">
              <h3>Mock Interview Participant</h3>
              <p>
                <strong>Arbisoft</strong>
              </p>
              <p>
                Participated in mock interviews to enhance technical and soft
                skills for professional development.
              </p>
            </div>

            <div className="experience-item fade-in">
              <h3>Community Volunteer</h3>
              <p>
                <strong>Fruitful Foundation (NGO)</strong>
              </p>
              <p>
                Contributed to welfare work and community development
                initiatives through various volunteer activities.
              </p>
            </div>

            <div className="experience-item fade-in">
              <h3>Web3 Community Member</h3>
              <p>
                <strong>Decentralized Tech Community</strong>
              </p>
              <p>
                Active participant in Web3 and blockchain technology
                discussions, contributing to decentralized application
                development.
              </p>
            </div>

            <div className="experience-item fade-in">
              <h3>Digital Skills Certification</h3>
              <p>
                <strong>Digiskills</strong>
              </p>
              <p>
                Completed comprehensive online skill courses covering various
                aspects of digital technology and programming.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About Me</h3>
              <p>
                Computer Engineering student passionate about software
                development, technology, and innovation.
              </p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#education">Education</a>
                </li>
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#skills">Skills</a>
                </li>
                <li>
                  <a href="#experience">Experience</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>
                <i className="fas fa-phone"></i> +92-336-7865823
              </p>
              <p>
                <i className="fas fa-envelope"></i>{" "}
                muhammadfaizanshurjeel@gmail.com
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i> Lahore, Pakistan
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Muhammad Faizan Shurjeel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
// }
