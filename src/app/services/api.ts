import axios from "axios";
import { User, UsersState } from "../types/Profile";

export async function getProfileList(){
    return (await axios.get<User[]>("https://jsonplaceholder.typicode.com/users")).data
}

export async function getProfileBasedOnId(id:number | null){
    return (await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)).data
}