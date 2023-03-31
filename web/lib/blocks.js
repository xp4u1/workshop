import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

import { log, sleepFunction } from "./code";

Blockly.defineBlocksWithJsonArray([
  {
    type: "sleep",
    message0: "warte %1 Millisekunden",
    args0: [
      {
        type: "input_value",
        name: "millis",
        check: "Number",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "result",
    message0: "zeige Ergebnis: %1",
    args0: [
      {
        type: "field_dropdown",
        name: "type",
        options: [
          ["richtig", "correct"],
          ["falsch", "incorrect"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
]);

javascriptGenerator["sleep"] = (block) => {
  let value_millis = javascriptGenerator.valueToCode(
    block,
    "millis",
    javascriptGenerator.ORDER_ATOMIC
  );

  return `{\n${sleepFunction}await sleep(${value_millis});\n}\n`;
};

javascriptGenerator["result"] = (block) => {
  let dropdown = block.getFieldValue("type");

  return `{
    ${sleepFunction}
    ${log(dropdown === "correct" ? "'Richtig!'" : "'Falsch!'")}
    document.getElementById("inputField").classList.add("${dropdown}");
    await sleep(200);
    document.getElementById("inputField").classList.remove("${dropdown}");
  }\n`;
};
