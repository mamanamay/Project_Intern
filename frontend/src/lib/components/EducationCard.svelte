<script lang="ts">
  import { GraduationCap, Calendar } from '@lucide/svelte';
  import EditableText from './EditableText.svelte';
  import type { CvEducation } from '$lib/api';

  export let education: CvEducation[];
</script>

<section id="education" class="glass-card">
  <h2 class="section-title cyan">
    🎓 การศึกษา
  </h2>

  <div class="edu-list">
    {#each education as edu, i}
      <div class="edu-card">
        <div class="edu-institution">
          <EditableText
            path={`education[${i}].institution`}
            value={edu.institution}
            className="edu-name"
          />
        </div>
        <div class="edu-period">
          <Calendar size={14} />
          <EditableText
            path={`education[${i}].period`}
            value={edu.period}
          />
        </div>
        <div class="edu-details">
          <EditableText
            path={`education[${i}].details`}
            value={edu.details}
            multiline={true}
          />
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .edu-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  :global(.edu-name) {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text-primary);
  }

  .edu-period {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    color: var(--cyan);
    margin-top: 0.4rem;
    font-family: var(--font-heading);
  }

  .edu-details {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }
</style>
