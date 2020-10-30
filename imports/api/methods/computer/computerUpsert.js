import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Computer } from "../../models/computer";

export const computerUpsert = new ValidatedMethod({
  name: "computerUpsert",
  validate(postObject) {
    check(postObject, Computer);
  },
  run(postObject) {
    postObject.save();
  },
});
