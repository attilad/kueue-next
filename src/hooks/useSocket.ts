import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";

const API_URL = process.env.API_URL ?? "http://localhost:3030";

export const useSingerSubscription = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const socket = io(API_URL);

    socket.on("connect", () => {
      console.info("connected");
    });

    socket.on("disconnect", () => {
      console.info("disconnected");
    });

    socket.on("singers", (singers: string[]) => {
      console.log("updated singers", singers);
      queryClient.setQueryData(["singers"], singers);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
