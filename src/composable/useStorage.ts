import { returnValues } from "bemm/dist/useBemm";
import { reactive, computed, watch } from "vue";
import { resizeNow } from "../renderer";
import { TimeType } from "../types";
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
    size: number;
    separator: string;
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
    size: 16,
    separator: ":",
    showSeconds: true,
    showLabel: true,
    showAnalogClock: true,
    showDigitalClock: true,
  },
});

export const useStorage = () => {
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
    console.log(index);
    state.timezones.forEach((tz)=>{
        tz.type = index;
    })
  };
  const setSeparator = (value: string) => {
    state.settings.separator = value;
  };
  const toggleLabel = () => {
    state.settings.showLabel = !state.settings.showLabel;
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

  const settings = computed(() => {
    return state.settings;
  });

  const typeIndex = (label: string):number=>{
    let currentIndex = 0;
    state.timezones.forEach((tz, index) => {
      if (tz.label == label) currentIndex = index;
    });
    return currentIndex;
  }

  const changeType = (label: string) => {
    const currentIndex = typeIndex(label);
    const newTypeIndex = (state.timezones[currentIndex].type || 0) + 1;
    const newType = newTypeIndex > (Object.keys(TimeType).length - 1) ? 0 : newTypeIndex;
    state.timezones[currentIndex].type = newType;
  };

  // Timezone

  const setTimezone = (timezone: Partial<Timezone>) => {
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
      resizeNow()
    },
    { deep: true }
  );
  watch(
    () => state.settings,
    () => {
      saveStorage("SETTINGS", state.settings);
      resizeNow()
    },
    { deep: true }
  );

  return {
    settings,
    setFont,
    setSeparator,
    setSize,
    setType,
    toggleAnalogClock,
    toggleDigitalClock,
    toggleLabel,
    toggleSeconds,
    changeType,
    initStorage,
    setTimezone,
    removeTimezone,
    timezones,
  };
};
