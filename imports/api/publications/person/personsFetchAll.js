import { Meteor } from "meteor/meteor";
import { PersonsCollection } from "../../db/persons-collection";

Meteor.publish("persons.fetchAll", () => {
  return PersonsCollection.find({});
});
