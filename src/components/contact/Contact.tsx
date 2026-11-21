import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { runSectionReveal } from '../../animations/sectionAnimations';

const CONTACT_EMAIL = 'barkiligngirma@gmail.com';

interface ContactProps {
  preselectedTopic?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedTopic = '' }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(preselectedTopic || 'Frontend Architecture');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (preselectedTopic) {
      setTopic(preselectedTopic);
      setSubmitted(false);
    }
  }, [preselectedTopic]);

  const registerRevealRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      revealRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const validTargets = revealRefs.current.filter(
      (el): el is HTMLElement => el !== null
    );

    const cleanup = runSectionReveal({
      container,
      targets: validTargets,
    });

    return () => cleanup.revert();
  }, []);

  const handleCopyEmail = useCallback(() => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(CONTACT_EMAIL).catch(() => undefined);
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, email address, and project message.');
      return;
    }

    setErrorMessage('');
    setSubmitted(true);
  };

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `[${topic}] Portfolio Inquiry from ${name || 'Visitor'}`
  )}&body=${encodeURIComponent(message)}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact Barkilign"
      className="relative z-10 w-full overflow-x-clip py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14"
    >
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 items-start gap-12 lg:gap-12">
        {/* Left column: Direct contact info */}
        <div className="lg:col-span-5">
          <p
            ref={registerRevealRef(0)}
            className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-blue-600 dark:text-sky-400 uppercase mb-3"
          >
            CONTACT
          </p>
          <h2
            ref={registerRevealRef(1)}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-slate-50 leading-[1.08] text-balance mb-5"
          >
            Let&apos;s Build Something Remarkable
          </h2>
          <p
            ref={registerRevealRef(2)}
            className="text-base sm:text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-300/95 mb-8"
          >
            Have an upcoming product, interactive web experience, or frontend
            architecture challenge? Reach out directly or send a quick brief.
          </p>

          <div
            ref={registerRevealRef(3)}
            className="rounded-2xl border border-slate-200/85 dark:border-sky-400/20 bg-white/80 dark:bg-[#05122b]/72 p-6 backdrop-blur-md space-y-5"
          >
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-2">
                Direct Email
              </p>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-sky-400/20 bg-slate-50/90 dark:bg-[#030b1d]/80 px-4 py-3">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  {CONTACT_EMAIL}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 dark:border-sky-400/30 bg-white dark:bg-[#081b42] px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-sky-300 hover:border-blue-600/60 dark:hover:border-sky-300/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Full stack Engineering</span>
              <span aria-hidden="true">·</span>
              <span>Creative Motion</span>
              <span aria-hidden="true">·</span>
              <span>UI/UX Design</span>
            </div>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex w-full items-center justify-center gap-2 min-h-[44px] rounded-xl border border-blue-600/30 dark:border-sky-400/30 bg-white/80 dark:bg-[#061433]/75 hover:bg-blue-50 dark:hover:bg-[#0a1d47] text-sm font-semibold text-slate-900 dark:text-slate-100 transition-colors"
            >
              <Mail className="h-4 w-4 text-blue-600 dark:text-sky-400" aria-hidden="true" />
              <span>Open Email App</span>
            </a>
          </div>
        </div>

        {/* Right column: Interactive project inquiry form */}
        <div className="lg:col-span-7">
          <div
            ref={registerRevealRef(4)}
            className="rounded-2xl border border-slate-200/85 dark:border-sky-400/20 bg-white/82 dark:bg-[#05122b]/75 p-6 sm:p-8 backdrop-blur-md shadow-[0_18px_48px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_54px_rgba(2,8,23,0.65)]"
          >
            {submitted ? (
              <div className="py-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-blue-600 dark:text-sky-400 uppercase mb-2">
                  Brief Prepared
                </p>
                <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50 mb-3">
                  Thanks, {name}!
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                  Your message regarding <strong className="text-slate-950 dark:text-white">{topic}</strong> is ready. Click below to launch your email client with the message pre-filled, or edit your note.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-colors"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send via Email Client</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-300 dark:border-sky-400/25 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:border-blue-500/50 transition-colors cursor-pointer"
                  >
                    Edit Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full min-h-[44px] rounded-xl border border-slate-300/85 dark:border-sky-400/22 bg-white/90 dark:bg-[#030b1d]/80 px-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-600 dark:focus:border-sky-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full min-h-[44px] rounded-xl border border-slate-300/85 dark:border-sky-400/22 bg-white/90 dark:bg-[#030b1d]/80 px-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-600 dark:focus:border-sky-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-2"
                  >
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full min-h-[44px] rounded-xl border border-slate-300/85 dark:border-sky-400/22 bg-white/90 dark:bg-[#030b1d]/80 px-4 text-sm text-slate-900 dark:text-slate-100 focus:border-blue-600 dark:focus:border-sky-400 focus:outline-none transition-colors"
                  >
                    <option value="Frontend Architecture">Frontend Architecture</option>
                    <option value="Creative Motion & GSAP">Creative Motion &amp; GSAP</option>
                    <option value="Full-Stack Web Apps">Full-Stack Web Apps</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project, timeline, or goals..."
                    className="w-full rounded-xl border border-slate-300/85 dark:border-sky-400/22 bg-white/90 dark:bg-[#030b1d]/80 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-600 dark:focus:border-sky-400 focus:outline-none transition-colors resize-y"
                  />
                </div>

                {errorMessage ? (
                  <p role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-400">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 min-h-[46px] px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-sm sm:text-base font-semibold text-white shadow-[0_10px_28px_rgba(37,99,235,0.34)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
