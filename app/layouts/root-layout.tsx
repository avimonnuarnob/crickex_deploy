import { Link, Outlet, useRouteLoaderData } from "react-router";
import type { Route } from "./+types/root-layout";
import { useEffect, useRef, useState } from "react";
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

import homeIcon from "@/assets/icon/toolbar-icon-home.svg";
import promotionIcon from "@/assets/icon/toolbar-icon-promotion.svg";
import depositIcon from "@/assets/icon/toolbar-icon-deposit.svg";
import profileIcon from "@/assets/icon/icon-profile.svg";

import siteLogo from "@/assets/images/logo-blue.png";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import MobileProfileButton from "@/components/layout/mobile-profile-button";

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isLoggedIn } = useCurrentUser();

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const addShadowEvent = new Event("add");
    const removeShadowEvent = new Event("remove");

    const handleScroll = () => {
      if (Number(ref.current?.scrollTop) >= 300) {
        window.dispatchEvent(addShadowEvent);
      }
      if (Number(ref.current?.scrollTop) === 0) {
        window.dispatchEvent(removeShadowEvent);
      }
    };

    ref.current?.addEventListener("scroll", handleScroll);

    return () => {
      ref.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] min-h-screen max-w-full max-h-screen">
      <Sidebar isFull={isFull} setIsFull={setIsFull} />
      <main
        id="main"
        className="relative flex! flex-col min-w-0 min-h-0 max-h-dvh overflow-auto overscroll-none"
        ref={ref}
      >
        <Topbar isFull={isFull} />

        <div className="w-full flex-1 relative max-w-[1200px] mx-auto">
          <div className="px-0 sm:px-4 xl:px-0">
            <Outlet />
          </div>
          <div className="px-2.5">
            <Footer />
          </div>
        </div>

        <>
          {isLoggedIn ? (
            <div
              className="sticky bottom-0 left-0 right-0 w-full bg-black flex sm:hidden items-center [&>*]:flex-1"
              style={{ boxShadow: "0 0 1.3333333333vw #00000080" }}
            >
              <Link to="/" className="w-full h-full">
                <div className="flex flex-col items-center py-2 gap-1">
                  <img src={homeIcon} alt="home_logo" className="w-5 h-5" />
                  <p className="text-white text-sm">Home</p>
                </div>
              </Link>
              <Link to="/promotion" className="w-full h-full">
                <div className="flex flex-col items-center py-2 gap-1">
                  <img
                    src={promotionIcon}
                    alt="promotion_logo"
                    className="w-5 h-5"
                  />
                  <p className="text-white text-sm">Promotions</p>
                </div>
              </Link>
              <Link to="/member/wallet/deposit" className="w-full h-full">
                <div className="flex flex-col items-center py-2 gap-1">
                  <img
                    src={depositIcon}
                    alt="deposit_logo"
                    className="w-5 h-5"
                  />
                  <p className="text-white text-sm">Deposit</p>
                </div>
              </Link>
              <MobileProfileButton
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              >
                <button
                  className="flex flex-col items-center justify-center py-2 gap-1"
                  onClick={() => setIsProfileOpen(true)}
                >
                  <img
                    src={profileIcon}
                    alt="profile_logo"
                    className="w-5 h-5"
                  />
                  <p className="text-white text-sm">My Account</p>
                </button>
              </MobileProfileButton>
            </div>
          ) : (
            <div
              className="sticky bottom-0 left-0 right-0 w-full bg-background flex sm:hidden items-center [&>*]:h-full min-h-[13.33vw]"
              style={{ boxShadow: "0 0 1.3333333333vw #00000080" }}
            >
              <button className="flex-2 bg-[#d7e3f0] px-1.25">
                <div className="flex items-center justify-center gap-1.25">
                  <img src="/BD.png" alt="bd_logo" className="w-7 h-7" />
                  <div className="text-left font-bold text-[#333333]">
                    <p className="text-sm">
                      BDT <br /> English
                    </p>
                  </div>
                </div>
              </button>
              <button className="flex-3 flex flex-col items-center py-3.75 gap-1">
                <Link
                  to={"/new-register-entry/account"}
                  className="w-full h-full flex items-center justify-center"
                >
                  <p className="text-foreground font-bold text-sm">Sign Up</p>
                </Link>
              </button>
              <button className="flex-3 flex flex-col items-center py-3.75 gap-1 bg-blue-1">
                <Link
                  to={"/account-login-quick"}
                  className="w-full h-full flex items-center justify-center"
                >
                  <p className="text-white font-bold text-sm">Login</p>
                </Link>
              </button>
            </div>
          )}
        </>
      </main>
    </div>
  );
}

const Footer = () => {
  const data = useRouteLoaderData<RootLoaderData>("root");

  return (
    <footer className="text-[#555555] overflow-hidden">
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
                    import.meta.env.VITE_API_URL +
                    "" +
                    socialLink.social_prefix_id.logo
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
          <div className="grid grid-cols-2 sm:flex gap-2">
            {SPONSORS.map((sponser) => (
              <div className="flex gap-2 items-center" key={sponser.id}>
                <img
                  src={sponser.icon}
                  className="w-10 h-10 sm:w-8.75 sm:h-8.75 -z-1 relative"
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
          <div className="grid grid-cols-2 sm:flex gap-2">
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
            {data?.links.map((link, i) => (
              <Link
                className="border-l-2 px-2 text-[13px]"
                to={`/static-page/${link.title.toLowerCase()}`}
                key={i}
              >
                {link.title}
              </Link>
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
