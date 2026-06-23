<script lang="ts">
  import { Trophy, FolderOpen, Calendar } from '@lucide/svelte';
  import EditableText from './EditableText.svelte';
  import type { CvAchievement } from '$lib/api';

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

  $: grouped = groupByCategory(achievements);
</script>

<section class="glass-card">
  <h2 class="section-title amber">
    🏅 ผลงานและเกียรติบัตร
  </h2>

  {#each Object.entries(grouped) as [category, items]}
    <div class="achievement-group">
      <div class="achievement-group-title">
        <FolderOpen size={16} />
        {category}
      </div>

      {#each items as item}
        {@const idx = getOriginalIndex(item)}
        <div class="achievement-item">
          <div class="achievement-title">
            <Trophy size={14} class="trophy-icon" />
            <EditableText
              path={`achievements[${idx}].title`}
              value={item.title}
              className="achievement-text"
            />
          </div>
          <div class="achievement-date">
            <Calendar size={12} />
            <EditableText
              path={`achievements[${idx}].date`}
              value={item.date}
            />
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

  .achievement-date {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: var(--amber);
    font-family: var(--font-heading);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .empty-text {
    text-align: center;
    color: var(--text-muted);
    font-size: 0.85rem;
    padding: 1rem;
  }
</style>
