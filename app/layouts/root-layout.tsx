import { Outlet } from "react-router";
import type { Route } from "./+types/root-layout";
import { useState } from "react";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

let API_DATA: null | string = null;

export default function RootLayout({ loaderData }: Route.ComponentProps) {
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
  return (
    <footer className="text-[#555555]">
      <div className="footer-top" style={{ padding: "15px 0 10px" }}>
        <div className="mb-5.25">
          <h4 className="text-[13px] mb-3.5 font-bold">Payment Methods</h4>
          <div className="flex gap-2">
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/footer/color-black/pay16.png?v=1744705193129&source=mcdsrc"
              width={40}
              height={15}
            />
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/footer/color-black/pay16.png?v=1744705193129&source=mcdsrc"
              width={40}
              height={15}
            />
          </div>
        </div>

        <div className="mb-5.25">
          <h4 className="text-[13px] mb-3.5 font-bold">Social Networks</h4>
          <div className="flex gap-2.75">
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/footer/color-black/social/facebook.png?v=1744705193129&source=mcdsrc"
              width={24}
              height={24}
            />
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/footer/color-black/social/facebook.png?v=1744705193129&source=mcdsrc"
              width={24}
              height={24}
            />
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/footer/color-black/social/facebook.png?v=1744705193129&source=mcdsrc"
              width={24}
              height={24}
            />
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/footer/color-black/social/facebook.png?v=1744705193129&source=mcdsrc"
              width={24}
              height={24}
            />
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/footer/color-black/social/facebook.png?v=1744705193129&source=mcdsrc"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-[13px] mb-4.5 font-bold">Sponsor</h4>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center">
              <img
                src="https://img.c88rx.com/cx/h5/assets/images/footer/sponsor1.png?v=1744705193129&source=mcdsrc"
                width={35}
                height={35}
              />
              <div className="text-black">
                <p className="text-xs font-bold leading-3">
                  Chepauk Super Gillies
                </p>
                <p className="text-xs font-light italic leading-3">
                  Principal Sponsor
                </p>
                <p className="text-xs font-light italic leading-3">2023</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                src="https://img.c88rx.com/cx/h5/assets/images/footer/sponsor1.png?v=1744705193129&source=mcdsrc"
                width={35}
                height={35}
              />
              <div className="text-black">
                <p className="text-xs font-bold leading-3">
                  Chepauk Super Gillies
                </p>
                <p className="text-xs font-light italic leading-3">
                  Principal Sponsor
                </p>
                <p className="text-xs font-light italic leading-3">2023</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                src="https://img.c88rx.com/cx/h5/assets/images/footer/sponsor1.png?v=1744705193129&source=mcdsrc"
                width={35}
                height={35}
              />
              <div className="text-black">
                <p className="text-xs font-bold leading-3">
                  Chepauk Super Gillies
                </p>
                <p className="text-xs font-light italic leading-3">
                  Principal Sponsor
                </p>
                <p className="text-xs font-light italic leading-3">2023</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-[13px] mb-3.5 font-bold">Brand Ambassador</h4>
          <div className="flex gap-2">
            <div className="">
              <img
                className="mb-1.5"
                src="https://img.c88rx.com/cx/h5/assets/images/footer/ambassadors1.png?v=1744705193129&source=mcdsrc"
                width={64}
                height={32}
              />
              <div className="text-black ">
                <p className="text-xs font-bold leading-3">Robin Uthappa</p>
                <p className="text-[11px] font-light italic leading-2.75">
                  Indian Cricket Legend
                </p>
                <p className="text-[11px] font-light italic leading-2.75">
                  2023 - 2024
                </p>
              </div>
            </div>
            <div className="">
              <img
                className="mb-1.5"
                src="https://img.c88rx.com/cx/h5/assets/images/footer/ambassadors1.png?v=1744705193129&source=mcdsrc"
                width={64}
                height={32}
              />
              <div className="text-black ">
                <p className="text-xs font-bold leading-3">Robin Uthappa</p>
                <p className="text-[11px] font-light italic leading-2.75">
                  Indian Cricket Legend
                </p>
                <p className="text-[11px] font-light italic leading-2.75">
                  2023 - 2024
                </p>
              </div>
            </div>
            <div className="">
              <img
                className="mb-1.5"
                src="https://img.c88rx.com/cx/h5/assets/images/footer/ambassadors1.png?v=1744705193129&source=mcdsrc"
                width={64}
                height={32}
              />
              <div className="text-black ">
                <p className="text-xs font-bold leading-3">Robin Uthappa</p>
                <p className="text-[11px] font-light italic leading-2.75">
                  Indian Cricket Legend
                </p>
                <p className="text-[11px] font-light italic leading-2.75">
                  2023 - 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10.25">
          <h4 className="text-[13px] mb-3.5 font-bold">Official Partner</h4>
          <div className="flex gap-2">
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/footer/color-black/official-partner-heyvip.png?v=1744705193129&source=mcdsrc"
              width={106}
              height={32}
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
              src="https://img.c88rx.com/cx/h5/assets/images/logo-02.png?v=1744705193129"
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
