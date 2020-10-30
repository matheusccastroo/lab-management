import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Computer } from "../../models/computer";
import { Person } from "../../models/person";

export const findPairComputerPerson = new ValidatedMethod({
  name: "computer#findPairComputerPerson",
  validate({ computerId, personId }) {
    check(computerId, String);

    if (personId) {
      check(personId, String);
    }
  },
  run({ computerId, personId }) {
    if (Meteor.isClient) {
      return;
    }

    const person = Person.findOne(personId);
    const computer = Computer.findOne(computerId);

    return {
      person,
      computer,
    };
  },
});
