import { UnProtectedRoute } from "@/constants/routes";
import classNames from "classnames";

import langButton from "@/assets/images/icon/lang.svg";
import logo from "@/assets/images/logo.png";
import Button from "@/components/ui/button/Button";
import IconButton from "@/components/ui/button/IconButton";

type TopbarProps = Readonly<{
  isFull: boolean;
}>;

const Topbar = ({ isFull }: TopbarProps) => {
  return (
    <>
      <div className="bg-blue-1 sticky top-0 w-full">
        <div
          className={classNames("mx-auto max-w-[1200px]", {
            "w-[calc(100%-(16px*2))]": !isFull,
            "w-[calc(100%-(16px*4))]": isFull,
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
            <div className="flex items-center gap-1.5">
              <Button
                className="bg-blue-3 min-w-26 rounded-[5px] text-xs"
                // href={UnProtectedRoute.Login}
              >
                Login
              </Button>
              <Button
                className="min-w-26 text-xs"
                color="green"
                // href={UnProtectedRoute.Signup}
              >
                Sign up
              </Button>

              <div className="ml-3">
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
