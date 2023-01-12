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
} as const;
export type TimeType = typeof TimeType[keyof typeof TimeType];
