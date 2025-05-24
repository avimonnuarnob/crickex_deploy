import classNames from "classnames";
import langButton from "@/assets/images/icon/lang.svg";
import Button from "@/components/ui/button/Button";
import IconButton from "@/components/ui/button/IconButton";
import { useLocation, useNavigate } from "react-router";
import WalletButton from "@/components/home/wallet-button";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import ProfileButton from "@/components/layout/profile-button";
import { BsCreditCard2BackFill } from "react-icons/bs";

type TopbarProps = Readonly<{
  isFull: boolean;
}>;

const Topbar = ({ isFull }: TopbarProps) => {
  const { isLoggedIn, logoutUser } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

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
          "bg-blue-1 fixed z-10 top-0 right-0 border-black transition-[left] duration-150",
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
            <div className="flex items-center gap-4 justify-between">
              {!isLoggedIn && (
                <>
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
                </>
              )}

              {isLoggedIn && (
                <>
                  <IconButton
                    icon={<BsCreditCard2BackFill className="w-5 h-3.5" />}
                    className="bg-blue-3 h-[34px]"
                    onClick={logoutUser}
                    // href={UnProtectedRoute.Login}
                  >
                    Deposit
                  </IconButton>
                  <WalletButton />
                  <ProfileButton />
                </>
              )}

              <IconButton
                color="link"
                icon={
                  <img src={langButton} height={24} width={24} alt="lang" />
                }
                className="p-0!"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
