import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

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

javascriptGenerator["sleep"] = (block) => {
  let value_millis = javascriptGenerator.valueToCode(
    block,
    "millis",
    javascriptGenerator.ORDER_ATOMIC
  );

  return `{\n${sleepFunction}await sleep(${value_millis});\n}\n`;
};
