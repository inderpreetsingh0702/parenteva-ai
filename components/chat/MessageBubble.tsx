type Props = {
  message: string;
  sender: "user" | "ai";
};

export default function MessageBubble({
  message,
  sender,
}: Props) {
  return (
    <div
      className={`flex ${
        sender === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs rounded-xl px-4 py-3 ${
          sender === "user"
            ? "bg-black text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message}
      </div>
    </div>
  );
}