import { useEffect, useRef, useState } from "react";

type MessageHandler = (message: MessageEvent) => void;

export const useWebSocket = (url: string, onMessage: MessageHandler) => {
  const [readyState, setReadyState] = useState<WebSocket["readyState"]>();
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => setReadyState(wsRef.current?.readyState);
    wsRef.current.onclose = () => setReadyState(wsRef.current?.readyState);
    wsRef.current.onerror = () => setReadyState(wsRef.current?.readyState);

    return () => {
      wsRef.current?.close();
    };
  }, [url]);

  useEffect(() => {
    if (!wsRef.current) return;

    wsRef.current.onmessage = onMessage;
  }, [onMessage]);

  return { readyState };
};
