<template>
  <div :class="bemm()">
    <select :class="bemm('control')" @change="setCurrent($event)">
      <option :class="bemm('option')" disabled selected>
        Choose a timezone
      </option>
      <optgroup
        :class="bemm('option-group')"
        v-for="(group, idx) in groups"
        :key="idx"
        :label="group.label"
      >
        <option
          class="bemm('option')"
          v-for="(option, idx) in options.filter(
            (o) => o.continent == group.label
          )"
          :key="idx"
          :value="option.combined"
        >
          {{ option.label }}
        </option>
      </optgroup>
    </select>
    <button
      :class="bemm('button')"
      :disabled="current == ''"
      @click="addTimezone"
    >
      Add
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useBemm } from "bemm";

//@ts-ignore
import { simpleTimezones,continents } from "../../data/timezones";
//@ts-ignore
import { useState } from "../../data/useState";

const { bemm } = useBemm("timezone-selector");

const { setTimezone } = useState();

interface Option {
  label: string;
  value: string;
  continent: string;
  combined: string;
}
interface Group {
  label: string;
  value: string;
}

const options = ref<Option[]>(simpleTimezones());
const groups = ref<Group[]>(continents());
const current = ref("");


const addTimezone = () => {
  console.log("adding timezone", current.value);

  const zone = current.value.split("::");
  setTimezone({ label: zone[0], value: zone[1] });
};

const setCurrent = (e: any) => {
  current.value = e?.target?.value;
};
</script>

<style lang="scss">
.timezone-selector {
  padding: 1em;
  display: flex;
  &__control {
    padding: 0.75em;
    border-radius: 0.5em 0 0 0.5em;

    line-height: 1em;
    font-size: 1em;
  }
  &__option {
    line-height: 1em;
  }
  &__button {
    margin: 0;
    padding: 0.75em;
    border-radius: 0 0.5em 0.5em 0;
    font-size: 1em;
    line-height: 1em;
  }
}
</style>
