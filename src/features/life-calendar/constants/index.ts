export const NUMBER_OF_YEARS_BY_LIFE = 90;
export const MAX_WEEKS_BY_AGE = 53;

export const WEEK_STATES = {
  past: {
    label: "Semaine écoulée",
    className:
      "bg-foreground border-foreground text-background hover:bg-foreground/85 hover:text-background",
  },
  current: {
    label: "Semaine actuelle",
    className:
      "bg-secondary text-primary border-primary outline outline-2 outline-primary hover:bg-secondary hover:text-primary",
  },
  future: {
    label: "Semaine à venir",
    className:
      "bg-background text-muted-foreground border-input hover:bg-secondary",
  },
} as const;
