import { Meteor } from "meteor/meteor";
import { Computer } from "../../models/computer";

Meteor.publish("computers.fetchAll", ({ parameters, fields }) => {
  return Computer.find({ ...parameters }, { fields });
});
