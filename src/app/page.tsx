"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import Card from "./_components/Card";
import { useProfiles } from "./services/queries";
import { useAppDispatch, useAppSelector } from "./_store/hooks";
import {setUsers} from "./_store/userSlice"
import { useEffect } from "react";
export default function Page() {
  const { data, isPending, isLoading, isError, error, refetch, isFetching } =
    useProfiles();

  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.users)
  useEffect(() => {
    if(data && users.length === 0){
      dispatch(setUsers(data))
    }
    if(data && users.length > 0){
      const merged = data.map((user) => {
        const existing = users.find((ind) => ind.id === user.id)
        return {
          ...user,
          liked:existing?.liked ?? false
        }
      })
      dispatch(setUsers(merged))
    }
  },[data,dispatch])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col justify-center items-center">
        <div className="text-2xl">Loading....</div>
        <div>
          <Loader2 className="h-8 w-8 animate-spin transition-all" />
        </div>
      </div>
    );
  }

  if (isError && !isLoading) {
    return (
      <div>
        <div className="flex min-h-screen flex-col justify-center items-center">
          <div className="flex flex-row gap-2">
            <AlertCircle /> Something Went Wrong
          </div>
          <div>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              {isFetching ? "Reloading..." : "Reload"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 m-4 gap-6">
      {users?.map((item) => (
        <Card key={item.id} profileData={item} />
      ))}
    </div>
  );
}
