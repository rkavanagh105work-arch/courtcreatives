import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

const CONTACT_EMAIL = "courtcreatives@outlook.com";

export const metadata: Metadata = {
  title: "Privacy Policy | CourtCreatives",
  description:
    "How CourtCreatives collects, uses and protects your personal information when you enquire about or book wedding content creation in Northern Ireland.",
  // Override the root layout's canonical ("/") so this page doesn't point at
  // the homepage.
  alternates: { canonical: "/privacy-policy" },
  openGraph: { url: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="9 November 2026">
      <h2>Who I am</h2>
      <p>
        CourtCreatives is a wedding content creation business run by Courtney,
        based in Belfast, Northern Ireland. In this policy, &ldquo;I&rdquo;,
        &ldquo;me&rdquo; and &ldquo;CourtCreatives&rdquo; refer to the business.
        I am the data controller for the personal information described below,
        and I handle it in line with the UK General Data Protection Regulation
        (UK GDPR) and the Data Protection Act 2018.
      </p>
      <p>
        If you have any questions about this policy or your information, email
        me at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>What information I collect</h2>
      <p>
        <strong>When you send an enquiry</strong> through the contact form, I
        collect:
      </p>
      <ul>
        <li>your full name and your partner&apos;s name (optional)</li>
        <li>your email address and phone number (optional)</li>
        <li>your wedding date</li>
        <li>your getting-ready, ceremony and reception locations</li>
        <li>anything else you choose to tell me in the additional details box</li>
      </ul>
      <p>
        <strong>When you book</strong>, I also keep your booking contract,
        payment records and any details we agree for the day, such as timings,
        key people and must-have moments.
      </p>
      <p>
        <strong>On your wedding day</strong>, I capture photos and video of you,
        your guests and your venue. This content is personal data of the people
        who appear in it.
      </p>
      <p>
        <strong>When you visit the website</strong>, my hosting provider
        automatically records basic technical information, such as your IP
        address, browser type and the pages requested, to keep the site running
        securely.
      </p>

      <h2>How and why I use it</h2>
      <ul>
        <li>
          <strong>To reply to your enquiry and prepare a quote.</strong> The
          lawful basis is taking steps at your request before entering into a
          contract.
        </li>
        <li>
          <strong>To provide the service you have booked</strong>, including
          planning the day, capturing content and delivering your edited
          gallery. The lawful basis is performance of our contract.
        </li>
        <li>
          <strong>To keep financial and business records.</strong> The lawful
          basis is compliance with legal obligations, such as tax law.
        </li>
        <li>
          <strong>To share selected content in my portfolio</strong>, on this
          website and on my social media accounts. I only do this where you have
          agreed to it in your booking contract, and you can change your mind
          at any time.
        </li>
        <li>
          <strong>To keep the website secure and working.</strong> The lawful
          basis is my legitimate interest in running a safe, reliable website.
        </li>
      </ul>
      <p>
        I will never sell your information or use it for marketing without your
        permission.
      </p>

      <h2>Who I share it with</h2>
      <p>
        I only share your information with trusted service providers who help me
        run the business, and only as much as they need:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong>, which hosts this website
        </li>
        <li>
          <strong>Resend</strong>, which delivers enquiry form submissions to my
          inbox
        </li>
        <li>
          <strong>Microsoft</strong>, which provides my email account
        </li>
        <li>
          cloud storage and file-sharing services I use to store and deliver
          your content
        </li>
      </ul>
      <p>
        Some of these providers are based in, or store data in, the United
        States. Where your information is transferred outside the UK, it is
        protected by appropriate safeguards, such as the UK&ndash;US data bridge
        or the UK International Data Transfer Addendum to standard contractual
        clauses.
      </p>
      <p>
        I may also share information where the law requires it, for example
        with HMRC.
      </p>

      <h2>How long I keep it</h2>
      <ul>
        <li>
          <strong>Enquiries that don&apos;t lead to a booking</strong> are
          deleted within 12 months.
        </li>
        <li>
          <strong>Booking and payment records</strong> are kept for 6 years
          after the end of the tax year they relate to, as required for tax
          purposes.
        </li>
        <li>
          <strong>Wedding content</strong> is kept for 12 months after delivery
          so I can help if you lose your copy, and then deleted. Content you
          have agreed I can use in my portfolio is kept for as long as it is
          used there, unless you ask me to remove it.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        This website does not use analytics, advertising or tracking cookies.
        Fonts are served from the site itself, so visiting it does not send
        your information to third-party font providers.
      </p>
      <p>
        The site links to my Instagram, TikTok and Facebook accounts. If you
        follow those links, Instagram, TikTok and Facebook&apos;s own privacy
        policies apply.
      </p>

      <h2>Your rights</h2>
      <p>Under data protection law, you have the right to:</p>
      <ul>
        <li>ask for a copy of the information I hold about you</li>
        <li>ask me to correct information that is wrong or incomplete</li>
        <li>ask me to delete your information</li>
        <li>ask me to restrict or stop using your information</li>
        <li>object to my use of your information</li>
        <li>
          ask me to transfer your information to you or another organisation
        </li>
        <li>
          withdraw your consent at any time, where I rely on consent, such as
          for portfolio use
        </li>
      </ul>
      <p>
        To use any of these rights, email me at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. I will reply
        within one month. Some rights have exceptions; for example, I have to
        keep financial records for as long as the law requires.
      </p>

      <h2>Complaints</h2>
      <p>
        If you are unhappy with how I have handled your information, please
        contact me first so I can try to put it right. You also have the right
        to complain to the Information Commissioner&apos;s Office (ICO), the UK
        data protection regulator, at{" "}
        <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
          ico.org.uk/make-a-complaint
        </a>{" "}
        or by calling 0303 123 1113.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        I may update this policy from time to time. The latest version will
        always be on this page, with the date it was last updated shown at the
        top.
      </p>
    </LegalPage>
  );
}
