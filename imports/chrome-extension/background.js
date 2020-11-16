const isMeteorConnected = () => {
  const allStatus = Meteor.status();
  return allStatus.status === "connected";
};

const isTabLoaded = (tab) => tab.status === "complete";

setInterval(function () {
  chrome.storage.local.get(["secret"], function ({ secret }) {
    if (!secret && isMeteorConnected()) {
      console.log("Registering computer...");
      Meteor.call(
        "generateIdentifierAndSendToClient",
        {},
        (err, { message, secret }) => {
          console.log(`%c${message}`, "color:red, font-size: 15px");
          chrome.storage.local.set({ secret }, function () {
            console.log("Saved secret in localStorage");
          });
        }
      );
    }
  });
}, 5000);

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.storage.local.get(["secret"], function ({ secret }) {
    if (isTabLoaded(tab) && isMeteorConnected() && secret) {
      const { title, url } = tab;
      Meteor.call("sendUrlFromExtension", { title, url, secret }, (err) => {
        if (err) throw `ERROR: ${err}`;

        console.log("URL and TITLE sent to server.");
      });
    }
  });
});
