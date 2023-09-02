import { ChatFooter } from "@/features/chat/footer";
import { MessagesList } from "@/features/chat/list";
import { Header } from "@/features/layout/header";

export default function Chat() {
  return (
    <>
      <Header title="Chat" />
      <MessagesList />
      <ChatFooter />
    </>
  );
}
