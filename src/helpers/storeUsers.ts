import { UserType } from "../types";
import "reflect-metadata";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { Address } from "../entity/Address";
import { Contact } from "../entity/Contact";

export const storeUsers = async (filteredUsers: Array<UserType>) => {
  const connection = await getConnection();

  filteredUsers.forEach(async (filteredUser: UserType) => {
    const user = instanciateUser(filteredUser);
    const address = instanciateAddress(user, filteredUser);
    const contact = instanciateContact(user, filteredUser);

    await connection.manager.save(user);
    await connection.manager.save(address);
    await connection.manager.save(contact);
  });
};

const instanciateUser = (filteredUser: UserType) => {
  const user = new User();

  user.id = filteredUser.id;
  user.name = filteredUser.name;
  user.username = filteredUser.username;
  user.email = filteredUser.email;

  return user;
};

const instanciateAddress = (user: User, filteredUser: UserType) => {
  const address = new Address();

  address.street = filteredUser.address.street;
  address.city = filteredUser.address.city;
  address.suite = filteredUser.address.suite;
  address.zipcode = filteredUser.address.zipcode;
  address.user = user;

  return address;
};

const instanciateContact = (user: User, filteredUser: UserType) => {
  const contact = new Contact();

  contact.phone = filteredUser.phone;
  contact.website = filteredUser.website;
  contact.user = user;

  return contact;
};
