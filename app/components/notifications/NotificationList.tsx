import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import classNames from "classnames";
import Modal from "../ui/modal/Modal";

// Types for our notifications
export type Notification = {
  id: string;
  date: string;
  time: string;
  title: string;
  message: string;
  icon?: string;
  read: boolean;
  details?: {
    title: string;
    content: React.ReactNode;
    expiryDate?: string;
    items?: Array<{
      icon: string;
      text: string;
    }>;
  };
};

type NotificationListProps = {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
};

export default function NotificationList({
  notifications,
  onMarkAsRead,
}: NotificationListProps) {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    if (!groups[notification.date]) {
      groups[notification.date] = [];
    }
    groups[notification.date].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => setSelectedNotification(null)}
      title="Notification"
    >
      <div className="relative">
        <div className="bg-gray-1 min-h-screen">
          {Object.entries(groupedNotifications).map(
            ([date, dateNotifications]) => (
              <div key={date} className="mb-2">
                <div className="flex items-center px-4 py-2 bg-white border-b border-gray-200">
                  <IoCalendarOutline className="text-gray-500 mr-2" />
                  <span className="text-gray-500">{date}</span>
                  <span className="ml-auto text-sm bg-gray-200 px-2 py-0.5 rounded">
                    GMT+6
                  </span>
                </div>

                {dateNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={classNames(
                      "flex items-start p-3 border-b border-gray-200 bg-white cursor-pointer",
                      { "bg-gray-50": notification.read }
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                        {notification.icon ? (
                          <img
                            src={notification.icon}
                            alt=""
                            className="w-6 h-6"
                          />
                        ) : (
                          <span className="text-white text-xl">📢</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div
                        className="text-sm font-medium"
                        dangerouslySetInnerHTML={{ __html: notification.title }}
                      />
                      <div
                        className="text-sm text-yellow-500"
                        dangerouslySetInnerHTML={{
                          __html: notification.message,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 ml-2 mt-1">
                      {notification.time}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Notification Detail Modal */}
        <AnimatePresence>
          {selectedNotification && selectedNotification.details && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div
                className="absolute inset-0 bg-black/70"
                onClick={() => setSelectedNotification(null)}
              />
              <div className="relative w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-blue-700 text-white p-4 pr-10">
                  <h3
                    className="text-lg font-medium"
                    dangerouslySetInnerHTML={{
                      __html: selectedNotification.details.title,
                    }}
                  />
                  <button
                    className="absolute top-4 right-4 text-white"
                    onClick={() => setSelectedNotification(null)}
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div
                    className="text-yellow-500 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: selectedNotification.message,
                    }}
                  />

                  {selectedNotification.details.expiryDate && (
                    <div className="flex items-center mb-4">
                      <span className="text-red-500 mr-2">🎯</span>
                      <span className="text-sm">
                        {selectedNotification.details.expiryDate}
                      </span>
                    </div>
                  )}

                  {selectedNotification.details.items && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-yellow-500">
                        যোগ্য JILI হট গেম:
                      </h4>
                      {selectedNotification.details.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <span
                            className="mr-2"
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                          />
                          <span className="text-sm">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedNotification.details.content}

                  <div className="mt-6 text-center">
                    <a href="#" className="text-blue-500 font-medium">
                      🔥 ক্রিকেক্স লগইন করুন এবং এখনই বড় জয়ের জন্য স্পিনিং
                      শুরু করুন! 💰
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
