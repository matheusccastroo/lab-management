import { Meteor } from "meteor/meteor";
import { Person } from "../../models/person";

Meteor.publish("persons.fetchAll", ({ parameters, fields }) => {
  return Person.find({ ...parameters }, { ...fields });
});
