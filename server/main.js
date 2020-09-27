import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { PersonsCollection } from "../imports/api/db/persons-collection";
import "../imports/api/publications/person/personsFetchAll";
import "../imports/api/publications/computers/computersfetchAll";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername("admin")) {
    Accounts.createUser({
      username: "admin",
      password: "admin",
    });
  }
  if (PersonsCollection.find().count() === 0) {
    PersonsCollection.insert({
      name: "oi",
      age: 55,
      address: "tostando",
      createdAt: new Date(),
    });
  }
});
