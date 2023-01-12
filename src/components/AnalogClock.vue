<template>
  <div :class="bemm()">
    <span
      :class="classes({ e: 'hand' }, { e: 'hand', m: 'hour' })"
      :style="`--rotate:  ${(360 / 12) * time.hours}deg`"
    ></span>
    <span
      :class="classes({ e: 'hand' }, { e: 'hand', m: 'minute' })"
      :style="`--rotate:  ${(360 / 60) * time.minutes}deg`"
    ></span>
    <span
      :class="classes({ e: 'hand' }, { e: 'hand', m: 'second' })"
      :style="`--rotate: ${(360 / 60) * time.seconds}deg`"
    ></span>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { useBemm } from "bemm";

import { Time } from "../types";

const { bemm, classes } = useBemm("analog-clock");

const props = defineProps({
  time: {
    type: Object as PropType<Time>,
    default: () =>
      ({
        hours: 0,
        minutes: 0,
        seconds: 0,
      } as Time),
  },
});
</script>

<style lang="scss">
.analog-clock {
  border-radius: 50%;
  width: 1em;
  height: 1em;
  border: 0.05em solid currentColor;
  position: relative;

opacity: .25;

  &__hand {
    width: 0.05em;
    height: 0.5em;
    background-color: currentColor;
    display: block;
    position: absolute;
    bottom: 50%;
    left: 50%;

    transform: translateX(-50%) rotate(var(--rotate, 0deg));

    transform-origin: 50% 100%;

    &--hour {
      height: 0.25em;
    }

    &--minute {
      height: 0.4em;
    }

    &--second {
      height: 0.45em;
      background-color: currentColor;
      width: 0.025em;
    }
  }
}
</style>
