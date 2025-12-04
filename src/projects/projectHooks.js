import { useState } from 'react';
import { projectAPI } from './projectAPI';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Project } from './project';

export function useProjects() {
  const [page, setPage] = useState(0);
  let queryInfo = useQuery({
    queryKey: ['projects', page],
    queryFn: () => projectAPI.get(page + 1),
    placeholderData: (previousData) => previousData,
    // staleTime: 5000,
  });
  console.log(queryInfo);
  
  return { 
    projects: queryInfo.data || [], 
    loading: queryInfo.isLoading, 
    error: queryInfo.error?.message, 
    page, 
    setPage,
    setCurrentPage: setPage 
  };
}

export function useSaveProject() {
  const queryClient = useQueryClient();
  return useMutation({
   mutationFn: (project) => projectAPI.put(project),
   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}