import ReferralSection from "@/components/referral/ReferralSection";
import Cookies from "js-cookie";
import type { Route } from "./+types/referral";
import { Await, useRouteLoaderData } from "react-router";
import React from "react";
import type { RootLoaderData } from "@/root";
import { useCurrentUser } from "@/contexts/CurrentUserContext";

export interface Response {
  status: string;
  data: ReferralData;
}

export interface ReferralData {
  referred_users: string[][];
}

export function clientLoader() {
  const referrals = fetch(
    import.meta.env.VITE_API_URL + "/referral/user/referral-history/",
    {
      headers: {
        Authorization: `Token ${Cookies.get("userToken")}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.data);
  return referrals as Promise<ReferralData>;
}

export default function ReferralPage({ loaderData }: Route.ComponentProps) {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const { userInfo } = useCurrentUser();

  // In a real app, you would fetch this data from your API
  const referralData = {
    invitationCode: "8v2YUL",
    invitationUrl: "https://example.com/invite/8v2YUL",
    // In a real implementation, this would be a URL to an actual QR code image
    qrCodeUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/invite/8v2YUL",
  };

  return (
    <div className="max-w-lg mx-auto page-body">
      <React.Suspense
        fallback={
          <div className="flex justify-center items-center flex-col h-full">
            <div className="list-loading w-10 h-10">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
        <Await resolve={loaderData}>
          {(value) => {
            return (
              <ReferralSection
                referralData={value}
                invitationCode={userInfo?.referral_code || ""}
                invitationUrl={
                  userInfo?.user_base_origin +
                  "/new-register-entry/account?refcode=" +
                  userInfo?.referral_code
                }
              />
            );
          }}
        </Await>
      </React.Suspense>
    </div>
  );
}
