import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Computer } from "../../models/computer";

export const generateIdentifierAndSendToClient = new ValidatedMethod({
  name: "generateIdentifierAndSendToClient",
  validate({ version, short_name }) {
    check(version, Meteor.settings.extensionVersion);
    check(short_name, Meteor.settings.extensionShortName);
  },
  run() {
    console.log("Chegou request do identifier");
    const allComputersWithoutIdentifier = Computer.find({
      extensionIdentifier: null,
    }).sort();

    const firstComputer = allComputersWithoutIdentifier[0];
    const secret = Random.secret();
    firstComputer.extensionIdentifier = secret;
    firstComputer.save();

    return secret;
  },
});
