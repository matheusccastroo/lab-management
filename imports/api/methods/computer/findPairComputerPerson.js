import { ValidatedMethod } from "meteor/mdg:validated-method";
import { ComputersCollection } from "../../db/computers-collection";
import { PersonsCollection } from "../../db/persons-collection";

export const findPairComputerPerson = new ValidatedMethod({
  name: "computer#findPairComputerPerson",
  validate({ computerId, personId }) {
    check(computerId, String);
  },
  run({ computerId, personId }) {
    if (Meteor.isClient) {
      return;
    }

    const person = PersonsCollection.findOne(personId);
    const computer = ComputersCollection.findOne(computerId);

    return {
      person,
      computer,
    };
  },
});
