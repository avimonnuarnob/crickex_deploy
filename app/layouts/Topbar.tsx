import classNames from "classnames";
import langButton from "@/assets/icon/lang.svg";
import Button from "@/components/ui/button/Button";
import IconButton from "@/components/ui/button/IconButton";
import {
  Link,
  useLocation,
  useNavigate,
  useRouteLoaderData,
} from "react-router";
import WalletButton from "@/components/home/wallet-button";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import ProfileButton from "@/components/layout/profile-button";
import { BsCreditCard2BackFill } from "react-icons/bs";

import homeIcon from "@/assets/images/icon-home.png";
import promotionsIcon from "@/assets/images/icon-promotion.png";
import referralIcon from "@/assets/images/icon-referral.png";
import sponsorshipIcon from "@/assets/images/icon-sponsorship.png";
import leaderboardIcon from "@/assets/images/icon-leaderboard.png";
import telegramIcon from "@/assets/images/icon-telegram.png";
import responsibleGamingIcon from "@/assets/images/icon-responsible-gaming.png";
import affiliateIcon from "@/assets/images/icon-affiliate.png";
import crickexBlogIcon from "@/assets/images/icon-crickex-blog.png";
import downloadIcon from "@/assets/images/icon-download.png";
import aboutUsIcon from "@/assets/images/icon-about-us.png";
import faqIcon from "@/assets/images/icon-faq.png";

import siteLogo from "@/assets/images/logo.png";
import { useEffect, useRef, useState, useTransition } from "react";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { RootLoaderData } from "@/root";
import type { GAMEPROVIDER } from "@/routes/index.tsx";

type TopbarProps = Readonly<{
  isFull: boolean;
}>;

const Topbar = ({ isFull }: TopbarProps) => {
  const { isLoggedIn } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const data = useRouteLoaderData<RootLoaderData>("root");

  const [shadow, setShadow] = useState(false);
  const [sideBarOpen, setSidebarOpen] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [activeGameType, setActiveGameType] = useState<string | null>(null);
  const [activeGameTypeProviders, setActiveGameTypeProviders] = useState<
    GAMEPROVIDER[] | null
  >(null);
  const [_, startTransition] = useTransition();
  const dialogPanelRef = useRef(null);

  useEffect(() => {
    const addShadowEventHandler = () => {
      if (!shadow) setShadow(true);
      else return;
    };
    const removeShadowEventHandler = () => {
      setShadow(false);
    };
    window.addEventListener("add", addShadowEventHandler);
    window.addEventListener("remove", removeShadowEventHandler);

    return () => {
      window.removeEventListener("add", addShadowEventHandler);
      window.removeEventListener("remove", removeShadowEventHandler);
    };
  }, []);

  const loginBtnHandler = () => {
    if (location.pathname === "/") {
      navigate("/account-login-quick");
    } else {
      navigate(location.pathname + "/account-login-quick" + location.hash);
    }
  };

  const signupBtnHandler = () => {
    if (location.pathname === "/") {
      navigate("/new-register-entry/account");
    } else {
      navigate(
        location.pathname + "/new-register-entry/account" + location.hash
      );
    }
  };

  return (
    <>
      <div
        className={classNames(
          "bg-blue-1 sticky top-0 z-10 border-black transition-[width, box-shadow] transition-discrete ease-in duration-500 w-full"
        )}
        style={{
          boxShadow: shadow
            ? "0 3.3px 5px #0000004d,0 9.1px 13.8px #00000032,0 22px 33.2px #00000026,0 73px 110px #0000001b"
            : "none",
        }}
      >
        <div className={classNames("px-4", {})}>
          <div className="flex h-15 items-center justify-between py-4">
            <button
              className="w-5 sm:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <ul className="flex flex-col gap-0.75">
                <li className="w-full h-0.5 rounded bg-background"></li>
                <li className="w-11/12 h-0.5 rounded bg-background"></li>
                <li className="w-10/12 h-0.5 rounded bg-background"></li>
              </ul>
            </button>
            <Link
              to="/"
              className={classNames({
                "pointer-events-none": location.pathname === "/",
              })}
            >
              <img
                src={siteLogo}
                alt="crickex"
                className="w-30.75 h-15 object-contain cursor-pointer"
              />
            </Link>
            <>
              {!isLoggedIn && (
                <div className="hidden sm:flex items-center gap-1.25 justify-between">
                  <Button
                    className="bg-blue-3 text-xs w-[105px] h-[34px]"
                    onClick={loginBtnHandler}
                  >
                    Login
                  </Button>
                  <Button
                    className="hidden sm:block text-xs w-[105px] h-[34px]"
                    color="green"
                    onClick={signupBtnHandler}
                  >
                    Sign up
                  </Button>
                  <IconButton
                    color="link"
                    icon={
                      <img src={langButton} height={24} width={24} alt="lang" />
                    }
                    className="p-0! ml-3!"
                  />
                </div>
              )}
            </>
            <>
              {isLoggedIn && (
                <div className="hidden sm:flex items-center gap-4 justify-between">
                  <IconButton
                    icon={<BsCreditCard2BackFill className="w-5 h-3.5" />}
                    className="bg-blue-3 h-[34px]"
                    onClick={() => {
                      navigate("/member/wallet/deposit");
                    }}
                    // href={UnProtectedRoute.Login}
                  >
                    Deposit
                  </IconButton>
                  <WalletButton />
                  <ProfileButton />
                  <IconButton
                    color="link"
                    icon={
                      <img src={langButton} height={24} width={24} alt="lang" />
                    }
                    className="p-0!"
                  />
                </div>
              )}
            </>
          </div>
        </div>
      </div>

      <Dialog
        open={sideBarOpen}
        onClose={(value) => {
          setSidebarOpen(value);
          setActiveGameTypeProviders(null);
          setActiveGameType(null);
        }}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 transition-opacity duration-300 ease-in-out data-closed:opacity-0 bg-black/50"
        />

        <div className="fixed inset-0 w-1/2 overflow-hidden">
          <div className="fixed top-0 bottom-0 left-0 w-1/2 flex">
            <DialogPanel
              ref={dialogPanelRef}
              transition
              className="pointer-events-auto relative w-full transform transition duration-200 ease-in-out data-closed:-translate-x-full sm:duration-300 bg-white overflow-auto"
            >
              <div>
                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={homeIcon}
                      alt="home_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">Home</p>
                  </div>
                </Link>

                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={promotionsIcon}
                      alt="promotions_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">Promotions</p>
                  </div>
                </Link>

                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={referralIcon}
                      alt="referral_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">Referral</p>
                  </div>
                </Link>

                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={sponsorshipIcon}
                      alt="sponsorship_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">Sponsorship</p>
                  </div>
                </Link>

                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={leaderboardIcon}
                      alt="leaderboard_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">Leaderboard</p>
                  </div>
                </Link>
              </div>
              <div className="w-9/10 h-px bg-gray-200 mx-auto mt-2.75"></div>
              <div>
                <span className="block text-base font-bold p-2.75">Games</span>
                {data?.gameProviders
                  .filter((gameType) => gameType.top_menu)
                  .map((gameType) => (
                    <button
                      type="button"
                      data-checked={activeGameType === gameType.game_type_code}
                      onClick={() => {
                        if (reveal) setReveal(false);
                        startTransition(async () => {
                          const wait = new Promise((resolve) =>
                            setTimeout(resolve, 150)
                          );
                          await wait;
                          startTransition(() => {
                            setActiveGameType(gameType.game_type_code);
                            setActiveGameTypeProviders(gameType.game_provider);
                            setReveal(true);
                          });
                        });
                      }}
                      className="block w-full relative group data-[checked=true]:bg-blue-1/5"
                      key={gameType.id}
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-1 opacity-0 group-data-[checked=true]:opacity-100 transition-opacity duration-200"></div>
                      <div className="flex gap-3 items-center p-2.75 text-foreground">
                        <img
                          src={`/game_type/${gameType.game_type_code}.png`}
                          className="w-8.75 h-8.75 bg-blue-1 rounded-full"
                          alt={gameType.title}
                        />
                        <p className="text-sm">{gameType.title}</p>
                      </div>
                    </button>
                  ))}
              </div>
              <div className="w-9/10 h-px bg-gray-200 mx-auto mt-2.75"></div>
              <div>
                <span className="block text-base font-bold p-2.75">Others</span>
                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={telegramIcon}
                      alt="customer_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">Telegram Support</p>
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={responsibleGamingIcon}
                      alt="responsible_gaming_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">Responsible Gaming</p>
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={affiliateIcon}
                      alt="affiliate_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">Affiliate</p>
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={crickexBlogIcon}
                      alt="crickex_blog_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">Crickex Blog</p>
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={downloadIcon}
                      alt="download_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">App Download</p>
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={aboutUsIcon}
                      alt="about_us_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">About Us</p>
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex items-center gap-3 p-2.75 text-foreground">
                    <img
                      src={faqIcon}
                      alt="faq_logo"
                      className="w-8.75 h-8.75"
                    />
                    <p className="text-sm">FAQ</p>
                  </div>
                </Link>
              </div>
            </DialogPanel>
            <div
              className={classNames(
                "absolute top-0 left-full bottom-0 right-0 min-w-1/2 bg-transparent transition-transform -translate-x-full duration-300 ease-in-out overflow-auto -z-1",
                {
                  "bg-background!": activeGameTypeProviders,
                  "translate-x-0": reveal,
                  "-translate-x-full": !reveal,
                }
              )}
            >
              {activeGameTypeProviders?.map((provider) => (
                <div
                  key={provider.id}
                  className="py-5.5 flex flex-col justify-center items-center border-b border-gray-4 mx-1"
                >
                  <img
                    src={"https://ai.cloud7hub.uk" + provider.thumbnail}
                    alt={provider.title}
                    className="w-11 h-11"
                  ></img>
                  <p>{provider.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Topbar;
