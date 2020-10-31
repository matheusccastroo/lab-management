import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Person } from "../../models/person";

export const personDelete = new ValidatedMethod({
  name: "personDelete",
  validate({ _id }) {
    check(_id, String);
  },
  run({ _id }) {
    const person = Person.findOne(_id);
    person.softRemove();
  },
});
