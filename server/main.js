import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { PersonsCollection } from "../imports/api/db/persons-collection";
import "../imports/api/publications/person/index";
import "../imports/api/publications/computers/index";
import "../imports/api/methods/index";
import { ComputersCollection } from "../imports/api/db/computers-collection";
import { ComputerStatus } from "../imports/api/models/enums";
import { Computer } from "../imports/api/models/computer";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername("univesp")) {
    Accounts.createUser({
      username: "univesp",
      password: "admin@univesp",
    });
  }
  if (PersonsCollection.find().count() === 0) {
    import { Person } from "../imports/api/models/person";
    for (let b = 0; b < 10; b++) {
      const person = new Person({
        firstName: `A${b.toString()}`,
        lastName: "LALA",
        dateOfBirth: new Date(),
      });
      person.save();
    }
  }
  if (ComputersCollection.find().count() === 0) {
    import { Computer } from "../imports/api/models/computer";
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (const letter of alphabet) {
      for (let a = 0; a < 5; a++) {
        const pc = new Computer({
          location: `${letter}${a.toString()}`,
          status: ComputerStatus.IDLE,
          extensionIdentifier: null,
        });
        pc.save();
      }
    }
  }
});
