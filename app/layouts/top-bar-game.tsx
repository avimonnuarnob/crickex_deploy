import classNames from "classnames";
import { useLocation, useNavigate, useParams } from "react-router";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";

type TopbarProps = Readonly<{
  isFull: boolean;
}>;

const TopbarGame = ({ isFull }: TopbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const parentRouteRef = useRef(location.state?.from ?? "/");
  const pageNumberRef = useRef(location.state?.page);

  return (
    <>
      <div
        className={classNames(
          "bg-blue-8 fixed z-1 top-0 left-0 right-0 h-11 flex items-center"
        )}
        style={{
          boxShadow: "inset 0 -2px 2.5px #94b0cc33,inset 0 1px 3px #fff3",
          // transform: "translate(-50%,-50%)",
          // background: "linear-gradient(0deg,#2e3752b3 0%,#005dac)",
        }}
      >
        <div className={classNames("mx-auto w-full", {})}>
          <div className="flex h-full items-center justify-between">
            <div className="mx-2.5">
              <img
                src="/license.png"
                alt="licecnse_ny_softtake"
                className="w-[109px] border"
              />
            </div>

            <button
              onClick={() => {
                navigate(parentRouteRef.current, {
                  state: pageNumberRef.current
                    ? { page: pageNumberRef.current }
                    : null,
                  replace: true,
                });
              }}
              className="w-11 h-11 flex items-center justify-center"
              style={{
                background: "linear-gradient(180deg,#0000004d,#0006)",
              }}
            >
              <IoMdClose className="size-6 text-white cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopbarGame;
