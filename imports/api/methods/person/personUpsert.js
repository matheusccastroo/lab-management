import { ValidatedMethod } from "meteor/mdg:validated-method";
import { PersonsCollection } from "../../db/persons-collection";

export const personUpsert = new ValidatedMethod({
  name: "personUpsert",
  validate({ personId, ...postObject }) {
    check(postObject, Object);
  },
  run({ personId, ...postObject }) {
    PersonsCollection.upsert(personId, {
      $set: {
        ...postObject,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        ...postObject,
        createdAt: new Date(),
      },
    });
  },
});
