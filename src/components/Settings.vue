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
      <div class="setting">
        <label for="setting-separator">Separator</label>
        <input
          id="setting-separator"
          type="text"
          :value="settings.separator"
          @input="($event) => setSeparator(($event?.target as HTMLInputElement).value || '')"
        />
      </div>
      <div class="setting">
        <label for="setting-type">Type</label>
        <select @change="($event) => setType(($event?.target as HTMLInputElement).value as TimeType)">
          <option v-for="option in TimeType">{{ option }}</option>
        </select>
      </div>
      <div class="setting">
        <label for="setting-font">Font</label>
        <input
          id="setting-font"
          type="text"
          :value="settings.font"
          @change="($event) => setFont(($event?.target as HTMLInputElement).value || '')"
        />
      </div>
      <div class="setting" style="-webkit-app-region: no-drag">
        <label for="setting-size">Size</label>
        <input
          id="setting-font"
          type="range"
          min="10"
          max="30"
          step="1"
          :value="settings.size"
          @change="($event) => setSize(parseInt(($event?.target as HTMLInputElement).value) || 10)"
        />
        {{ settings.size }}
      </div>
      <div class="setting">
        <input
          id="setting-seconds"
          type="checkbox"
          v-model="settings.showSeconds"
          @input="() => toggleSeconds()"
        />
        <label for="setting-seconds">Show seconds</label>
      </div>
      <div class="setting">
        <input
          id="setting-label"
          type="checkbox"
          v-model="settings.showLabel"
          @input="() => toggleLabel()"
        />
        <label for="setting-label">Show Label</label>
      </div>
      <div class="setting">
        <input
          id="setting-analog"
          type="checkbox"
          v-model="settings.showAnalogClock"
          @input="() => toggleAnalogClock()"
        />
        <label for="setting-analog">Show Analog clock</label>
      </div>
      <div class="setting">
        <input
          id="setting-digital"
          type="checkbox"
          v-model="settings.showDigitalClock"
          @input="() => toggleDigitalClock()"
        />
        <label for="setting-digital">Show Digital clock</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStorage } from "../composable/useStorage";
import AddTimezone from "./AddTimezone.vue";

import { TimeType } from "../types";

const visible = ref(false);

const {
  settings,
  setSeparator,
  setFont,
  setSize,
  setType,
  toggleSeconds,
  toggleDigitalClock,
  toggleAnalogClock,
  toggleLabel,
} = useStorage();
</script>

<style lang="scss">
.settings {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

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
    margin: 1em;
    line-height: 1em;
    z-index: 5;
    opacity: 0.5;
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
  }
}
.setting {
  display: flex;
  gap: 1em;
  text-align: left;
  padding: 1em;
}
</style>
