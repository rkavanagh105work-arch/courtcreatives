import Image from "next/image";
import Link from "next/link";

// Shared shell for the privacy policy and terms pages: logo header linking
// home, a readable prose column, and the same footer as the main site.
export default function LegalPage({
  title,
  lastUpdated,
  children,
}: Readonly<{
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#fff6f3] text-gray-700">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 font-[family-name:var(--font-tangerine)] text-gray-800">
          {title}
        </h1>
        <p className="text-center text-sm text-gray-500 font-light mb-12">
          Last updated: {lastUpdated}
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 leading-relaxed font-light space-y-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h2]:pt-6 [&_h2:first-child]:pt-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-rose-400 [&_a]:underline [&_strong]:font-semibold">
          {children}
        </div>
      </main>

      <LegalFooter />
    </div>
  );
}

// Logo linking home and a way back to the main site. Shared by the legal pages
// and the area pages.
export function SiteHeader() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" aria-label="CourtCreatives home">
          <Image
            src="/logo.png"
            alt="CourtCreatives Logo"
            width={112}
            height={112}
            className="h-28 w-auto"
            priority
          />
        </Link>
        <Link
          href="/"
          className="text-gray-700 hover:text-rose-400 transition-colors duration-300 font-light tracking-wide"
        >
          ← Back to site
        </Link>
      </div>
    </header>
  );
}

export function LegalFooter() {
  return (
    <footer className="bg-white py-8 px-4 border-t">
      <div className="max-w-6xl mx-auto text-center text-gray-600">
        <p className="font-light">
          © {new Date().getFullYear()} CourtCreatives. All rights reserved.
        </p>
        <p className="mt-2 font-light">
          Creating beautiful wedding memories, one frame at a time
        </p>
        <FooterLinks />
      </div>
    </footer>
  );
}

export function FooterLinks() {
  return (
    <nav
      aria-label="Footer"
      className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-light"
    >
      <Link
        href="/areas"
        className="hover:text-rose-400 transition-colors duration-300"
      >
        Areas I Cover
      </Link>
      <Link
        href="/privacy-policy"
        className="hover:text-rose-400 transition-colors duration-300"
      >
        Privacy Policy
      </Link>
      <Link
        href="/terms-and-conditions"
        className="hover:text-rose-400 transition-colors duration-300"
      >
        Terms &amp; Conditions
      </Link>
    </nav>
  );
}
