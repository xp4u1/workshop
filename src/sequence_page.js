import * as Blockly from "blockly";

import De from "blockly/msg/de";
Blockly.setLocale(De);

const toolbox = document.getElementById("toolbox");
const options = {
  toolbox: toolbox,
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
};

const lang = "JavaScript";

const removeAllListeners = () => {
  document.querySelectorAll(".squareButton").forEach((element) => {
    let clone = element.cloneNode(true);
    element.replaceWith(clone);
  });
};

const logMessage = (message, type = "info") => {
  let element = document.createElement("p");
  element.innerText = message;
  element.className = type;

  document.getElementById("console").appendChild(element);
};

document.addEventListener("DOMContentLoaded", () => {
  const workspace = Blockly.inject("blocklyDiv", options);

  try {
    Blockly.serialization.workspaces.load(
      JSON.parse(localStorage.getItem("workspace")),
      workspace
    );
  } catch {
    console.warn("Workspace konnte nicht geladen werden.");
    // localStorage.removeItem("workspace");
  }

  document.getElementById("saveButton").addEventListener("click", () => {
    localStorage.setItem(
      "workspace",
      JSON.stringify(Blockly.serialization.workspaces.save(workspace))
    );
    logMessage("Deine Blöcke wurden gespeichert.");
  });

  const executeButton = document.getElementById("executeButton");

  executeButton.addEventListener("click", () => {
    window.LoopTrap = 1000;
    Blockly[lang].INFINITE_LOOP_TRAP =
      'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

    const code = Blockly[lang].workspaceToCode(workspace);

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
