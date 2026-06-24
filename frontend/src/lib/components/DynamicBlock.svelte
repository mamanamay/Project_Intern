<script lang="ts">
  import { Calendar, Trash2, Plus } from '@lucide/svelte';
  import EditableText from './EditableText.svelte';
  import { isAdmin, removeCustomBlock, addCustomBlockItem, removeCustomBlockItem } from '$lib/stores/cv';
  import type { CvCustomBlock } from '$lib/api';
  import { fade, fly } from 'svelte/transition';

  export let block: CvCustomBlock;
  export let blockIndex: number;

  let showDeleteConfirm = false;

  function handleDeleteBlock() {
    removeCustomBlock(blockIndex);
    showDeleteConfirm = false;
  }

  function handleAddItem() {
    addCustomBlockItem(blockIndex);
  }

  function handleRemoveItem(itemIndex: number) {
    removeCustomBlockItem(blockIndex, itemIndex);
  }
</script>

<section class="glass-card dynamic-block" in:fly={{ y: 20, duration: 400 }}>
  <div class="block-header">
    <div class="block-title-group">
      <div class="block-emoji">{block.emoji}</div>
      <EditableText
        path={`customBlocks[${blockIndex}].title`}
        value={block.title}
        className="block-title-text"
      />
    </div>

    {#if $isAdmin}
      <div class="block-actions" transition:fade={{ duration: 200 }}>
        <button class="btn-add" on:click={handleAddItem}>
          <Plus size={14} />
          เพิ่ม
        </button>
        <button class="btn-remove" on:click={() => (showDeleteConfirm = true)}>
          <Trash2 size={14} />
          ลบหัวข้อ
        </button>
      </div>
    {/if}
  </div>

  <div class="block-items">
    {#each block.items as item, i (i)}
      <div class="block-item-card" in:fly={{ x: -20, duration: 300, delay: i * 80 }}>
        <div class="block-item-header">
          <div class="block-item-info">
            <EditableText
              path={`customBlocks[${blockIndex}].items[${i}].title`}
              value={item.title}
              className="block-item-title"
            />
            {#if item.period}
              <div class="block-item-period">
                <Calendar size={13} />
                <EditableText
                  path={`customBlocks[${blockIndex}].items[${i}].period`}
                  value={item.period}
                />
              </div>
            {/if}
          </div>

          {#if $isAdmin}
            <button
              class="btn-remove"
              on:click={() => handleRemoveItem(i)}
              transition:fade={{ duration: 200 }}
            >
              <Trash2 size={12} />
            </button>
          {/if}
        </div>

        <div class="block-item-desc">
          <EditableText
            path={`customBlocks[${blockIndex}].items[${i}].description`}
            value={item.description}
            multiline={true}
          />
        </div>
      </div>
    {/each}

    {#if block.items.length === 0}
      <p class="empty-block-text">ยังไม่มีรายการ — กดปุ่ม "เพิ่ม" เพื่อสร้างรายการใหม่</p>
    {/if}
  </div>
</section>

<!-- Delete confirmation modal -->
{#if showDeleteConfirm}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="modal-overlay" on:click|self={() => (showDeleteConfirm = false)} transition:fade={{ duration: 200 }}>
    <div class="modal-content" in:fly={{ y: 20, duration: 300 }}>
      <h3 class="modal-title">🗑️ ลบหัวข้อ "{block.title}"?</h3>
      <p class="confirm-text">
        หัวข้อนี้และรายการย่อยทั้งหมดจะถูกลบ ไม่สามารถกู้คืนได้
      </p>
      <div class="modal-actions">
        <button class="btn btn-ghost" on:click={() => (showDeleteConfirm = false)}>ยกเลิก</button>
        <button class="btn-danger" on:click={handleDeleteBlock}>
          <Trash2 size={14} />
          ลบทั้งหัวข้อ
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .block-item-info {
    flex: 1;
    min-width: 0;
  }

  .empty-block-text {
    text-align: center;
    color: var(--text-muted);
    font-size: 0.85rem;
    padding: 1.5rem 1rem;
    background: rgba(139, 92, 246, 0.03);
    border-radius: var(--radius);
    border: 1px dashed rgba(139, 92, 246, 0.15);
  }
</style>
