"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  X,
  Menu,
  MessageCircle,
  Package,
  FileText,
  Phone,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { FooterLinks } from "@/components/LegalPage";
import {
  EnquiryForm,
  EnquiryProvider,
  PackageCards,
} from "@/components/enquiry";
import { areas } from "@/lib/areas";
import { site } from "@/lib/site";

const TikTokIcon = ({ className }: { className?: string }) => (
  <FontAwesomeIcon icon={faTiktok} className={className} />
);

// Profiles without a URL in site.ts are left out.
const socialLinks = [
  { name: "Instagram", href: site.social.instagram, Icon: Instagram },
  { name: "TikTok", href: site.social.tiktok, Icon: TikTokIcon },
  { name: "Facebook", href: site.social.facebook, Icon: Facebook },
].filter((link) => link.href);

// Areas covered, as stated in the first two FAQ answers. Structured data must
// describe what's visible on the page, so "areaServed" is built from this list
// rather than a longer list of towns that never appear in the copy. If you add
// an area here, mention it in the FAQ text too.
const areasServed = {
  northernIreland: [
    "County Antrim",
    "County Armagh",
    "County Down",
    "County Fermanagh",
    "County Londonderry",
    "County Tyrone",
  ],
  republicOfIreland: [
    "County Donegal",
    "County Monaghan",
    "County Cavan",
    "County Louth",
    "County Sligo",
    "Dublin",
  ],
};

const faqs: { question: string; answer: string; showAreaLinks?: boolean }[] = [
  {
    question: "Where are you based and what areas do you cover?",
    showAreaLinks: true,
    answer:
      "I'm based in Belfast and cover the whole of Northern Ireland — Antrim, Armagh, Down, Fermanagh, Londonderry and Tyrone. That includes venues right across Belfast, Lisburn, Bangor, Newry, Ballymena, Armagh, Enniskillen, Omagh, Derry~Londonderry and the Causeway Coast. Travel within Northern Ireland is included as standard, with a small travel fee only for the longest journeys.",
  },
  {
    question: "Do you travel to the Republic of Ireland?",
    answer:
      "Absolutely. I regularly travel across the border for weddings in Donegal, Monaghan, Cavan, Louth, Sligo and Dublin. A travel fee applies for ROI weddings, and for venues further afield I can arrange overnight accommodation so I'm on site and ready first thing on the morning of your wedding. Just get in touch with your venue and I'll quote it for you.",
  },
  {
    question:
      "What's the difference between a wedding content creator and a photographer or videographer?",
    answer:
      "Your photographer and videographer create the polished, cinematic keepsakes you'll frame and watch on your anniversary — and those take weeks to edit. I capture the in-between moments the same way your best friend would: raw, candid, behind-the-scenes clips and photos shot vertically for TikTok, Instagram Reels and Stories. I work alongside your photo and video team, never instead of them.",
  },
  {
    question: "How quickly will I get my wedding content?",
    answer:
      "Your full gallery of edited content lands with you within 24 to 48 hours of your wedding day. Most couples are posting their reels before they've even left for their honeymoon. If there are a few standout clips you want even sooner, just say the word on the day and I'll get them over to you.",
  },
  {
    question: "How do I book, and how do I secure my date?",
    answer:
      "Pick the package that suits you, then send an enquiry through the contact form below. Once we've confirmed the details I'll send over a contract to sign, and a 20% deposit secures your date in the diary. The remaining balance is due 30 days before the wedding.",
  },
  {
    question: "How far in advance should I book you?",
    answer:
      "The earlier the better. Peak season in Northern Ireland runs from May through September and those Saturdays tend to go 12 to 18 months ahead. That said, it's always worth asking — midweek dates, winter weddings and last-minute gaps do come up.",
  },
  {
    question: "Can packages be tailored to what we need?",
    answer:
      "Yes — every one of the three packages can be adjusted. Whether you want extra hours to cover the getting-ready in the morning, coverage that runs later into the dancing, or a shorter day for a smaller celebration, we'll build something that fits. Just mention what you're after in your enquiry.",
  },
  {
    question: "What equipment do you use?",
    answer:
      "I shoot primarily on the latest iPhone, and that's very deliberate. Phone footage is what makes social content feel natural and native to the platform rather than staged, and it lets me stay unobtrusive and move quickly through the day. I also bring a gimbal for smooth movement and portable lighting for evening receptions.",
  },
  {
    question: "Will you get in the way of our photographer or videographer?",
    answer:
      "No. Working around a photo and video team is a core part of the job — I'll introduce myself on the morning, stay out of their frames and coordinate throughout the day. Because I'm shooting on a phone I can tuck into spaces a full camera rig can't, so you get a completely different angle on your day.",
  },
  {
    question: "Do you cover elopements and smaller weddings?",
    answer:
      "Of course. Intimate ceremonies, elopements, micro-weddings, engagement parties and hen dos are all very welcome. Smaller celebrations often make for some of the most personal content, and shorter packages can be arranged to suit.",
  },
];

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#business`,
  name: site.name,
  alternateName: "Court Creatives Wedding Content Creator",
  description:
    "Wedding content creator based in Belfast, covering Northern Ireland and the Republic of Ireland. Candid, behind-the-scenes TikToks, Instagram Reels and stills, delivered within 24–48 hours.",
  url: site.url,
  logo: `${site.url}/logo.png`,
  image: `${site.url}/aboutme.JPG`,
  // A service-area business with no public premises, so only the town is
  // given and there's no "geo" — coordinates would imply a studio address.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belfast",
    addressRegion: "Northern Ireland",
    addressCountry: "GB",
  },
  sameAs: site.sameAs,
  areaServed: [
    { "@type": "City", name: "Belfast" },
    { "@type": "AdministrativeArea", name: "Northern Ireland" },
    ...areasServed.northernIreland.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    ...areasServed.republicOfIreland.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  ],
  serviceType: [
    "Wedding Content Creation",
    "Wedding Content Creator",
    "Social Media Content",
    "TikTok Videos",
    "Instagram Reels",
  ],
};

// States the site name for Google's site-name feature and ties the site to the
// business entity above.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#business` },
};

// Describes the visible FAQ. Google no longer shows FAQ rich results for
// sites like this, so this is descriptive markup only.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const CourtCreativesWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        if (document.fullscreenElement) {
          video.style.objectFit = "contain";
        } else {
          video.style.objectFit = "cover";
        }
      });
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    const handleVideoPlay = (e: Event) => {
      const playingVideo = e.target as HTMLVideoElement;
      const allVideos = document.querySelectorAll("video");

      allVideos.forEach((video) => {
        if (video !== playingVideo) {
          video.pause();
        }
      });
    };

    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.addEventListener("play", handleVideoPlay);
    });

    return () => {
      videos.forEach((video) => {
        video.removeEventListener("play", handleVideoPlay);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fff6f3] font-sans">
      {/* Structured data — rendered into the markup so crawlers pick it up
          without having to execute JavaScript */}
      {[professionalServiceSchema, websiteSchema, faqSchema].map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      {/* Navigation */}
      <nav className="fixed w-full bg-[#fff6f3]/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="CourtCreatives Logo"
                width={112}
                height={112}
                className="h-28 w-auto cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                priority
              />
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-8">
                {[
                  "About",
                  "Packages",
                  "How it works",
                  "Gallery",
                  "FAQ",
                  "Contact",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, "-"))}
                    className="text-gray-700 hover:text-rose-400 transition-colors duration-300 font-light tracking-wide cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center space-x-4 border-l border-gray-300 pl-6">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`CourtCreatives on ${name}`}
                    className="text-gray-700 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="md:hidden p-2 cursor-pointer text-gray-800"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#fff6f3]/95 border-t">
            <div className="px-4 py-4 space-y-4">
              {[
                "About",
                "Packages",
                "How it works",
                "Gallery",
                "FAQ",
                "Contact",
              ].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, "-"))}
                    className="block w-full text-left text-gray-700 hover:text-[#f8ced0] transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-[family-name:var(--font-tangerine)] text-gray-800">
            Wedding Content Creator{" "}
            <span className="text-[#f8ced0]">Northern Ireland</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light max-w-3xl mx-auto">
            Professional wedding content creator serving Belfast, Northern
            Ireland, and beyond. Specialising in stunning TikTok videos,
            Instagram reels, and cinematic wedding content that brings your
            special day to life
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-[#f8ced0] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#f5b8bb] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
          >
            Book Your Date
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-tangerine)] text-gray-800">
                About Me
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Hi, I&apos;m Courtney.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                A passionate wedding content creator based in Belfast, Northern
                Ireland, dedicated to capturing the magic, emotion, and beauty
                of your special day through raw candid photos and videos.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                As a wedding content creator in Northern Ireland and Belfast, I
                specialise in creating stunning visual stories perfect for
                social media that you&apos;ll treasure forever. From intimate
                ceremonies to grand celebrations across NI, I&apos;m here to
                document every precious moment.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My approach is authentic, creative, and focused on capturing the
                genuine emotions that make your wedding uniquely yours. Proudly
                serving couples throughout Belfast, Northern Ireland & ROI.
              </p>
            </div>
            <div className="relative h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/aboutme.JPG"
                alt="Courtney, wedding content creator at CourtCreatives"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold text-center mb-16 font-[family-name:var(--font-tangerine)] text-gray-800">
            Packages
          </h2>
          <PackageCards />
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold text-center mb-12 font-[family-name:var(--font-tangerine)] text-gray-800">
            How it works
          </h2>
          <div className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Stage 1 */}
            <div className="bg-[#fff6f3] p-4 md:p-8 rounded-lg shadow-lg">
              <div className="flex gap-3 md:gap-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-[#f8ced0] rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[#f8ced0] font-semibold text-base md:text-lg mb-1">
                    Stage 1
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-2 font-[family-name:var(--font-tangerine)]">
                    Choose Your Package
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Pick one of the 3 packages available as shown above.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Packages can be tailored to suit your individual needs /
                    wants.
                  </p>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-[#fff6f3] p-4 md:p-8 rounded-lg shadow-lg">
              <div className="flex gap-3 md:gap-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-[#f8ced0] rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[#f8ced0] font-semibold text-base md:text-lg mb-1">
                    Stage 2
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-2 font-[family-name:var(--font-tangerine)]">
                    Sign Contract & Pay Deposit
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Details will be confirmed & contact form will get sent to be
                    signed
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    A 20% deposit is required at this point to secure your date.
                    Remaining balance is due 30 days before wedding.
                  </p>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-[#fff6f3] p-4 md:p-8 rounded-lg shadow-lg">
              <div className="flex gap-3 md:gap-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-[#f8ced0] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[#f8ced0] font-semibold text-base md:text-lg mb-1">
                    Stage 3
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-2 font-[family-name:var(--font-tangerine)]">
                    Phone Call or Online Consultation
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    30 Days before your wedding date we will gather all the
                    important details.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    We will also talk all things content creation along with the
                    package that you had selected & what that entails.
                  </p>
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-[#fff6f3] p-4 md:p-8 rounded-lg shadow-lg">
              <div className="flex gap-3 md:gap-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-[#f8ced0] rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[#f8ced0] font-semibold text-base md:text-lg mb-1">
                    Stage 4
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-2 font-[family-name:var(--font-tangerine)]">
                    Wedding day + Receiving Content
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    On your wedding day I will be there as long as the package
                    states, capturing all those special moments.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    You will receive all your contents within 24 - 48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold text-center mb-16 font-[family-name:var(--font-tangerine)] text-gray-800">
            Video Gallery
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                type: "video",
                src: "/vid1.mp4",
              },
              {
                type: "video",
                src: "/vid2.mp4",
              },
              {
                type: "video",
                src: "/vid3.mp4",
              },
              {
                type: "video",
                src: "/vid4.mp4",
              },
              {
                type: "video",
                src: "/vid5.mp4",
              },
              {
                type: "video",
                src: "/vid6.mp4",
              },
            ].map((item, index) =>
              item.type === "video" ? (
                <div
                  key={index}
                  className="relative h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <video
                    controls
                    className="w-full h-full object-cover"
                    preload="metadata"
                    playsInline
                    muted
                  >
                    <source src={`${item.src}#t=0.1`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : null
            )}
          </div>
          <div className="mt-12 text-center">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#f8ced0] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#f5b8bb] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            >
              <Instagram className="w-5 h-5" />
              <span>View More</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold text-center mb-4 font-[family-name:var(--font-tangerine)] text-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 font-light mb-12 max-w-2xl mx-auto">
            Everything you need to know about booking a wedding content creator
            in Northern Ireland. Still wondering about something? Drop me a
            message below.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="bg-[#fff6f3] rounded-lg shadow-lg overflow-hidden"
                >
                  <h3 className="text-base md:text-xl text-gray-800 font-normal">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`w-5 h-5 flex-shrink-0 text-[#f8ced0] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${index}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                      {faq.showAreaLinks && (
                        <div className="px-5 md:px-6 pb-5 md:pb-6">
                          <p className="text-sm md:text-base text-gray-700 mb-3">
                            See what a wedding looks like with me in{" "}
                            <Link
                              href="/areas"
                              className="underline hover:text-rose-400 transition-colors"
                            >
                              each area I cover
                            </Link>
                            :
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {areas.map((area) => (
                              <li key={area.slug}>
                                <Link
                                  href={`/areas/${area.slug}`}
                                  className="inline-block bg-white text-sm text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:text-rose-400 hover:shadow-md transition-all duration-300"
                                >
                                  {area.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold text-center mb-16 font-[family-name:var(--font-tangerine)] text-gray-800">
            Get In Touch
          </h2>
          <EnquiryForm />

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-700 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <Icon className="w-6 h-6" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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

      {/* Floating Chat Button */}
      <button
        onClick={() => scrollToSection("contact")}
        aria-label="Send an enquiry"
        className="fixed bottom-6 right-6 bg-[#f8ced0] text-white font-semibold p-4 rounded-full shadow-2xl hover:bg-[#f5b8bb] transition-all duration-300 hover:scale-110 z-50 cursor-pointer"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

// The provider lets the package cards pre-select a package in the enquiry form.
export default function Home() {
  return (
    <EnquiryProvider>
      <CourtCreativesWebsite />
    </EnquiryProvider>
  );
}
