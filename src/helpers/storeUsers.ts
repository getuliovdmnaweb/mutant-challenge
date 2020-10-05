import { UserType } from "../types";
import "reflect-metadata";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { Address } from "../entity/Address";
import { Contact } from "../entity/Contact";
import { Company } from "../entity/Company";
import { Geolocation } from "../entity/Geolocation";

export const storeUsers = async (filteredUsers: Array<UserType>) => {
  const connection = await getConnection();

  filteredUsers.forEach(async (filteredUser: UserType) => {
    const user = instanciateUser(filteredUser);
    const address = instanciateAddress(user, filteredUser);
    const geolocation = instanciateGeolocation(address, filteredUser);
    const contact = instanciateContact(user, filteredUser);
    const company = instanciateCompany(contact, filteredUser);

    await connection.manager.save(user);
    await connection.manager.save(address);
    await connection.manager.save(geolocation);
    await connection.manager.save(contact);
    await connection.manager.save(company);
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

const instanciateGeolocation = (address: Address, filteredUser: UserType) => {
  const geolocation = new Geolocation();

  geolocation.lat = filteredUser.address.geo.lat;
  geolocation.lng = filteredUser.address.geo.lng;
  geolocation.address = address;

  return geolocation;
};

const instanciateContact = (user: User, filteredUser: UserType) => {
  const contact = new Contact();

  contact.phone = filteredUser.phone;
  contact.website = filteredUser.website;
  contact.user = user;

  return contact;
};

const instanciateCompany = (contact: Contact, filteredUser: UserType) => {
  const company = new Company();

  company.name = filteredUser.company.name;
  company.catchPhrase = filteredUser.company.catchPhrase;
  company.bs = filteredUser.company.bs;
  company.contact = contact;

  return company;
};
