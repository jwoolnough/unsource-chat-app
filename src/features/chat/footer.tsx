"use client";

import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

import { auth } from "@/services/firebase";
import { firestore } from "@/services/firebase/store";

import { clsxm } from "@/utils/clsxm";

import { useLayoutStore } from "../layout/store";

const ChatFooter = () => {
  const [message, setMessage] = useState("");
  const { isAtBottom } = useLayoutStore();

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Unauthenticated user");
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
    } catch (e) {
      toast.error(
        "There was an issue sending your message, please try again or contact support"
      );
    }
  };

  return (
    <form
      className={clsxm(
        "sticky bottom-0 border-t border-slate-100 border-opacity-0 p-4 transition",
        !isAtBottom && "border-opacity-100 bg-slate-50/70 backdrop-blur"
      )}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className="sr-only">Message</label>
      <div className="flex items-end rounded-xl bg-white shadow-sm">
        <TextareaAutosize
          className="block w-full resize-none rounded-bl-xl rounded-tl-xl px-4 py-3 outline-none placeholder:text-slate-200"
          placeholder="Write your message..."
          rows={1}
          maxRows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (!e.shiftKey && e.code === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          type="submit"
          className="button mb-1.5 mr-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md p-0"
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
