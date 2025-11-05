import { useState, useEffect } from "react";
import NotificationList from "@/components/notifications/NotificationList";
import { messages, setWsSubscriber, type MESSAGE } from "@/notification";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<MESSAGE[]>(messages);

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  useEffect(() => {
    setWsSubscriber((messages: MESSAGE[]) => {
      setNotifications(messages);
    });
  }, []);

  return (
    <div className="p-4">
      <NotificationList
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}
