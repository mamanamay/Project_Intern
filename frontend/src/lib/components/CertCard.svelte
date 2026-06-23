<script lang="ts">
  import { Award, Calendar } from '@lucide/svelte';
  import EditableText from './EditableText.svelte';
  import type { CvCertification } from '$lib/api';

  export let certifications: CvCertification[];
</script>

<section class="glass-card">
  <h2 class="section-title violet">
    🏆 ใบรับรอง
  </h2>

  <div class="cert-list">
    {#each certifications as cert, i}
      <div class="cert-badge">
        <div class="cert-icon">
          <Award size={22} />
        </div>
        <div class="cert-info">
          <EditableText
            path={`certifications[${i}].name`}
            value={cert.name}
            className="cert-name"
          />
          <div class="cert-date">
            <Calendar size={12} />
            <EditableText
              path={`certifications[${i}].date`}
              value={cert.date}
            />
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .cert-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .cert-info {
    flex: 1;
    min-width: 0;
  }

  :global(.cert-name) {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--text-primary);
    line-height: 1.4;
  }

  .cert-date {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: var(--violet);
    margin-top: 0.3rem;
    font-family: var(--font-heading);
  }
</style>
