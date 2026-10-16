import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

/**
 * AI assistant side panel -- a chat panel docked on the right at full
 * height, with an "AI Docs Assistant · Preview" header, chat bubbles,
 * action buttons that take the reader to the relevant docs page, and a
 * disclaimer under the input.
 *
 * UI only for now. Replies come from `getPreviewReply` below, a
 * placeholder that matches a few keywords to docs pages; it will be
 * swapped for the real backend once that's decided. Kept separate from
 * AiAssistantPanel (the existing floating button), which is unchanged.
 */

export type AssistantAction = { label: string; to: string };

export type AssistantMessage = {
  role: 'user' | 'assistant';
  content: string;
  actions?: AssistantAction[];
};

// The conversation is kept in sessionStorage: it survives closing and
// reopening the panel, navigating, and reloading, and is cleared when the
// tab is closed or the reader clicks New chat. It never leaves the
// reader's browser.
const STORAGE_KEY = 'wso2-docs-ai-assistant';

function loadMessages(): AssistantMessage[] {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as AssistantMessage[]) : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: AssistantMessage[]) {
  try {
    if (messages.length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode, blocked) -- the chat still works.
  }
}

const SUGGESTIONS = [
  'How do I get started?',
  'Build an AI agent',
  'Deploy to WSO2 Cloud',
];

// Placeholder replies until the backend exists.
const PREVIEW_TOPICS: { keywords: string[]; reply: string; action: AssistantAction }[] = [
  {
    keywords: ['agent', 'ai', 'llm'],
    reply: 'You can build an AI agent that connects to an LLM, uses tools, and responds to user queries in chat.',
    action: { label: 'Build an AI Agent', to: '/get-started/quickstarts/build-ai-agent' },
  },
  {
    keywords: ['api', 'http', 'service', 'rest'],
    reply: 'You can expose your integration as an HTTP service and test it with the built-in Try It tool.',
    action: { label: 'Build an Integration as API', to: '/get-started/quickstarts/build-integration-api' },
  },
  {
    keywords: ['deploy', 'cloud', 'devant'],
    reply: 'You can deploy your integration to WSO2 Cloud from the cloud editor or from WSO2 Integrator on your machine.',
    action: { label: 'Cloud Setup', to: '/get-started/cloud-setup' },
  },
];

function getPreviewReply(question: string): AssistantMessage {
  const q = question.toLowerCase();
  const topic = PREVIEW_TOPICS.find((t) => t.keywords.some((k) => q.includes(k)));
  if (topic) return { role: 'assistant', content: topic.reply, actions: [topic.action] };
  return {
    role: 'assistant',
    content: 'Start with the Get Started guide to set up WSO2 Integrator and build your first integration.',
    actions: [{ label: 'Get Started', to: '/get-started' }],
  };
}

function AssistantIcon(): ReactNode {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function ExpandIcon({ expanded }: { expanded: boolean }): ReactNode {
  return expanded ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function CloseIcon(): ReactNode {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon(): ReactNode {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

type Props = {
  /** Called when the reader closes the panel. */
  onClose: () => void;
};

export default function AssistantChat({ onClose }: Props): ReactNode {
  const [messages, setMessages] = useState<AssistantMessage[]>(loadMessages);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => saveMessages(messages), [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, thinking]);

  function ask(question: string) {
    const text = question.trim();
    if (!text || thinking) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setThinking(true);
    // Simulated delay so the preview behaves like a real request.
    window.setTimeout(() => {
      setMessages((prev) => [...prev, getPreviewReply(text)]);
      setThinking(false);
    }, 700);
  }

  return (
    <aside className={`${styles.panel} ${expanded ? styles.expanded : ''}`} aria-label="AI Docs Assistant">
      <header className={styles.header}>
        <span className={styles.headerIcon}>
          <AssistantIcon />
        </span>
        <div className={styles.headerText}>
          <span className={styles.title}>AI Docs Assistant</span>
          <span className={styles.subtitle}>Preview</span>
        </div>
        <div className={styles.headerActions}>
          {messages.length > 0 && (
            <button type="button" className={styles.iconButton} onClick={() => setMessages([])}>
              <span className={styles.textAction}>New chat</span>
            </button>
          )}
          <button
            type="button"
            className={styles.iconButton}
            aria-label={expanded ? 'Collapse' : 'Expand'}
            onClick={() => setExpanded((e) => !e)}>
            <ExpandIcon expanded={expanded} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      </header>

      <div ref={listRef} className={styles.messages} aria-live="polite">
        {messages.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>How can I help you with WSO2 Integration Platform?</p>
            <div className={styles.suggestions}>
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" className={styles.suggestion} onClick={() => ask(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className={styles.userBubble}>
              {m.content}
            </div>
          ) : (
            <div key={i} className={styles.assistantBubble}>
              <p>{m.content}</p>
              {m.actions?.map((a) => (
                <Link key={a.to} to={a.to} className={styles.actionButton}>
                  {a.label}
                </Link>
              ))}
            </div>
          ),
        )}

        {thinking && (
          <div className={styles.assistantBubble} aria-label="Thinking">
            <span className={styles.typing}>
              <span />
              <span />
              <span />
            </span>
          </div>
        )}
      </div>

      <form
        className={styles.inputRow}
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Ask anything about WSO2 Integration Platform..."
          value={input}
          maxLength={2000}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className={styles.sendButton} aria-label="Send" disabled={!input.trim() || thinking}>
          <SendIcon />
        </button>
      </form>
      <p className={styles.disclaimer}>AI can make mistakes. Use answers mindfully.</p>
    </aside>
  );
}
