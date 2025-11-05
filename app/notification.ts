export interface MESSAGE {
  id: number;
  user: number;
  notice: string;
  types: string;
  seen: boolean;
  delivered: boolean;
  created_at: Date;
}

let client: WebSocket;
export let messages: MESSAGE[] = [];
const subscribers: Set<Function> = new Set();

export const initws = (username: string) => {
  client = new WebSocket(
    import.meta.env.VITE_NOTIFICATION_URL + "/notification/" + username + "/"
  );
  client.addEventListener("message", (event) => {
    const body = document.body;
    messages = messages.concat(JSON.parse(event.data).message);
    body.dataset.notification = messages
      .reduce((acc, message) => {
        if (!message.seen) {
          acc++;
        }
        return acc;
      }, 0)
      .toString();
    subscribers.forEach((subscriber) => subscriber(messages));
  });
  return client;
};

export const getws = () => {
  return client;
};

export const setWsSubscriber = (subscriber: Function) => {
  subscribers.add(subscriber);
};
