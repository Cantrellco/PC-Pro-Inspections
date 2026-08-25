import { useState } from 'react';
import { submitLead } from '@/services/leads';
import { siteConfig } from '@/config/siteConfig';
import type { LeadPayload } from '@/types';
import Field from './Field';
import Button from './Button';

type FormState = {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  message: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  propertyAddress: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sentVia, setSentVia] = useState<'web3forms' | 'mailto' | null>(null);
  // Honeypot: real people never see or fill this field.
  const [botcheck, setBotcheck] = useState('');

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Your name, please.';
    if (!form.email.trim()) {
      e.email = 'An email address, please.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = 'That email looks off. Check it once more.';
    }
    if (!form.phone.trim()) {
      e.phone = 'A phone number lets Paul call you back.';
    } else if (form.phone.replace(/\D/g, '').length < 10) {
      e.phone = 'That number looks too short.';
    }
    if (!form.message.trim()) {
      e.message = 'Tell Paul what you need.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    // A filled honeypot means a bot. Pretend it worked and send nothing.
    if (botcheck) {
      setSentVia('web3forms');
      setForm(initial);
      return;
    }

    setSubmitting(true);
    const payload: LeadPayload = {
      source: 'contact_form',
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      propertyAddress: form.propertyAddress.trim(),
      message: form.message.trim(),
    };
    const result = await submitLead(payload);
    setSubmitting(false);

    if (result.ok) {
      setSentVia(result.via ?? 'web3forms');
      setForm(initial);
    } else {
      setSubmitError(result.error);
    }
  };

  if (sentVia) {
    return (
      <div role="status" className="border-3 border-navy bg-paper p-5 text-ink-soft">
        {sentVia === 'mailto' ? (
          <>
            <p className="mb-1 font-condensed text-xl font-bold uppercase text-ink">
              Your email is ready to send.
            </p>
            <p>
              Your email app opened with your message filled in. Press <strong>Send</strong> and it
              reaches Paul. If nothing opened, email{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-navy underline decoration-2 underline-offset-4"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <p className="mb-1 font-condensed text-xl font-bold uppercase text-ink">Got it.</p>
            <p>
              Paul will be in touch within a few business hours. If it can't wait, call{' '}
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="num font-semibold text-navy underline decoration-2 underline-offset-4"
              >
                {siteConfig.phone}
              </a>
              .
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Field
        id="cf-name"
        label="Your name"
        required
        value={form.name}
        onChange={(e) => update('name', e.target.value)}
        error={errors.name}
        autoComplete="name"
      />
      <Field
        id="cf-phone"
        label="Phone"
        required
        inputMode="tel"
        value={form.phone}
        onChange={(e) => update('phone', e.target.value)}
        error={errors.phone}
        autoComplete="tel"
      />
      <Field
        id="cf-email"
        label="Email"
        required
        type="email"
        value={form.email}
        onChange={(e) => update('email', e.target.value)}
        error={errors.email}
        autoComplete="email"
      />
      <Field
        id="cf-address"
        label="Property address (optional)"
        value={form.propertyAddress}
        onChange={(e) => update('propertyAddress', e.target.value)}
        autoComplete="street-address"
      />
      <div className="sm:col-span-2">
        <Field
          as="textarea"
          id="cf-message"
          label="What do you need?"
          required
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          error={errors.message}
          hint="A closing date, the address, and any extras (termite, mold) speed up the reply."
        />
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-botcheck">Leave this empty</label>
        <input
          id="cf-botcheck"
          name="botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={botcheck}
          onChange={(e) => setBotcheck(e.target.value)}
        />
      </div>

      {submitError && (
        <div role="alert" className="border-3 border-red bg-paper-white p-4 text-sm text-ink sm:col-span-2">
          {submitError}
        </div>
      )}

      <div className="flex items-center justify-end sm:col-span-2">
        <Button type="submit" loading={submitting}>
          {submitting ? 'Sending' : 'Send to Paul'}
        </Button>
      </div>
    </form>
  );
}
