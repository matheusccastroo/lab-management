import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { PersonsCollection } from "../imports/api/db/persons-collection";
import "../imports/api/publications/person/personsFetchAll";
import "../imports/api/publications/computers/computersfetchAll";
import "../imports/api/methods/person/personUpsert";
import "../imports/api/methods/computer/findPairComputerPerson";
import { ComputersCollection } from "../imports/api/db/computers-collection";
import { ComputerStatus } from "../imports/api/models/enums";
import { Computer } from "../imports/api/models/computer";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername("admin")) {
    Accounts.createUser({
      username: "admin",
      password: "admin",
    });
  }
  if (PersonsCollection.find().count() === 0) {
    import { Person } from "../imports/api/models/person";
    for (let k = 0; k < 50; k++) {
      const person = new Person({
        firstName: `ASDDDD${k.toString()}`,
        lastName: "ABECEDARIO",
        age: k > 0 ? k : 1,
        dateOfBirth: new Date(),
        address: "ladasldasldasldaslkdlaskdlaskldkasldkla",
      });
      person.save();
    }
  }
  if (ComputersCollection.find().count() === 0) {
    import { Computer } from "../imports/api/models/computer";
    for (let k = 0; k < 50; k++) {
      const pc = new Computer({
        location: `A${k.toString()}`,
        status: ComputerStatus.IDLE,
      });
      pc.save();
    }
  }
});
