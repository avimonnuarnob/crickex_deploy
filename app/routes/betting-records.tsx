import ReferralSection from "@/components/referral/ReferralSection";
import Cookies from "js-cookie";
import type { Route } from "./+types/referral";
import { Await } from "react-router";
import React from "react";

export interface Response {
  status: string;
  data: ReferralData;
}

export interface ReferralData {
  referred_users: string[][];
}

export function clientLoader() {
  const referrals = fetch(
    "https://ai.cloud7hub.uk/referral/user/referral-history/",
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

export default function BettingRecords({ loaderData }: Route.ComponentProps) {
  // In a real app, you would fetch this data from your API
  const referralData = {
    invitationCode: "8v2YUL",
    invitationUrl: "https://example.com/invite/8v2YUL",
    // In a real implementation, this would be a URL to an actual QR code image
    qrCodeUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/invite/8v2YUL",
  };

  return (
    <div className="max-w-lg mx-auto">
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
            return <p>Hello</p>;
          }}
        </Await>
      </React.Suspense>
    </div>
  );
}
