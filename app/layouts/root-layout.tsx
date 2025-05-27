import { Outlet, useRouteLoaderData } from "react-router";
import type { Route } from "./+types/root-layout";
import { useState } from "react";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { RootLoaderData } from "@/root";

import method1 from "@/assets/images/payment-method/pay16.png";
import method2 from "@/assets/images/payment-method/pay17.png";
import method3 from "@/assets/images/payment-method/pay22.png";
import method4 from "@/assets/images/payment-method/pay33.png";
import method5 from "@/assets/images/payment-method/pay34.png";
import method6 from "@/assets/images/payment-method/pay45.png";
import method7 from "@/assets/images/payment-method/pay46.png";
import method8 from "@/assets/images/payment-method/pay59.png";
import method9 from "@/assets/images/payment-method/pay60.png";
import method0 from "@/assets/images/payment-method/pay61.png";

import sponsor1 from "@/assets/images/sponsor/sponsor1.png";
import sponsor2 from "@/assets/images/sponsor/sponsor2.png";
import sponsor3 from "@/assets/images/sponsor/sponsor3.png";
import sponsor4 from "@/assets/images/sponsor/sponsor4.png";
import sponsor5 from "@/assets/images/sponsor/sponsor5.png";
import officialPartner from "@/assets/images/sponsor/official-partner-heyvip.png";

import ambassador1 from "@/assets/images/ambassador/ambassadors1.png";
import ambassador2 from "@/assets/images/ambassador/ambassadors2.png";
import ambassador3 from "@/assets/images/ambassador/ambassadors3.png";
import ambassador4 from "@/assets/images/ambassador/ambassadors4.png";

import siteLogo from "@/assets/images/logo-blue.png";

const PAYMENT_METHODS = [
  method1,
  method2,
  method3,
  method4,
  method5,
  method6,
  method7,
  method8,
  method9,
  method0,
];

const SPONSORS = [
  {
    id: 1,
    name: "Chepauk Super Gillies",
    title: "Principal Sponsor",
    year: "2023",
    icon: sponsor1,
  },
  {
    id: 2,
    name: "Saint Lucia Kings",
    title: "Title Sponsor",
    year: "2023 - 2024",
    icon: sponsor2,
  },
  {
    id: 3,
    name: "Galle Titans",
    title: "Main Sponsor",
    year: "2023",
    icon: sponsor3,
  },
  {
    id: 4,
    name: "Morrisville Samp Army",
    title: "Title Sponsor",
    year: "2023",
    icon: sponsor4,
  },
  {
    id: 5,
    name: "Los Angeles Knight Riders",
    title: "Principal Sponsor",
    year: "2024",
    icon: sponsor5,
  },
];

const AMBASSADORS = [
  {
    id: 1,
    name: "Robin Uthappa",
    title: "Indian Cricket Legend",
    year: "2023 - 2024",
    icon: ambassador1,
  },
  {
    id: 2,
    name: "Srabanti Chatterjee",
    title: "Heart of Bengali Cinema",
    year: "2023 - Present",
    icon: ambassador2,
  },

  {
    id: 3,
    name: "Pori Moni",
    title: "Star of Dhallywood",
    year: "2023 - 2025",
    icon: ambassador3,
  },

  {
    id: 4,
    name: "Dinesh Karthik",
    title: "The Indian Finisher",
    year: "2024 - Present",
    icon: ambassador4,
  },
];
export default function RootLayout() {
  const [isFull, setIsFull] = useState(false);

  return (
    <div className="flex h-screen overscroll-y-contain">
      <Sidebar isFull={isFull} setIsFull={setIsFull} />
      <main className="flex h-full flex-1 flex-col items-center overflow-auto">
        <Topbar isFull={isFull} />
        <div className="w-full flex-1">
          <div
            className={classNames("mx-auto max-w-[1200px]", {
              "w-[calc(100%-(16px*2))]": !isFull,
              "w-[calc(100%-(16px*4))]": isFull,
            })}
          >
            <Outlet />
          </div>

          <div className="mx-auto max-w-[1200px] px-2.5">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

const Footer = () => {
  const data = useRouteLoaderData<RootLoaderData>("root");

  return (
    <footer className="text-[#555555]">
      <div className="footer-top" style={{ padding: "15px 0 10px" }}>
        <div className="mb-5.25">
          <h4 className="text-[13px] mb-3.5 font-bold">Payment Methods</h4>
          <div className="flex gap-2">
            {PAYMENT_METHODS.map((method, idx) => (
              <img
                key={idx}
                src={method}
                loading="lazy"
                className="w-10 h-3.75 object-contain"
              />
            ))}
          </div>
        </div>

        <div className="mb-5.25">
          <h4 className="text-[13px] mb-3.5 font-bold">Social Networks</h4>
          <div className="flex gap-2.75">
            {data?.socialList.map((socialLink) => (
              <a
                key={socialLink.id}
                href={`${socialLink.social_prefix_id.prefix}${socialLink.resource}`}
                target="_blank"
              >
                <img
                  src={
                    "https://ai.cloud7hub.uk" + socialLink.social_prefix_id.logo
                  }
                  alt={socialLink.social_prefix_id.name}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-[13px] mb-4.5 font-bold">Sponsor</h4>
          <div className="flex gap-2">
            {SPONSORS.map((sponser) => (
              <div className="flex gap-2 items-center" key={sponser.id}>
                <img
                  src={sponser.icon}
                  width={35}
                  height={35}
                  className="opacity-70"
                />
                <div className="text-black">
                  <p className="text-xs font-bold leading-3">{sponser.name}</p>
                  <p className="text-xs font-light italic leading-3">
                    {sponser.title}
                  </p>
                  <p className="text-xs font-light italic leading-3">
                    {sponser.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-[13px] mb-3.5 font-bold">Brand Ambassador</h4>
          <div className="flex gap-2">
            {AMBASSADORS.map((ambassador) => (
              <div className="" key={ambassador.id}>
                <img
                  className="mb-1.5"
                  src={ambassador.icon}
                  width={64}
                  height={32}
                />
                <div className="text-black ">
                  <p className="text-xs font-bold leading-3">
                    {ambassador.name}
                  </p>
                  <p className="text-[11px] font-light italic leading-2.75">
                    {ambassador.title}
                  </p>
                  <p className="text-[11px] font-light italic leading-2.75">
                    {ambassador.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10.25">
          <h4 className="text-[13px] mb-3.5 font-bold">Official Partner</h4>
          <div className="flex gap-2">
            <img
              src={officialPartner}
              width={106}
              height={32}
              className="opacity-70"
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer__nav border-t border-gray-4 pt-6 text-[#005dac]">
          <div className="flex flex-wrap gap-2">
            {[
              "About Us",
              "Contact Us",
              "Terms & Conditions",
              "FAQ",
              "Affiliate",
              "Sponsor",
              "Crickex Blog",
            ].map((link, i) => (
              <a className="border-l-2 px-2 text-[13px]" href="#" key={i}>
                {link}
              </a>
            ))}
          </div>

          <div className="mt-11.5 mb-6.5 text-gray-500 flex gap-5 items-center">
            <img
              src={siteLogo}
              width={55}
              height={40}
              className="object-contain"
            />
            <div>
              <p className="text-[#005dac] text-[13px] font-bold leading-5">
                Best Quality Platform
              </p>
              <p className="text-xs">
                © 2025 CRICKEX Copyrights. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
