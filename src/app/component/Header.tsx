"use client";

import { BellIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded hover:bg-gray-100">
          <BellIcon className="h-6 w-6 text-gray-700" />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <Image
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      </div>
    </header>
  );
}
