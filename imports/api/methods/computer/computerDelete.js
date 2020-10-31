import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Computer } from "../../models/computer";

export const computerDelete = new ValidatedMethod({
  name: "computerDelete",
  validate({ _id }) {
    check(_id, String);
  },
  run({ _id }) {
    const computer = Computer.findOne(_id);
    computer.softRemove();
  },
});
