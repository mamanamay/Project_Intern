<script lang="ts">
  import { GraduationCap, Calendar, Plus, Trash2 } from '@lucide/svelte';
  import EditableText from './EditableText.svelte';
  import { isAdmin, addItem, removeItem } from '$lib/stores/cv';
  import type { CvEducation } from '$lib/api';
  import { fade, fly } from 'svelte/transition';

  export let education: CvEducation[];

  function handleAdd() {
    addItem('education', {
      institution: 'สถาบันใหม่',
      period: '',
      details: 'รายละเอียด...'
    });
  }

  function handleRemove(index: number) {
    removeItem('education', index);
  }
</script>

<section id="education" class="glass-card">
  <div class="section-header">
    <h2 class="section-title cyan glitch-text" data-text="🎓 EDUCATION">
      🎓 EDUCATION
    </h2>
    {#if $isAdmin}
      <button class="btn-add" on:click={handleAdd} transition:fade={{ duration: 200 }}>
        <Plus size={14} />
        เพิ่ม
      </button>
    {/if}
  </div>

  <div class="edu-list">
    {#each education as edu, i (i)}
      <div class="edu-card" in:fly={{ x: -20, duration: 300, delay: i * 80 }}>
        <div class="edu-card-header">
          <div class="edu-card-content">
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
      </div>
    {/each}
  </div>

  {#if education.length === 0}
    <p class="empty-text">ยังไม่มีข้อมูลการศึกษา</p>
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

  .edu-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .edu-card-header {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .edu-card-content {
    flex: 1;
    min-width: 0;
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

  .empty-text {
    text-align: center;
    color: var(--text-muted);
    font-size: 0.85rem;
    padding: 1rem;
  }
</style>
