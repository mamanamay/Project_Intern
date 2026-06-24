<script lang="ts">
  import { Send, CheckCircle, Mail } from '@lucide/svelte';
  import type { CvData } from '$lib/api';
  import { fade } from 'svelte/transition';

  export let email: string = '';

  let senderName = '';
  let senderEmail = '';
  let subject = '';
  let message = '';
  let sent = false;

  function handleSubmit() {
    const mailtoSubject = encodeURIComponent(subject || 'ติดต่อจากเว็บ Portfolio');
    const mailtoBody = encodeURIComponent(
      `ชื่อผู้ส่ง: ${senderName}\nอีเมลตอบกลับ: ${senderEmail}\n\n${message}`
    );
    const mailtoLink = `mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    window.open(mailtoLink, '_self');

    sent = true;
    setTimeout(() => {
      sent = false;
    }, 4000);
  }

  function isFormValid(): boolean {
    return senderName.trim() !== '' && senderEmail.trim() !== '' && message.trim() !== '';
  }
</script>

<section id="contact" class="glass-card contact-form-section">
  <h2 class="section-title pink">
    📬 ติดต่อฉัน
  </h2>

  <p class="contact-description">
    สนใจร่วมงาน หรือมีคำถาม? ส่งข้อความถึงฉันได้เลย!
  </p>

  <form on:submit|preventDefault={handleSubmit} class="contact-grid">
    <div class="contact-field">
      <label for="contact-name">ชื่อของคุณ</label>
      <input
        id="contact-name"
        type="text"
        placeholder="กรอกชื่อ..."
        bind:value={senderName}
        required
      />
    </div>

    <div class="contact-field">
      <label for="contact-email">อีเมลของคุณ</label>
      <input
        id="contact-email"
        type="email"
        placeholder="example@email.com"
        bind:value={senderEmail}
        required
      />
    </div>

    <div class="contact-field full-width">
      <label for="contact-subject">เรื่อง</label>
      <input
        id="contact-subject"
        type="text"
        placeholder="หัวข้อที่ต้องการติดต่อ..."
        bind:value={subject}
      />
    </div>

    <div class="contact-field full-width">
      <label for="contact-message">ข้อความ</label>
      <textarea
        id="contact-message"
        placeholder="เขียนข้อความของคุณที่นี่..."
        bind:value={message}
        required
      ></textarea>
    </div>

    <div class="contact-field full-width">
      <button
        type="submit"
        class="contact-submit"
        disabled={!isFormValid()}
      >
        <Send size={18} />
        ส่งข้อความ
      </button>

      {#if sent}
        <div class="contact-success" transition:fade={{ duration: 300 }}>
          <CheckCircle size={18} />
          เปิดแอปอีเมลของคุณแล้ว — กดส่งอีเมลเพื่อติดต่อเราได้เลย!
        </div>
      {/if}
    </div>
  </form>
</section>

<style>
  .contact-description {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .contact-submit:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
</style>
