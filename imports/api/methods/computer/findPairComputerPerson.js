import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Computer } from "../../models/computer";

export const findPairComputerPerson = new ValidatedMethod({
  name: "computer#findPairComputerPerson",
  validate({ computerId }) {
    check(computerId, String);
  },
  run({ computerId }) {
    if (Meteor.isClient) {
      return;
    }

    const computer = Computer.findOne(computerId);

    return {
      person: computer.getCurrentPerson(),
      computer,
    };
  },
});
