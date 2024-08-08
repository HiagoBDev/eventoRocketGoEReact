import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateRoom from "./pages/create-room/CreateRoom";
import Room from "./pages/room/Room";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateRoom />,
  },
  {
    path: "/room/:roomId",
    element: <Room />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <Toaster invert richColors />
    </QueryClientProvider>
  );
}
