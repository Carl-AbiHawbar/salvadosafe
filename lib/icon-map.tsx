import {
  ShieldIcon,
  CheckIcon,
  ToolsIcon,
  HeadsetIcon,
  StarIcon,
  TruckIcon,
} from "@/components/icons";

export const iconMap = {
  shield: ShieldIcon,
  check: CheckIcon,
  tools: ToolsIcon,
  headset: HeadsetIcon,
  star: StarIcon,
  truck: TruckIcon,
} as const;

export type IconKey = keyof typeof iconMap;

export function getIcon(key: string) {
  return iconMap[key as IconKey] || CheckIcon;
}
