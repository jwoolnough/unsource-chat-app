import { format, parseISO } from "date-fns";
import { deleteDoc, doc } from "firebase/firestore";
import TimeAgo from "react-timeago";
import { toast } from "react-toastify";

import { firestore } from "@/services/firebase/store";

import { Avatar } from "@/components/avatar";
import { SkeletonText } from "@/components/skeleton";

import {
  MessageAvatar,
  MessageBubble,
  MessageContainer,
  MessageDate,
  MessageRow,
} from "./components";
import { MessageMenu } from "./menu";

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
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(firestore, "messages", id));
    } catch (e) {
      toast.error(
        "Unable to delete this message, please try again or contact support"
      );
    }
  };

  return (
    <MessageRow>
      {showAvatar && !isMe && (
        <MessageAvatar>
          <Avatar name={authorId} size={32} />
        </MessageAvatar>
      )}

      <MessageContainer isMe={isMe}>
        {showDate && (
          <MessageDate>
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
          </MessageDate>
        )}
        <MessageBubble isMe={isMe} showAvatar={showAvatar}>
          {content}

          {isMe && <MessageMenu onDelete={() => handleDelete()} />}
        </MessageBubble>
      </MessageContainer>
    </MessageRow>
  );
};

interface MessageLoadingProps
  extends Pick<MessageProps, "showAvatar" | "showDate" | "isMe"> {
  numberOfLines: number;
  width: string;
}

const MessageLoading = ({
  showAvatar = false,
  showDate = false,
  isMe = false,
  numberOfLines,
  width,
}: MessageLoadingProps) => (
  <MessageRow>
    {showAvatar && <MessageAvatar />}
    <MessageContainer isMe={isMe}>
      {showDate && (
        <MessageDate>
          <SkeletonText width="4rem" />
        </MessageDate>
      )}
      <MessageBubble isMe={isMe} showAvatar={showAvatar}>
        <SkeletonText numberOfLines={numberOfLines} width={width} />
      </MessageBubble>
    </MessageContainer>
  </MessageRow>
);

export { Message, MessageLoading };
export type { MessageProps };
