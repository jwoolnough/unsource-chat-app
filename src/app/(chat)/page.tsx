import { FiSearch } from "react-icons/fi";

import { ChatFooter } from "@/features/chat/footer";
import { Message, MessageProps } from "@/features/chat/message";
import { Header } from "@/features/layout/header";

const messages = [
  {
    id: 1,
    authorId: 1,
    content:
      "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum lorem.",
    isMe: true,
  },
  {
    id: 2,
    authorId: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    isMe: true,
  },
  {
    id: 3,
    authorId: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
  },
  {
    id: 4,
    authorId: 2,
    content: "Haha",
  },
  {
    id: 5,
    authorId: 2,
    content: "Lorem ipsum dolor sit!",
    showAvatar: true,
  },
  {
    id: 6,
    authorId: 1,
    content: "Lorem ipsum dolor sit!",
    isMe: true,
  },
];

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
        {messages.map(({ id, ...props }, i) => (
          <Message
            key={id}
            {...props}
            showDate={props.authorId !== messages[i - 1]?.authorId}
            showAvatar={props.authorId !== messages[i + 1]?.authorId}
          />
        ))}
      </div>

      <ChatFooter />
    </>
  );
}
