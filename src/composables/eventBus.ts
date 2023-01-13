import mitt from "mitt";

export enum EventChannel {
  KEYS = "keys",
  SETTINGS = "settings",
}

export enum EventType {
  KEYS_PRESS = "keys:press",
  SETTINGS_TOGGLE = "settings:toggle",
  SETTINGS_ON = "settings:on",
  SETTINGS_OFF = "settings:off",
}

export interface EventData {
  type: EventType;
  value: any;
}

export const eventBus = mitt();