import { FiSend } from "react-icons/fi";

import { clsxm } from "@/utils/clsxm";

const ChatFooter = () => {
  return (
    <form className="sticky bottom-0 border-t bg-slate-50/70 p-4 backdrop-blur">
      <label className="sr-only">Message</label>
      <div className="relative">
        <textarea
          className={clsxm(
            "block w-full resize-none rounded-xl bg-white px-4 py-3 outline-none placeholder:text-slate-200",
            "shadow-sm"
          )}
          placeholder="Write your message..."
          rows={1}
        ></textarea>
        <button
          type="submit"
          className="button absolute right-[0.375rem] top-[0.375rem] flex h-9 w-9 items-center justify-center rounded-md p-0"
          aria-label="Send"
        >
          <FiSend size={22} />
        </button>
      </div>
    </form>
  );
};

export { ChatFooter };
