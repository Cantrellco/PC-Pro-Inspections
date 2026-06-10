import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { NAV_ITEMS, EXTRA_PAGES } from './navItems';
import { useBodyScrollLock, useFocusTrap, useInertBackground } from './hooks';
import { ArrowIcon, CornerReturnIcon, PhoneIcon, SearchIcon } from './icons';

type Command = {
  id: string;
  group: 'Quick actions' | 'Go to';
  label: string;
  hint?: string;
  keywords?: string;
  icon?: 'phone' | 'arrow';
  perform: () => void;
};

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  useInertBackground(open);
  useBodyScrollLock(open);
  useFocusTrap(dialogRef, open, inputRef);

  // Build the command set once (stable across renders).
  const commands = useMemo<Command[]>(() => {
    const go = (to: string) => () => {
      navigate(to);
      onClose();
    };
    const actions: Command[] = [
      {
        id: 'act-call',
        group: 'Quick actions',
        label: 'Call us',
        hint: siteConfig.phone,
        keywords: 'phone telephone speak ring',
        icon: 'phone',
        perform: () => {
          track('tel_click', { location: 'command_palette' });
          window.location.href = `tel:${siteConfig.phoneHref}`;
          onClose();
        },
      },
      {
        id: 'act-book',
        group: 'Quick actions',
        label: 'Book an inspection',
        keywords: 'schedule appointment calendar',
        perform: () => {
          track('book_now_click', { location: 'command_palette' });
          navigate('/book');
          onClose();
        },
      },
      {
        id: 'act-quote',
        group: 'Quick actions',
        label: 'Get a free quote',
        keywords: 'price estimate cost calculator',
        perform: go('/services'),
      },
      {
        id: 'act-email',
        group: 'Quick actions',
        label: 'Email us',
        hint: siteConfig.email,
        keywords: 'mail message contact',
        perform: () => {
          track('mailto_click', { location: 'command_palette' });
          window.location.href = `mailto:${siteConfig.email}`;
          onClose();
        },
      },
    ];
    const pages: Command[] = [...NAV_ITEMS, ...EXTRA_PAGES].map((p) => ({
      id: `go-${p.to}-${p.label}`,
      group: 'Go to' as const,
      label: p.label,
      keywords: 'keywords' in p ? p.keywords : undefined,
      icon: 'arrow' as const,
      perform: go(p.to),
    }));
    return [...actions, ...pages];
  }, [navigate, onClose]);

  // Filter by a simple token-includes match on label + keywords.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const tokens = q.split(/\s+/);
    return commands.filter((c) => {
      const hay = `${c.label} ${c.keywords ?? ''} ${c.hint ?? ''}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [commands, query]);

  // Reset on open; keep active index in range as results change.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);
  useEffect(() => {
    setActive((i) => Math.min(i, Math.max(0, results.length - 1)));
  }, [results.length]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open) return;
    document.getElementById(`cmd-opt-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  if (!open) return null;

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((i) => (results.length ? (i + 1) % results.length : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
        break;
      case 'Home':
        e.preventDefault();
        setActive(0);
        break;
      case 'End':
        e.preventDefault();
        setActive(Math.max(0, results.length - 1));
        break;
      case 'Enter': {
        e.preventDefault();
        results[active]?.perform();
        break;
      }
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  let renderedGroup = '';

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close command menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-sm animate-[fade-in_0.2s_ease-out_both]"
      />

      {/* Centering wrapper (flex, not transform) so the entrance animation can't
          fight the positioning. Side gutters fall through to the backdrop. */}
      <div className="pointer-events-none absolute inset-x-0 top-[12vh] flex justify-center px-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site search and quick actions"
        className="pointer-events-auto w-[min(40rem,92vw)] overflow-hidden rounded-2xl border border-white/10 bg-ink-100/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-brass/15 backdrop-blur-2xl motion-safe:animate-fade-up"
      >
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-brass/60 to-transparent"
        />

        {/* Search input (combobox) */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <SearchIcon className="h-5 w-5 shrink-0 text-bone-dim" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-listbox"
            aria-activedescendant={results.length ? `cmd-opt-${active}` : undefined}
            aria-autocomplete="list"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search pages, or jump to an action…"
            className="w-full bg-transparent py-4 text-[15px] text-bone outline-none placeholder:text-bone-dim"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden shrink-0 rounded border border-white/15 px-1.5 py-0.5 text-[10px] font-semibold text-bone-dim sm:block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <ul id="cmd-listbox" role="listbox" aria-label="Results" className="max-h-[min(22rem,56vh)] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-bone-dim">
              No matches for “{query}”
            </li>
          )}
          {results.map((c, i) => {
            const showHeading = c.group !== renderedGroup;
            renderedGroup = c.group;
            const isActive = i === active;
            return (
              <li key={c.id} role="presentation">
                {showHeading && (
                  <div
                    role="presentation"
                    className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-bone-dim"
                  >
                    {c.group}
                  </div>
                )}
                <div
                  id={`cmd-opt-${i}`}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => c.perform()}
                  onMouseMove={() => setActive(i)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition-colors ${
                    isActive ? 'bg-white/[0.07] text-white' : 'text-bone-muted'
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ring-1 ${
                      isActive ? 'bg-brass/15 text-brass-soft ring-brass/30' : 'bg-white/[0.03] text-bone-dim ring-white/10'
                    }`}
                  >
                    {c.icon === 'phone' ? <PhoneIcon className="h-4 w-4" /> : <ArrowIcon className="h-4 w-4" />}
                  </span>
                  <span className="flex-1 truncate">{c.label}</span>
                  {c.hint && <span className="shrink-0 text-[12px] text-bone-dim">{c.hint}</span>}
                  {isActive && <CornerReturnIcon className="h-4 w-4 shrink-0 text-bone-dim" />}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Footer hint */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5 text-[11px] text-bone-dim">
          <span className="inline-flex items-center gap-2">
            <KbdKeys keys={['↑', '↓']} /> navigate
            <span className="mx-1 opacity-40">·</span>
            <KbdKeys keys={['↵']} /> select
          </span>
          <span className="inline-flex items-center gap-1.5">
            <PhoneIcon className="h-3.5 w-3.5" /> {siteConfig.phone}
          </span>
        </div>
      </div>
      </div>

      {/* SR-only live count */}
      <div aria-live="polite" role="status" className="sr-only">
        {query ? (results.length ? `${results.length} results` : 'No results') : ''}
      </div>
    </div>,
    document.body,
  );
}

function KbdKeys({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex gap-1">
      {keys.map((k) => (
        <kbd key={k} className="rounded border border-white/15 bg-white/[0.04] px-1.5 py-0.5 font-sans text-[10px] leading-none text-bone-muted">
          {k}
        </kbd>
      ))}
    </span>
  );
}
