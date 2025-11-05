import Cookies from "js-cookie";
import { useEffect } from "react";
import { LuLoader } from "react-icons/lu";

const getQueryParams = (query = null) => {
  const queryString = query || window.location.search;
  const queryObject = queryString
    .replace("?", "")
    .split("&")
    .map((e) => e.split("=").map(decodeURIComponent))
    .reduce((r, [k, v]) => {
      r[k] = v;
      return r;
    }, {} as Record<string, any>);

  return { params: queryObject, queryString };
};

export default function AutopaySuccess() {
  useEffect(() => {
    let { params, queryString } = getQueryParams();
    try {
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/wallet/deposit/auto-pay-callback/${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${Cookies.get("userToken")}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) throw res;
          else return res.json();
        })
        .then((data) => {
          if (window.opener) {
            window.opener.postMessage({
              type: "success",
              data: data?.message,
            });
          }
        })
        .finally(() => {
          window.close();
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="w-dvh h-dvh grid place-items-center">
      <LuLoader className="size-10" />
    </div>
  );
}
