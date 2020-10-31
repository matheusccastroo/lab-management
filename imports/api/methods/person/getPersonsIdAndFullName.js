import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Person } from "../../models/person";

export const getPersonsIdAndFullName = new ValidatedMethod({
  name: "getPersonsIdAndFullName",
  validate: null,
  run({ personId, name }) {
    if (this.isSimulation) return;

    const persons = Person.find({ personId }).fetch();

    const filteredPersons = persons.filter((val) =>
      val.getFullName().includes(name)
    );

    return filteredPersons.map((currentVal) => {
      return {
        value: currentVal._id,
        label: currentVal.getFullName(),
      };
    });
  },
});
