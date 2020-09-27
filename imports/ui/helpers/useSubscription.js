import React from "react";
import { Spin } from "antd";
import { useTracker } from "meteor/react-meteor-data";

const divSpinStyle = {
  padding: "24px",
  minHeight: "360px",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};

export const useSubscription = (subscriptionName, mongoCollection, fields) => {
  return useTracker(() => {
    const handler = Meteor.subscribe(subscriptionName);
    if (!handler.ready()) {
      return (
        <div style={divSpinStyle}>
          <Spin tip="Loading..." />
        </div>
      );
    }
    return {
      dataFetched: mongoCollection.find({}, fields).fetch(),
    };
  });
};
