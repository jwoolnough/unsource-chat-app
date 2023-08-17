import { format, parseISO } from "date-fns";
import Image from "next/image";
import TimeAgo from "react-timeago";

import { clsxm } from "@/utils/clsxm";

interface MessageProps {
  content: string;
  isMe?: boolean;
  showAvatar?: boolean;
  showDate?: boolean;
  authorId: string;
  createdAt: string;
  displayName: string;
  photoUrl?: string;
}

const Message = ({
  content,
  isMe = false,
  showAvatar = false,
  showDate = false,
  displayName,
  photoUrl,
  createdAt,
}: MessageProps) => {
  return (
    <div className="grid grid-cols-[1.5rem_1fr] items-end gap-4 sm:grid-cols-[2rem_1fr]">
      {showAvatar && !isMe && (
        <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 sm:h-8 sm:w-8">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={`${displayName}'s avatar`}
              width={32}
              height={32}
              className="absolute inset-0 rounded-full"
            />
          ) : (
            <span className="font-rounded font-medium text-slate-600">
              {displayName.charAt(0)}
            </span>
          )}
        </div>
      )}

      <div className={clsxm("col-start-2", isMe && "text-right")}>
        <div className="inline-block max-w-[calc(100%-2.5rem)] sm:max-w-[80%]">
          {showDate && (
            <p
              className={clsxm(
                "mb-2 mt-[1.125rem] text-[0.625rem] text-slate-400",
                isMe && "text-left"
              )}
            >
              {displayName},{" "}
              <TimeAgo
                date={createdAt}
                title={format(parseISO(createdAt), "HH:mm d/M/Y")}
                minPeriod={60}
              />
            </p>
          )}
          <div
            className={clsxm(
              "relative inline-block rounded-md bg-white p-4 drop-shadow-sm",
              showAvatar && "before:absolute before:bottom-0",
              showAvatar &&
                "before:border-b-[15px] before:border-transparent  before:border-b-white",
              isMe && "bg-orange-400 text-left text-white",
              !isMe &&
                showAvatar &&
                "rounded-bl-none before:right-full before:border-l-[7px]",
              isMe &&
                showAvatar &&
                "rounded-br-none before:left-full before:border-l-0 before:border-r-[7px] before:border-b-orange-400"
            )}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Message };
export type { MessageProps };
