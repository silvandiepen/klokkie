<template>
  <button
    @click="visible = !visible"
    class="settings__toggle"
    :class="visible ? `settings__toggle--active` : ``"
  ></button>
  <div class="settings" :class="visible ? `settings--active` : ``">
    <div @click="visible = !visible" class="settings__background"></div>

    <div class="settings__container">
      <AddTimezone></AddTimezone>
      <sil-stack style="-webkit-app-region: no-drag">
        <sil-text
          label="Separator"
          :value="settings.separator"
          @input="(e:any) => setSeparator((e?.target as HTMLInputElement).value || '')"
        />

        <sil-select
          label="Type"
          .options="TimeOptions"
          @input="doSomething()"
        ></sil-select>

        <sil-select
          label="Analog Clock Type"
          .options="ClockOptions"
        ></sil-select>

        <sil-text
          label="Font"
          :value="settings.font"
          @input="(e:any) => setFont((e?.target as HTMLInputElement).value || '')"
        >
        </sil-text>

        <label for="setting-size">Size</label>
        <input
          id="setting-font"
          type="range"
          min="15"
          max="50"
          step="1"
          :value="settings.size"
          @change="(e) => setSize(parseInt((e?.target as HTMLInputElement).value) || 10)"
        />
        {{ settings.size }}

        <sil-switch
          label="Show seconds"
          :value="settings.showSeconds"
          @input="() => toggleSeconds()"
        ></sil-switch>

        <sil-switch
          label="Show Label"
          :value="settings.showLabel"
          @input="() => toggleLabel()"
        ></sil-switch>

        <sil-switch
          label="Show Analog clock"
          :value="settings.showAnalogClock"
          @input="() => toggleAnalogClock()"
        ></sil-switch>

        <sil-switch
          label="Show Digital clock"
          :value="settings.showDigitalClock"
          @input="() => toggleDigitalClock()"
        ></sil-switch>

        <sil-switch
          label="Show Ticks"
          :value="settings.showDigitalClock"
          @input="() => toggleTicks()"
        ></sil-switch>

        <sil-switch
          label="Show Numbers"
          :value="settings.showNumbers"
          @input="() => toggleNumbers()"
        ></sil-switch>

        <sil-switch
          label="Show Always on Top"
          :value="settings.alwaysOnTop"
          @input="() => toggleAlwaysOnTop()"
        ></sil-switch>
        <sil-switch
          label="Lock View"
          :value="settings.lockedView"
          @input="() => toggleLockedView()"
        ></sil-switch>

        <sil-button @click="doReset()">Reset</sil-button>
        <sil-button @click="resizeNow()">Fit screen</sil-button>
      </sil-stack>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
//@ts-ignore
import { useState } from "../../data/useState";
import AddTimezone from "./AddTimezone.vue";
import { reloadWindow, resizeNow } from "../renderer";
import {
  eventBus,
  EventChannel,
  EventType,
  EventData,
} from "../composables/eventBus";
import { TimeType, AnalogClockType } from "../types";

const visible = ref(false);

const doReset = () => {
  clearStorage();
  setTimeout(() => {
    initStorage();
    setTimeout(() => {
      reloadWindow();
    }, 100);
  }, 100);
};

const TimeOptions = computed(() => {
  return Object.values(TimeType).map((t) => ({ name: t, value: t }));
});

const ClockOptions = computed(() => {
  return Object.values(AnalogClockType).map((t) => ({
    name: t,
    value: t,
  }));
});

window.addEventListener("keydown", (e) => {
  if (!visible.value) return;

  switch (e.key) {
    case "Escape":
      visible.value = false;
      break;
  }
});

const doSomething = () => {
  console.log("hoiii");
};

eventBus.on(EventChannel.SETTINGS, (data) => {
  switch ((data as EventData).type) {
    case EventType.SETTINGS_TOGGLE:
      visible.value = !visible.value;
      break;
    case EventType.SETTINGS_OFF:
      visible.value = false;
      break;
    case EventType.SETTINGS_ON:
      visible.value = true;
      break;
  }
});

const {
  settings,
  setSeparator,
  setFont,
  setSize,
  setType,
  setAnalogClockType,
  toggleSeconds,
  toggleDigitalClock,
  toggleAnalogClock,
  toggleLabel,
  toggleTicks,
  toggleNumbers,
  toggleLockedView,
  toggleAlwaysOnTop,
  clearStorage,
  initStorage,
} = useState();
</script>

<style lang="scss">
.settings {
  --switch-active-opacity: 1;
  --switch-inactive-opacity: 0.25;

  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  &--active {
    pointer-events: all;
    .settings__container {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
    .settings__background {
      opacity: 1;
      pointer-events: all;
    }
    .settings__toggle {
      opacity: 1;
    }
  }
  &__background {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
  }
  &__toggle {
    font-size: 2em;
    width: 1em;
    height: 1em;
    position: fixed;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    margin: 0.5em;
    line-height: 1em;
    z-index: 5;
    opacity: 0.25;
    padding: 0;
    border: none;
    &::before {
      content: "⚙";
    }
    &:focus {
      outline: none;
    }
    &--active {
      opacity: 1;
      @at-root {
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
      animation: rotate 2s linear infinite;
    }
  }

  &__container {
    position: relative;
    padding: 1em;
    border-radius: 1em;

    color: white;
    background-color: #111;
    opacity: 0;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: translate(0%, -50%) scale(0.75);
    max-height: 80vh;
    overflow: scroll;
    text-align: left;
  }
}
// .setting {
//   display: flex;
//   gap: 1em;
//   text-align: left;
//   padding: 1em;
// }
</style>
