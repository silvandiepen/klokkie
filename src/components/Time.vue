<script setup lang="ts">
import { onMounted, reactive, ref, PropType } from "vue";
import { useBemm } from "bemm";

import AnalogClock from "./AnalogClock.vue";
import DigitalClock from "./DigitalClock.vue";
import { Time, TimeType } from "../types";

import { useStorage } from "../composable/useStorage";

const props = defineProps({
  timezone: {
    type: String,
    default: "local",
  },
  label: {
    type: String,
    default: "local",
  },
  type: {
    type: String as PropType<TimeType>,
    default: "normal",
  },
});

const time = reactive<Time>({
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const selected = ref(false);
const { removeTimezone, settings, changeType } = useStorage();

const { bemm, classes } = useBemm("time");
// const label = ref("");

onMounted(() => {
  // label.value = `${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

  setInterval(() => {
    let date = new Date();
    if (props.timezone !== "local") {
      date = new Date(
        new Date().toLocaleString("en", { timeZone: props.timezone })
      );
    }
    // date.toLocaleString('en-US', { timezone: 'America/New_York'});
    time.hours = date.getHours();
    time.minutes = date.getMinutes();
    time.seconds = date.getSeconds();
  }, 1000);
});

const select = () => {
  selected.value = !selected.value;
};

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (selected.value && e.keyCode == 8) {
      e.preventDefault();
      removeTimezone({ label: props.label, value: props.timezone });
    }
    if (selected.value && e.keyCode == 32) {
      e.preventDefault();
      changeType(props.label);
    }
  });
});
</script>

<template>
  <div
    :class="classes('', selected ? { m: 'selected' } : '', { m: props.type })"
    @click="select"
  >
    <div :class="bemm('zone')" v-if="settings.showLabel">
      {{ label }} <slot></slot>
    </div>
    <div :class="bemm('clocks')">
      <AnalogClock
        v-if="settings.showAnalogClock"
        :class="bemm('analog')"
        :time="time"
      ></AnalogClock>
      <DigitalClock
        v-if="settings.showDigitalClock"
        :class="bemm('digital')"
        :time="time"
      ></DigitalClock>
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@300&display=swap");

body {
  font-family: "Sofia Sans";
}

.time {
  font-size: 1em;
  font-weight: bold;
  font-variant-numeric: tabular-nums;

  user-select: none;
  color: white;
  margin: 0;
  padding: 0;
  background-color: black;
  margin: 0;
  display: inline-block;
  padding: 1em;

  display: flex;
  flex-direction: column;
  gap: 0.5em;
  border-radius: 0;
  transition: border-radius 0.3s ease-in-out;

  &--normal {
    width: 100%;
    .time__zone {
      font-size: 1.25em;
    }
    .time__analog {
      font-size: 2em;
    }
    .time__digital {
      font-size: 2em;
    }
  }

  &--minimal {
    font-size: 1em;
    display: flex;
    flex-direction: row;
    width: 100%;
    .time__zone {
      font-size: 1em;
      white-space: nowrap;
    }
    .time__analog {
      color: white;
      margin: 0;
      font-size: 1em;
    }
    .time__digital {
      font-size: 1em;
    }
  }
  &--small {
    font-size: .85em;
    display: flex;
    flex-direction: row;
    width: 50%;
    .time__zone {
      font-size: 1em;
      white-space: nowrap;
    }
    .time__analog {
      color: white;
      margin: 0;
      font-size: 1em;
    }
    .time__digital {
      font-size: 1em;
    }
  }

  &--analog {
    flex-direction: column-reverse;
    width: 50%;
    display: inline-flex;
    .time__clocks {
      display: flex;
      align-items: center;
    }
    .time__clocks {
      align-items: center;
      justify-content: center;
    }
    .time__digital {
      font-size: 0.5em;
    }
    .time__analog {
      font-size: 3em;
    }
    .time__zone {
      font-size: 1em;
      text-align: center;
    }
    // flex-direction: row-reverse;
  }

  &--selected {
    @at-root {
      @keyframes jiggle {
        0%,
        50%,
        100% {
          transform: scale(0.95) rotate(0deg);
        }
        20%,
        60% {
          transform: scale(0.95) rotate(2deg);
        }
        40%,
        80% {
          transform: scale(0.95) rotate(-2deg);
        }
      }
    }
    border-radius: 0.5em;
    // box-shadow: 0 0 0 4px rgb(124, 9, 9) inset;
    animation: jiggle 2s ease-in-out infinite;
    opacity: 0.9;
  }

  & + & {
    margin-top: 1px;
  }

  &__zone {
    display: block;
    text-align: left;
    font-size: 0.5em;
    line-height: 1em;
  }

  &__clocks {
    display: flex;
    gap: 0.5em;
  }

  &__analog {
    font-size: 0.9em;
  }

  &__digital {
  }
}
</style>
