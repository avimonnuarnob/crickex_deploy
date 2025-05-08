import classNames from "classnames";
import langButton from "@/assets/images/icon/lang.svg";
import backDirection from "@/assets/images/icon/direction-back.svg";
import Button from "@/components/ui/button/Button";
import IconButton from "@/components/ui/button/IconButton";
import { useNavigate } from "react-router";
import { useState } from "react";
import Cookies from "js-cookie";
import WalletButton from "@/components/home/wallet-button";

type TopbarProps = Readonly<{
  isFull: boolean;
}>;

const TopbarGame = ({ isFull }: TopbarProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<string | undefined>(
    Cookies.get("userToken")
  );
  const navigate = useNavigate();

  const loginBtnHandler = () => {
    navigate("/account-login-quick");
  };

  const signupBtnHandler = () => {
    navigate("/new-register-entry/account");
  };

  return (
    <>
      <div
        className={classNames(
          "bg-blue-1 fixed z-1 top-0 left-0 right-0 border-black"
        )}
      >
        <div
          className={classNames("mx-auto max-w-[1200px]", {
            "w-[calc(100%-(16px*2))]": !isFull,
            "w-[calc(100%-(16px*3.75))]": isFull,
          })}
        >
          <div className="flex h-15 items-center justify-between py-4">
            <Button
              className="flex gap-1 items-center text-lg"
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={backDirection} height={16} width={16} alt="lang" />{" "}
              <span className="underline underline-offset-2 text-[#FF1F1F]">
                Back
              </span>
            </Button>

            <div className="flex items-center gap-[5px] justify-between">
              {!isUserLoggedIn && (
                <>
                  <Button
                    className="bg-blue-3 text-xs w-[105px] h-[34px]"
                    onClick={loginBtnHandler}
                    // href={UnProtectedRoute.Login}
                  >
                    Login
                  </Button>
                  <Button
                    className="text-xs w-[105px] h-[34px]"
                    color="green"
                    onClick={signupBtnHandler}
                    // href={UnProtectedRoute.Signup}
                  >
                    Sign up
                  </Button>
                </>
              )}

              {isUserLoggedIn && (
                <>
                  <Button
                    className="bg-blue-3 text-xs w-[105px] h-[34px]"
                    onClick={() => {
                      Cookies.remove("userToken");
                      setIsUserLoggedIn(undefined);
                      navigate("/");
                      // window.location.reload();
                    }}
                    // href={UnProtectedRoute.Login}
                  >
                    Logout
                  </Button>
                  <WalletButton />
                </>
              )}

              <div className="ml-3 grow-0">
                <IconButton
                  color="link"
                  icon={
                    <img src={langButton} height={24} width={24} alt="lang" />
                  }
                  className="!p-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopbarGame;
