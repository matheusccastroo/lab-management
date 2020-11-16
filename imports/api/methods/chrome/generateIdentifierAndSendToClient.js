import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Computer } from "../../models/computer";

export const generateIdentifierAndSendToClient = new ValidatedMethod({
  name: "generateIdentifierAndSendToClient",
  validate: null,
  run() {
    console.log("Upcoming request for identifier generator...");
    const allComputersWithoutIdentifier = Computer.find({
      extensionIdentifier: null,
    })
      .fetch()
      .sort();

    const firstComputer = allComputersWithoutIdentifier[0];
    console.log(
      `Identifier will be registered to the following computer: ${firstComputer.location}`
    );
    const secret = Random.secret();
    firstComputer.extensionIdentifier = secret;
    firstComputer.save();

    return {
      message: `You are now computer ${firstComputer.location}`,
      secret,
    };
  },
});
