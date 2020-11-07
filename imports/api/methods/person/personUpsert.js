import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Person } from "../../models/person";

export const personUpsert = new ValidatedMethod({
  name: "personUpsert",
  validate(postObject) {
    check(postObject, Person);
  },
  run(postObject) {
    postObject.save();
  },
});
