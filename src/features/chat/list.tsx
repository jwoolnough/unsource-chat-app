"use client";

import { differenceInHours, parseISO } from "date-fns";
import { collection, orderBy, query } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { auth } from "@/services/firebase";
import { firestore } from "@/services/firebase/store";

import { Message, MessageLoading, MessageProps } from "@/features/chat/message";

import { useLayoutStore } from "../layout/store";

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

const MessagesListContainer = ({ children }: WithChildren) => (
  <div className="relative flex flex-grow flex-col px-6 pb-4 md:px-8">
    {children}
  </div>
);

const MessagesList = () => {
  const [data, loading, error] = useCollection(q);
  const scrollerRef = useLayoutStore((state) => state.scrollerRef);
  const currentUser = auth.currentUser;
  const hasInitiallyLoaded = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef?.current;

    if (!scroller || loading) {
      return;
    }

    const maxHeight = scroller.scrollHeight;
    const scrollDistance = scroller.scrollTop + scroller.offsetHeight;

    // Scroll to the bottom if initially loading data, or if the
    // panel is currently near the bottom
    if (scrollDistance + 240 >= maxHeight || !hasInitiallyLoaded.current) {
      scroller.scrollTo({ top: maxHeight });

      if (!hasInitiallyLoaded.current) hasInitiallyLoaded.current = true;
    }
  }, [data]);

  if (loading) {
    return (
      <MessagesListContainer>
        <MessageLoading numberOfLines={3} width="20rem" showDate />
        <MessageLoading numberOfLines={1} width="4rem" />
        <MessageLoading numberOfLines={2} width="8rem" showAvatar />
        <MessageLoading numberOfLines={3} width="16rem" showDate />
        <MessageLoading numberOfLines={2} width="20rem" showAvatar />
      </MessagesListContainer>
    );
  }

  return (
    <MessagesListContainer>
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
    </MessagesListContainer>
  );
};

export { MessagesList };
