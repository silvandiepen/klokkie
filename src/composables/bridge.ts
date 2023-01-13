import { ipcRenderer } from "electron";

//@ts-ignore
import { useState } from "../../data/useState";
//@ts-ignore
import { menuEvents } from "../../data/menu";
import { eventBus, EventChannel, EventType, EventData } from "./eventBus";

const {
  toggleAlwaysOnTop,
  toggleAnalogClock,
  toggleDigitalClock,
  toggleLabel,
  toggleNumbers,
  toggleSeconds,
  toggleTicks,
  setTimezone,
} = useState();

export const loadBridge = () => {
  ipcRenderer.on(menuEvents.TOGGLE_SECONDS, (_e, _a) => toggleSeconds());
  ipcRenderer.on(menuEvents.TOGGLE_ALWAYS_ON_TOP, (_e, _a) =>
    toggleAlwaysOnTop()
  );
  ipcRenderer.on(menuEvents.TOGGLE_ANALOG_CLOCK, (_e, _a) =>
    toggleAnalogClock()
  );
  ipcRenderer.on(menuEvents.TOGGLE_DIGITAL_CLOCK, (_e, _a) =>
    toggleDigitalClock()
  );
  ipcRenderer.on(menuEvents.TOGGLE_LABEL, (_e, _a) => toggleLabel());
  ipcRenderer.on(menuEvents.TOGGLE_NUMBERS, (_e, _a) => toggleNumbers());
  ipcRenderer.on(menuEvents.TOGGLE_TICKS, (_e, _a) => toggleTicks());
  ipcRenderer.on(menuEvents.ADD_TIMEZONE, (_e, data) => {
    setTimezone(data);
  });
  ipcRenderer.on(menuEvents.TOGGLE_SETTINGS, (_e, _a) => {
    eventBus.emit(EventChannel.SETTINGS, {
      type: EventType.SETTINGS_TOGGLE,
    });
  });
};
