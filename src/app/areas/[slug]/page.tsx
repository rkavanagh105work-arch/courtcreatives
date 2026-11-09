import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin } from "lucide-react";
import { SiteHeader, LegalFooter } from "@/components/LegalPage";
import { JsonLd } from "@/components/JsonLd";
import {
  EnquireLink,
  EnquiryForm,
  EnquiryProvider,
  PackageCards,
} from "@/components/enquiry";
import { areas, getArea } from "@/lib/areas";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

// Unknown slugs 404 instead of rendering an empty page.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};

  const path = `/areas/${area.slug}`;
  const heading = `Wedding Content Creator ${area.place}`;
  // openGraph and twitter replace the root layout's objects wholesale, so the
  // shared fields are repeated here.
  return {
    title: area.title,
    description: area.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: heading,
      description: area.description,
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
      title: heading,
      description: area.description,
      images: ["/logo.png"],
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const url = `${site.url}/areas/${area.slug}`;
  const otherAreas = areas.filter((other) => other.slug !== area.slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Wedding content creation ${area.place}`,
    serviceType: "Wedding Content Creation",
    description: area.description,
    url,
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "Place", name: area.name },
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
      { "@type": "ListItem", position: 3, name: area.name, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-[#fff6f3] text-gray-700 font-sans">
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <SiteHeader />

      <EnquiryProvider>
        <main>
          {/* Intro */}
          <section className="pt-12 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
              <nav aria-label="Breadcrumb" className="mb-10 text-sm font-light">
                <ol className="flex flex-wrap justify-center gap-2 text-gray-500">
                  <li>
                    <Link href="/" className="hover:text-rose-400 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/areas" className="hover:text-rose-400 transition-colors">
                      Areas I Cover
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-gray-700">
                    {area.name}
                  </li>
                </ol>
              </nav>

              <div className="text-center">
                <p className="inline-flex items-center gap-2 text-gray-500 font-semibold mb-4">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-rose-400" />
                  {area.county}
                </p>
                <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight font-[family-name:var(--font-tangerine)] text-gray-800">
                  Wedding Content Creator{" "}
                  <span className="text-[#f8ced0]">{area.place}</span>
                </h1>
              </div>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {area.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-10 text-center">
                <EnquireLink className="inline-block bg-[#f8ced0] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#f5b8bb] transition-all duration-300 shadow-lg hover:shadow-xl motion-safe:hover:-translate-y-1 cursor-pointer">
                  Check My Date
                </EnquireLink>
              </div>
            </div>
          </section>

          {/* What I capture here */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 font-[family-name:var(--font-tangerine)] text-gray-800">
                Capturing Your Wedding {area.place}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {area.moments.map((moment) => (
                  <div
                    key={moment.heading}
                    className="bg-[#fff6f3] p-6 md:p-8 rounded-lg shadow-lg"
                  >
                    <h3 className="text-3xl md:text-4xl text-gray-800 mb-3 font-[family-name:var(--font-tangerine)]">
                      {moment.heading}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{moment.text}</p>
                  </div>
                ))}
              </div>

              {area.venues && (
                <div className="mt-16 text-center">
                  <h3 className="text-3xl md:text-4xl text-gray-800 mb-6 font-[family-name:var(--font-tangerine)]">
                    Venues I&apos;ve filmed at
                  </h3>
                  <ul className="flex flex-wrap justify-center gap-4">
                    {area.venues.map((venue) => (
                      <li key={venue.name}>
                        <a
                          href={venue.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block bg-[#fff6f3] px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                          <span className="inline-flex items-center gap-1.5 text-gray-800 font-semibold group-hover:text-rose-400 transition-colors">
                            {venue.name}
                            <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                            <span className="sr-only">(opens the venue&apos;s website in a new tab)</span>
                          </span>
                          <span className="flex items-center justify-center gap-1 text-sm text-gray-500">
                            <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-rose-400" />
                            {venue.location}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Packages */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-bold text-center mb-16 font-[family-name:var(--font-tangerine)] text-gray-800">
                Packages
              </h2>
              <PackageCards />
            </div>
          </section>

          {/* Travel and nearby areas */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-tangerine)] text-gray-800">
                Travel &amp; Coverage
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {area.travel}
              </p>

              <h3 className="mt-14 mb-6 text-2xl md:text-3xl text-gray-800 font-[family-name:var(--font-tangerine)]">
                Other areas I cover
              </h3>
              <ul className="flex flex-wrap justify-center gap-3">
                {otherAreas.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/areas/${other.slug}`}
                      className="inline-block bg-[#fff6f3] text-gray-700 px-4 py-2 rounded-full shadow-sm hover:text-rose-400 hover:shadow-md transition-all duration-300"
                    >
                      {other.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Enquiry form */}
          <section id="contact" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-bold text-center mb-4 font-[family-name:var(--font-tangerine)] text-gray-800">
                Get In Touch
              </h2>
              <p className="text-center text-gray-600 font-light mb-12 max-w-2xl mx-auto">
                Getting married {area.place}? Tell me about your day and
                I&apos;ll get back to you within 24–48 hours.
              </p>
              <EnquiryForm />
            </div>
          </section>
        </main>
      </EnquiryProvider>

      <LegalFooter />
    </div>
  );
}
