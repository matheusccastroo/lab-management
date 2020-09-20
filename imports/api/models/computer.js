export default class Computer {
  constructor(document) {
    Object.assign(this, document);
  }

  getLastUsedBy() {
    import { PersonsCollection } from "../db/persons-collection";
    import moment from "moment";

    const lastPerson = PersonsCollection.find(this.personId);
    const date = moment(this.updatedAt);
    return {
      person: lastPerson,
      lastUsedAt: date,
    };
  }
}
