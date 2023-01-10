import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

Blockly.defineBlocksWithJsonArray([
  {
    type: "change_text",
    message0: "ändere Text zu %1",
    args0: [
      {
        type: "input_value",
        name: "text",
        check: "String",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "change_color",
    message0: "ändere Hintergrundfarbe zu %1",
    args0: [
      {
        type: "field_colour",
        name: "color",
        colour: "#ff0000",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "click_event",
    message0: "sobald Feld angeklickt wird %1 %2",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "statement",
      },
    ],
    inputsInline: true,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "timestamp",
    message0: "Zeitstempel",
    output: "Number",
    colour: 65,
    tooltip: "Aktuelle Zeit in Millisekunden.",
    helpUrl: "",
  },
  {
    type: "timer",
    message0: "starte Timer mit %1 Millisekunden %2 %3",
    args0: [
      {
        type: "input_value",
        name: "millis",
        check: "Number",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "statement",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "clear_timers",
    message0: "lösche alle Timer",
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip: "",
    helpUrl: "",
  },
]);

javascriptGenerator["change_text"] = (block) => {
  let text = javascriptGenerator.valueToCode(
    block,
    "text",
    javascriptGenerator.ORDER_ATOMIC
  );

  return `document.getElementById("inputButton").innerText = ${text};\n`;
};

javascriptGenerator["change_color"] = (block) => {
  let color = block.getFieldValue("color");

  return `document.getElementById("inputButton").style.backgroundColor = "${color}";\n`;
};

javascriptGenerator["click_event"] = (block) => {
  let statement = javascriptGenerator.statementToCode(block, "statement");

  return `
    document.getElementById("inputButton").addEventListener("mousedown", async (event) => {
      ${statement}
    });\n`;
};

javascriptGenerator["timestamp"] = (_block) => {
  return ["Date.now()", javascriptGenerator.ORDER_NONE];
};

javascriptGenerator["timer"] = (block) => {
  let millis = javascriptGenerator.valueToCode(
    block,
    "millis",
    javascriptGenerator.ORDER_ATOMIC
  );
  let statement = javascriptGenerator.statementToCode(block, "statement");

  return `
    setTimeout(() => {
      ${statement}
    }, ${millis});
  `;
};

javascriptGenerator["clear_timers"] = (_block) => {
  // https://stackoverflow.com/questions/3141064/how-to-stop-all-timeouts-and-intervals-using-javascript
  return `
    let highestTimeoutId = setTimeout(() => {});
    for (let timeoutId = 0; timeoutId < highestTimeoutId; timeoutId++) {
      clearTimeout(timeoutId);
    }
  `;
};
