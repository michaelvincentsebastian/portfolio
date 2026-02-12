"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Send, Github, Linkedin, Instagram, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";

function DiscordIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

export function ContactSection() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ email: "", subject: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "ratelimit">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- RATE LIMIT LOGIC ---
    const lastSent = localStorage.getItem("portfolio_contact_last_sent");
    const now = Date.now();
    const oneMinute = 60 * 1000;

    if (lastSent && now - parseInt(lastSent) < oneMinute) {
      setSubmitStatus("ratelimit");
      setTimeout(() => setSubmitStatus("idle"), 5000);
      return;
    }
    // -------------------------

    setIsSending(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          botcheck: "",
        }),
      });

      if (response.ok) {
        localStorage.setItem("portfolio_contact_last_sent", now.toString()); // Simpan waktu pengiriman
        setSubmitStatus("success");
        setFormState({ email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSending(false);
      if (submitStatus !== "ratelimit") {
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    }
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/michaelvincentsebastian" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/michaelvincentsebastian/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/mchlvincent_?igsh=Ym83bDZhZ2poZmIx" },
    { name: "Discord", icon: DiscordIcon, href: "https://discord.com/users/vinnokkotsu" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-4xl font-bold text-foreground md:text-5xl text-balance">
          {t.contact.title} <span className="text-accent-secondary">{t.contact.titleAccent}</span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          {t.contact.description}
        </p>
      </motion.div>

      <div className="mt-12 flex flex-col gap-8 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex-1"
        >
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-bold text-foreground">{t.contact.sendMessage}</h3>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-medium text-foreground">{t.contact.emailLabel}</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    required
                    className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-medium text-foreground">{t.contact.subjectLabel}</label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder={t.contact.subjectPlaceholder}
                    required
                    className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">{t.contact.messageLabel}</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder={t.contact.messagePlaceholder}
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent-secondary px-6 py-3.5 text-sm font-semibold text-accent-secondary-foreground transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-50"
              >
                <Send size={16} />
                {isSending ? "Sending..." : t.contact.sendBtn}
              </motion.button>

              {/* Status Notifications */}
              {submitStatus === "success" && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-400">
                  <CheckCircle size={16} /> Message sent successfully!
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
                  <AlertCircle size={16} /> Failed to send. Please try again.
                </motion.div>
              )}
              {submitStatus === "ratelimit" && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-4 py-3 text-sm text-amber-500">
                  <Clock size={16} /> Please wait a minute before sending again.
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Contact Info (Tetap seperti sebelumnya) */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-col gap-6 lg:w-80">
          <div>
            <h3 className="text-lg font-bold text-foreground">{t.contact.contactInfo}</h3>
            <div className="mt-4 flex flex-col gap-4">
              <a href={`tel:${t.contact.phone?.replace(/\s/g, "")}`} className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-secondary/10 text-accent-secondary transition-transform group-hover:scale-110">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{t.contact.phoneLabel}</span>
                  <span className="text-sm text-foreground transition-colors group-hover:text-accent">{t.contact.phone}</span>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-secondary/10 text-accent-secondary">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{t.contact.locationLabel}</span>
                  <span className="text-sm text-foreground">{t.contact.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground">{t.contact.socialMedia}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.contact.connectMessage}</p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                    aria-label={link.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}