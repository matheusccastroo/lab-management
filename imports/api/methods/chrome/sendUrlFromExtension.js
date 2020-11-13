import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Computer } from "../../models/computer";

export const sendUrlFromExtension = new ValidatedMethod({
  name: "sendUrlFromExtension",
  validate({ url, title, computerIdentifier }) {
    check(url, String);
    check(title, String);
    check(computerIdentifier, String);
  },
  run({ url, title, computerIdentifier }) {
    console.log("Chegou request pra insert do historico");
    console.log(computerIdentifier);
    console.log(title);
    console.log(url);

    const computer = Computer.find({ extensionIdentifier: computerIdentifier });
    if (!computer) return;

    computer.actualHistory = {
      title,
      url,
    };

    computer.save();
  },
});
