import { Meteor } from "meteor/meteor";
import { ComputersCollection } from "../../db/computers-collection";

Meteor.publish("computers.fetchAll", ({ fields }) => {
  return ComputersCollection.find({}, fields);
});
