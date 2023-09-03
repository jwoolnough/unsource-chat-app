import { format, parseISO } from "date-fns";
import { deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import { FiMoreVertical } from "react-icons/fi";
import TimeAgo from "react-timeago";
import { toast } from "react-toastify";

import { firestore } from "@/services/firebase/store";

import { Avatar } from "@/components/avatar";

import { clsxm } from "@/utils/clsxm";

interface MessageProps {
  id: string;
  content: string;
  isMe?: boolean;
  showAvatar?: boolean;
  showDate?: boolean;
  authorId: string;
  createdAt: string;
  displayName: string;
}

const Message = ({
  id,
  content,
  isMe = false,
  showAvatar = false,
  showDate = false,
  displayName,
  authorId,
  createdAt,
}: MessageProps) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      await deleteDoc(doc(firestore, "messages", id));
    } catch (e) {
      toast.error(
        "Unable to delete this message, please try again or contact support"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0 }}
      className={
        "grid grid-cols-[1.5rem_1fr] items-end gap-x-4 before:col-span-2 before:h-1.5 sm:grid-cols-[2rem_1fr]"
      }
    >
      {showAvatar && !isMe && (
        <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 sm:h-8 sm:w-8">
          <Avatar name={authorId} size={32} />
        </div>
      )}

      <div className={clsxm("col-start-2", isMe && "text-right")}>
        <div className="inline-block max-w-[calc(100%-2.5rem)] sm:max-w-[80%]">
          {showDate && (
            <p
              className={clsxm(
                "mb-2 mt-[0.625rem] text-[0.625rem] text-slate-400",
                isMe && "text-left"
              )}
            >
              {displayName},{" "}
              <TimeAgo
                date={createdAt}
                title={format(parseISO(createdAt), "HH:mm:ss d/M/Y")}
                minPeriod={60}
                formatter={(value, unit, suffix) => {
                  if (unit === "second") {
                    return "just now";
                  }

                  return `${value} ${unit}${value !== 1 ? "s" : ""} ${suffix}`;
                }}
              />
            </p>
          )}
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
            {content}

            {isMe && (
              <button
                onClick={handleDelete}
                type="button"
                className="absolute right-2 top-3 flex h-6 w-8 items-center justify-end bg-gradient-to-l from-orange-400 via-orange-400 via-70% pr-1 text-orange-200 opacity-0 transition hover:text-white group-hover:opacity-100"
                aria-label="More"
              >
                <FiMoreVertical size={20} />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export { Message };
export type { MessageProps };
