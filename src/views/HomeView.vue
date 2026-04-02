<template>
  <div class="landing-page">
    <!-- Section 1: Hero -->
    <section class="section hero">
      <div class="reveal">
        <span class="meta">System Initialized // 001</span>
        <h1 class="hero-title">Beyond <span class="glow">Human</span> Interface.</h1>
        <p class="hero-subtitle">
          Unified hardware-to-cloud synchronization. Manage geolocation, 
          real-time notifications, and secure data transmission in a surgical environment.
        </p>
        <div class="hero-actions">
          <router-link to="/form" class="void-btn primary">Initialize Link</router-link>
          <a href="#features" class="void-btn secondary">Explore Specs</a>
        </div>
      </div>
      <div class="scroll-indicator">Scroll to Scan</div>
    </section>

    <!-- Section 2: The Problem (Noise) -->
    <section class="section noise">
      <div class="content-wrapper">
        <h2 class="section-title">The Noise <span class="dim">vs</span> The Signal.</h2>
        <div class="grid-2">
          <div class="text-block">
            <p>Modern web applications are disconnected from the hardware they inhabit. Geolocation is raw data, notifications are interruptions, and forms are friction.</p>
          </div>
          <div class="text-block accent-border">
            <p><strong>VoidCore</strong> filters the chaos. We bridge the gap between physical sensors and digital intelligence through a minimalist, reactive layer.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Features (The Core) -->
    <section id="features" class="section features">
      <div class="content-wrapper">
        <span class="meta">Core Capabilities</span>
        <h2 class="section-title">System Functions</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <span class="f-num">01</span>
            <h3>Geo Pulse</h3>
            <p>Satellite-grade coordinate tracking with real-time reactive updates. Precision mapping of your physical node.</p>
          </div>
          <div class="feature-card active">
            <span class="f-num">02</span>
            <h3>Signal Flow</h3>
            <p>Multi-step validated data transmission. Every packet is checked, every state is persistent.</p>
          </div>
          <div class="feature-card">
            <span class="f-num">03</span>
            <h3>Neural Alerts</h3>
            <p>Instant hardware-level notifications. Synchronize system alerts directly with the user's focus.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Architecture (Manifesto) -->
    <section class="section manifesto">
      <div class="content-wrapper">
        <div class="manifesto-card">
          <h2 class="section-title">Technological Manifesto</h2>
          <div class="spec-list">
            <div class="spec-row">
              <span class="s-label">Core</span>
              <span class="s-val">Vue 3 Composition API</span>
            </div>
            <div class="spec-row">
              <span class="s-label">State</span>
              <span class="s-val">Pinia Reactive Stores</span>
            </div>
            <div class="spec-row">
              <span class="s-label">Protocol</span>
              <span class="s-val">REST Axios JSON V1</span>
            </div>
            <div class="spec-row">
              <span class="s-label">UI Kit</span>
              <span class="s-val">Surgical Minimalism CSS</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Final CTA -->
    <section class="section cta">
      <div class="content-wrapper text-center">
        <h2 class="final-title">Ready to <span class="glow">Sync</span>?</h2>
        <p class="final-desc">Enter the void and begin your hardware synchronization journey.</p>
        <router-link to="/demo" class="big-void-btn">Access System Hardware</router-link>
      </div>
    </section>

    <footer class="footer">
      <span class="f-text">© 2026 Void Industries // All Rights Reserved</span>
      <span class="f-text">Stability: Optimal</span>
    </footer>
  </div>
</template>

<style scoped>
/* Les styles restent identiques */
.landing-page {
  display: flex;
  flex-direction: column;
}

.section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  padding: var(--app-padding-y) 0;
  border-bottom: 1px solid #111;
}

.content-wrapper {
  width: 100%;
}

.meta {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--accent-color);
  letter-spacing: 0.4em;
  display: block;
  margin-bottom: 1.5rem;
}

/* Hero Section */
.hero {
  min-height: 90vh;
  position: relative;
}

.hero-subtitle {
  font-size: 1.4rem;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.5;
  margin-bottom: 3rem;
}

.hero-actions {
  display: flex;
  gap: 2rem;
}

.void-btn {
  padding: 1.2rem 2.5rem;
  text-transform: uppercase;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-decoration: none;
  transition: all 0.4s ease;
  display: inline-block;
  text-align: center;
}

.void-btn.primary {
  background: var(--text-primary);
  color: #000;
}

.void-btn.secondary {
  border: 1px solid #222;
  color: var(--text-secondary);
}

.void-btn:hover {
  box-shadow: 0 0 30px var(--accent-glow);
  border-color: var(--accent-color);
  color: var(--text-primary);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 0;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: #333;
  letter-spacing: 0.5em;
  writing-mode: vertical-lr;
  animation: bounce 2s infinite;
}

/* Noise Section */
.dim { color: #333; }

.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
}

.text-block p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.accent-border {
  border-left: 1px solid var(--accent-color);
  padding-left: 3rem;
}

/* Features Section */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  border: 1px solid #111;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.5s ease;
}

.feature-card.active {
  border-color: var(--accent-color);
  background: rgba(0, 240, 255, 0.02);
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent-color);
}

.f-num {
  font-family: var(--font-mono);
  color: #222;
  font-size: 0.8rem;
}

.feature-card h3 {
  font-size: 1.5rem;
}

.feature-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Manifesto Section */
.manifesto-card {
  border: 1px solid #111;
  padding: clamp(2rem, 5vw, 5rem);
}

.spec-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #111;
  padding-bottom: 1rem;
}

.s-label { font-family: var(--font-mono); font-size: 0.7rem; color: #444; }
.s-val { font-family: var(--font-mono); font-size: 1rem; color: var(--text-primary); }

/* CTA Section */
.cta { border-bottom: none; min-height: 60vh; }
.text-center { text-align: center; }
.final-desc { font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 4rem; }

.big-void-btn {
  font-family: var(--font-mono);
  font-size: clamp(1rem, 4vw, 1.5rem);
  color: var(--text-primary);
  text-decoration: none;
  border: 1px solid #222;
  padding: 1.5rem 3rem;
  transition: all 0.5s ease;
  display: inline-block;
}

.big-void-btn:hover {
  border-color: var(--accent-color);
  text-shadow: 0 0 20px var(--accent-glow);
  box-shadow: 0 0 40px var(--accent-glow);
}

/* Footer */
.footer {
  padding: 4rem 0;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #111;
  gap: 2rem;
  flex-wrap: wrap;
}

.f-text {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: #333;
  letter-spacing: 0.2em;
}

/* Animations */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 768px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .void-btn {
    width: 100%;
  }

  .accent-border {
    padding-left: 1.5rem;
  }

  .scroll-indicator {
    display: none;
  }
}
</style>
