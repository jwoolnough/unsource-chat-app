import { ChatFooter } from "@/features/chat/footer";
import { ChatHeader } from "@/features/chat/header";
import { MessagesList } from "@/features/chat/list";

export default function Chat() {
  return (
    <>
      <ChatHeader />
      <MessagesList />
      <ChatFooter />
    </>
  );
}
