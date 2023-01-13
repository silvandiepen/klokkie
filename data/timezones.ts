
import { timezones , TimeZone} from "./timezoneData";

interface SimpleTimeZone {
  label: string;
  value: string;
  combined: string;
  continent: string;
}


export const simpleTimezones = (): SimpleTimeZone[] => {
  return timezones
    .map((zone: TimeZone) => {
      return zone.utc
        .filter((z: string) => !z.startsWith("Etc") && z.includes("/"))
        .map((z: string) => {
          const label = z
            .split("/")
            [z.split("/").length - 1].replaceAll("_", " ");
          return {
            // label: z.split('/')[0],
            label,
            value: z,
            combined: `${label}::${z}`,
            continent: z.split("/")[0],
          };
        });
    })
    .flat()
    .sort() as SimpleTimeZone;
};
export const continents = (): any[] => {
  return simpleTimezones()
    .map((zone: any) => ({
      label: zone.continent,
      value: "",
    }))
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.label === value.label && t.value === value.value
        )
    );
};
export const zones = (): any[] => {
  return timezones.map((t) => (t = t.value));
};
