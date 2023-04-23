import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_URL = process.env.API_URL || "http://localhost:3030";

export const useShowSingers = () => {
  const { data, ...queryState } = useQuery({
    queryKey: ["singers"],
    queryFn: async () => {
      const response = await axios.get<{ singers: string[] }>(
        `${API_URL}/singers`
      );

      return response.data.singers;
    },
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

  const previousSinger = useMutation({
    mutationFn: () => {
      return axios.post(`${API_URL}/back`);
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

  const addSingers = useMutation<string[], unknown, string[]>({
    mutationFn: (names) => {
      return axios.post(`${API_URL}/add-many`, { names });
    },
  });

  const removeSinger = useMutation({
    mutationFn: (name: string) => {
      return axios.post(`${API_URL}/remove`, { name });
    },
  });

  const bumpSinger = useMutation({
    mutationFn: (name: string) => {
      return axios.post(`${API_URL}/bump`, { name });
    },
  });

  const resetQueue = useMutation({
    mutationFn: () => {
      return axios.post(`${API_URL}/reset`);
    },
  });

  return {
    addSinger: (name: string, priority: boolean = false) =>
      addSinger.mutate({ name, priority }),
    removeSinger: (name: string) => removeSinger.mutate(name),
    nextSinger: () => nextSinger.mutate(),
    previousSinger: () => previousSinger.mutate(),
    bumpSinger: (name: string) => bumpSinger.mutate(name),
    resetQueue: () => resetQueue.mutate(),
  };
};
