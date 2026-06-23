<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div class="loading-screen" in:fade={{ duration: 300 }}>
  <div class="loading-outer">
    <div class="loading-spinner"></div>
    <div class="loading-ring"></div>
  </div>
  <p class="loading-text">กำลังโหลดข้อมูล...</p>
  <div class="loading-dots">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</div>

<style>
  .loading-outer {
    position: relative;
    width: 64px;
    height: 64px;
  }

  .loading-spinner {
    width: 64px;
    height: 64px;
    border: 3px solid rgba(6, 182, 212, 0.1);
    border-top-color: var(--cyan);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .loading-ring {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 76px;
    height: 76px;
    border: 2px solid transparent;
    border-bottom-color: var(--violet);
    border-radius: 50%;
    animation: spin 1.5s linear infinite reverse;
  }

  .loading-dots {
    display: flex;
    gap: 0.5rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    background: var(--cyan);
    border-radius: 50%;
    animation: pulse-dot 1.4s ease-in-out infinite;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
    background: var(--violet);
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
    background: var(--emerald);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse-dot {
    0%, 80%, 100% {
      transform: scale(0.6);
      opacity: 0.4;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
