import { useQuery } from "@tanstack/react-query";
import { getProfileList } from "./api";

export function useProfiles(){
    return useQuery({
        queryKey:['profile'],
        queryFn:() => getProfileList()
    })
}