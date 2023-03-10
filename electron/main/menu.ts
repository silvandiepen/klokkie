import { app, Menu, MenuItemConstructorOptions } from "electron";

import { useState } from "../../data/useState";
import { continents, simpleTimezones } from "../../data/timezones";
import { menuEvents } from "../../data/menu";

const { isActiveTimezone, isActiveSetting } = useState();

const timezoneSubmenu: MenuItemConstructorOptions[] = [];

continents().forEach((c) => {
  const continent: MenuItemConstructorOptions = {
    label: c.label,
    submenu: simpleTimezones()
      .filter((z) => z.continent == c.label)
      .map((t) => ({
        label: t.label,
        type: "checkbox",
        checked: isActiveTimezone(t.label),
        click() {
          app.emit(menuEvents.ADD_TIMEZONE, { label: t.label, value: t.value });
        },
      }))
      .sort((a, b) =>
        a.label > b.label ? 1 : b.label > a.label ? -1 : 0
      ) as MenuItemConstructorOptions[],
  };

  timezoneSubmenu.push(continent);
});

const developSubmenu: MenuItemConstructorOptions[] = [
  {
    label: "Open Devtools",
    click() {
      app.emit(menuEvents.OPEN_DEVTOOLS, {});
    },
  },
  {
    label: "Close Devtools",
    click() {
      app.emit(menuEvents.CLOSE_DEVTOOLS, {});
    },
  },
];
const toggleSubmenu: MenuItemConstructorOptions[] = [
  {
    label: "Seconds",
    type: "checkbox",
    checked: isActiveSetting("showSeconds"),
    click() {
      app.emit(menuEvents.TOGGLE_SECONDS, {});
    },
  },
  {
    label: "Digital Clock",
    type: "checkbox",
    checked: isActiveSetting("showDigitalClock"),
    click() {
      app.emit(menuEvents.TOGGLE_DIGITAL_CLOCK, {});
    },
  },
  {
    label: "Label / Zone",
    type: "checkbox",
    checked: isActiveSetting("showLabel"),
    click() {
      app.emit(menuEvents.TOGGLE_LABEL, {});
    },
  },
  {
    label: "Analog Clock",
    type: "checkbox",
    checked: isActiveSetting("showAnalogClock"),
    click() {
      app.emit(menuEvents.TOGGLE_ANALOG_CLOCK, {});
    },
  },
  {
    label: "Analog Clock - Numbers",
    type: "checkbox",
    checked: isActiveSetting("showNumbers"),
    click() {
      app.emit(menuEvents.TOGGLE_NUMBERS, {});
    },
  },
  {
    label: "Analog Clock - Ticks",
    type: "checkbox",
    checked: isActiveSetting("showTicks"),
    click() {
      app.emit(menuEvents.TOGGLE_TICKS, {});
    },
  },
{
  label: "Toggle Settings",
  click() {
    app.emit(menuEvents.TOGGLE_SETTINGS, {});
  },
}
];

export const createMenu = () => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: "Filter",
      submenu: [
        {
          label: "Hello",
          accelerator: "Shift+CmdOrCtrl+H",
          click() {
            console.log("Oh, hi there!");
          },
        },
      ],
    },
    {
      label: "Timezones",
      submenu: timezoneSubmenu,
    },
    {
      label: "Settings",
      submenu: toggleSubmenu,
    },
  ];

  if (process.env.VITE_DEV_SERVER_URL) {
    template.push({
      label: "Develop",
      submenu: developSubmenu,
    });
  }
  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
};
