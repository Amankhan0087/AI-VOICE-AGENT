import { AudioLines } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-semibold tracking-tight ${className ?? ""}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
        <AudioLines size={18} strokeWidth={2.4} />
      </span>
      <span className="text-[1.05rem] text-foreground">{siteConfig.shortName}</span>
    </Link>
  );
}
