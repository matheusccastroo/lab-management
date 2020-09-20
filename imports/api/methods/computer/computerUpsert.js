import { ValidatedMethod } from "meteor/mdg:validated-method";
import { ComputersCollection } from "../../db/computers-collection";

export const computerUpsert = new ValidatedMethod({
  name: "computerUpsert",
  validate({ computerId, ...postObject }) {
    check(postObject, Object);
  },
  run({ computerId, ...postObject }) {
    ComputersCollection.upsert(computerId, {
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
