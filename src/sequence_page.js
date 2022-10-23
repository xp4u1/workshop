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

document.addEventListener("DOMContentLoaded", () => {
  const workspace = Blockly.inject("blocklyDiv", options);

  document.getElementById("compileButton").addEventListener("click", () => {
    const code = Blockly[lang].workspaceToCode(workspace);
    console.log(code);
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

    try {
      eval(`(async function(){\n${code}\n})()`)
        .catch((error) => {
          document.getElementById("errorMessage").classList.remove("hidden");
          console.error(error);
        })
        .finally(() => {
          executeButton.classList.remove("disabled");
          executeButton.disabled = false;
        });
    } catch {
      document.getElementById("errorMessage").classList.remove("hidden");
      console.error(error);
    }
  });
});
