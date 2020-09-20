import { useTracker } from "meteor/react-meteor-data";

export const useLoggedInUser = () => {
  return useTracker(() => Meteor.user());
};
