<template>
  <div :class="bemm()" :style="`--separator: '${settings.separator}''`">
    <span :class="classes({ e: 'part' }, { e: 'part', m: 'hours' })">{{
      pad(time.hours)
    }}</span>
    <span :class="classes({ e: 'part' }, { e: 'part', m: 'minutes' })">{{
      pad(time.minutes)
    }}</span>
    <span v-if="settings.showSeconds" :class="classes({ e: 'part' }, { e: 'part', m: 'seconds' })">{{
      pad(time.seconds)
    }}</span>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { useBemm } from "bemm";
import { Time } from "../types";
//@ts-ignore
import { useState } from "../../data/useState";

const { bemm, classes } = useBemm("digital-clock");
const { settings } = useState();

const pad = (number: number, size = 2): string => {
  const l: number = `${number}`.length;
  const repeat = (str: string, times = 1) => {
    const newStr = [];
    for (let i = 0; i < times; i++) {
      newStr.push(str);
    }
    return newStr.join("");
  };
  if (l < size) return `${repeat(`0`, size - l)}${number}`;
  return `${number}`;
};

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
.digital-clock {
  display: flex;

  &__part {
    display: block;
    line-height: 1em;
    display: flex;

    & + & {
      &::before {
        line-height: 1em;
        // content: "\00a0";
        content: var(--separator);
        height: 1em;
        display: block;
        // margin: 0 -.1em;
        top: -0.05em;
        position: relative;
      }
    }

    &--seconds {
      opacity: 0.25;
    }
  }
}
</style>
