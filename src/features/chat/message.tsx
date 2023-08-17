import { clsxm } from "@/utils/clsxm";

interface MessageProps {
  content: string;
  isMe?: boolean;
  showAvatar?: boolean;
  showDate?: boolean;
  authorId?: number;
}

const Message = ({
  content,
  isMe = false,
  showAvatar = false,
  showDate = false,
}: MessageProps) => {
  return (
    <div className="grid grid-cols-[2rem_1fr] items-end gap-4">
      {showAvatar && !isMe && (
        <div className="h-8 w-8 rounded-full bg-slate-300"></div>
      )}

      <div className={clsxm("col-start-2", isMe && "text-right")}>
        <div className="inline-block max-w-[80%] text-left">
          {showDate && (
            <p className="mb-2 mt-[1.125rem] text-[0.625rem] text-slate-400">
              Jordan, yesterday
            </p>
          )}
          <div
            className={clsxm(
              "relative rounded-md bg-white p-4 drop-shadow-sm",
              "before:absolute before:bottom-0",
              "before:border-b-[15px] before:border-transparent  before:border-b-white",
              !isMe &&
                "rounded-bl-none before:right-full before:border-l-[7px]",
              isMe &&
                "rounded-br-none bg-orange-400 text-white before:left-full before:border-l-0 before:border-r-[7px] before:border-b-orange-400"
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
