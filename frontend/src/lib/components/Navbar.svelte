<script lang="ts">
  import { activeTab } from '$lib/stores/ui';
</script>

<nav class="navbar">
  <div class="navbar-inner">
    <div class="navbar-links">
      <button class="nav-btn" class:active={$activeTab === 'all'} on:click={() => $activeTab = 'all'} title="หน้าหลัก">🌈 All</button>
      <button class="nav-btn" class:active={$activeTab === 'profile'} on:click={() => $activeTab = 'profile'} title="โปรไฟล์">👤 Profile</button>
      <button class="nav-btn" class:active={$activeTab === 'education'} on:click={() => $activeTab = 'education'} title="การศึกษา">🎓 Education</button>
      <button class="nav-btn" class:active={$activeTab === 'achievements'} on:click={() => $activeTab = 'achievements'} title="ผลงาน">🏆 Awards</button>
      <button class="nav-btn" class:active={$activeTab === 'skills'} on:click={() => $activeTab = 'skills'} title="ทักษะ">⚡ Skills</button>
      <button class="nav-btn" class:active={$activeTab === 'projects'} on:click={() => $activeTab = 'projects'} title="โปรเจค">🚀 Projects</button>
      <button class="nav-btn" class:active={$activeTab === 'experience'} on:click={() => $activeTab = 'experience'} title="ประสบการณ์">💼 Experience</button>
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(10, 14, 26, 0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-color);
    padding: 0.75rem 0;
    box-shadow: 0 4px 20px rgba(6, 182, 212, 0.1);
  }

  .navbar-inner {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .navbar-links {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-btn {
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    font-family: var(--font-heading), sans-serif;
    font-size: 0.9rem;
    color: var(--text-secondary);
    padding: 0.5rem 1rem;
    border-radius: 999px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .nav-btn:hover {
    color: var(--cyan);
    background: rgba(6, 182, 212, 0.05);
    border-color: rgba(6, 182, 212, 0.2);
    text-shadow: 0 0 8px var(--cyan-glow);
  }

  .nav-btn.active {
    color: var(--cyan);
    background: rgba(6, 182, 212, 0.15);
    border-color: var(--cyan);
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
  }
</style>
