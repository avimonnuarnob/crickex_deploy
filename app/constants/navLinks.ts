import casino from "@/assets/images/icon/casino.svg";
import cricket from "@/assets/images/icon/cricket.svg";
import exclusiveIcon from "@/assets/images/icon/exclusive.svg";
import sportIcon from "@/assets/images/icon/sport.svg";
import { GuestRoute, ProtectedRoute } from "./routes";

export const navLinks = [
  // {
  //   href: "/about",
  //   icon: exclusiveIcon,
  //   text: "Exclusive",
  // },
  {
    icon: sportIcon,
    text: "Sports",
    children: [
      {
        icon: cricket,
        href: ProtectedRoute.Cricket,
        text: "Cricket",
      },
      {
        icon: cricket,
        href: ProtectedRoute.Cricket,
        text: "Cricket",
      },
      {
        icon: cricket,
        href: ProtectedRoute.Cricket,
        text: "Cricket",
      },
    ],
  },
  {
    icon: casino,
    text: "Casino",
    children: [
      {
        icon: cricket,
        href: ProtectedRoute.Cricket,
        text: "Slots",
      },
    ],
  },
  {
    icon: casino,
    text: "Casino",
    children: [
      {
        icon: cricket,
        href: ProtectedRoute.Cricket,
        text: "Slots",
      },
    ],
  },
  {
    icon: casino,
    text: "Casino",
    children: [
      {
        icon: cricket,
        href: ProtectedRoute.Cricket,
        text: "Slots",
      },
    ],
  },
];
