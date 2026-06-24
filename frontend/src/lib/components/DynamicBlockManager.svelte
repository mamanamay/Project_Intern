<script lang="ts">
  import { Plus } from '@lucide/svelte';
  import DynamicBlock from './DynamicBlock.svelte';
  import { isAdmin, addCustomBlock } from '$lib/stores/cv';
  import type { CvCustomBlock } from '$lib/api';
  import { fade, fly } from 'svelte/transition';

  export let blocks: CvCustomBlock[];

  let showCreateModal = false;
  let newTitle = '';
  let selectedEmoji = '💼';

  const emojiOptions = [
    '💼', '🏢', '👨‍💻', '🔬', '📊', '🎯',
    '🌟', '📝', '🎓', '🏅', '🔧', '📚',
    '🚀', '💡', '🎨', '🤝', '🏆', '⚡',
    '🔐', '🌐', '📱', '🛡️', '🧪', '🎮'
  ];

  function handleCreate() {
    if (newTitle.trim()) {
      addCustomBlock(newTitle.trim(), selectedEmoji);
      newTitle = '';
      selectedEmoji = '💼';
      showCreateModal = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleCreate();
    } else if (e.key === 'Escape') {
      showCreateModal = false;
    }
  }
</script>

<!-- Render all custom blocks -->
{#each blocks as block, i (block.id)}
  <div in:fly={{ y: 30, duration: 500, delay: i * 100 }}>
    <DynamicBlock {block} blockIndex={i} />
  </div>
{/each}

<!-- Admin: Create new block button -->
{#if $isAdmin}
  <div transition:fade={{ duration: 300 }}>
    <button class="btn-add-block" on:click={() => (showCreateModal = true)}>
      <Plus size={20} />
      สร้างหัวข้อใหม่
    </button>
  </div>
{/if}

<!-- Create block modal -->
{#if showCreateModal}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="modal-overlay" on:click|self={() => (showCreateModal = false)} transition:fade={{ duration: 200 }}>
    <div class="modal-content" in:fly={{ y: 20, duration: 300 }}>
      <h3 class="modal-title">✨ สร้างหัวข้อใหม่</h3>

      <div class="modal-field">
        <label for="block-title">ชื่อหัวข้อ</label>
        <input
          id="block-title"
          type="text"
          placeholder="เช่น ประสบการณ์ทำงาน, กิจกรรม, ภาษา..."
          bind:value={newTitle}
          on:keydown={handleKeydown}
        />
      </div>

      <div class="modal-field">
        <label for="emoji-picker-label">เลือกอิโมจิ</label>
        <div class="emoji-picker">
          {#each emojiOptions as emoji}
            <button
              type="button"
              class="emoji-option"
              class:selected={selectedEmoji === emoji}
              on:click={() => (selectedEmoji = emoji)}
            >
              {emoji}
            </button>
          {/each}
        </div>
      </div>

      <div class="modal-actions">
        <button class="btn btn-ghost" on:click={() => (showCreateModal = false)}>ยกเลิก</button>
        <button
          class="btn btn-primary"
          on:click={handleCreate}
          disabled={!newTitle.trim()}
        >
          <Plus size={16} />
          สร้าง
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .btn-primary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
</style>
