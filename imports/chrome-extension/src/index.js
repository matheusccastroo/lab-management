import simpleDDP from "simpleddp"; // ES6
import ws from "isomorphic-ws";

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (tab.status === "complete") {
    let opts = {
      endpoint: "ws://localhost:3000/websocket",
      SocketConstructor: ws,
      reconnectInterval: 5000,
    };
    const server = new simpleDDP(opts);
    await server.connect();
    const { title, url } = tab;
    await server.call("sendUrlFromExtension", { url, title });
    console.log("DOne!");
  }
});
