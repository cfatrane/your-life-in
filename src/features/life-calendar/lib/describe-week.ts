import { WEEK_STATES } from "@/features/life-calendar/constants";
import { WeekCell } from "@/features/life-calendar/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function describeWeek(week: WeekCell) {
  return `Semaine ${week.number}, du ${format(week.start, "d MMMM yyyy", { locale: fr })} au ${format(week.end, "d MMMM yyyy", { locale: fr })} — ${WEEK_STATES[week.state].label}`;
}
