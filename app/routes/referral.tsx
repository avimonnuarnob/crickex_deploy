import ReferralSection from "@/components/referral/ReferralSection";

export default function ReferralPage() {
  // In a real app, you would fetch this data from your API
  const referralData = {
    invitationCode: "8v2YUL",
    invitationUrl: "https://example.com/invite/8v2YUL",
    // In a real implementation, this would be a URL to an actual QR code image
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/invite/8v2YUL"
  };

  return (
    <div className="max-w-lg mx-auto">
      <ReferralSection 
        invitationCode={referralData.invitationCode}
        invitationUrl={referralData.invitationUrl}
        qrCodeUrl={referralData.qrCodeUrl}
      />
    </div>
  );
}