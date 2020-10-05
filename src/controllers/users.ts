import { Request, Response } from "express";
import { downloadUsers } from "../helpers/downloadUsers";
import { filterUsers } from "../helpers/filterUsers";
import { storeUsers } from "../helpers/storeUsers";
import { UserType } from "../types";

let downloadedUsers: Array<UserType> = [];

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: Array<UserType> = await downloadUsers();
    downloadedUsers = users;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const saveUsers = async (req: Request, res: Response) => {
  try {
    const filteredUsers = filterUsers(downloadedUsers);
    await storeUsers(filteredUsers);
    res.status(201).json(filteredUsers);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
