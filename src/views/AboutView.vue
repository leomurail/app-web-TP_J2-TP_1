<template>
  <div class="about">
    <span class="meta">SYSTEM_MANIFESTO</span>
    <h2 class="title">About the void</h2>
    <div class="content">
      <p>This interface is a manifestation of surgical minimalism. Every pixel serves a purpose, every interaction is a signal through the noise.</p>
      <p>Designed for the next generation of web applications where clarity and performance are paramount.</p>
      
      <div class="specs">
        <div class="spec-item">
          <span class="spec-label">CORE</span>
          <span class="spec-value">VUE_3_COMPOSITION</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">THEME</span>
          <span class="spec-value">SURGICAL_DARK</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">STATE</span>
          <span class="spec-value">PINIA_PERSISTENT</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.meta {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--accent-color);
  letter-spacing: 0.3em;
}

.title {
  font-size: var(--font-size-section-title);
  margin: 1rem 0 3rem;
  line-height: 1.1;
  word-break: break-word;
}

.content {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

p {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;
}

.specs {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #111;
  padding-bottom: 1rem;
}

.spec-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: #444;
}

.spec-value {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-primary);
}
</style>
