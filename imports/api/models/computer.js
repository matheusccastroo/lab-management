import { Class } from "meteor/jagi:astronomy";
import { ComputersCollection } from "../db/computers-collection";
import { PersonsCollection } from "../db/persons-collection";
import { ComputerStatus } from "./enums";
import { softremove } from "meteor/jagi:astronomy-softremove-behavior"; // needed for this behavior
import { omit, assign } from "lodash";
import { Person } from "./person";

export const Computer = Class.create({
  name: "Computer",
  collection: ComputersCollection,
  fields: {
    location: {
      type: String,
      validators: [
        {
          type: "minLength",
          param: 2,
          resolveError({ name, param }) {
            return `The name "${name}" has to be at least ${param} characters long.`;
          },
        },
      ],
    },
    status: {
      type: ComputerStatus,
      default: ComputerStatus.IDLE,
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
    softremove: {
      removedFieldName: "removed",
      hasRemovedAtField: true,
      removedAtFieldName: "removedAt",
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
    isActive() {
      return this.status === ComputerStatus.RUNNING;
    },
    getStatusDecoded() {
      return ComputerStatus.getIdentifier(this.status);
    },
    setActive(personId) {
      this.status = ComputerStatus.RUNNING;
      this.currentPersonId = personId;
      return;
    },
    getCurrentPerson() {
      return Person.findOne(this.currentPersonId);
    },
  },
});
