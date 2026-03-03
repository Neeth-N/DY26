/* ═══════════════════════════════════════════
   DAKSHA YANTHRA '26 — RETRO ARCADE JS
   ═══════════════════════════════════════════ */

// ── Maze Canvas Background ──
function initMazeCanvas() {
  const canvas = document.getElementById("mazeCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const cellSize = 28;

  // Simple maze pattern generator
  function generateMaze(cols, rows) {
    const grid = [];
    for (let y = 0; y < rows; y++) {
      grid[y] = [];
      for (let x = 0; x < cols; x++) {
        // Create a classic Pac-Man-like wall pattern
        if (y === 0 || y === rows - 1 || x === 0 || x === cols - 1) {
          grid[y][x] = 1; // Border walls
        } else if (
          (x % 4 === 0 && y % 4 !== 0 && y % 2 === 0) ||
          (y % 4 === 0 && x % 4 !== 0 && x % 2 === 0)
        ) {
          grid[y][x] = 1; // Inner walls
        } else if (x % 6 === 3 && y % 6 === 3) {
          grid[y][x] = 1; // Scattered blocks
        } else {
          grid[y][x] = 0; // Path
        }
      }
    }
    return grid;
  }

  const cols = Math.ceil(canvas.width / cellSize) + 2;
  const rows = Math.ceil(canvas.height / cellSize) + 2;
  const maze = generateMaze(cols, rows);

  // Dots
  const dots = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (maze[y][x] === 0 && Math.random() > 0.5) {
        dots.push({
          x: x * cellSize + cellSize / 2,
          y: y * cellSize + cellSize / 2,
        });
      }
    }
  }

  // Animated Pac-Man on canvas
  let pacX = cellSize * 2;
  let pacY = cellSize * 2;
  let pacDir = 0; // 0=right, 1=down, 2=left, 3=up
  let mouthOpen = 0;
  let mouthDir = 1;

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw maze walls
    ctx.fillStyle = "#2121de";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (maze[y][x] === 1) {
          ctx.fillRect(
            x * cellSize + 1,
            y * cellSize + 1,
            cellSize - 2,
            cellSize - 2,
          );
        }
      }
    }

    // Draw dots
    ctx.fillStyle = "#ffb8ae";
    dots.forEach((dot) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Pac-Man
    const centerX = pacX + cellSize / 2;
    const centerY = pacY + cellSize / 2;
    const radius = cellSize / 2 - 2;
    mouthOpen += 0.08 * mouthDir;
    if (mouthOpen > 0.35 || mouthOpen < 0.02) mouthDir *= -1;

    const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
    const startAngle = angles[pacDir] + mouthOpen;
    const endAngle = angles[pacDir] - mouthOpen + Math.PI * 2;

    ctx.fillStyle = "#ffe600";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();

    // Move Pac-Man
    const speed = 1;
    const dirMoves = [
      [speed, 0],
      [0, speed],
      [-speed, 0],
      [0, -speed],
    ];
    pacX += dirMoves[pacDir][0];
    pacY += dirMoves[pacDir][1];

    // Random direction changes
    if (
      Math.random() < 0.01 ||
      pacX > canvas.width ||
      pacX < 0 ||
      pacY > canvas.height ||
      pacY < 0
    ) {
      pacDir = Math.floor(Math.random() * 4);
      if (pacX > canvas.width) pacX = 0;
      if (pacX < 0) pacX = canvas.width;
      if (pacY > canvas.height) pacY = 0;
      if (pacY < 0) pacY = canvas.height;
    }

    requestAnimationFrame(drawFrame);
  }

  drawFrame();
}

// ── Navbar Scroll Effect ──
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // Close on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });
}

// ── Smooth Scroll ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = 70;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}

// ── Stat Counter Animation ──
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  let animated = false;

  function animateCounters() {
    if (animated) return;
    const heroStats = document.querySelector(".hero-stats");
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animated = true;
      statNumbers.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"));
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased).toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      });
    }
  }

  window.addEventListener("scroll", animateCounters);
  animateCounters();
}

// ── Scroll Reveal (GSAP) ──
function initScrollReveal() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    // Fallback: simple IntersectionObserver
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((el) => observer.observe(el));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Reveal elements
  gsap.utils.toArray(".reveal").forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        delay: (i % 4) * 0.1,
      },
    );
  });

  // Parallax hero
  gsap.to(".hero-content", {
    y: 100,
    opacity: 0.3,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Section titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.fromTo(
      title,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
        },
      },
    );
  });
}

// ── Event Filter ──
function initEventFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const eventCards = document.querySelectorAll(".event-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      eventCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.classList.remove("hidden");
          card.style.display = "";
          // Re-trigger animation
          card.style.animation = "none";
          card.offsetHeight; // Force reflow
          card.style.animation = "";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// ── Floating Ghosts ──
function initFloatingGhosts() {
  const container = document.getElementById("floatingGhosts");
  if (!container) return;

  const ghostChars = ["👻"];
  const colors = ["#ff0000", "#ffb8ff", "#00ffff", "#ffb852"];

  function spawnGhost() {
    const ghost = document.createElement("div");
    ghost.className = "floating-ghost";
    ghost.textContent = ghostChars[0];
    ghost.style.left = Math.random() * 100 + "%";
    ghost.style.animationDuration = 12 + Math.random() * 15 + "s";
    ghost.style.animationDelay = Math.random() * 5 + "s";
    ghost.style.fontSize = 16 + Math.random() * 20 + "px";
    ghost.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    container.appendChild(ghost);

    // Remove after animation
    setTimeout(() => {
      ghost.remove();
    }, 30000);
  }

  // Spawn ghosts periodically
  setInterval(spawnGhost, 4000);
  // Initial batch
  for (let i = 0; i < 5; i++) {
    setTimeout(spawnGhost, i * 800);
  }
}

// ── Pixel Cursor Trail (subtle) ──
function initCursorTrail() {
  if (window.innerWidth < 768) return; // Skip on mobile

  let lastX = 0,
    lastY = 0;
  let throttle = false;

  document.addEventListener("mousemove", (e) => {
    if (throttle) return;
    throttle = true;
    setTimeout(() => (throttle = false), 80);

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (Math.abs(dx) + Math.abs(dy) < 20) return;
    lastX = e.clientX;
    lastY = e.clientY;

    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 4px;
      height: 4px;
      background: var(--pac-yellow);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      opacity: 0.6;
      transition: all 0.5s ease;
    `;
    document.body.appendChild(dot);

    requestAnimationFrame(() => {
      dot.style.opacity = "0";
      dot.style.transform = "scale(0)";
    });

    setTimeout(() => dot.remove(), 600);
  });
}

// ── "Coin Insert" Sound Effect (visual only) ──
function initCoinEffect() {
  const coinBtn = document.querySelector(".btn-insert-coin");
  if (!coinBtn) return;

  coinBtn.addEventListener("click", (e) => {
    // Create coin animation
    const coin = document.createElement("div");
    coin.textContent = "🪙";
    coin.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      font-size: 32px;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.6s ease;
    `;
    document.body.appendChild(coin);

    requestAnimationFrame(() => {
      coin.style.transform = "translateY(-60px) scale(0.3) rotate(360deg)";
      coin.style.opacity = "0";
    });

    setTimeout(() => coin.remove(), 700);
  });
}

// ── Konami Code Easter Egg ──
function initKonamiCode() {
  const code = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let index = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === code[index]) {
      index++;
      if (index === code.length) {
        index = 0;
        activateKonami();
      }
    } else {
      index = 0;
    }
  });

  function activateKonami() {
    document.body.style.transition = "filter 0.5s";
    document.body.style.filter = "hue-rotate(180deg)";

    const msg = document.createElement("div");
    msg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--font-pixel);
      font-size: 24px;
      color: #00ff00;
      text-shadow: 0 0 20px #00ff00;
      z-index: 99999;
      padding: 20px 40px;
      background: rgba(0,0,0,0.9);
      border: 2px solid #00ff00;
      border-radius: 8px;
    `;
    msg.textContent = "🎮 +30 LIVES!";
    document.body.appendChild(msg);

    setTimeout(() => {
      document.body.style.filter = "";
      msg.remove();
    }, 2500);
  }
}

// ── Initialize Everything ──
document.addEventListener("DOMContentLoaded", () => {
  initMazeCanvas();
  initNavbar();
  initSmoothScroll();
  initStatCounters();
  initScrollReveal();
  initEventFilter();
  initFloatingGhosts();
  initCursorTrail();
  initCoinEffect();
  initKonamiCode();
});
