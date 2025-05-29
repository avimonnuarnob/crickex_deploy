import classNames from "classnames";
import langButton from "@/assets/icon/lang.svg";
import Button from "@/components/ui/button/Button";
import IconButton from "@/components/ui/button/IconButton";
import { Link, useLocation, useNavigate } from "react-router";
import WalletButton from "@/components/home/wallet-button";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import ProfileButton from "@/components/layout/profile-button";
import { BsCreditCard2BackFill } from "react-icons/bs";

import siteLogo from "@/assets/images/logo.png";
import { useEffect, useState } from "react";

type TopbarProps = Readonly<{
  isFull: boolean;
}>;

const Topbar = ({ isFull }: TopbarProps) => {
  const { isLoggedIn } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [shadow, setShadow] = useState(false);

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
          "bg-blue-1 fixed z-10 top-0 right-0 border-black transition-[width, box-shadow] transition-discrete ease-in duration-150",
          {
            "left-15.75": !isFull,
            "left-62.5": isFull,
          }
        )}
        style={{
          boxShadow: shadow
            ? "0 3.3px 5px #0000004d,0 9.1px 13.8px #00000032,0 22px 33.2px #00000026,0 73px 110px #0000001b"
            : "none",
        }}
      >
        <div
          className={classNames("mx-auto max-w-[1200px] events", {
            "w-[calc(100%-(16px*2))]": !isFull,
            "w-[calc(100%-(16px*3.75))]": isFull,
          })}
        >
          <div className="flex h-15 items-center justify-between py-4">
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
                <div className="flex items-center gap-1.25 justify-between">
                  <Button
                    className="bg-blue-3 text-xs w-[105px] h-[34px]"
                    onClick={loginBtnHandler}
                  >
                    Login
                  </Button>
                  <Button
                    className="text-xs w-[105px] h-[34px]"
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
                <div className="flex items-center gap-4 justify-between">
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
    </>
  );
};

export default Topbar;
