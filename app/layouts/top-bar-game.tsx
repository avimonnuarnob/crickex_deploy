import classNames from "classnames";
import { useLocation, useNavigate, useParams } from "react-router";
import { useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

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
          "bg-blue-1 fixed z-1 top-0 left-0 right-0 border-black"
        )}
      >
        <div
          className={classNames("mx-auto max-w-[1200px]", {
            "w-[calc(100%-(16px*2))]": !isFull,
            "w-[calc(100%-(16px*3.75))]": isFull,
          })}
        >
          <div className="flex h-7.5 items-center justify-between py-4">
            <div>
              <img
                src="/license.png"
                alt="licecnse_ny_softtake"
                className="w-20 border"
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
            >
              <IoMdCloseCircleOutline className="size-6 text-white cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopbarGame;
