import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export  function useQuery() {

  const { search } = useLocation();
  // return new URLSearchParams(search)
  return useMemo(() => new URLSearchParams(search), [search]);
}