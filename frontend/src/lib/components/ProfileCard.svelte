<script lang="ts">
  import { MapPin, Phone, Mail, Code, Briefcase, User } from '@lucide/svelte';
  import EditableText from './EditableText.svelte';
  import { isAdmin } from '$lib/stores/cv';
  import type { CvData } from '$lib/api';

  export let data: CvData;
</script>

<section id="profile" class="glass-card profile-section">
  <div class="profile-header">
    <div class="avatar-ring">
      <div class="avatar-placeholder">
        {data.profile.name.charAt(0)}
      </div>
    </div>

    <div class="profile-info">
      <EditableText
        path="profile.name"
        value={data.profile.name}
        className="profile-name gradient-text"
      />

      <div class="contact-row" style="margin-top: 0.75rem;">
        <div class="contact-item">
          <MapPin size={16} />
          <EditableText path="profile.location" value={data.profile.location} />
        </div>
        <div class="contact-item">
          <Phone size={16} />
          <EditableText path="profile.phone" value={data.profile.phone} />
        </div>
        <div class="contact-item">
          <Mail size={16} />
          <EditableText path="profile.email" value={data.profile.email} />
        </div>
      </div>

      {#if data.socialLinks}
        <div class="social-links" style="margin-top: 1rem;">
          {#if data.socialLinks.github}
            <a
              href={data.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn social-github"
            >
              <Code size={16} />
              GitHub
            </a>
          {/if}
          {#if data.socialLinks.linkedin}
            <a
              href={data.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn social-linkedin"
            >
              <Briefcase size={16} />
              LinkedIn
            </a>
          {/if}
        </div>
      {/if}
    </div>
  </div>

  <div class="summary-section" style="margin-top: 1.5rem;">
    <h3 class="summary-title">
      <User size={18} />
      เกี่ยวกับฉัน
    </h3>
    <div class="summary-box">
      <EditableText
        path="profile.summary"
        value={data.profile.summary}
        multiline={true}
      />
    </div>
  </div>
</section>

<style>
  .profile-section {
    overflow: hidden;
  }

  .profile-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--cyan), var(--violet), var(--emerald));
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  .profile-header {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .profile-info {
    flex: 1;
    min-width: 0;
  }

  :global(.profile-name) {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .social-links {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .summary-title {
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 600;
    color: var(--cyan);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 640px) {
    .profile-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .contact-row {
      justify-content: center;
    }

    .social-links {
      justify-content: center;
    }

    :global(.profile-name) {
      font-size: 1.5rem;
    }
  }
</style>
