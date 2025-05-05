import classNames from "classnames";
import langButton from "@/assets/images/icon/lang.svg";
import Button from "@/components/ui/button/Button";
import IconButton from "@/components/ui/button/IconButton";
import { useNavigate } from "react-router";
import { useState } from "react";
import Cookies from "js-cookie";

type TopbarProps = Readonly<{
  isFull: boolean;
}>;

const Topbar = ({ isFull }: TopbarProps) => {
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
          "bg-blue-1 fixed z-1 top-0 right-0 border-black",
          {
            "left-15.75": !isFull,
            "left-62.5": isFull,
          }
        )}
      >
        <div
          className={classNames("mx-auto max-w-[1200px]", {
            "w-[calc(100%-(16px*2))]": !isFull,
            "w-[calc(100%-(16px*3.75))]": isFull,
          })}
        >
          <div className="flex h-15 items-center justify-between py-4">
            <div
              style={{
                width: "123px",
                height: "60px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage:
                  'url("https://img.c88rx.com/cx/h5/assets/images/logo.png?v=1744705193129")',
              }}
            ></div>
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

export default Topbar;
