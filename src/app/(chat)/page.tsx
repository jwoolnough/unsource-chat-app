import { FiSearch, FiSend } from "react-icons/fi";

import { clsxm } from "@/utils/clsxm";

export default function Chat() {
  return (
    <div className="bg-slate-50 rounded-[1.75rem] h-[30rem] overflow-auto flex flex-col">
      <div className="backdrop-blur bg-slate-50 bg-opacity-70 sticky top-0 flex justify-between p-4">
        <h1 className="mb-0">Chat</h1>
        <button type="button" className="text-slate-400">
          <FiSearch size={22} />
        </button>
      </div>

      <div className="flex-grow p-4 pb-0"></div>

      <form className="bg-slate-50 bg-opacity-70 backdrop-blur sticky bottom-0 p-4">
        <label className="sr-only">Message</label>
        <div className="relative">
          <textarea
            className={clsxm(
              "placeholder:text-slate-200 rounded-xl block w-full px-4 py-3 bg-white outline-none resize-none",
              "shadow-sm"
            )}
            placeholder="Write your message..."
            rows={1}
          ></textarea>
          <button
            type="submit"
            className="button w-9 h-9 absolute top-[0.375rem] right-[0.375rem] p-0 rounded-md flex justify-center items-center"
            aria-label="Send"
          >
            <FiSend size={22} />
          </button>
        </div>
      </form>
    </div>
  );
}
