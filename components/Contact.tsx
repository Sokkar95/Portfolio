"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { FORM_SERVICES, SITE, SOCIALS, waLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const FIELD =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: FORM_SERVICES[0] as string,
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<"idle" | "done" | "fail">("idle");
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);

  const compose = () =>
    `Hi Amr, I'm ${form.name.trim()}${form.email.trim() ? ` (${form.email.trim()})` : ""}.\nProject type: ${form.type}\n\n${form.message.trim()}`;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "That email address doesn't look right.";
    }
    if (form.message.trim().length < 12) {
      next.message = "A sentence or two about the project helps (12+ characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const href = (via: "whatsapp" | "email") => {
    const text = compose();
    return via === "whatsapp"
      ? waLink(text)
      : `mailto:${SITE.email}?subject=${encodeURIComponent(`New project — ${form.type}`)}&body=${encodeURIComponent(text)}`;
  };

  const send = (via: "whatsapp" | "email") => {
    if (!validate()) return;
    track("contact_submit", { method: via, project_type: form.type });
    setSent(via);
    window.open(href(via), "_blank", "noopener,noreferrer");
  };

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(SITE.email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = SITE.email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied("done");
      track("copy_email");
    } catch {
      setCopied("fail");
    }
    window.setTimeout(() => setCopied("idle"), 2200);
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="04" label="Contact" />

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* ---------------- left: the ask ---------------- */}
          <div className="flex flex-col">
            <Reveal>
              <p className="font-mono text-xs text-muted">Got A Vision?</p>
              <h2 className="mt-4 text-[clamp(2.5rem,6vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Let&apos;s Build
                <br />
                <span className="font-serif italic text-accent">The System.</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted">
                Tell me what you&apos;re building and I&apos;ll come back with a plan —
                scope, sequence and what it takes to ship it.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <dl className="mt-8 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-xs text-muted">Response Time</dt>
                  <dd className="mt-1.5 text-sm">Usually within 24 hours</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-muted">Availability</dt>
                  <dd className="mt-1.5 flex items-center gap-2 text-sm">
                    <span className="size-1.5 rounded-full bg-accent-2" />
                    Open to new projects
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted">Email</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      onClick={() => track("contact_click", { method: "email" })}
                      className="block truncate rounded text-base underline-offset-4 hover:underline"
                    >
                      {SITE.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-live="polite"
                    className="inline-flex shrink-0 items-center justify-center rounded-full border border-line px-4 py-2 text-center text-sm leading-none transition-colors hover:border-line-strong"
                  >
                    {copied === "done" ? "Copied ✓" : copied === "fail" ? "Copy failed" : "Copy"}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {SOCIALS.filter((s) => s.label !== "Facebook").map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-1 rounded-2xl border border-line bg-surface px-4 py-3 text-sm transition-colors hover:border-line-strong"
                    >
                      {s.label}
                      <span
                        aria-hidden="true"
                        className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------------- right: the form ---------------- */}
          <Reveal delay={120}>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                send("whatsapp");
              }}
              className="rounded-3xl border border-line bg-surface p-6 sm:p-8"
            >
              <h3 className="text-xl font-semibold">Start a Project</h3>
              <p className="mt-2 text-sm text-muted">
                Sends straight to my WhatsApp — nothing is stored on this site.
              </p>

              <div className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-2 block text-sm">
                      Your name
                    </label>
                    <input
                      id="c-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Sara Ahmed"
                      className={FIELD}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "c-name-err" : undefined}
                    />
                    {errors.name && (
                      <p id="c-name-err" className="mt-1.5 text-xs text-[#ff8a65]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="c-email" className="mb-2 block text-sm">
                      Email <span className="text-muted">(optional)</span>
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className={FIELD}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "c-email-err" : undefined}
                    />
                    {errors.email && (
                      <p id="c-email-err" className="mt-1.5 text-xs text-[#ff8a65]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <fieldset>
                  <legend className="mb-2 block text-sm">Project type</legend>
                  <div className="flex flex-wrap gap-2">
                    {FORM_SERVICES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, type })}
                        aria-pressed={form.type === type}
                        className={cn(
                          "inline-flex items-center justify-center rounded-full border px-4 py-2 text-center text-sm leading-none transition-colors",
                          form.type === type
                            ? "border-accent bg-accent text-[#14140f]"
                            : "border-line text-muted hover:border-line-strong hover:text-ink",
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="c-msg" className="mb-2 block text-sm">
                    About the project
                  </label>
                  <textarea
                    id="c-msg"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What are you building, who is it for, and when do you need it?"
                    className={cn(FIELD, "resize-none")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "c-msg-err" : undefined}
                  />
                  {errors.message && (
                    <p id="c-msg-err" className="mt-1.5 text-xs text-[#ff8a65]">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold leading-none text-[#14140f] transition-opacity hover:opacity-90"
                  >
                    Send on WhatsApp
                    <span aria-hidden="true">↗</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => send("email")}
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-line px-6 py-3 text-center text-sm leading-none transition-colors hover:border-line-strong"
                  >
                    Send by Email
                  </button>
                </div>

                {sent && (
                  <p className="text-xs text-muted">
                    {sent === "whatsapp" ? "Opening WhatsApp" : "Opening your mail app"} in a new
                    tab. Blocked?{" "}
                    <a
                      href={href(sent)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink underline underline-offset-4"
                    >
                      Open it here
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <footer className="mt-20 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 pt-8 text-sm text-muted">
          <span>© {new Date().getFullYear()} Amr Elsokkary</span>
          <span className="flex items-center gap-4">
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
            <a href={SITE.behance} target="_blank" rel="noreferrer" className="hover:text-ink">
              Behance
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-ink"
            >
              Back to top ↑
            </button>
          </span>
        </div>
      </footer>
    </section>
  );
}
