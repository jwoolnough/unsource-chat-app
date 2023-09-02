"use client";

import { differenceInHours, parseISO } from "date-fns";
import { collection, orderBy, query } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import { useCollection } from "react-firebase-hooks/firestore";

import { auth } from "@/services/firebase";
import { firestore } from "@/services/firebase/store";

import { Message, MessageProps } from "@/features/chat/message";

type Message = Omit<MessageProps, "showAvatar" | "showDate" | "isMe">;

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

const messagesRef = collection(firestore, "messages");
const q = query(messagesRef, orderBy("createdAt"));

const MessagesList = () => {
  const [data, loading, error] = useCollection(q);
  const currentUser = auth.currentUser;

  return (
    <div className="flex flex-grow flex-col px-6 py-4 pt-0 md:px-8">
      <AnimatePresence>
        {data?.docs.map((doc, i) => {
          const message = doc.data() as Message;
          const prevMessage = data.docs[i - 1]?.data() as Message;
          const nextMessage = data.docs[i + 1]?.data() as Message;

          return (
            <Message
              key={doc.id}
              {...message}
              id={doc.id}
              showDate={
                hasDifferentAuthor(message, prevMessage) ||
                hasHourTimeDifference(message, prevMessage)
              }
              showAvatar={
                hasDifferentAuthor(message, nextMessage) ||
                hasHourTimeDifference(nextMessage, message)
              }
              isMe={!!currentUser && currentUser.uid === message.authorId}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export { MessagesList };
