import { ProtectedRoute } from "./routes";

import talkIcon from "@/assets/images/icon-talk.png";
import customerIcon from "@/assets/images/icon-customer.png";
import emailIcon from "@/assets/images/icon-email.png";
import telegramIcon from "@/assets/images/icon-telegram.png";
import promotionIcon from "@/assets/images/icon-promotion.png";
import sponsorshipIcon from "@/assets/images/icon-sponsorship.png";
import leaderboardIcon from "@/assets/images/icon-leaderboard.png";
import referBonusIcon from "@/assets/images/icon-refer-bonus.png";
import downloadIcon from "@/assets/images/icon-download.png";
import responsibleGamingIcon from "@/assets/images/icon-responsible-gaming.png";
import affiliateIcon from "@/assets/images/icon-affiliate.png";
import crickexBlogIcon from "@/assets/images/icon-crickex-blog.png";
import aboutUsIcon from "@/assets/images/icon-about-us.png";
import faqIcon from "@/assets/images/icon-faq.png";

export const topNavLinks = [
  {
    href: "/promotion",
    icon: promotionIcon,
    text: "Promotions",
  },
  {
    href: "#",
    icon: sponsorshipIcon,
    text: "Sponsorship",
  },
  {
    href: "#",
    icon: leaderboardIcon,
    text: "Leaderboard",
  },

  {
    href: "member/common-referral/invite",
    icon: referBonusIcon,
    text: "Refer Bonus",
  },

  {
    href: "#",
    icon: downloadIcon,
    text: "Download",
  },
  {
    href: "/static-page/responsible%20gaming",
    icon: responsibleGamingIcon,
    text: "Responsible Gaming",
  },
  {
    href: "/static-page/affiliate",
    icon: affiliateIcon,
    text: "Affiliate",
  },

  // {
  //   icon: talkIcon,
  //   text: "Contact Us",
  //   children: [
  //     {
  //       icon: customerIcon,
  //       href: ProtectedRoute.Cricket,
  //       text: "CS Link",
  //     },
  //     {
  //       icon: emailIcon,
  //       href: ProtectedRoute.Cricket,
  //       text: "Support Email",
  //     },
  //     {
  //       icon: emailIcon,
  //       href: ProtectedRoute.Cricket,
  //       text: "Marketing Email",
  //     },

  //     {
  //       icon: telegramIcon,
  //       href: ProtectedRoute.Cricket,
  //       text: "Telegram Link",
  //     },
  //   ],
  // },
];

export const bottomNavLinks = [
  {
    href: "#",
    icon: crickexBlogIcon,
    text: "Lineguru Blog",
  },
  {
    href: "/static-page/about",
    icon: aboutUsIcon,
    text: "About Us",
  },
  {
    href: "/static-page/faq",
    icon: faqIcon,
    text: "FAQ",
  },
];
