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

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Please tell us your name.';
    if (!form.email.trim()) {
      e.email = 'Please share an email.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = 'That email looks off — please double-check it.';
    }
    if (!form.phone.trim()) {
      e.phone = 'A phone number helps us reply faster.';
    } else if (form.phone.replace(/\D/g, '').length < 10) {
      e.phone = 'Phone number looks too short.';
    }
    if (!form.message.trim()) {
      e.message = 'Let us know how we can help.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

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
      <div
        role="status"
        className="rounded-md border border-flag-navyLight/40 bg-flag-navy/15 p-6"
      >
        {sentVia === 'mailto' ? (
          <>
            <p className="font-display text-xl text-white mb-2">
              Your email is ready to send.
            </p>
            <p className="text-bone-muted">
              We've opened your email app with your message filled in — just
              press <span className="text-white font-semibold">Send</span> and it
              reaches us. If nothing opened, email us directly at{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-white underline underline-offset-2"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-xl text-white mb-2">
              Thanks — we got your message.
            </p>
            <p className="text-bone-muted">
              We will be in touch within a few business hours. For anything
              urgent, please call us directly.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid sm:grid-cols-2 gap-5">
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
          label="How can we help?"
          required
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          error={errors.message}
          hint="A closing date, address, and which extra services (if any) speeds up our reply."
        />
      </div>

      {submitError && (
        <div
          role="alert"
          className="sm:col-span-2 rounded-md border border-flag-redSoft/40 bg-flag-red/10 p-4 text-sm text-bone"
        >
          {submitError}
        </div>
      )}

      <div className="sm:col-span-2 flex items-center justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}
