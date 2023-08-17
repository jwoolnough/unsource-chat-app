import { FiSearch } from "react-icons/fi";

import { ChatFooter } from "@/features/chat/footer";
import { MessagesList } from "@/features/chat/list";
import { Header } from "@/features/layout/header";

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

      <MessagesList />

      <ChatFooter />
    </>
  );
}
