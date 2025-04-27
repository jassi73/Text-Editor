"use client";

import { mentionUsers } from "@/lib/editor-utils";
import { useEffect, useState } from "react";

export default function MentionMenu({ position, searchTerm, onSelect }) {
  const [users, setUsers] = useState(mentionUsers);

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setSelectedIndex(0);
  }, [searchTerm, users]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (filteredUsers.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredUsers.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        onSelect(filteredUsers[selectedIndex].username);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filteredUsers, selectedIndex, onSelect]);

  if (filteredUsers.length === 0) return null;

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <ul className="py-1">
        {filteredUsers.map((user, index) => (
          <li
            key={user.id}
            className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${
              index === selectedIndex ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            onClick={() => onSelect(user.username)}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-6 h-6 rounded-full"
            />
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">@{user.username}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
