import { Class } from "meteor/jagi:astronomy";
import { PersonsCollection } from "../db/persons-collection";
import { softremove } from "meteor/jagi:astronomy-softremove-behavior"; // needed for this behavior

export const Person = Class.create({
  name: "Person",
  collection: PersonsCollection,
  fields: {
    firstName: {
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
    lastName: {
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
    address: {
      type: String,
      optional: true,
    },
    dateOfBirth: Date,
    isUsingComputer: {
      type: Boolean,
      default: false,
    },
  },
  helpers: {
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
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
});
