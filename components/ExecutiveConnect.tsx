import { GlassCard } from "./GlassCard";
import { Linkedin, Github, Mail, Calendar } from "lucide-react";

const contactButtons = [
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/gaston-d-859653184/",
    variant: "secondary" as const,
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/gastondana627",
    variant: "secondary" as const,
  },
  {
    label: "Email",
    icon: Mail,
    href: "mailto:gastondana627@gmail.com",
    variant: "secondary" as const,
  },
  {
    label: "Book a Consultation",
    icon: Calendar,
    href: "https://www.linkedin.com/in/gaston-d-859653184/",
    variant: "primary" as const,
  },
];

export function ExecutiveConnect() {
  return (
    <section className="container mx-auto px-4 py-12">
      <GlassCard className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
          <p className="text-zinc-400">
            Let&apos;s discuss data science, logistics optimization, or collaboration opportunities
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {contactButtons.map((button) => {
            const Icon = button.icon;
            const isPrimary = button.variant === "primary";

            return (
              <a
                key={button.label}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                  transition-all duration-300 hover:-translate-y-1
                  ${
                    isPrimary
                      ? "bg-gradient-to-r from-ups-gold to-amber-600 text-zinc-950 hover:shadow-lg hover:shadow-ups-gold/30"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-ups-gold/30"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{button.label}</span>
              </a>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
}