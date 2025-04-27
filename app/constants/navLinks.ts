import casino from "@/assets/images/icon/casino.svg";
import cricket from "@/assets/images/icon/cricket.svg";
import sportIcon from "@/assets/images/icon/sport.svg";
import promotionsIcon from "@/assets/images/icon/promotions.svg";
import { GuestRoute, ProtectedRoute } from "./routes";

export const navLinks = [
  // {
  //   href: "/about",
  //   icon: exclusiveIcon,
  //   text: "Exclusive",
  // },
  {
    icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-talk.png?v=1745315485946",
    text: "Contact Us",
    children: [
      {
        icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-customer.png?v=1745315485946",
        href: ProtectedRoute.Cricket,
        text: "CS Link",
      },

      {
        icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-customer.png?v=1745315485946",
        href: ProtectedRoute.Cricket,
        text: "Telegram Link",
      },
    ],
  },
  {
    href: "#",
    icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-promotion.png?v=1745315485946",
    text: "Promotions",
  },
  {
    href: "#",
    icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-sponsorship.png?v=1745315485946",
    text: "Sponsorship",
  },
  {
    href: "#",
    icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-leaderboard.png?v=1745315485946",
    text: "Leaderboard",
  },
  {
    href: "#",
    icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-download.png?v=1745315485946",
    text: "Download",
  },
  {
    href: "#",
    icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-responsible-gaming.png?v=1745315485946",
    text: "Responsible Gaming",
  },
  {
    href: "#",
    icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-affiliate.png?v=1745315485946",
    text: "Affiliate",
  },

  {
    href: "#",
    icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-crickex-blog.png?v=1745315485946",
    text: "Crickex Blog",
  },
  {
    href: "#",
    icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-about-us.png?v=1745315485946",
    text: "About Us",
  },
  {
    href: "#",
    icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-faq.png?v=1745315485946",
    text: "FAQ",
  },
];
