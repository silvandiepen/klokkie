import { reactive, computed, watch } from "vue";
//@ts-ignore
import { resizeNow, setOnTop } from "../src/renderer";
//@ts-ignore
import { TimeType, AnalogClockType } from "../src/types";
const KEY = "KLOKKIE";

interface Timezone {
  label: string;
  value: string;
  type: number;
}

interface State {
  timezones: Timezone[];
  settings: {
    font: string;
    type: TimeType;
    analogClockType: AnalogClockType;
    size: number;
    separator: string;
    alwaysOnTop: boolean;
    showTicks: boolean;
    showNumbers: boolean;
    showSeconds: boolean;
    showLabel: boolean;
    showAnalogClock: boolean;
    showDigitalClock: boolean;
  };
}

const state = reactive<State>({
  timezones: [],
  settings: {
    font: "",
    type: TimeType.normal,
    analogClockType: AnalogClockType.minimal,
    size: 16,
    separator: ":",
    alwaysOnTop: false,
    showTicks: false,
    showNumbers: false,
    showSeconds: true,
    showLabel: true,
    showAnalogClock: true,
    showDigitalClock: true,
  },
});

export const useState = () => {
  // Settings

  const setFont = (value: string) => {
    state.settings.font = value;
  };
  const setSize = (value: number) => {
    state.settings.size = value;
  };
  const setType = (value: TimeType) => {
    state.settings.type = value;

    const index = typeIndex(value);
    state.timezones.forEach((tz) => {
      tz.type = index;
    });
  };

  const setAnalogClockType = (value: AnalogClockType) => {
    state.settings.analogClockType = value;
  };
  const setSeparator = (value: string) => {
    state.settings.separator = value;
  };
  const toggleLabel = () => {
    state.settings.showLabel = !state.settings.showLabel;
  };
  const toggleTicks = () => {
    state.settings.showTicks = !state.settings.showTicks;
  };
  const toggleNumbers = () => {
    state.settings.showNumbers = !state.settings.showNumbers;
  };
  const toggleSeconds = () => {
    state.settings.showSeconds = !state.settings.showSeconds;
  };
  const toggleAnalogClock = () => {
    state.settings.showAnalogClock = !state.settings.showAnalogClock;
  };
  const toggleDigitalClock = () => {
    state.settings.showDigitalClock = !state.settings.showDigitalClock;
  };
  const toggleAlwaysOnTop = () => {
    state.settings.alwaysOnTop = !state.settings.alwaysOnTop;

    setOnTop(state.settings.alwaysOnTop);
  };

const isActiveSetting = (setting:string):boolean=>{
  return state.settings[setting];
}

  const settings = computed(() => {
    return state.settings;
  });

  const typeIndex = (label: string): number => {
    let currentIndex = 0;
    state.timezones.forEach((tz, index) => {
      if (tz.label == label) currentIndex = index;
    });
    return currentIndex;
  };

  const changeType = (label: string | null) => {
    const currentIndex = label ? typeIndex(label) : 0;
    const newTypeIndex = (state.timezones[currentIndex].type || 0) + 1;
    const newType =
      newTypeIndex > Object.keys(TimeType).length - 1 ? 0 : newTypeIndex;
    state.timezones[currentIndex].type = newType;
  };

  // Timezone

  const setTimezone = (timezone: Partial<Timezone>) => {
    console.log(timezone);
    state.timezones.push({
      label: timezone.label || "",
      value: timezone.value || "",
      type: 0,
    });
  };

  const removeTimezone = (timezone: Partial<Timezone>) => {
    state.timezones = state.timezones.filter(
      (tz) => tz.value !== timezone.value
    );
  };
  const isActiveTimezone = (timezoneLabel: string):boolean => {
    return !!state.timezones.find((tz) => {
      tz.label == timezoneLabel;
    });
  };
  const timezones = computed(() => {
    return state.timezones;
  });

  //  Lock and Load!
  const Vault = ["TIMEZONES", "SETTINGS"] as const;
  type Vault = typeof Vault[keyof typeof Vault];

  const initStorage = () => {
    Vault.forEach((v) => {
      loadStorage(v);
    });
  };

  const clearStorage = () => {
    Vault.forEach((v) => {
      const store = `${KEY}_${v}`;
      localStorage.removeItem(store);
      console.log(`CLEAR STORAGE ::: ${store}`);
    });
  };

  const loadStorage = (vault: Vault) => {
    const store = `${KEY}_${vault}`;
    console.log(`LOAD STORAGE ::: ${store}`);
    if (localStorage.getItem(store)) {
      const data = JSON.parse(localStorage.getItem(store) || "{}");
      switch (vault) {
        case "SETTINGS":
          state.settings = data;
          break;
        case "TIMEZONES":
          state.timezones = data;
          break;
      }
    }
  };

  const saveStorage = (vault: Vault, data: Object) => {
    const store = `${KEY}_${vault}`;
    console.log(`SAVE STORAGE ::: ${store}`);
    localStorage.setItem(store, JSON.stringify(data));
  };

  watch(
    () => state.timezones,
    () => {
      saveStorage("TIMEZONES", state.timezones);
      resizeNow();
    },
    { deep: true }
  );
  watch(
    () => state.settings,
    () => {
      saveStorage("SETTINGS", state.settings);
      resizeNow();
    },
    { deep: true }
  );

  return {
    settings,
    setFont,
    setSeparator,
    setSize,
    setType,
    setAnalogClockType,
    toggleAnalogClock,
    toggleDigitalClock,
    toggleLabel,
    toggleSeconds,
    toggleTicks,
    toggleNumbers,
    toggleAlwaysOnTop,
    changeType,
    initStorage,
    setTimezone,
    removeTimezone,
    timezones,
    isActiveTimezone,isActiveSetting,
    clearStorage,
  };
};
