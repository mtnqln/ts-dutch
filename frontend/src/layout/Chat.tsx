import { useEffect, useState } from "react";
import { socket } from "../network/socket";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Listen for messages
    socket.on("chat message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Clean up listener when component unmounts
    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      // same as your code: can send a custom event
      socket.emit("chat message", input);
      setInput("");
    }
  };

  return (
    <div className="p-4">
      <ul className="space-y-2">
        {messages.map((msg, idx) => (
          <li key={idx} className="bg-gray-200 rounded p-2">
            {msg}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded p-2 flex-1"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}
