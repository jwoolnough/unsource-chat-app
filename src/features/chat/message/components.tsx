import { motion } from "framer-motion";

import { clsxm } from "@/utils/clsxm";

import { MessageProps } from "./message";

const MessageRow = ({ children }: WithChildren) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, height: 0 }}
    className={
      "grid grid-cols-[1.5rem_1fr] items-end gap-x-4 before:col-span-2 before:h-1.5 sm:grid-cols-[2rem_1fr]"
    }
  >
    {children}
  </motion.div>
);

const MessageAvatar = ({ children }: WithChildren) => (
  <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 sm:h-8 sm:w-8">
    {children}
  </div>
);

const MessageContainer = ({
  children,
  isMe,
}: WithChildren & Pick<MessageProps, "isMe">) => (
  <div className={clsxm("col-start-2", isMe && "text-right")}>
    <div className="inline-block max-w-[calc(100%-2.5rem)] sm:max-w-[80%]">
      {children}
    </div>
  </div>
);

const MessageDate = ({ children }: WithChildren) => (
  <p
    className={clsxm(
      "mb-2 mt-[0.625rem] text-left text-[0.625rem] text-slate-400"
    )}
  >
    {children}
  </p>
);

const MessageBubble = ({
  children,
  isMe,
  showAvatar,
}: WithChildren & Pick<MessageProps, "isMe" | "showAvatar">) => (
  <motion.div
    initial={{ scale: 0.5 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0.5 }}
    className={clsxm(
      "group relative inline-block rounded-md bg-white px-4 py-3 drop-shadow-sm",
      showAvatar && "before:absolute before:bottom-0",
      showAvatar &&
        "before:border-b-[15px] before:border-transparent  before:border-b-white",
      isMe && "bg-orange-400 text-left text-white",
      isMe ? "origin-right" : "origin-left",
      !isMe &&
        showAvatar &&
        "rounded-bl-none before:right-full before:border-l-[7px]",
      isMe &&
        showAvatar &&
        "rounded-br-none before:left-full before:border-l-0 before:border-r-[7px] before:border-b-orange-400"
    )}
  >
    {children}
  </motion.div>
);

export {
  MessageAvatar,
  MessageBubble,
  MessageContainer,
  MessageDate,
  MessageRow,
};
