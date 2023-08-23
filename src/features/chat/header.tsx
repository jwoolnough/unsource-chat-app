"use client";

import { FiSearch } from "react-icons/fi";

import { Header } from "../layout/header";

const ChatHeader = () => (
  <Header
    title="Chat"
    renderHeaderRight={() => (
      <button type="button" className="text-slate-400">
        <FiSearch size={22} />
      </button>
    )}
  />
);

export { ChatHeader };
