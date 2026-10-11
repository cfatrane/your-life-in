export const NUMBER_OF_YEARS_BY_LIFE = 90;
export const MAX_WEEKS_BY_AGE = 53;

export const WEEK_STATES = {
  past: {
    label: "Semaine écoulée",
    className: "bg-slate-700 border-slate-700",
    overviewClassName: "fill-slate-700 stroke-slate-700",
  },
  current: {
    label: "Semaine actuelle",
    className: "bg-blue-100 border-blue-800 outline outline-2 outline-blue-800",
    overviewClassName: "fill-blue-100 stroke-blue-800",
  },
  future: {
    label: "Semaine à venir",
    className: "bg-white border-dashed border-slate-400",
    overviewClassName: "fill-white stroke-slate-400",
  },
} as const;
