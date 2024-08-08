import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { createMessage } from "../http/create-message";
import { toast } from "sonner";

export default function CreateMessageForm() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages components must be used within room page");
  }

  async function handleCreateMessage(data: FormData) {
    const message = data.get("message")?.toString();

    if (!message || !roomId) {
      return;
    }

    try {
      await createMessage({ message, roomId });
    } catch (error) {
      toast.error("Falha ao enviar mensagem, tente novamente!");
    }
  }

  return (
    <form
      className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 focus-within:ring-1 ring-offset-zinc-950 ring-offset-2"
      action={handleCreateMessage}
    >
      <input
        className="flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100 "
        name="message"
        required
        autoComplete="off"
        placeholder="Qual a sua pergunta"
        type="text"
      />
      <button
        type="submit"
        className=" hover:bg-orange-500 transition-colors bg-orange-400 text-orange-950 px-3 py-1.5 flex gap-1.5 items-center rounded-lg font-medium text-sm"
      >
        Criar pergunta
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
