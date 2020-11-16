import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Computer } from "../../models/computer";
import { ComputerStatus } from "../../models/enums";

export const sendUrlFromExtension = new ValidatedMethod({
  name: "sendUrlFromExtension",
  validate({ url, title, secret }) {
    check(url, String);
    check(title, String);
    check(secret, String);
  },
  run({ url, title, secret }) {
    const computer = Computer.findOne({
      extensionIdentifier: secret,
      status: ComputerStatus.RUNNING,
    });
    if (!computer) return;

    computer.setActualHistory(title, url);

    console.log(
      `Setting actualHistory for computer with location: ${computer.location}`
    );

    computer.save();
  },
});
