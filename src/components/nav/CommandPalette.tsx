import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { COMMAND_PAGES } from './navItems';
import { useBodyScrollLock, useFocusTrap, useInertBackground } from './hooks';
import { ArrowIcon, CloseIcon, CornerReturnIcon, PhoneIcon, SearchIcon } from './icons';

type Command = {
  id: string;
  group: 'Quick actions' | 'Pages';
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
    const pages: Command[] = COMMAND_PAGES.map((p) => ({
      id: `go-${p.to}`,
      group: 'Pages' as const,
      label: p.label,
      keywords: p.keywords,
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
      {/* Backdrop: the page goes to paper */}
      <button
        type="button"
        aria-label="Close command menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-paper/95 motion-safe:animate-fade-in"
      />

      {/* Centering wrapper (flex, not transform) so the entrance animation can't
          fight the positioning. Side gutters fall through to the backdrop. */}
      <div className="pointer-events-none absolute inset-x-0 top-[7vh] flex justify-center px-4 motion-safe:animate-fade-up sm:top-[12vh]">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site search and quick actions"
          className="sheet sheet-navy pointer-events-auto w-[min(40rem,92vw)]"
        >
          {/* Search input (combobox) */}
          <div className="border-b-3 border-ink p-3">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink" />
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
                placeholder="Search pages and actions…"
                className="field-input !pl-11 !pr-20 text-base"
                autoComplete="off"
                spellCheck={false}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {query ? (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => {
                      setQuery('');
                      setActive(0);
                      inputRef.current?.focus();
                    }}
                    className="grid h-8 w-8 place-items-center border-2 border-ink bg-paper-white text-ink hover:bg-paper"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                ) : (
                  <Kbd className="hidden sm:inline-flex">Esc</Kbd>
                )}
              </div>
            </div>
          </div>

          {/* Results: ruled rows */}
          <ul id="cmd-listbox" role="listbox" aria-label="Results" className="max-h-[min(22rem,56vh)] overflow-y-auto">
            {results.length === 0 && (
              <li className="px-4 py-8 text-center text-ink-mute">No matches for “{query}”</li>
            )}
            {results.map((c, i) => {
              const showHeading = c.group !== renderedGroup;
              renderedGroup = c.group;
              const isActive = i === active;
              return (
                <li key={c.id} role="presentation">
                  {showHeading && (
                    <div role="presentation" className="label-sm border-b-2 border-ink bg-paper-deep px-4 pb-1 pt-2">
                      {c.group}
                    </div>
                  )}
                  <div
                    id={`cmd-opt-${i}`}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => c.perform()}
                    onMouseMove={() => setActive(i)}
                    className={`flex cursor-pointer items-center gap-3 border-b-2 border-ink px-4 py-3 ${
                      isActive ? 'bg-navy text-paper' : 'text-ink'
                    }`}
                  >
                    <span className="shrink-0">
                      {c.icon === 'phone' ? <PhoneIcon className="h-5 w-5" /> : <ArrowIcon className="h-5 w-5" />}
                    </span>
                    <span className="label flex-1 truncate !text-[1.05rem] text-current">{c.label}</span>
                    {c.hint && (
                      <span className={`num shrink-0 font-condensed text-base ${isActive ? 'text-paper/85' : 'text-ink-mute'}`}>
                        {c.hint}
                      </span>
                    )}
                    {isActive && <CornerReturnIcon className="h-4 w-4 shrink-0" />}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Footer hint */}
          <div className="flex items-center justify-between gap-3 border-t-3 border-ink bg-paper-deep px-4 py-2.5">
            <span className="label-sm inline-flex items-center gap-2">
              <span className="inline-flex gap-1">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
              </span>
              move
              <span className="inline-flex gap-1">
                <Kbd>↵</Kbd>
              </span>
              go
            </span>
            <a
              href={`tel:${siteConfig.phoneHref}`}
              onClick={() => {
                track('tel_click', { location: 'command_palette_footer' });
                onClose();
              }}
              className="label num inline-flex items-center gap-1.5 hover:text-red"
            >
              <PhoneIcon className="h-4 w-4" /> {siteConfig.phone}
            </a>
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

/** A key cap: a 2px-bordered paper box in condensed caps. */
function Kbd({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      aria-hidden="true"
      className={`inline-flex h-6 min-w-[1.5rem] items-center justify-center border-2 border-ink bg-paper-white px-1.5 font-condensed text-xs font-bold uppercase leading-none tracking-wide text-ink ${className}`.trim()}
    >
      {children}
    </kbd>
  );
}
