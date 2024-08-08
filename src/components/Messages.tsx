import { useParams } from "react-router-dom";
import Message from "./Message";
import { getMessages } from "../http/get-message";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMessagesWebsockets } from "../hooks/use-messages-websockets";

export default function Messages() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages components must be used");
  }

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getMessages({ roomId }),
  });

  useMessagesWebsockets({ roomId });

  const sortedMessages = data.messages.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions;
  });

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map((message) => (
        <Message
          id={message.id}
          answered={message.answered}
          text={message.text}
          amoutOfReactions={message.amountOfReactions}
          key={message.id}
        />
      ))}
    </ol>
  );
}
