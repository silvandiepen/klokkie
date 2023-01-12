<script setup lang="ts">
import Time from "./components/Time.vue";
import Settings from "./components/Settings.vue";
import { useStorage } from "./composable/useStorage";

import { TimeType } from "./types";
import { onMounted } from "vue";

const { initStorage, timezones, settings } = useStorage();

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
  width: 100%;
  display: flex; flex-wrap: wrap;
}

* {
  box-sizing: border-box;
}
</style>
