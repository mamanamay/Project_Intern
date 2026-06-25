<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { cvData, isAdmin, loadCv, initSSE } from '$lib/stores/cv';
  import { activeTab, showContactTerminal } from '$lib/stores/ui';
  import ProfileCard from '$lib/components/ProfileCard.svelte';
  import EducationCard from '$lib/components/EducationCard.svelte';
  import CertCard from '$lib/components/CertCard.svelte';
  import AchievementCard from '$lib/components/AchievementCard.svelte';
  import SkillsSection from '$lib/components/SkillsSection.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import DynamicBlockManager from '$lib/components/DynamicBlockManager.svelte';
  import LoadingScreen from '$lib/components/LoadingScreen.svelte';
  import ContactTerminal from '$lib/components/ContactTerminal.svelte';
  import { Shield, ShieldOff, TerminalSquare } from '@lucide/svelte';

  let eventSource: EventSource | null = null;

  onMount(async () => {
    await loadCv();
    if (typeof window !== 'undefined') {
      eventSource = initSSE();
    }
  });

  onDestroy(() => {
    eventSource?.close();
  });
</script>

<svelte:head>
  <title>CV</title>
</svelte:head>

<div class="container section-gap">
  {#if !$cvData}
    <LoadingScreen />
  {:else}
    {#if $activeTab === 'all' || $activeTab === 'profile'}
      <div in:fly={{ y: 30, duration: 600 }}>
        <ProfileCard data={$cvData} />
      </div>
    {/if}

    {#if $activeTab === 'all' || $activeTab === 'education'}
      <div class="grid-2" in:fly={{ y: 30, duration: 600, delay: $activeTab === 'all' ? 100 : 0 }}>
        <EducationCard education={$cvData.education} />
        <CertCard certifications={$cvData.certifications} />
      </div>
    {/if}

    {#if $activeTab === 'all' || $activeTab === 'achievements'}
      <div in:fly={{ y: 30, duration: 600, delay: $activeTab === 'all' ? 200 : 0 }}>
        <AchievementCard achievements={$cvData.achievements} />
      </div>
    {/if}

    {#if $activeTab === 'all' || $activeTab === 'skills'}
      <div in:fly={{ y: 30, duration: 600, delay: $activeTab === 'all' ? 300 : 0 }}>
        <SkillsSection skills={$cvData.skills} />
      </div>
    {/if}

    {#if $activeTab === 'all' || $activeTab === 'projects'}
      <div in:fly={{ y: 30, duration: 600, delay: $activeTab === 'all' ? 400 : 0 }}>
        <ProjectCard projects={$cvData.projects} />
      </div>
    {/if}

    {#if ($activeTab === 'all' || $activeTab === 'experience') && ($cvData.customBlocks && $cvData.customBlocks.length > 0 || $isAdmin)}
      <div in:fly={{ y: 30, duration: 600, delay: $activeTab === 'all' ? 500 : 0 }}>
        <DynamicBlockManager blocks={$cvData.customBlocks || []} />
      </div>
    {/if}
  {/if}
</div>

<ContactTerminal email={$cvData?.profile?.email || ''} />

<!-- FAB for Contact Terminal -->
<button class="fab-contact" on:click={() => ($showContactTerminal = !$showContactTerminal)} title="System Log / Contact">
  <TerminalSquare size={24} />
</button>

<!-- Admin toggle button -->
<div class="admin-toggle" in:fade={{ delay: 800, duration: 400 }}>
  <button
    class="btn {$isAdmin ? 'btn-primary' : 'btn-ghost'}"
    on:click={() => ($isAdmin = !$isAdmin)}
  >
    {#if $isAdmin}
      <ShieldOff size={18} />
      ออกจากโหมดแอดมิน
    {:else}
      <Shield size={18} />
      โหมดแอดมิน
    {/if}
  </button>
</div>

<style>
  .container {
    padding-bottom: 4rem;
  }

  .fab-contact {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0a0e1a, #0f172a);
    color: var(--cyan);
    border: 2px solid var(--cyan);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(6, 182, 212, 0.4);
    z-index: 90;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .fab-contact:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(6, 182, 212, 0.6);
    background: #0f172a;
  }

  .admin-toggle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 100;
  }
</style>
