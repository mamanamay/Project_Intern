<script lang="ts">
  import { Rocket, Code, FileText } from '@lucide/svelte';
  import EditableText from './EditableText.svelte';
  import type { CvProject } from '$lib/api';

  export let projects: CvProject[];
</script>

<section id="projects" class="glass-card">
  <h2 class="section-title cyan">
    🚀 โปรเจค
  </h2>

  <div class="project-grid">
    {#each projects as project, i}
      <div class="project-card">
        <div class="project-header">
          <div class="project-icon">
            <Rocket size={20} />
          </div>
          <div class="project-title-wrap">
            <EditableText
              path={`projects[${i}].title`}
              value={project.title}
              className="project-title"
            />
            {#if project.code}
              <div class="project-code-badge">
                <Code size={12} />
                <EditableText
                  path={`projects[${i}].code`}
                  value={project.code}
                  className="code-text"
                />
              </div>
            {/if}
          </div>
        </div>

        <div class="project-desc">
          <EditableText
            path={`projects[${i}].description`}
            value={project.description}
            multiline={true}
            className="desc-text"
          />
        </div>
      </div>
    {/each}
  </div>

  {#if projects.length === 0}
    <p class="empty-text">ยังไม่มีข้อมูลโปรเจค</p>
  {/if}
</section>

<style>
  .project-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .project-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .project-header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .project-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(16, 185, 129, 0.15));
    border-radius: 12px;
    color: var(--cyan);
    flex-shrink: 0;
  }

  .project-title-wrap {
    flex: 1;
    min-width: 0;
  }

  :global(.project-title) {
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-primary);
    font-family: var(--font-heading);
  }

  .project-code-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    margin-top: 0.4rem;
    padding: 0.2rem 0.6rem;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 999px;
    font-size: 0.75rem;
    color: var(--emerald);
    font-family: var(--font-heading);
  }

  :global(.code-text) {
    font-size: 0.75rem;
    color: var(--emerald);
  }

  .project-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  :global(.desc-text) {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .empty-text {
    text-align: center;
    color: var(--text-muted);
    font-size: 0.85rem;
    padding: 1rem;
  }
</style>
