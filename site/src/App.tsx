import { useRef } from "react";
import { projects } from "./data/projects";
import { useSiteAnimations } from "./useSiteAnimations";

const GITHUB = "https://github.com/Faizan-Shurjeel";
const LINKEDIN = "https://www.linkedin.com/in/fieryfaizy/";
const EMAIL = "muhammadfaizanshurjeel@gmail.com";

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  useSiteAnimations(root);

  return (
    <div ref={root}>
      <a className="skip" href="#work">
        Skip to content
      </a>

      <header className="site-header">
        <div className="shell">
          <a className="wordmark" href="#top" aria-label="Home">
            MFS<span>.</span>
          </a>
          <nav className="site-nav" aria-label="Primary">
            <a href="#work">work</a>
            <a href="#about" data-optional="true">
              about
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer noopener">
              github
            </a>
            <a href="/Faizy-CV.pdf">cv</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero shell">
          <p className="hero-eyebrow">Lahore, Pakistan</p>
          <h1>
            <span className="line">
              <span>Muhammad</span>
            </span>
            <span className="line">
              <span>Faizan</span>
            </span>
            <span className="line">
              <span>Shurjeel</span>
            </span>
          </h1>
          <p className="hero-lede">
            Computer engineer working in <strong>Rust</strong>,{" "}
            <strong>embedded systems</strong>, and the layers where software
            meets hardware. Currently finishing a BS in Computer Engineering at
            COMSATS Lahore.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">
              Selected work
            </a>
            <a
              className="btn"
              href={GITHUB}
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            <a
              className="btn"
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <section id="work" className="section shell">
          <div className="section-head reveal">
            <h2>Selected work</h2>
            <span className="count">{projects.length} projects</span>
          </div>

          {projects.map((p) => (
            <article className="project reveal" key={p.id}>
              <div className="project-index">{p.index}</div>
              <div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-tagline">{p.tagline}</p>

                <div className="project-body">
                  <div>
                    <h4>What it does</h4>
                    <p>{p.problem}</p>
                  </div>
                  <div>
                    <h4>The hard part</h4>
                    <p>{p.hardPart}</p>
                  </div>
                </div>

                <ul className="project-stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>

                <div className="project-links">
                  <a href={p.repo} target="_blank" rel="noreferrer noopener">
                    repository ↗
                  </a>
                  {p.extraHref && (
                    <a
                      href={p.extraHref}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {p.extraLabel} ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section id="about" className="section shell">
          <div className="section-head reveal">
            <h2>About</h2>
          </div>

          <div className="about-grid reveal">
            <div className="project-index">07</div>
            <div>
              <div className="about-body">
                <p>
                  I'm a final-year computer engineering student at{" "}
                  <strong>COMSATS University Islamabad, Lahore</strong>. Most of
                  what I build sits close to the machine — desktop applications
                  in Rust, firmware for microcontrollers, and inference that has
                  to run on hardware too small to phone home.
                </p>
                <p>
                  My final year project is a two-layer biometric authentication
                  system running entirely on edge hardware. Outside coursework I
                  competed in <strong>IEEE RAS Robo Wars</strong>, led the
                  Lightroom team at the Robotics &amp; Automation Society, and
                  organised activities for the ACM student chapter.
                </p>
              </div>

              <div className="toolbelt">
                <div>
                  <h4>Systems</h4>
                  <ul>
                    <li>Rust</li>
                    <li>Go</li>
                    <li>C / C++</li>
                    <li>Embedded C++ (ESP32)</li>
                  </ul>
                </div>
                <div>
                  <h4>Application</h4>
                  <ul>
                    <li>TypeScript / React</li>
                    <li>Tauri</li>
                    <li>Flutter / Dart</li>
                    <li>Python</li>
                  </ul>
                </div>
                <div>
                  <h4>Data &amp; infra</h4>
                  <ul>
                    <li>Postgres / Supabase</li>
                    <li>SQLx</li>
                    <li>Git / GitHub Actions</li>
                    <li>GNU/Linux</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <div className="footer-grid">
            <div>
              <h3>Get in touch</h3>
              <p className="footer-blurb">
                Open to graduate roles and internships in systems, embedded, or
                backend engineering.
              </p>
            </div>
            <div className="footer-contact">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href={GITHUB} target="_blank" rel="noreferrer noopener">
                github.com/Faizan-Shurjeel
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer noopener">
                linkedin.com/in/fieryfaizy
              </a>
              <a href="/Faizy-CV.pdf">Download CV (PDF)</a>
            </div>
          </div>
          <p className="footer-note">
            Built with Vite, React and GSAP. No trackers, no cookies.
          </p>
        </div>
      </footer>
    </div>
  );
}
