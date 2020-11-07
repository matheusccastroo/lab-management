import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Computer } from "../../models/computer";

export const computerUpsert = new ValidatedMethod({
  name: "computerUpsert",
  validate({ computer, computerId }) {
    if (computer) check(computer, Computer);
    if (computerId) check(computerId, String);
  },
  run({ computer, computerId, values }) {
    const postObject = computer || Computer.findOne(computerId);
    if (computerId) {
      Object.assign(postObject, values);
    }
    try {
      postObject.save();
    } catch (e) {
      console.log("==== ERROR UPDATING COMPUTER =====");
    }
  },
});
