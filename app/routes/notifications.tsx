import { useState, useEffect } from "react";
import NotificationList, {
  type Notification,
} from "@/components/notifications/NotificationList";

// Sample notification data
const sampleNotifications: Notification[] = [
  {
    id: "1",
    date: "2025/06/16",
    time: "11:42:30",
    title: "🚀 এখনই আমাদের জয়ের পরিমাণ বাড়ান!🚀",
    message: "🔥 আজই আপনার বিশাল ১১৫০% হট বোনাস লুফে নিন!",
    read: false,
    details: {
      title: "🚀 এখনই আমাদের জয়ের পরিমাণ বাড়ান!🚀",
      content: (
        <div>
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <span className="text-sm">কোন বোনাস সীমা নেই</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-green-500 mr-2">✅</span>
              <span className="text-sm">
                বোনাস রাউন্ড ত্রিগার হলে জ্যাকপটগুলি কমে যায়
              </span>
            </div>
          </div>
        </div>
      ),
      expiryDate: "🎯 ইভেন্টটি ১৮ জুন, ২০২৫ তারিখে শেষ হবে।",
    },
  },
  {
    id: "2",
    date: "2025/06/15",
    time: "19:53:50",
    title: "🏆 JILI জ্যাকপট লিজেন্ড – গেমের মধ্যে সীমাহীন জ্যাকপট জিতুন 🔥",
    message:
      "JILI জ্যাকপট লেজেন্ড ইভেন্টে যোগ দিন এবং বিশাল ইন-গেম জ্যাকপট জেতার সুযোগ পেতে আপনার প্রিয় গেমগুলি খেলুন!",
    read: false,
    details: {
      title: "🏆 জিলি জ্যাকপট লিজেন্ড – গেমের মধ্যে সীমাহীন জ্যাকপট জিতুন 🔥",
      content: <></>,
      expiryDate: "🎯 ইভেন্টটি ১৮ জুন, ২০২৫ তারিখে শেষ হবে।",
      items: [
        { icon: "🎮", text: "সুপার এস" },
        { icon: "💎", text: "সুপার এস ডিলাক্স" },
        { icon: "👑", text: "গোল্ডেন এম্পায়ার" },
        { icon: "💠", text: "ফরচুন জেমস" },
        { icon: "💠", text: "ফরচুন জেমস ২" },
        { icon: "💠", text: "ফরচুন জেমস ৩" },
        { icon: "🌑", text: "মানি পট" },
        { icon: "🚀", text: "মানি কামিং" },
        { icon: "📱", text: "মানি কামিং এক্সপ্যান্ডেড বেট" },
        { icon: "🦁", text: "লাকি জাওয়ার" },
        { icon: "📕", text: "ফরচুন কমেন" },
        { icon: "🥊", text: "বক্সিং কিং" },
      ],
    },
  },
  {
    id: "3",
    date: "2025/06/15",
    time: "19:53:09",
    title: "🚀 সমৃদ্ধ ও নিরাপদ প্রত্যাবর্তিকার 🚀",
    message: "🚀 যেকোনো সময়, যেকোনো জায়গায় আমাদের ওয়েবসাইটে প্রবেশ করুন!",
    read: true,
  },
  {
    id: "4",
    date: "2025/06/14",
    time: "18:53:43",
    title: "🏆 জিলি জ্যাকপট লিজেন্ড – গেমের মধ্যে সীমাহীন জ্যাকপট জিতুন 🔥",
    message:
      "JILI জ্যাকপট লেজেন্ড ইভেন্টে যোগ দিন এবং বিশাল ইন-গেম জ্যাকপট জেতার সুযোগ পেতে আপনার প্রিয় গেমগুলি খেলুন!",
    read: false,
    details: {
      title: "🏆 জিলি জ্যাকপট লিজেন্ড – গেমের মধ্যে সীমাহীন জ্যাকপট জিতুন 🔥",
      content: <></>,
      expiryDate: "🎯 ইভেন্টটি ১৮ জুন, ২০২৫ তারিখে শেষ হবে।",
      items: [
        { icon: "🎮", text: "সুপার এস" },
        { icon: "💎", text: "সুপার এস ডিলাক্স" },
        { icon: "👑", text: "গোল্ডেন এম্পায়ার" },
        { icon: "💠", text: "ফরচুন জেমস" },
        { icon: "💠", text: "ফরচুন জেমস ২" },
        { icon: "💠", text: "ফরচুন জেমস ৩" },
        { icon: "🌑", text: "মানি পট" },
        { icon: "🚀", text: "মানি কামিং" },
        { icon: "📱", text: "মানি কামিং এক্সপ্যান্ডেড বেট" },
        { icon: "🦁", text: "লাকি জাওয়ার" },
        { icon: "📕", text: "ফরচুন কমেন" },
        { icon: "🥊", text: "বক্সিং কিং" },
      ],
    },
  },
  {
    id: "5",
    date: "2025/06/14",
    time: "18:51:52",
    title: "🚀 সমৃদ্ধ ও নিরাপদ প্রত্যাবর্তিকার 🚀",
    message: "🚀 যেকোনো সময়, যেকোনো জায়গায় আমাদের ওয়েবসাইটে প্রবেশ করুন!",
    read: true,
  },
  {
    id: "6",
    date: "2025/06/13",
    time: "18:39:29",
    title: "🚀 সমৃদ্ধ ও নিরাপদ প্রত্যাবর্তিকার 🚀",
    message: "🚀 যেকোনো সময়, যেকোনো জায়গায় আমাদের ওয়েবসাইটে প্রবেশ করুন!",
    read: true,
  },
  {
    id: "7",
    date: "2025/06/13",
    time: "17:42:12",
    title: "🛥️ Crickex খেলোয়াড়রা – আকাশ আপনার, Crash...",
    message:
      "আপনি যত বেশি উঠবেন, তত বেশি জিতবেন—কেবল সঠিক সময়ে ক্র্যাশ হওয়া থেকে বাঁচুন!",
    read: false,
  },
  {
    id: "8",
    date: "2025/06/13",
    time: "17:40:26",
    title: "🌟 ভিআইপি গ্রাহক ক্রেডিট টিপিং 🌟",
    message: "আপনার স্পিনগুলিকে আরও সক্রিয়ভাবে করতে ১১০০ ক্রেডিট টিপিং পান!",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="p-4">
      <NotificationList
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}
