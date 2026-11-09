import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SiteHeader, LegalFooter } from "@/components/LegalPage";
import { JsonLd } from "@/components/JsonLd";
import { areas } from "@/lib/areas";
import { site } from "@/lib/site";

const description =
  "Belfast-based wedding content creator covering the whole of Northern Ireland, from Belfast and Bangor to Enniskillen and the Causeway Coast, plus weddings across the border.";

export const metadata: Metadata = {
  title: "Areas I Cover | Wedding Content Creator Northern Ireland | CourtCreatives",
  description,
  alternates: { canonical: "/areas" },
  // openGraph and twitter replace the root layout's objects wholesale, so the
  // shared fields are repeated here.
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/areas",
    title: "Areas I Cover | Wedding Content Creator Northern Ireland",
    description,
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "CourtCreatives - Wedding Content Creator Northern Ireland",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Areas I Cover | Wedding Content Creator Northern Ireland",
    description,
    images: ["/logo.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Areas I Cover",
      item: `${site.url}/areas`,
    },
  ],
};

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-[#fff6f3] text-gray-700 font-sans">
      <JsonLd data={breadcrumbSchema} />

      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 font-[family-name:var(--font-tangerine)] text-gray-800">
          Areas I Cover
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-14">
          I&apos;m based in Belfast and cover the whole of Northern Ireland:
          Antrim, Armagh, Down, Fermanagh, Londonderry and Tyrone. Travel within
          Northern Ireland is included as standard, with a small travel fee only
          for the longest journeys. Pick your area to see what a wedding there
          looks like with me.
        </p>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/areas/${area.slug}`}
                className="group h-full flex flex-col bg-white p-6 rounded-lg shadow-lg ring-1 ring-transparent transition-all duration-300 ease-out hover:shadow-2xl hover:ring-[#f8ced0] motion-safe:hover:-translate-y-1"
              >
                <span className="inline-flex items-center gap-2 text-sm text-gray-500 font-semibold mb-2">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-rose-400" />
                  {area.county}
                </span>
                <span className="text-4xl text-gray-800 mb-3 font-[family-name:var(--font-tangerine)]">
                  {area.name}
                </span>
                <span className="text-gray-600 leading-relaxed mb-4">
                  {area.summary}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-gray-700 group-hover:text-rose-400 transition-colors">
                  Weddings {area.place}
                  <ArrowRight
                    aria-hidden="true"
                    className="w-4 h-4 transition-transform motion-safe:group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-16 bg-white rounded-lg shadow-lg p-6 md:p-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-tangerine)] text-gray-800">
            Getting married across the border?
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            I regularly travel to Donegal, Monaghan, Cavan, Louth, Sligo and
            Dublin, and I&apos;ve filmed at{" "}
            <a
              href="https://www.loughcrew.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-rose-400 transition-colors"
            >
              Loughcrew Estate
            </a>{" "}
            in County Meath. A
            travel fee applies for Republic of Ireland weddings, and for venues
            further afield I can arrange overnight accommodation so I&apos;m on
            site first thing on the morning of your wedding.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-[#f8ced0] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#f5b8bb] transition-all duration-300 shadow-lg hover:shadow-xl motion-safe:hover:-translate-y-1"
          >
            Check My Date
          </Link>
        </section>
      </main>

      <LegalFooter />
    </div>
  );
}
