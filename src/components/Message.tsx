import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessageReaction } from "../http/create-message-reaction";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string;
  text: string;
  amoutOfReactions: number;
  answered?: boolean;
}

export default function Message({
  id: messageId,
  text,
  amoutOfReactions,
  answered = false,
}: MessageProps) {
  const { roomId } = useParams();
  const [hasReacted, setHasReacted] = useState(false);

  if (!roomId) {
    throw new Error("Messages components must be used within");
  }

  async function createMessageReactionAction() {
    if (!roomId) {
      return;
    }
    try {
      await createMessageReaction({ messageId, roomId });
      setHasReacted(true);
    } catch (error) {
      toast.error("Erro ao reagir a mensagem, tente novamente!");
    }
  }
  async function removeMessageReactionAction() {
    if (!roomId) {
      return;
    }
    try {
      await removeMessageReaction({ messageId, roomId });
      setHasReacted(false);
    } catch (error) {
      toast.error("Erro ao remover reação da mensagem, tente novamente!");
    }
  }

  return (
    <li
      data-answered={answered}
      className=" ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      {hasReacted ? (
        <button
          type="button"
          onClick={removeMessageReactionAction}
          className="flex hover:text-orange-500 items-center mt-3 gap-2 text-orange-400 text-sm font-medium"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amoutOfReactions})
        </button>
      ) : (
        <button
          type="button"
          onClick={createMessageReactionAction}
          className="flex items-center mt-3 gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amoutOfReactions})
        </button>
      )}
    </li>
  );
}
