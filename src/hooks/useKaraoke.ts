import axios from "axios";
import { useWebSocket } from "./useWebSocket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:3030"; // Update this with your Koa API URL

export const useShowSingers = () => {
  const queryClient = useQueryClient();

  const { data, ...queryState } = useQuery({
    queryKey: ["singers"],
    queryFn: async () => {
      const response = await axios.get<{ singers: string[] }>(
        `${API_URL}/singers`
      );

      return response.data.singers;
    },
  });

  useWebSocket("ws://localhost:3030", (message: MessageEvent) => {
    const updatedSingers = JSON.parse(message.data);
    queryClient.setQueryData(["singers"], updatedSingers);
    queryClient.invalidateQueries(["currentSinger"]);
  });

  return { singers: data, ...queryState };
};

export const useCurrentSinger = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["currentSinger"],
    queryFn: async () => {
      const response = await axios.get<{ currentSinger: string }>(
        `${API_URL}/current`
      );

      return response.data.currentSinger;
    },
  });

  return { currentSinger: data, loading: isLoading };
};

interface AddSingerProps {
  name: string;
  priority?: boolean;
}

export const useModifyQueue = () => {
  const nextSinger = useMutation({
    mutationFn: () => {
      return axios.post(`${API_URL}/next`);
    },
  });

  const addSinger = useMutation<string, unknown, AddSingerProps>({
    mutationFn: ({ name, priority }) => {
      return axios.post(
        priority ? `${API_URL}/add-priority` : `${API_URL}/add`,
        { name }
      );
    },
  });

  const removeSinger = useMutation({
    mutationFn: (name: string) => {
      return axios.post(`${API_URL}/remove`, { name });
    },
  });

  const bumpSinger = async (name: string) => {
    await removeSinger.mutateAsync(name);
    await addSinger.mutateAsync({ name, priority: true });
  };

  return {
    addSinger: (name: string, priority: boolean = false) =>
      addSinger.mutate({ name, priority }),
    removeSinger: (name: string) => removeSinger.mutate(name),
    nextSinger: () => nextSinger.mutate(),
    bumpSinger,
  };
};