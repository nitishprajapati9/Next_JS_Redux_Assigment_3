"use client";
import { Heart, Edit, Trash, Mail, Phone, Globe } from "lucide-react";
import { User } from "../types/Profile";
import { useAppDispatch } from "../_store/hooks";
import { removeUser, toggleLike, updateUser } from "../_store/userSlice";
import Modal from "./Modals";
import { useState } from "react";

export default function Card({ profileData }: { profileData: User }) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleToggleLike = (id: number) => {
    console.log(id);
    dispatch(toggleLike(id));
  };

  const handleDeleteContent = (id: number) => {
    console.log("Deleting the ID", id);
    dispatch(removeUser(id));
  };

  const handleEdit = (id: number) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const handleSave = (updatedUser:User) => {
    dispatch(updateUser(updatedUser))
  }

  return (
    <div className="max-w-xl w-full border rounded-b-4xl shadow-md bg-white">
      {/* Avatar */}
      <div className="flex justify-center mb-4  bg-gray-200">
        <img
          src="https://api.dicebear.com/9.x/personas/svg?seed=username"
          alt="Profile Picture"
          width={200}
          height={200}
          className=""
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center p-8">
        <p className="font-semibold text-xl ml-2">{profileData.name}</p>
        <p className="text-gray-600 flex flex-row m-2 gap-4 text-lg">
          <Mail size={24} /> {profileData.email}
        </p>
        <p className="text-gray-600 flex flex-row m-2 gap-4 text-lg">
          <Phone size={24} /> {profileData.phone}
        </p>
        <p className="text-gray-600 flex flex-row m-2 gap-4 text-lg">
          <Globe size={24} />
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            http://{profileData.website}
          </a>
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-around p-8">
        <button className="flex items-center gap-1 text-red-500 hover:text-red-600">
          <Heart
            onClick={() => handleToggleLike(profileData.id)}
            className={`cursor-pointer ${
              !profileData.liked ? "fill-white" : "fill-red-600"
            }`}
            size={24}
          />
        </button>
        <button className="flex items-center gap-1 text-green-600 hover:text-green-700">
          <Edit
            className="cursor-pointer"
            onClick={() => handleEdit(profileData.id)}
            size={24}
          />
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
          <Trash
            onClick={() => handleDeleteContent(profileData.id)}
            size={24}
          />
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} id={selectedId} onSubmit={handleSave}/>
    </div>
  );
}
