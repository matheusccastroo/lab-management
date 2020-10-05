import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { LoadingComponent } from "../components/LoadingComponent";

export const useSubscription = (
  subscriptionName,
  mongoCollection,
  parameters,
  fields
) => {
  return useTracker(() => {
    const handler = Meteor.subscribe(subscriptionName, {
      parameters,
      fields,
    });
    if (!handler.ready()) {
      return <LoadingComponent />;
    }
    return {
      dataFetched: mongoCollection.find({}).fetch(),
    };
  });
};
