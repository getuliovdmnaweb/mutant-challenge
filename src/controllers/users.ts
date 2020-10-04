import { Request, Response } from "express";
import { downloadUsers } from "../helpers";
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
