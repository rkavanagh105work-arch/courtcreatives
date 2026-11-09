"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { packages } from "@/lib/packages";

type EnquiryContextValue = {
  selectedPackage: string;
  setSelectedPackage: (name: string) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

// Shares the chosen package between the package cards and the enquiry form, so
// "Enquire about The Luxe" lands on a form with The Luxe already selected.
export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState("");
  return (
    <EnquiryContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </EnquiryContext.Provider>
  );
}

function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  }
  return context;
}

// A real link to #contact, so it still works before JavaScript loads. Once it
// has, the scroll is smooth and keyboard focus moves to the form.
export function EnquireLink({
  packageName,
  className,
  children,
}: Readonly<{
  packageName?: string;
  className?: string;
  children: React.ReactNode;
}>) {
  const { setSelectedPackage } = useEnquiry();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (packageName) setSelectedPackage(packageName);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    document.getElementById("enquiry-form")?.focus({ preventScroll: true });
  };

  return (
    <a href="#contact" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export function PackageCards() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <article
              key={pkg.name}
              className="group bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col ring-1 ring-transparent transition-all duration-300 ease-out hover:shadow-2xl hover:ring-[#f8ced0] focus-within:ring-[#f8ced0] motion-safe:hover:-translate-y-2 motion-safe:focus-within:-translate-y-2"
            >
              <div
                aria-hidden="true"
                className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#f8ced0] flex items-center justify-center shadow-md transition-transform duration-300 ease-out motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6"
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl text-center text-gray-800 mb-6 font-[family-name:var(--font-tangerine)]">
                {pkg.name}
              </h3>
              <ul className="space-y-3 text-gray-600 leading-relaxed mb-8">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f8ced0]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <EnquireLink
                packageName={pkg.name}
                className="mt-auto block text-center bg-[#f8ced0] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#f5b8bb] transition-colors duration-300 shadow-md cursor-pointer"
              >
                Enquire Now
                <span className="sr-only"> about {pkg.name}</span>
              </EnquireLink>
            </article>
          );
        })}
      </div>
      <div className="mt-12 text-center space-y-2">
        <p className="text-gray-700 font-light text-sm">
          PACKAGES CAN BE TAILORED TO SUIT YOUR NEEDS
        </p>
        <p className="text-gray-700 font-light text-sm">
          20% DEPOSIT REQUIRED UPON BOOKING. TRAVEL FEES MAY APPLY DEPENDING ON
          LOCATION
        </p>
      </div>
    </>
  );
}

const emptyForm = {
  fullName: "",
  partnerName: "",
  email: "",
  phone: "",
  weddingDate: "",
  gettingReadyLocation: "",
  ceremonyLocation: "",
  receptionLocation: "",
  additionalDetails: "",
};

export function EnquiryForm() {
  const { selectedPackage, setSelectedPackage } = useEnquiry();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.weddingDate ||
      !formData.gettingReadyLocation ||
      !formData.ceremonyLocation ||
      !formData.receptionLocation
    ) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    // Validate wedding date is not in the past
    const selectedDate = new Date(formData.weddingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Please select a future date for your wedding.");
      return;
    }

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, package: selectedPackage }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setFormData(emptyForm);
        setSelectedPackage("");
      } else {
        alert("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        id="enquiry-form"
        tabIndex={-1}
        className="bg-[#fff6f3] p-8 md:p-12 rounded-lg shadow-xl outline-none"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 mb-2 font-normal">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="partnerName" className="block text-gray-700 mb-2 font-normal">
                Partner&apos;s Name
              </label>
              <input
                type="text"
                id="partnerName"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400 transition-colors"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2 font-normal">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2 font-normal">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400 transition-colors"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="weddingDate" className="block text-gray-700 mb-2 font-normal">
                Wedding Date *
              </label>
              <input
                type="date"
                id="weddingDate"
                name="weddingDate"
                value={formData.weddingDate}
                onChange={handleChange}
                required
                min={minDate}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400 transition-colors cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="package" className="block text-gray-700 mb-2 font-normal">
                Package
              </label>
              <select
                id="package"
                name="package"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-rose-400 transition-colors cursor-pointer"
              >
                <option value="">Not sure yet</option>
                {packages.map((pkg) => (
                  <option key={pkg.name} value={pkg.name}>
                    {pkg.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="gettingReadyLocation" className="block text-gray-700 mb-2 font-normal">
              Location of Where You Will Be Getting Ready *
            </label>
            <input
              type="text"
              id="gettingReadyLocation"
              name="gettingReadyLocation"
              value={formData.gettingReadyLocation}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="ceremonyLocation" className="block text-gray-700 mb-2 font-normal">
              Ceremony Location *
            </label>
            <input
              type="text"
              id="ceremonyLocation"
              name="ceremonyLocation"
              value={formData.ceremonyLocation}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="receptionLocation" className="block text-gray-700 mb-2 font-normal">
              Reception Location *
            </label>
            <input
              type="text"
              id="receptionLocation"
              name="receptionLocation"
              value={formData.receptionLocation}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="additionalDetails" className="block text-gray-700 mb-2 font-normal">
              Additional Details or Requests
            </label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400 transition-colors resize-none"
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#f8ced0] text-white font-semibold py-4 rounded-lg hover:bg-[#f5b8bb] transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
          >
            <Send className="w-5 h-5" />
            <span>Send Enquiry</span>
          </button>
          <p className="text-center text-sm text-gray-500 font-light">
            Your details are only used to reply to your enquiry. See the{" "}
            <Link
              href="/privacy-policy"
              className="underline hover:text-rose-400 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#f8ced0] mb-4">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-tangerine)] text-gray-900 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your enquiry has been successfully submitted. We&apos;ll get
                back to you within 24-48 hours.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-[#f8ced0] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#f5b8bb] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
