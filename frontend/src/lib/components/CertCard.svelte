<script lang="ts">
  import { Award, Calendar, Plus, Trash2 } from '@lucide/svelte';
  import EditableText from './EditableText.svelte';
  import { isAdmin, addItem, removeItem } from '$lib/stores/cv';
  import type { CvCertification } from '$lib/api';
  import { fade, fly } from 'svelte/transition';

  export let certifications: CvCertification[];

  function handleAdd() {
    addItem('certifications', {
      name: 'ใบรับรองใหม่',
      date: ''
    });
  }

  function handleRemove(index: number) {
    removeItem('certifications', index);
  }
</script>

<section class="glass-card">
  <div class="section-header">
    <h2 class="section-title violet glitch-text" data-text="📜 CERTIFICATIONS">
      📜 CERTIFICATIONS
    </h2>
    {#if $isAdmin}
      <button class="btn-add" on:click={handleAdd} transition:fade={{ duration: 200 }}>
        <Plus size={14} />
        เพิ่ม
      </button>
    {/if}
  </div>

  <div class="cert-list">
    {#each certifications as cert, i (i)}
      <div class="cert-badge" in:fly={{ x: -20, duration: 300, delay: i * 80 }}>
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
        {#if $isAdmin}
          <button
            class="btn-remove"
            on:click={() => handleRemove(i)}
            transition:fade={{ duration: 200 }}
          >
            <Trash2 size={12} />
          </button>
        {/if}
      </div>
    {/each}
  </div>

  {#if certifications.length === 0}
    <p class="empty-text">ยังไม่มีข้อมูลใบรับรอง</p>
  {/if}
</section>

<style>
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .section-header .section-title {
    margin-bottom: 0;
  }

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

  .empty-text {
    text-align: center;
    color: var(--text-muted);
    font-size: 0.85rem;
    padding: 1rem;
  }
</style>
