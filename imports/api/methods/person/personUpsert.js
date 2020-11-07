import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Person } from "../../models/person";

export const personUpsert = new ValidatedMethod({
  name: "personUpsert",
  validate({ person, personId }) {
    if (person) check(person, Person);
    if (personId) check(personId, String);
  },
  run({ person, personId, values }) {
    const postObject = person || Person.findOne(personId);
    if (personId) {
      Object.assign(postObject, values);
    }

    try {
      postObject.save();
    } catch (e) {
      console.log("==== ERROR UPDATING PERSON =====");
    }
  },
});
