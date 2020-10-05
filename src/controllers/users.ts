import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { downloadUsers } from "../helpers/downloadUsers";
import { filterUsers } from "../helpers/filterUsers";
import { storeUsers } from "../helpers/storeUsers";
import { UserType } from "../types";
import { User } from "../entity/User";

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
    const storedUsers = await getRepository(User).find();

    if (Object.values(storedUsers).length === 0) {
      const filteredUsers = filterUsers(downloadedUsers);
      await storeUsers(filteredUsers);
      res.status(201).json(filteredUsers);
    } else {
      const filteredUsers = filterUsers(downloadedUsers);
      res.status(304).json({
        message: "You Already Saved your Users!",
        data: filteredUsers,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
