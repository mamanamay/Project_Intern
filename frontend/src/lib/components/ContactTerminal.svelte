<script lang="ts">
  import { fly } from 'svelte/transition';
  import { showContactTerminal } from '$lib/stores/ui';
  import { X, Send, TerminalSquare } from '@lucide/svelte';

  let name = '';
  let email = '';
  let subject = '';
  let message = '';
  let status = 'idle'; // idle, sending, success, error
  let logMessages: string[] = ['> SYSTEM BOOT...', '> INITIALIZING CONTACT PROTOCOL...'];

  function addLog(msg: string) {
    logMessages = [...logMessages, msg];
  }

  async function handleSend() {
    if (!name || !subject || !message) {
      addLog('> ERROR: กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, เรื่อง, รายละเอียด)');
      return;
    }

    status = 'sending';
    addLog('> SECURE CONNECTION ESTABLISHED...');
    addLog('> SENDING TRANSMISSION TO: napatwan.c@kkumail.com...');

    try {
      // POST request to FormSubmit
      const response = await fetch('https://formsubmit.co/ajax/napatwan.c@kkumail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ชื่อผู้ส่ง: name,
          อีเมลติดต่อกลับ: email || 'ไม่ได้ระบุ',
          เรื่อง: subject,
          รายละเอียด: message,
          _subject: `New Contact from CV: ${subject}`,
          _template: 'box' // Formsubmit template style
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }
      
      addLog('> TRANSMISSION SUCCESSFUL.');
      status = 'success';
      name = '';
      email = '';
      subject = '';
      message = '';

      setTimeout(() => {
        status = 'idle';
      }, 3000);
    } catch (err) {
      addLog('> ERROR: TRANSMISSION FAILED. PLEASE TRY AGAIN.');
      status = 'error';
      setTimeout(() => {
        status = 'idle';
      }, 3000);
    }
  }
</script>

{#if $showContactTerminal}
  <div class="terminal-drawer" transition:fly={{ x: -380, duration: 400 }}>
    <div class="terminal-header">
      <div class="terminal-title">
        <TerminalSquare size={16} />
        <span>root@portfolio:~</span>
      </div>
      <button class="close-btn" on:click={() => ($showContactTerminal = false)}>
        <X size={18} />
      </button>
    </div>

    <div class="terminal-body">
      <div class="terminal-logs">
        {#each logMessages as log}
          <div class="log-line">{log}</div>
        {/each}
        {#if status === 'sending'}
          <div class="log-line blink">_</div>
        {/if}
      </div>

      <div class="terminal-form">
        <!-- ชื่อผู้ส่ง -->
        <div class="input-group">
          <span class="prompt">guest@cv:~$</span>
          <input 
            type="text" 
            bind:value={name} 
            placeholder="ชื่อผู้ส่ง" 
            disabled={status === 'sending'}
          />
        </div>

        <!-- อีเมล -->
        <div class="input-group">
          <span class="prompt">guest@cv:~$</span>
          <input 
            type="email" 
            bind:value={email} 
            placeholder="อีเมล (ใส่หรือไม่ใส่ก็ได้)" 
            disabled={status === 'sending'}
          />
        </div>

        <!-- เรื่องอะไร -->
        <div class="input-group">
          <span class="prompt">guest@cv:~$</span>
          <input 
            type="text" 
            bind:value={subject} 
            placeholder="เรื่องอะไร" 
            disabled={status === 'sending'}
          />
        </div>
        
        <!-- รายละเอียดเพิ่ม -->
        <div class="input-group align-top">
          <span class="prompt">guest@cv:~$</span>
          <textarea 
            bind:value={message} 
            placeholder="รายละเอียดเพิ่ม..." 
            rows="4"
            disabled={status === 'sending'}
          ></textarea>
        </div>

        <button 
          class="terminal-btn" 
          on:click={handleSend}
          disabled={status === 'sending'}
        >
          {#if status === 'sending'}
            EXECUTING...
          {:else if status === 'success'}
            SENT!
          {:else}
            <Send size={14} /> ./ส่งข้อความ.sh
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .terminal-drawer {
    position: fixed;
    top: 0;
    left: 0;
    width: 380px;
    height: 100vh;
    background: rgba(10, 15, 20, 0.95);
    backdrop-filter: blur(10px);
    border-right: 2px solid var(--cyan);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    box-shadow: 10px 0 30px rgba(6, 182, 212, 0.2);
    font-family: var(--font-heading), monospace;
    color: var(--cyan);
  }

  .terminal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(6, 182, 212, 0.1);
    border-bottom: 1px solid var(--cyan);
  }

  .terminal-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
    font-size: 0.9rem;
    color: #e2e8f0;
  }

  .close-btn {
    background: transparent;
    border: none;
    color: var(--cyan);
    cursor: pointer;
  }
  .close-btn:hover {
    color: var(--pink);
  }

  .terminal-body {
    flex: 1;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
  }

  .terminal-logs {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.85rem;
  }

  .log-line {
    opacity: 0.9;
  }

  .blink {
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }

  .terminal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: auto;
  }

  .input-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .input-group.align-top {
    align-items: flex-start;
  }

  .prompt {
    color: var(--emerald);
    font-size: 0.85rem;
    white-space: nowrap;
    padding-top: 0.2rem;
  }

  input, textarea {
    background: transparent;
    border: none;
    border-bottom: 1px dashed rgba(6, 182, 212, 0.4);
    color: #e2e8f0;
    font-family: inherit;
    font-size: 0.9rem;
    width: 100%;
    outline: none;
    padding: 0.3rem;
    transition: all 0.3s;
  }

  input:focus, textarea:focus {
    border-bottom: 1px solid var(--cyan);
    box-shadow: 0 4px 10px rgba(6, 182, 212, 0.1);
  }

  input::placeholder, textarea::placeholder {
    color: rgba(148, 163, 184, 0.5);
  }

  textarea {
    resize: vertical;
  }

  .terminal-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid var(--cyan);
    color: var(--cyan);
    padding: 0.75rem;
    font-family: inherit;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .terminal-btn:hover:not(:disabled) {
    background: var(--cyan);
    color: #000;
    box-shadow: 0 0 15px var(--cyan-glow);
  }

  .terminal-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .terminal-drawer {
      width: 100%;
    }
  }
</style>
