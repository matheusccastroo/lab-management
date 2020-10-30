import { Enum } from "meteor/jagi:astronomy";

export const ComputerStatus = Enum.create({
  name: "ComputerStatus",
  identifiers: ["RUNNING", "IDLE"],
});
