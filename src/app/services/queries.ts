import { useQuery } from "@tanstack/react-query";
import { getProfileBasedOnId, getProfileList } from "./api";

export function useProfiles(){
    return useQuery({
        queryKey:['profile'],
        queryFn:() => getProfileList()
    })
}

export function useProfile(id:number | null){
    return useQuery({
        queryKey:['profile',id],
        queryFn:() => getProfileBasedOnId(id)
    })
}