<template>
  <div :class="classes('', { m: settings.analogClockType })">
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
    <template v-if="settings.showTicks">
      <div :class="bemm('ticks')">
        <div :class="bemm('tick')" v-for="index in 12" :key="index"></div>
      </div>
      <div :class="bemm('ticks')">
        <div
          :class="bemm('tick-minute')"
          v-for="index in 60"
          :key="index"
        ></div>
      </div>
    </template>
    <template v-if="settings.showNumbers">
      <div :class="bemm('numbers')">
        <div
          :class="bemm('number')"
          v-for="index in 12"
          :key="index"
          :data-number="index"
        ></div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { useBemm } from "bemm";

//@ts-ignore
import { useState } from "../../data/useState";
import { Time, AnalogClockType } from "../types";

const { bemm, classes } = useBemm("analog-clock");

const { settings } = useState();

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

const hasTicks = computed(() => {
  return settings.value.showTicks;
});
const hasNumbers = computed(() => {
  return settings.value.showNumbers;
});
</script>

<style lang="scss">
.analog-clock {
  border-radius: 50%;
  width: 1em;
  height: 1em;
  border: 0.05em solid currentColor;
  position: relative;
  min-width: 1em;

  opacity: 0.25;

  &__hand {
    width: 0.05em;
    height: 0.5em;
    display: block;
    position: absolute;
    bottom: 50%;
    left: 50%;

    transform: translateX(-50%) rotate(var(--rotate, 0deg));

    transform-origin: 50% 100%;
    z-index: 2;
    &::before {
      background-color: currentColor;
      content: "";
      display: block;
      width: 0.075em;
      height: 0.075em;
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      transform: translate(-25%, 50%);
    }

    &--hour {
      background-color: currentColor;
      height: 0.25em;
    }

    &--minute {
      background-color: currentColor;
      height: 0.4em;
    }

    &--second {
      // border-radius: 50% / 50% 0 0;
      height: 0.45em;
      background-color: currentColor;
      width: 0.025em;
    }
  }
  &__numbers {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(180deg);
  }
  &__number {
    position: absolute;
    bottom: 50%;
    left: 50%;
    height: 0.1em;
    width: 0.02em;
    background-color: transparent;
    transform-origin: 50% 100%;
    &::before {
      display: block;
      content: attr(data-number);
      font-size: 0.1em;
      text-align: center;
      width: 1em;
    }
    @for $i from 1 through 12 {
      &:nth-child(#{$i}) {
        transform: translateX(-50%)
          rotate(calc((360deg / 12) * #{$i}))
          translateY(475%);
        &::before {
          transform: translateY(var(--number-offset, 0%))
            translateX(-50%)
            rotate(calc(((-360deg / 12) * #{$i}) + 180deg));
        }
      }
    }
  }
  &__ticks {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(180deg);
    & + .analog-clock__numbers {
      --number-offset: -100%;
    }
  }

  &__tick {
    position: absolute;
    bottom: 50%;
    left: 50%;
    height: 0.1em;
    width: 0.02em;
    background-color: currentColor;
    transform-origin: 50% 100%;
    @for $i from 1 through 12 {
      &:nth-child(#{$i}) {
        transform: translateX(-50%)
          rotate(calc((360deg / 12) * #{$i}))
          translateY(475%);
      }
    }
  }
  &__tick-minute {
    position: absolute;
    bottom: 50%;
    left: 50%;
    height: 0.05em;
    width: 0.01em;
    background-color: currentColor;
    transform-origin: 50% 100%;
    @for $i from 1 through 60 {
      &:nth-child(#{$i}) {
        transform: translateX(-50%)
          rotate(calc((360deg / 60) * #{$i}))
          translateY(950%);
      }
    }
  }
  &--minimal {
    --number-offset: -50%;
      .analog-clock__ticks{   
      & + .analog-clock__numbers{
        --number-offset: -125%;
      }
    }
  }
  &--normal {
    opacity: 1;
    background-color: white;
    color: black;
    border-color: transparent;
    .analog-clock__hand {
      background-color: black;
    }
  }
}
</style>
