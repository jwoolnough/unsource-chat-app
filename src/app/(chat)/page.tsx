import { differenceInHours, parseISO } from "date-fns";
import { FiSearch } from "react-icons/fi";

import { ChatFooter } from "@/features/chat/footer";
import { Message } from "@/features/chat/message";
import { Header } from "@/features/layout/header";

const messages = [
  {
    id: 1,
    authorId: 1,
    createdAt: "2023-08-02T11:30:00",
    content:
      "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum lorem.",
    isMe: true,
  },
  {
    id: 2,
    authorId: 1,
    createdAt: "2023-08-02T12:00:00",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    isMe: true,
  },
  {
    id: 3,
    authorId: 2,
    createdAt: "2023-08-04T12:00:00",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
  },
  {
    id: 4,
    authorId: 2,
    createdAt: "2023-08-05T11:32:00",
    content: "Haha",
  },
  {
    id: 5,
    authorId: 2,
    createdAt: "2023-08-05T11:57:00",
    content: "Lorem ipsum dolor sit!",
  },
  {
    id: 6,
    authorId: 1,
    createdAt: "2023-08-05T",
    content: "Lorem ipsum dolor sit!",
    isMe: true,
  },
];

// TODO: type properly with server response
type Message = (typeof messages)[number];

const hasDifferentAuthor = (messageLeft: Message, messageRight: Message) => {
  return messageLeft?.authorId !== messageRight?.authorId;
};

const hasHourTimeDifference = (messageLeft: Message, messageRight: Message) => {
  return (
    differenceInHours(
      parseISO(messageLeft?.createdAt),
      parseISO(messageRight?.createdAt)
    ) >= 1
  );
};

export default function Chat() {
  return (
    <>
      <Header
        title="Chat"
        renderHeaderRight={() => (
          <button type="button" className="text-slate-400">
            <FiSearch size={22} />
          </button>
        )}
      />

      <div className="flex flex-grow flex-col gap-[0.375rem] p-4 pb-0">
        {messages.map((message, i) => (
          <Message
            key={message.id}
            {...message}
            showDate={
              hasDifferentAuthor(message, messages[i - 1]) ||
              hasHourTimeDifference(message, messages[i - 1])
            }
            showAvatar={
              hasDifferentAuthor(message, messages[i + 1]) ||
              hasHourTimeDifference(messages[i + 1], message)
            }
          />
        ))}
      </div>

      <ChatFooter />
    </>
  );
}
