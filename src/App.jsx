import { useEffect, useState, useRef } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";

const navItems = [
  { label: "Overview", href: "/overview" },
  { label: "System", href: "/system" },
  { label: "Hardware", href: "/hardware" },
  { label: "Team", href: "/team" },
];

const metrics = [
  { value: "15x15", label: "Physical board grid" },
  { value: "2", label: "Human and robot players" },
  { value: "Live", label: "Telemetry dashboard" },
  { value: "Demo", label: "Presentation ready" },
];

const architecture = [
  {
    title: "Vision Layer",
    detail:
      "Camera-assisted board state capture for detecting tile placement, turn progress, and board occupancy.",
  },
  {
    title: "Decision Layer",
    detail:
      "Move scoring, candidate word ranking, and game-state validation before the robot commits a physical action.",
  },
  {
    title: "Motion Layer",
    detail:
      "Robot arm control for tile pickup, travel, placement, and safe return-to-home behavior.",
  },
  {
    title: "Dashboard Layer",
    detail:
      "Operator-facing interface for scores, status, recent moves, hardware readiness, and test observations.",
  },
];

const hardwareModules = [
  {
    name: "Board Sensing",
    status: "Prototype",
    copy: "Placeholder for camera module, calibration notes, tile recognition method, and lighting constraints.",
  },
  {
    name: "Tile Handling",
    status: "In progress",
    copy: "Placeholder for gripper design, tile pickup tolerance, rack alignment, and placement repeatability.",
  },
  {
    name: "Robot Motion",
    status: "Prototype",
    copy: "Placeholder for servo/stepper selection, movement envelope, homing routine, and safety limits.",
  },
  {
    name: "Game Engine",
    status: "Planned",
    copy: "Placeholder for dictionary source, scoring rules, move search logic, and invalid-move handling.",
  },
];

const workflow = [
  "Human places tiles on the physical Scrabble board.",
  "The board state is scanned and compared with the previous turn.",
  "The system computes a valid robot move and checks hardware readiness.",
  "The robot picks, moves, and places tiles while the dashboard records the result.",
];

const competitionEvents = [
  { time: "02:41", type: "Robot decision", detail: "Selected AXIS after evaluating 18 candidate placements.", delta: "+21" },
  { time: "02:28", type: "Scoring event", detail: "Human locked GEAR across double-letter lane.", delta: "+17" },
  { time: "02:09", type: "Robot action", detail: "Gripper completed tile placement and returned home.", delta: "OK" },
  { time: "01:52", type: "Vision update", detail: "Board scan confirmed all occupied squares within tolerance.", delta: "12ms" },
  { time: "01:31", type: "Scoring event", detail: "Robot converted QUIZ for the current round high score.", delta: "+32" },
];

const telemetryChannels = [
  ["Vision latency", "12ms"],
  ["Control loop", "08ms"],
  ["Robot link", "Live"],
  ["Board sync", "99%"],
];

const scoreTrend = [
  [0, 92, 86],
  [1, 98, 91],
  [2, 104, 103],
  [3, 112, 109],
  [4, 119, 117],
  [5, 126, 124],
];

const matchStatistics = [
  ["Human action success", "91%"],
  ["Robot action success", "88%"],
  ["Average turn latency", "1.8s"],
  ["Scoring efficiency", "86%"],
];

const highlights = [
  {
    title: "Autonomous Navigation",
    copy: "Controlled movement planning for tile pickup, travel, placement, and safe return-to-home behavior.",
  },
  {
    title: "Computer Vision",
    copy: "Board-state recognition placeholders for camera calibration, tile detection, and square-level validation.",
  },
  {
    title: "Mechanical Design",
    copy: "End-effector, rack alignment, and placement tolerance documentation for a physical game system.",
  },
  {
    title: "Embedded Systems",
    copy: "Microcontroller and actuator integration placeholders for reliable turn execution and telemetry.",
  },
];

const stats = [
  ["Detection Accuracy", "94%", "Placeholder target from board-state tests"],
  ["Response Time", "1.8s", "Average decision-to-action interval"],
  ["Total Matches", "12", "Demo and calibration rounds logged"],
  ["Success Rate", "88%", "Completed robot turns without reset"],
];

const teamMembers = [
  {
    name: "Praveen R.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    color: "#6EE7B7"
  },
  {
    name: "Kumara K.R.K.",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    color: "#3B82F6"
  },
  {
    name: "Fernando A.R.S.P.",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    color: "#F472B6"
  },
  {
    name: "Waththegedara M.C.",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    color: "#FBBF24"
  },
  {
    name: "Peiris M.R.R.A.N.",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
    color: "#34D399"
  },
];

const skillsMatrix = [
  ["Embedded Systems", 4],
  ["Electronics", 3],
  ["CAD Design", 4],
  ["Programming", 5],
  ["Testing", 4],
  ["Documentation", 5],
];

const achievements = [
  "Established the human-versus-robot Scrabble project concept and system architecture.",
  "Created a premium project showcase and dashboard interface for demonstrations.",
  "Defined hardware validation categories for sensing, placement, latency, and safety.",
  "Prepared placeholders for faculty review, team responsibilities, and final documentation.",
];

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--text)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[var(--bg)]"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/system" element={<SystemPage />} />
          <Route path="/hardware" element={<HardwarePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(0,0,0,0.88)] backdrop-blur-md">
      <nav
        className="mx-auto flex w-[min(1120px,calc(100%_-_32px))] flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center sm:gap-6"
        aria-label="Primary navigation"
      >
        <Link to="/" className="group flex items-center gap-3" aria-label="Scrablify home">
          <img 
            src="/assets/logo.png" 
            alt="Scrablify Logo" 
            className="h-9 w-auto transition-transform duration-200 group-hover:scale-95"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </Link>

        <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-[var(--muted)] sm:w-auto sm:justify-end">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `transition-colors duration-200 hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] ${
                  isActive ? "text-[var(--primary)]" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <RealTimeMatchDashboard />
      <ProjectHighlights />
      <StatisticsSection />
    </>
  );
}

function OverviewPage() {
  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Project presentation for a human-versus-robot Scrabble system."
        copy="This page collects the high-level project goals, evaluation context, and measurable presentation placeholders for Scrablify."
      />
      <Overview />
      <RealTimeMatchDashboard />
      <TeamAndNextSteps />
    </>
  );
}

function SystemPage() {
  return (
    <>
      <PageHeader
        eyebrow="System"
        title="Architecture that connects perception, scoring, motion, and supervision."
        copy="Use this page to explain the full technical path from physical board input to robot tile placement."
      />
      <SystemArchitecture />
      <Workflow />
    </>
  );
}

function HardwarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Hardware"
        title="Subsystem documentation for the robot, board, sensors, and tile handling."
        copy="Replace placeholders with component selections, CAD screenshots, wiring notes, tolerances, and test data."
      />
      <HardwareModules />
    </>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.3;
        this.alpha = Math.random() * 0.4 + 0.05;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 231, 183, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 70; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ opacity: 0.6 }}
    />
  );
}

function TeamPage() {
  return (
    <>
      <ParticleCanvas />
      <section className="mx-auto w-[min(1120px,calc(100%_-_32px))] pb-4 pt-16 sm:pt-20 lg:pt-24 text-center flex flex-col items-center">
        <p className="eyebrow">Team</p>
        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-[-0.06em] sm:text-6xl text-white">
          Meet the Scrablify Team
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">
          This page introduces the people, responsibilities, skills, faculty support, and achievements behind the Scrablify hardware project.
        </p>
      </section>
      <TeamIntroduction />
      <TeamMemberCards />
      <TeamStructure />
      <SkillsMatrix />
      <FacultyAdvisor />
      <TeamAchievements />
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%_-_32px))] py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.06em] sm:text-6xl">
        Page not found.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">
        The requested Scrablify page does not exist. Return to the project overview or use the navigation.
      </p>
      <Link className="btn-primary mt-8" to="/">
        Back to home
      </Link>
    </section>
  );
}

function TeamIntroduction() {
  return (
    <Section eyebrow="Team introduction" title="A cross-functional group connecting software, electronics, and physical motion.">
      <Card className="p-7">
        <p className="max-w-4xl text-base leading-8 text-[var(--muted)]">
          Our mission is to turn a familiar board game into a robotics demonstration that is clear,
          measurable, and technically credible. The team works across sensing, control, mechanics,
          software, testing, and documentation to present Scrablify as a complete university-level
          hardware project.
        </p>
      </Card>
    </Section>
  );
}

function TeamMemberCards() {
  const handleMouseMoveCard = (e, cardElement) => {
    if (!cardElement) return;
    const rect = cardElement.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardElement.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  };

  const handleMouseLeaveCard = (cardElement) => {
    if (!cardElement) return;
    cardElement.style.transform = '';
  };

  return (
    <Section eyebrow="Team members" title="Roles and contributions across the robotics stack.">
      <div className="flex flex-wrap justify-center gap-6">
        {teamMembers.map((member) => (
          <div key={member.role} className="team-card-container w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <Card 
              className="p-6 h-full team-card-3d relative overflow-hidden group"
              onMouseMove={(e) => handleMouseMoveCard(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeaveCard(e.currentTarget)}
            >
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140px] h-[80px] rounded-[100%] blur-[30px] opacity-0 transition-opacity duration-500 group-hover:opacity-50 pointer-events-none"
                style={{ backgroundColor: member.color }}
              />
              <div className="flex flex-col gap-5 items-center text-center">
                <div className="avatar-container">
                  <div 
                    className="avatar-ring" 
                    style={{ color: member.color }}
                  />
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=080A12&color=${member.color.replace('#', '')}&size=112`} 
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border border-[var(--border)] relative z-10"
                  />
                </div>
                <div>
                  <p className="text-2xl font-extrabold tracking-[-0.04em]">{member.name}</p>
                  
                  <div className="flex justify-center gap-4 mt-4">
                    <a href="#" className="text-[var(--muted)] hover:text-white transition-colors" aria-label="LinkedIn">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="#" className="text-[var(--muted)] hover:text-white transition-colors" aria-label="GitHub">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-[var(--muted)] text-left">
                    {member.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TeamStructure() {
  return (
    <Section eyebrow="Team structure" title="A simple hierarchy for ownership and communication.">
      <Card className="p-6">
        <div className="grid gap-4 text-center">
          <StructureNode title="Faculty Advisor" subtitle="Guidance, review, and project evaluation" emphasis />
          <div className="mx-auto h-8 w-px bg-[var(--border)]" aria-hidden="true" />
          <StructureNode title="Project Integration Lead" subtitle="System planning and milestone coordination" />
          <div className="mx-auto h-8 w-px bg-[var(--border)]" aria-hidden="true" />
          <div className="grid gap-4 md:grid-cols-3">
            <StructureNode title="Hardware Team" subtitle="Mechanism, CAD, electronics" />
            <StructureNode title="Software Team" subtitle="Dashboard, game logic, telemetry" />
            <StructureNode title="Testing Team" subtitle="Validation, demo flow, documentation" />
          </div>
        </div>
      </Card>
    </Section>
  );
}

function StructureNode({ title, subtitle, emphasis = false }) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        emphasis
          ? "border-[var(--primary)] bg-[rgba(0,106,78,0.14)]"
          : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.035)]"
      }`}
    >
      <p className="font-extrabold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{subtitle}</p>
    </div>
  );
}

function SkillsMatrix() {
  return (
    <Section eyebrow="Skills matrix" title="Capability coverage across the project lifecycle.">
      <Card className="p-6">
        <div className="grid gap-5">
          {skillsMatrix.map(([skill, level]) => (
            <div key={skill} className="grid gap-3 sm:grid-cols-[180px_1fr] sm:items-center">
              <p className="text-sm font-bold">{skill}</p>
              <div className="grid grid-cols-5 gap-2" aria-label={`${skill} level ${level} out of 5`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`h-3 rounded-full ${
                      index < level ? "bg-[var(--primary)]" : "bg-[rgba(255,255,255,0.08)]"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

function FacultyAdvisor() {
  return (
    <Section eyebrow="Faculty advisor" title="Academic guidance for engineering decisions and presentation quality.">
      <Card className="p-7">
        <div className="grid gap-6 md:grid-cols-[160px_1fr] md:items-center">
          <div
            className="grid aspect-square w-40 place-items-center rounded-[2rem] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] text-sm font-bold text-[var(--muted)]"
            aria-label="Faculty advisor photo placeholder"
          >
            Advisor Photo
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-[-0.05em]">Faculty Advisor Name</p>
            <p className="mt-2 text-sm font-bold text-[var(--primary)]">Department / Robotics Lab Placeholder</p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--muted)]">
              Provides technical review, milestone feedback, hardware safety guidance, and support for
              presenting Scrablify as a structured university robotics project.
            </p>
          </div>
        </div>
      </Card>
    </Section>
  );
}

function TeamAchievements() {
  return (
    <Section eyebrow="Team achievements" title="Milestones and accomplishments to document before final review.">
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((achievement, index) => (
          <Card key={achievement} className="p-6">
            <span className="text-sm font-extrabold text-[var(--primary)]">0{index + 1}</span>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{achievement}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function PageHeader({ eyebrow, title, copy }) {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%_-_32px))] pb-4 pt-16 sm:pt-20 lg:pt-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-[-0.06em] sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">{copy}</p>
    </section>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid w-[min(1120px,calc(100%_-_32px))] items-center gap-14 py-20 md:min-h-[calc(100vh-73px)] md:grid-cols-[1.05fr_0.95fr] lg:py-28">
      <div className="animate-rise">
        <p className="eyebrow">First Year Hardware Project</p>
        <h1 className="mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.07em] sm:text-6xl lg:text-8xl">
          Scrablify
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          A robotics hardware project that lets a human play Scrabble against an automated
          robot through vision, motion control, embedded systems, and a live match dashboard.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link className="btn-primary" to="/overview">
            View Live Dashboard
          </Link>
          <Link className="btn-secondary" to="/hardware">
            Explore Hardware
          </Link>
        </div>
      </div>

      <HeroMediaPlaceholder />
    </section>
  );
}

function HeroMediaPlaceholder() {
  return (
    <aside
      className="animate-rise rounded-[2rem] border border-[var(--border)] bg-[var(--bg-soft)] p-4 delay-100"
      aria-label="Hero image or video placeholder"
    >
      <div className="grid min-h-[420px] place-items-center rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[var(--bg)] p-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto grid aspect-video w-full place-items-center rounded-3xl border border-[var(--border)] bg-[rgba(255,255,255,0.035)]">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-[var(--border)] text-sm font-extrabold text-[var(--primary)]">
              Media
            </div>
          </div>
          <p className="mt-6 text-sm font-bold">Hero image / video placeholder</p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Add a final robot-arm demo video, CAD render, or physical prototype photograph here.
          </p>
        </div>
      </div>
    </aside>
  );
}

function RealTimeMatchDashboard() {
  const match = useLiveMatch();
  const progress = Math.min((match.round / 10) * 100, 100);

  return (
    <Section eyebrow="Competition dashboard" title="Real-time robotics match control with timing-screen clarity.">
      <div className="space-y-4">
        <Card className="overflow-hidden p-0">
          <div className="grid lg:grid-cols-[1fr_0.8fr_1fr]">
            <CompetitorPanel
              side="Human Player"
              score={match.human.score}
              accuracy={match.human.accuracy}
              actions={match.human.actions}
              status={match.human.status}
            />

            <div className="border-y border-[var(--border)] p-6 lg:border-x lg:border-y-0">
              <p className="text-center text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--primary)]">
                Live Match State
              </p>
              <div className="mt-6 text-center">
                <p className="font-mono text-6xl font-extrabold tracking-[-0.08em] sm:text-7xl">
                  {formatTimer(match.elapsed)}
                </p>
                <p className="mt-3 text-sm font-bold text-[var(--muted)]">Match Timer</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <MetricPill label="Current Round" value={`R${match.round}`} />
                <MetricPill label="Match Status" value={match.status} />
              </div>

              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  <span>Match Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-[width] duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <CompetitorPanel
              side="Robot"
              score={match.robot.score}
              accuracy={match.robot.accuracy}
              actions={match.robot.actions}
              status={match.robot.status}
              align="right"
            />
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <EventFeed activeIndex={match.eventIndex} />
          <TelemetryPanel />
        </div>

        <AnalyticsPanel />
      </div>
    </Section>
  );
}

function CompetitorPanel({ side, score, accuracy, actions, status, align = "left" }) {
  const isRight = align === "right";

  return (
    <section className={`p-6 sm:p-8 ${isRight ? "lg:text-right" : ""}`} aria-label={`${side} scoreboard`}>
      <div className={`flex items-start justify-between gap-4 ${isRight ? "lg:flex-row-reverse" : ""}`}>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--primary)]">{side}</p>
          <p className="mt-3 text-7xl font-extrabold tracking-[-0.09em] transition-all duration-500 sm:text-8xl">
            {score}
          </p>
        </div>
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-bold text-[var(--text)]">
          {status}
        </span>
      </div>

      <div className="mt-8 grid gap-3">
        <ScoreMetric label="Accuracy" value={`${accuracy}%`} level={accuracy} />
        <ScoreMetric label="Successful Actions" value={actions} level={Math.min(actions * 10, 100)} />
        <ScoreMetric label="Current Status" value={status} level={status === "Executing" ? 74 : 92} />
      </div>
    </section>
  );
}

function ScoreMetric({ label, value, level }) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]">{label}</p>
        <p className="text-sm font-extrabold">{value}</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
        <div
          className="h-full rounded-full bg-[var(--primary)] transition-[width] duration-700 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

function MetricPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-lg font-extrabold">{value}</p>
    </div>
  );
}

function EventFeed({ activeIndex }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold text-[var(--primary)]">Event Feed</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Timestamped scoring, decisions, and robot actions</p>
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" aria-label="Live feed active" />
      </div>

      <ol className="mt-6 space-y-3" aria-label="Live event feed">
        {competitionEvents.map((event, index) => (
          <li
            key={`${event.time}-${event.type}`}
            className={`grid gap-3 rounded-2xl border px-4 py-3 text-sm transition-all duration-500 sm:grid-cols-[64px_1fr_auto] ${
              index === activeIndex
                ? "border-[var(--primary)] bg-[rgba(0,106,78,0.12)]"
                : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.025)]"
            }`}
          >
            <span className="font-mono font-bold text-[var(--muted)]">{event.time}</span>
            <span>
              <strong className="text-[var(--text)]">{event.type}</strong>
              <span className="block leading-6 text-[var(--muted)]">{event.detail}</span>
            </span>
            <span className="font-extrabold text-[var(--primary)]">{event.delta}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function TelemetryPanel() {
  return (
    <Card className="p-6">
      <p className="text-sm font-extrabold text-[var(--primary)]">Minimal Latency Indicators</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {telemetryChannels.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.08)] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
              <span className="text-sm text-[var(--muted)]">{label}</span>
            </div>
            <span className="font-mono text-sm font-extrabold">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AnalyticsPanel() {
  return (
    <Card className="p-6">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-sm font-extrabold text-[var(--primary)]">Score Trend Graph</p>
          <div className="mt-5 rounded-3xl border border-[rgba(255,255,255,0.08)] p-4">
            <ScoreTrendGraph />
          </div>
        </div>

        <div>
          <p className="text-sm font-extrabold text-[var(--primary)]">Match Statistics</p>
          <div className="mt-5 grid gap-3">
            {matchStatistics.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.08)] px-4 py-3">
                <span className="text-sm text-[var(--muted)]">{label}</span>
                <span className="text-sm font-extrabold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function ScoreTrendGraph() {
  const humanPoints = scoreTrend.map(([x, human]) => `${x * 48 + 8},${150 - human * 0.78}`).join(" ");
  const robotPoints = scoreTrend.map(([x, , robot]) => `${x * 48 + 8},${150 - robot * 0.78}`).join(" ");

  return (
    <svg viewBox="0 0 260 160" className="h-56 w-full" role="img" aria-label="Score trend graph for human and robot players">
      {[40, 80, 120].map((y) => (
        <line key={y} x1="0" x2="260" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />
      ))}
      <polyline points={humanPoints} fill="none" stroke="var(--text)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={robotPoints} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {scoreTrend.map(([x, human, robot]) => (
        <g key={x}>
          <circle cx={x * 48 + 8} cy={150 - human * 0.78} r="3.5" fill="var(--text)" />
          <circle cx={x * 48 + 8} cy={150 - robot * 0.78} r="3.5" fill="var(--primary)" />
        </g>
      ))}
    </svg>
  );
}

function useLiveMatch() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  return {
    elapsed: 168 + tick * 3,
    round: 6 + (tick % 5),
    status: tick % 3 === 0 ? "Scanning" : tick % 3 === 1 ? "Executing" : "Scoring",
    eventIndex: tick % competitionEvents.length,
    human: {
      score: 126 + Math.floor(tick / 2) * 3,
      accuracy: 91 + (tick % 3),
      actions: 14 + (tick % 4),
      status: tick % 2 === 0 ? "Ready" : "Reviewing",
    },
    robot: {
      score: 124 + Math.floor((tick + 1) / 2) * 4,
      accuracy: 88 + (tick % 4),
      actions: 13 + (tick % 5),
      status: tick % 3 === 1 ? "Executing" : "Ready",
    },
  };
}

function formatTimer(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function ProjectHighlights() {
  return (
    <Section eyebrow="Project highlights" title="Core engineering disciplines behind the build.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <Card key={item.title} className="p-6">
            <h3 className="text-xl font-extrabold tracking-[-0.03em]">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.copy}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function StatisticsSection() {
  return (
    <Section eyebrow="Statistics" title="Performance placeholders for the final demo report.">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map(([label, value, detail]) => (
          <Card key={label} className="p-6">
            <p className="text-sm font-bold text-[var(--muted)]">{label}</p>
            <p className="mt-4 text-4xl font-extrabold tracking-[-0.06em]">{value}</p>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{detail}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ProjectPanel() {
  return (
    <aside
      className="animate-rise rounded-[2rem] border border-[var(--border)] bg-[var(--bg-soft)] p-5 delay-100 sm:p-6"
      aria-label="Scrablify system summary"
    >
      <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg)] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[var(--primary)]">System Preview</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Robot turn loop</p>
          </div>
          <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-bold text-[var(--text)]">
            Online
          </span>
        </div>

        <div className="mt-8 grid grid-cols-5 gap-2" aria-hidden="true">
          {"SCRABOTWORDSHUMANREADY".slice(0, 25).split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className={`grid aspect-square place-items-center rounded-lg border text-sm font-extrabold ${
                index % 6 === 0
                  ? "border-[var(--primary)] bg-[rgba(0,106,78,0.18)] text-[var(--text)]"
                  : "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-[var(--muted)]"
              }`}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          <StatusRow label="Vision scan" value="Board aligned" />
          <StatusRow label="Robot arm" value="Home position" />
          <StatusRow label="Next action" value="Await human move" />
        </div>
      </div>
    </aside>
  );
}

function StatusRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[rgba(255,255,255,0.08)] px-4 py-3">
      <span className="text-sm text-[var(--muted)]">{label}</span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}

function Overview() {
  return (
    <Section id="overview" eyebrow="Project overview" title="A clear presentation layer for a complex physical system.">
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-6">
            <p className="text-3xl font-extrabold tracking-[-0.05em]">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{metric.label}</p>
          </Card>
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-base leading-8 text-[var(--muted)]">
        This page is designed for project evaluation, lab demonstrations, and portfolio review. Replace
        each placeholder with measured values, component choices, diagrams, and team documentation as
        the hardware matures.
      </p>
    </Section>
  );
}

function SystemArchitecture() {
  return (
    <Section id="system" eyebrow="System architecture" title="Four layers from board perception to robot action.">
      <div className="grid gap-4 lg:grid-cols-4">
        {architecture.map((item, index) => (
          <Card key={item.title} className="p-6">
            <span className="text-sm font-extrabold text-[var(--primary)]">0{index + 1}</span>
            <h3 className="mt-5 text-xl font-extrabold tracking-[-0.03em]">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.detail}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function HardwareModules() {
  return (
    <Section id="hardware" eyebrow="Hardware modules" title="Document each subsystem with engineering intent.">
      <div className="grid gap-4 md:grid-cols-2">
        {hardwareModules.map((module) => (
          <Card key={module.name} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-extrabold tracking-[-0.03em]">{module.name}</h3>
              <span className="shrink-0 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-bold text-[var(--primary)]">
                {module.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{module.copy}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Workflow() {
  return (
    <Section id="workflow" eyebrow="Workflow" title="A repeatable turn cycle for demonstration and testing.">
      <ol className="grid gap-4 md:grid-cols-4">
        {workflow.map((step, index) => (
          <Card key={step} className="p-6">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--primary)] text-sm font-extrabold text-[var(--bg)]">
              {index + 1}
            </span>
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{step}</p>
          </Card>
        ))}
      </ol>
    </Section>
  );
}

function TeamAndNextSteps() {
  return (
    <Section eyebrow="Presentation ready" title="Built for juries, demos, and future iteration.">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-7">
          <h3 className="text-2xl font-extrabold tracking-[-0.04em]">Team documentation placeholder</h3>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Add team member roles, contribution areas, mentor notes, parts list ownership, and final
            presentation responsibilities. Keep this section concise and evidence-driven.
          </p>
        </Card>
        <Card className="p-7">
          <h3 className="text-2xl font-extrabold tracking-[-0.04em]">Next engineering milestones</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
            <li>Finalize camera calibration and board-state accuracy tests.</li>
            <li>Document gripper tolerance and failed-pickup recovery behavior.</li>
            <li>Connect live telemetry once hardware APIs are available.</li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="mx-auto w-[min(1120px,calc(100%_-_32px))] py-16 sm:py-20 lg:py-24">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-[-0.055em] sm:text-5xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Card({ className = "", children }) {
  return (
    <article className={`rounded-[1.5rem] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] ${className}`}>
      {children}
    </article>
  );
}

function Footer() {
  return (
    <footer className="mx-auto grid w-[min(1120px,calc(100%_-_32px))] gap-4 border-t border-[var(--border)] py-8 text-sm text-[var(--muted)] md:grid-cols-3">
      <div>
        <p className="font-bold text-[var(--text)]">Team Information</p>
        <p className="mt-2">Scrablify robotics project team placeholder</p>
      </div>
      <div>
        <p className="font-bold text-[var(--text)]">Faculty Information</p>
        <p className="mt-2">Faculty mentor / department placeholder</p>
      </div>
      <div>
        <p className="font-bold text-[var(--text)]">Project Year</p>
        <p className="mt-2">First Year Hardware Project</p>
      </div>
    </footer>
  );
}

export default App;
