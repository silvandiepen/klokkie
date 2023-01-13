export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export const TimeType = {
  minimal: "minimal",
  normal: "normal",
  analog: "analog",
  small: "small",
  huge: "huge",
} as const;
export type TimeType = typeof TimeType[keyof typeof TimeType];

export const AnalogClockType = {
  minimal: "minimal",
  normal: "normal",
} as const;
export type AnalogClockType =
  typeof AnalogClockType[keyof typeof AnalogClockType];
