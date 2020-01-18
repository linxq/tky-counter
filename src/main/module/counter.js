const { ipcMain } = require("electron");

import { oneTimeCounter, counterFIncrease } from "./temperatureUp";

global.abc = 100;
ipcMain.on("main:temperatureUp", (event, arg) => {
  console.log(123123123, arg);
  try {
    arg.oneTimeCounter = oneTimeCounter;
    counterFIncrease.apply(arg);
    event.sender.send("render:temperatureUp", arg);
  } catch (e) {
    console.log(e);
  }
});
