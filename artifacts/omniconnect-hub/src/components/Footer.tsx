import { Link } from "wouter";
import {
  Globe2,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield,
  Award,
} from "lucide-react";

const productLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Live Tracking", href: "/tracking" },
  { label: "Analytics", href: "/analytics" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Brand Themes", href: "/themes" },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press Kit", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Blog", href: "#" },
];

const socialLinks = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Github, href: "#", label: "GitHub" },
  { Icon: Mail, href: "mailto:hello@omniconnect.io", label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/30 px-4 pt-16 pb-8 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30">
                <Globe2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">OmniConnect Hub</h3>
                <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">
                  Supply Chain Intelligence
                </p>
              </div>
            </div>
            <p className="mb-6 max-w-md text-sm leading-7 text-slate-400">
              An enterprise-grade command center for global logistics — unifying
              live tracking, smart analytics and sustainability into one
              beautifully designed experience.
            </p>

            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>Dubai · Singapore · Rotterdam</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span>+1 (555) 010-2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span>hello@omniconnect.io</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-slate-400 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block text-slate-400 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
          <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
            <Shield className="h-3.5 w-3.5" />
            ISO 27001 Certified
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
            <Award className="h-3.5 w-3.5" />
            SOC 2 Type II
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300">
            <Globe2 className="h-3.5 w-3.5" />
            Trusted by 200+ enterprises
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 md:flex-row">
          <p>
            © {year} OmniConnect Hub. All rights reserved. Crafted with care for
            the future of global trade.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-cyan-300">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-cyan-300">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-cyan-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
