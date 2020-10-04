import axios from "axios";
import { UserType } from "../types";

export const downloadUsers = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  const users: Array<UserType> = response.data;
  return users;
};
