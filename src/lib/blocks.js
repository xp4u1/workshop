import * as Blockly from "blockly";

import { sleepFunction } from "./code";

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
]);

Blockly.JavaScript["sleep"] = (block) => {
  let value_millis = Blockly.JavaScript.valueToCode(
    block,
    "millis",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  return `{\n${sleepFunction}await sleep(${value_millis});\n}\n`;
};
