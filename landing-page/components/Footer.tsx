import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, LinkedInIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import { footerLinks, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{siteConfig.description}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.social.twitter}
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:border-brand-300 hover:text-brand-500"
            >
              <TwitterIcon size={15} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:border-brand-300 hover:text-brand-500"
            >
              <LinkedInIcon size={15} />
            </a>
            <a
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:border-brand-300 hover:text-brand-500"
            >
              <InstagramIcon size={15} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Product</h3>
          <ul className="mt-4 space-y-3">
            {footerLinks.product.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-muted hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Company</h3>
          <ul className="mt-4 space-y-3">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-muted hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Contact</h3>
          <p className="mt-4 text-sm text-muted">
            <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-foreground">
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-border-subtle py-6">
        <p className="container-page text-center text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
