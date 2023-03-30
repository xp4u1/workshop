import { io } from "socket.io-client";
import { removeAllListeners } from "./lib/utils";

const socket = io();

const displayError = (message) => {
  document.getElementById("errorLabel").style.display = "unset";
  document.getElementById("errorLabel").innerText = message;
};

document.getElementById("connectForm").addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit(
    "join_room",
    document.getElementById("roomInput").value,
    (status) => {
      console.debug(`join: status=${status}`);

      switch (status) {
        case 200:
          document.getElementById("connectForm").style.display = "none";
          document.getElementById("title").innerText =
            "Du hast noch keinen Code ausgeführt.";
          break;
        case 404:
          displayError("Der Raum konnte nicht gefunden werden.");
          break;
        default:
          displayError("Beim Verbinden ist ein Fehler aufgetreten.");
          break;
      }
    }
  );
});

socket.on("payload", ({ appId, code }) => {
  console.debug("Received a payload.");

  document.getElementById("connect").style.display = "none";
  document
    .querySelectorAll("section[data-app]")
    .forEach((element) => (element.style.display = "none"));
  document.querySelector(`section[data-app=${appId}]`).style.display = "unset";

  removeAllListeners();
  eval(`(async function(){\n${code}\n})()`)
    .catch((error) => {
      console.error("Cannot execute the code.");
      console.error(error);
    })
    .finally(() => {
      console.debug("Executed code.");
    });
});
