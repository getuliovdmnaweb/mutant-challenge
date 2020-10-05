import { UserType } from "../types";

export const filterUsers = (downloadedUsers: Array<UserType>) => {
  return downloadedUsers.filter(
    (user) => user.address.suite.toLowerCase().includes("suite") === true
  );
};
