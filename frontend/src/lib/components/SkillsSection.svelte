<script lang="ts">
  import { Code, Wrench } from '@lucide/svelte';
  import EditableText from './EditableText.svelte';
  import { isAdmin } from '$lib/stores/cv';
  import type { CvSkills } from '$lib/api';
  import { fade } from 'svelte/transition';

  export let skills: CvSkills;

  function splitSkills(raw: string): string[] {
    return raw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  $: programmingSkills = splitSkills(skills.programming);
  $: toolsSkills = splitSkills(skills.tools);
</script>

<section id="skills" class="glass-card">
  <h2 class="section-title emerald glitch-text" data-text="⚡ SKILLS">
    ⚡ SKILLS
  </h2>

  <div class="skills-grid">
    <div class="skills-category">
      <h3 class="category-title">
        <Code size={18} />
        ภาษาโปรแกรมมิ่ง
      </h3>

      {#if $isAdmin}
        <div class="edit-raw" transition:fade={{ duration: 200 }}>
          <EditableText
            path="skills.programming"
            value={skills.programming}
            className="raw-text"
          />
        </div>
      {:else}
        <div class="tags-container">
          {#each programmingSkills as skill, i}
            <span
              class="skill-tag cyan"
              style="animation-delay: {i * 0.05}s"
              in:fade={{ delay: i * 50, duration: 300 }}
            >
              {skill}
            </span>
          {/each}
        </div>
      {/if}
    </div>

    <div class="skills-category">
      <h3 class="category-title">
        <Wrench size={18} />
        เครื่องมือและ Frameworks
      </h3>

      {#if $isAdmin}
        <div class="edit-raw" transition:fade={{ duration: 200 }}>
          <EditableText
            path="skills.tools"
            value={skills.tools}
            className="raw-text"
          />
        </div>
      {:else}
        <div class="tags-container">
          {#each toolsSkills as skill, i}
            <span
              class="skill-tag violet"
              style="animation-delay: {i * 0.05}s"
              in:fade={{ delay: i * 50, duration: 300 }}
            >
              {skill}
            </span>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 640px) {
    .skills-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .category-title {
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .category-title :global(svg) {
    color: var(--emerald);
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .edit-raw {
    padding: 0.5rem;
    background: rgba(16, 185, 129, 0.05);
    border-radius: var(--radius);
    border: 1px solid rgba(16, 185, 129, 0.1);
  }

  :global(.raw-text) {
    font-size: 0.85rem;
    color: var(--text-secondary);
    word-break: break-word;
  }
</style>
