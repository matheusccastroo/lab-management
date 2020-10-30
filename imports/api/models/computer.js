import { Class } from "meteor/jagi:astronomy";
import { ComputersCollection } from "../db/computers-collection";
import { PersonsCollection } from "../db/persons-collection";
import { ComputerStatus } from "./enums";

export const Computer = Class.create({
  name: "Computer",
  collection: ComputersCollection,
  fields: {
    location: {
      type: String,
    },
    status: {
      type: ComputerStatus,
    },
    currentPersonId: {
      type: String,
      optional: true,
    },
    lastBookedAt: {
      type: Date,
      optional: true,
    },
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: "createdAt",
      hasUpdatedField: true,
      updatedFieldName: "updatedAt",
    },
  },
  helpers: {
    getLastUsedBy() {
      import { PersonsCollection } from "../db/persons-collection";
      import moment from "moment";

      const lastPerson = PersonsCollection.find(this.currentPersonId);
      const date = moment(this.lastBookedAt);
      return {
        person: lastPerson,
        lastUsedAt: date,
      };
    },
  },
});
