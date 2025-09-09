"use client";
import React from "react";
import { useProfile } from "../services/queries";
import {useForm} from "react-hook-form"
import { User } from "../types/Profile";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number | null;
  onSubmit:(formData:User) => void
}

export default function Modal({ isOpen, onClose, id ,onSubmit}: ModalProps) {

  const {data, isPending, isLoading, isError, error, refetch, isFetching } = useProfile(id)

  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<User>({defaultValues:data || {}})

    if (!isOpen) return null;

  if (isLoading || isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-red-100 text-red-600 p-6 rounded-lg shadow-lg">
          Failed to load profile
        </div>
      </div>
    );
  }


  const submitHandler = (FormData:User) => {
    console.log(FormData)
    const merged:User = {...(data as User),...(FormData as User )}
    onSubmit(merged)
    onClose()
  }

  return (
    <div
      onClick={onClose}
      className="w-[96] fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-1/4 rounded-2xl shadow-lg p-6 relative"
      >
        <h2 className="text-xl font-semibold mb-4">Editing</h2>

        <form onSubmit={handleSubmit(submitHandler)}>
        <input
          {...register("name",{required:"Name is required"})}
          placeholder="Name"
          defaultValue={data?.name}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />
        <input
          {...register("email",{
            required:"Email is required"
          })}
          defaultValue={data.email}
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        <input
          {...register("phone",{
            required:"Phone is required"
          })}
          placeholder="number"
          defaultValue={data.phone}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        <input
          {...register("website")}
          placeholder="text"
          defaultValue={data.website}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
          type="submit"
            // onClick={() => {
            //   console.log("Saving ID:", id);
            //   onClose();
            // }}
            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Update
          </button>
        </div>
        </form>


        

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
