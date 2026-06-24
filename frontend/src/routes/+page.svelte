<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { cvData, isAdmin, loadCv, initSSE } from '$lib/stores/cv';
  import ProfileCard from '$lib/components/ProfileCard.svelte';
  import EducationCard from '$lib/components/EducationCard.svelte';
  import CertCard from '$lib/components/CertCard.svelte';
  import AchievementCard from '$lib/components/AchievementCard.svelte';
  import SkillsSection from '$lib/components/SkillsSection.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import DynamicBlockManager from '$lib/components/DynamicBlockManager.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import LoadingScreen from '$lib/components/LoadingScreen.svelte';
  import { Shield, ShieldOff } from '@lucide/svelte';

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
  <title>CV | Napatwan Chaiban</title>
</svelte:head>

<div class="container section-gap">
  {#if !$cvData}
    <LoadingScreen />
  {:else}
    <div in:fly={{ y: 30, duration: 600, delay: 0 }}>
      <ProfileCard data={$cvData} />
    </div>

    <div class="grid-2" in:fly={{ y: 30, duration: 600, delay: 150 }}>
      <EducationCard education={$cvData.education} />
      <CertCard certifications={$cvData.certifications} />
    </div>

    <div in:fly={{ y: 30, duration: 600, delay: 300 }}>
      <AchievementCard achievements={$cvData.achievements} />
    </div>

    <div in:fly={{ y: 30, duration: 600, delay: 450 }}>
      <SkillsSection skills={$cvData.skills} />
    </div>

    <div in:fly={{ y: 30, duration: 600, delay: 600 }}>
      <ProjectCard projects={$cvData.projects} />
    </div>

    <!-- Dynamic custom blocks -->
    {#if $cvData.customBlocks && $cvData.customBlocks.length > 0 || $isAdmin}
      <div in:fly={{ y: 30, duration: 600, delay: 750 }}>
        <DynamicBlockManager blocks={$cvData.customBlocks || []} />
      </div>
    {/if}

    <!-- Contact form -->
    <div in:fly={{ y: 30, duration: 600, delay: 900 }}>
      <ContactForm email={$cvData.profile.email} />
    </div>
  {/if}
</div>

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
</style>
