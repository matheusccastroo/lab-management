import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername("admin")) {
    Accounts.createUser({
      username: "admin",
      password: "admin",
    });
  }
});
