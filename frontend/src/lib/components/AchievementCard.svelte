<script lang="ts">
  import { Trophy, FolderOpen, Calendar, Plus, Trash2 } from '@lucide/svelte';
  import EditableText from './EditableText.svelte';
  import { isAdmin, addItem, removeItem } from '$lib/stores/cv';
  import type { CvAchievement } from '$lib/api';
  import { fade, fly } from 'svelte/transition';

  export let achievements: CvAchievement[];

  interface GroupedAchievements {
    [category: string]: CvAchievement[];
  }

  function groupByCategory(items: CvAchievement[]): GroupedAchievements {
    const groups: GroupedAchievements = {};
    items.forEach((item) => {
      const cat = item.category || 'อื่นๆ';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(item);
    });
    return groups;
  }

  function getOriginalIndex(item: CvAchievement): number {
    return achievements.indexOf(item);
  }

  function handleAdd() {
    addItem('achievements', {
      title: 'ผลงานใหม่',
      date: '',
      category: 'อื่นๆ'
    });
  }

  function handleRemove(index: number) {
    removeItem('achievements', index);
  }

  $: grouped = groupByCategory(achievements);
</script>

<section class="glass-card">
  <div class="section-header">
    <h2 class="section-title amber">
      🏅 ผลงานและเกียรติบัตร
    </h2>
    {#if $isAdmin}
      <button class="btn-add" on:click={handleAdd} transition:fade={{ duration: 200 }}>
        <Plus size={14} />
        เพิ่ม
      </button>
    {/if}
  </div>

  {#each Object.entries(grouped) as [category, items]}
    <div class="achievement-group">
      <div class="achievement-group-title">
        <FolderOpen size={16} />
        {category}
      </div>

      {#each items as item}
        {@const idx = getOriginalIndex(item)}
        <div class="achievement-item" in:fly={{ x: -10, duration: 250 }}>
          <div class="achievement-title">
            <Trophy size={14} class="trophy-icon" />
            <EditableText
              path={`achievements[${idx}].title`}
              value={item.title}
              className="achievement-text"
            />
          </div>
          <div class="achievement-right">
            <div class="achievement-date">
              <Calendar size={12} />
              <EditableText
                path={`achievements[${idx}].date`}
                value={item.date}
              />
            </div>
            {#if $isAdmin}
              <button
                class="btn-remove"
                on:click={() => handleRemove(idx)}
                transition:fade={{ duration: 200 }}
              >
                <Trash2 size={12} />
              </button>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/each}

  {#if achievements.length === 0}
    <p class="empty-text">ยังไม่มีข้อมูลผลงาน</p>
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

  .achievement-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
  }

  .achievement-title :global(svg) {
    color: var(--amber);
    flex-shrink: 0;
  }

  :global(.achievement-text) {
    font-size: 0.85rem;
    color: var(--text-primary);
    line-height: 1.4;
  }

  .achievement-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .achievement-date {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: var(--amber);
    font-family: var(--font-heading);
    white-space: nowrap;
  }

  .empty-text {
    text-align: center;
    color: var(--text-muted);
    font-size: 0.85rem;
    padding: 1rem;
  }
</style>
