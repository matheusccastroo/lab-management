import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Computer } from "../../models/computer";
import { Person } from "../../models/person";
import { ComputerStatus } from "../../models/enums";

export const bookUnbookComputer = new ValidatedMethod({
  name: "bookUnbookComputer",
  validate({ computerObject, personId, person }) {
    check(computerObject, Computer);
    if (personId) {
      check(personId, String);
    }
    if (person) {
      check(person, Person);
    }
  },
  run({ computerObject, personId, person }) {
    if (this.isSimulation) return;

    const isBooking = !computerObject.isActive();
    const currentPerson = isBooking ? Person.findOne(personId) : person;
    if (isBooking) {
      computerObject.setActive(personId);
      currentPerson.isUsingComputer = true;
      computerObject.lastBookedAt = new Date();
    } else {
      computerObject.setIdle();
      currentPerson.isUsingComputer = false;
    }

    try {
      currentPerson.save();
      computerObject.save();
    } catch (e) {
      console.log(
        `===== ERROR ${isBooking ? "BOOKING" : "UNBOOKING"} COMPUTER ${
          computerObject._id
        } TO PERSON ${personId} =====`
      );
      console.log(e.toString());
    }
  },
});
