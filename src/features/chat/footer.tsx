"use client";

import { addDoc, collection } from "firebase/firestore";
import { FormEventHandler, useState } from "react";
import { FiSend } from "react-icons/fi";
import TextareaAutosize from "react-textarea-autosize";

import { auth } from "@/services/firebase";
import { firestore } from "@/services/firebase/store";

import { clsxm } from "@/utils/clsxm";

const ChatFooter = () => {
  const [message, setMessage] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      // TODO:
      return;
    }

    const { uid, photoURL, displayName } = user;
    await addDoc(collection(firestore, "messages"), {
      content: message,
      authorId: uid,
      photoUrl: photoURL,
      createdAt: new Date().toISOString(),
      displayName,
    });

    setMessage("");
  };

  return (
    <form
      className="sticky bottom-0 border-t bg-slate-50/70 p-4 backdrop-blur"
      onSubmit={handleSubmit}
    >
      <label className="sr-only">Message</label>
      <div className="flex items-end gap-4 rounded-xl bg-white shadow-sm">
        <TextareaAutosize
          className={clsxm(
            "block w-full resize-none rounded-bl-xl rounded-tl-xl px-4 py-3 outline-none placeholder:text-slate-200",
            ""
          )}
          placeholder="Write your message..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></TextareaAutosize>
        <button
          type="submit"
          className="button mb-[0.375rem] mr-[0.375rem] flex h-9 w-9 shrink-0 items-center justify-center rounded-md p-0"
          aria-label="Send"
          disabled={!message}
        >
          <FiSend size={22} />
        </button>
      </div>
    </form>
  );
};

export { ChatFooter };
