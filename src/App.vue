<script setup lang="ts">
import Time from "./components/Time.vue";
import Settings from "./components/Settings.vue";
//@ts-ignore
import { useState } from "../data/useState";

import { TimeType } from "./types";
import { loadBridge } from "./composable/bridge";

const { initStorage, timezones, settings } = useState();

const getType = (typeIndex: number): TimeType => {
  let type = "";
  Object.values(TimeType).forEach((key, index) => {
    if (index == typeIndex) {
      type = key;
    }
  });

  return type as TimeType;
};

initStorage();
loadBridge();
</script>

<template>
  <div class="container" id="container" :style="`--size: ${settings.size}px`">
    <Time v-if="timezones.length == 0" label=""></Time>
    <Time
      v-for="(timezone, idx) in timezones"
      :timezone="timezone.value"
      :key="idx"
      :label="timezone.label"
      :type="getType(timezone.type)"
    ></Time>
  </div>
  <Settings></Settings>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  background-color: #333;
  display: flex;
  width: 100%;
  height: 100%;
}
body {
  /* border: 1px solid yellow; */
}
html {
  /* width: 500px;   */
  /* border: 1px solid rebeccapurple; */
}
.container {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  font-size: var(--size, 16px);
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  min-width: 100%;
}

* {
  box-sizing: border-box;
}
</style>
