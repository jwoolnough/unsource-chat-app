import { FiSearch, FiSend } from "react-icons/fi";

import { clsxm } from "@/utils/clsxm";

export default function Chat() {
  return (
    // TODO: Make this component, add clipPath
    <div className="flex h-[30rem] flex-col overflow-auto rounded-[1.75rem] bg-slate-50">
      <div className="sticky top-0 flex justify-between bg-slate-50 bg-opacity-70 p-4 backdrop-blur">
        <h1 className="mb-0">Chat</h1>
        <button type="button" className="text-slate-400">
          <FiSearch size={22} />
        </button>
      </div>

      <div className="flex-grow p-4 pb-0"></div>

      <form className="sticky bottom-0 bg-slate-50 bg-opacity-70 p-4 backdrop-blur">
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
    </div>
  );
}
