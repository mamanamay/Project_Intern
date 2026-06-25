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
      <img src="/profile.jpg" alt="Profile" class="profile-img" on:error={(e) => e.currentTarget.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmU4ZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJjZW50cmFsIiBmaWxsPSIjMGYxNzJhIj4/PC90ZXh0Pjwvc3ZnPg=='}/>
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

  .avatar-ring {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    padding: 4px;
    background: linear-gradient(135deg, var(--cyan), var(--emerald));
    flex-shrink: 0;
  }

  .profile-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--bg-secondary);
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
