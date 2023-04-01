import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

import De from "blockly/msg/de";
Blockly.setLocale(De);
Blockly.Msg["MATH_RANDOM_INT_TITLE"] = "Zufallszahl zwischen %1 und %2";

import { getCookies, logMessage, removeAllListeners } from "./lib/utils";
import { createRoom, socket } from "./lib/remote";

const newRoom = () => {
  createRoom().then(({ id, secret }) => {
    document.cookie = `room=${id};max-age=86400`;
    document.cookie = `secret=${secret};max-age=86400`;

    logMessage(`Für dich wurde der Raum ${id} erstellt.`);
  });
};

const sendCode = (code) => {
  const cookies = getCookies();
  socket.emit(
    "send_app",
    {
      content: {
        appId: document.body.getAttribute("data-app"),
        code: code,
      },
      room: cookies.get("room"),
      secret: cookies.get("secret"),
    },
    (error) => {
      if (error) {
        console.error(`Cannot send code (${error}). Creating new room...`);

        newRoom();
        setTimeout(() => {
          // Try again.
          sendCode(code);
        }, 1000);
      } else {
        logMessage(`Code wurde an den Raum ${cookies.get("room")} verschickt.`);
      }
    }
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const workspace = Blockly.inject("blocklyDiv", {
    toolbox: document.getElementById("toolbox"),
    collapse: true,
    comments: true,
    disable: true,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: "start",
    css: true,
    media: "media/",
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true,
    grid: {
      spacing: 20,
      length: 1,
      colour: "#888",
      snap: true,
    },
  });

  const cookies = getCookies();
  if (!cookies.has("room") || !cookies.has("secret")) {
    newRoom();
  } else {
    logMessage(`Du bist mit Raum ${cookies.get("room")} verbunden.`);
  }

  try {
    Blockly.serialization.workspaces.load(
      JSON.parse(localStorage.getItem(document.title)),
      workspace
    );
  } catch {
    // Ignore.
  }

  document.getElementById("saveButton").addEventListener("click", () => {
    localStorage.setItem(
      document.title,
      JSON.stringify(Blockly.serialization.workspaces.save(workspace))
    );
    logMessage("Deine Blöcke wurden gespeichert.");
  });

  const executeButton = document.getElementById("executeButton");
  executeButton.addEventListener("click", () => {
    window.LoopTrap = 1000;
    javascriptGenerator.INFINITE_LOOP_TRAP =
      'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

    const code = javascriptGenerator.workspaceToCode(workspace);

    document.getElementById("errorMessage").classList.add("hidden");
    executeButton.classList.add("disabled");
    executeButton.disabled = true;

    removeAllListeners();
    document.getElementById("console").innerHTML = "";

    if (code.includes("addEventListener")) {
      logMessage("Die Events wurden aktualisiert.", "interpreter");
    } else {
      logMessage("Code wird ausgeführt.", "interpreter");
    }

    if (socket.connected) {
      sendCode(code);
    }

    try {
      eval(`(async function(){\n${code}\n})()`)
        .catch((error) => {
          logMessage("Es ist ein Fehler beim Ausführen aufgetreten.", "error");
          console.error(error);
        })
        .finally(() => {
          executeButton.classList.remove("disabled");
          executeButton.disabled = false;
        });
    } catch {
      logMessage("Es ist ein Fehler beim Ausführen aufgetreten.", "error");
    }
  });
});
