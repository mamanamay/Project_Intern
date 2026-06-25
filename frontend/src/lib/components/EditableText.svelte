<script lang="ts">
  import { Pencil, Check, X } from '@lucide/svelte';
  import { isAdmin, updateField } from '$lib/stores/cv';
  import { fade } from 'svelte/transition';

  export let path: string;
  export let value: string;
  export let multiline: boolean = false;
  export let className: string = '';

  let editing = false;
  let editValue = '';

  function startEdit() {
    editValue = value;
    editing = true;
  }

  function save() {
    updateField(path, editValue);
    editing = false;
  }

  function cancel() {
    editing = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !multiline) {
      save();
    } else if (e.key === 'Escape') {
      cancel();
    }
  }
</script>

{#if editing}
  <div class="edit-container" transition:fade={{ duration: 200 }}>
    {#if multiline}
      <textarea
        class="edit-input edit-textarea"
        bind:value={editValue}
        on:keydown={handleKeydown}
      ></textarea>
    {:else}
      <input
        class="edit-input"
        type="text"
        bind:value={editValue}
        on:keydown={handleKeydown}
      />
    {/if}
    <div class="edit-actions">
      <button class="btn btn-save" on:click={save}>
        <Check size={14} />
        บันทึก
      </button>
      <button class="btn btn-cancel" on:click={cancel}>
        <X size={14} />
        ยกเลิก
      </button>
    </div>
  </div>
{:else}
  <div class="editable-wrapper">
    <span class={className} data-text={value}>{value}</span>
    {#if $isAdmin}
      <button class="edit-btn" on:click={startEdit} title="แก้ไข">
        <Pencil size={14} />
      </button>
    {/if}
  </div>
{/if}

<style>
  .edit-container {
    width: 100%;
  }
</style>
