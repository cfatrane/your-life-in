import { useId, useLayoutEffect, useRef, useState } from "react";

import {
  MAX_WEEKS_BY_AGE,
  WEEK_STATES,
} from "@/features/life-calendar/constants";
import { describeWeek } from "@/features/life-calendar/lib/describe-week";
import { anniversary } from "@/features/life-calendar/lib/life-dates";
import { WeekCell } from "@/features/life-calendar/types";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";

import { Button } from "@/components/ui/button";

import { WeekList } from "./week-list";

export function MobileCalendar({ years }: { years: WeekCell[][] }) {
  const id = useId();
  const current = years.flat().find((week) => week.state === "current");
  const [age, setAge] = useState(current?.age ?? years.length - 1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const returnScroll = useRef<number | null>(null);
  const weeks = years[age];
  const selected = weeks.find((week) => week.number === selectedNumber);
  const birth = years[0][0].start;
  const dateLabel = (date: Date) => format(date, "d MMMM yyyy", { locale: fr });

  useLayoutEffect(() => {
    if (detailsOpen) {
      heading.current?.focus();
    } else if (returnScroll.current !== null) {
      openButton.current?.focus({ preventScroll: true });
      window.scrollTo({ top: returnScroll.current, behavior: "instant" });
      returnScroll.current = null;
    }
  }, [detailsOpen]);

  return (
    <div className="md:hidden">
      <div hidden={detailsOpen}>
        <h2 className="mb-2 text-xl font-semibold">Toute ma vie</h2>

        <p className="mb-4 text-sm">
          Chaque ligne représente une année, chaque case une semaine. Lis de
          haut en bas, puis passe à la colonne suivante.
        </p>

        <svg
          aria-describedby={`${id}-description`}
          aria-labelledby={`${id}-title`}
          className="mx-auto mb-6 block w-full max-w-[360px]"
          role="img"
          viewBox="0 0 300 364"
        >
          <title id={`${id}-title`}>Aperçu des 90 années</title>

          <desc id={`${id}-description`}>
            {`De 0 à 89 ans. ${current ? `Semaine actuelle : ${current.number}, à ${current.age} ans, repère A.` : "Toutes les semaines sont écoulées : horizon de 90 ans dépassé."} Les cases pleines sont écoulées, les cases vides sont à venir.`}
          </desc>

          {years.map((year, index) => {
            const x = index < 45 ? 0 : 154;
            const y = (index % 45) * 8 + 2;

            return (
              <g aria-hidden="true" key={index}>
                <text
                  className={
                    current?.age === index
                      ? "fill-blue-800 font-bold"
                      : "fill-slate-700"
                  }
                  fontSize="8"
                  x={x}
                  y={y + 5}
                >
                  {index}

                  {current?.age === index ? " A" : ""}
                </text>

                {year.map((week, column) => (
                  <rect
                    className={WEEK_STATES[week.state].overviewClassName}
                    height={week.state === "current" ? 6 : 4}
                    key={week.number}
                    strokeDasharray={
                      week.state === "future" ? "1 1" : undefined
                    }
                    strokeWidth={week.state === "current" ? 1 : 0.4}
                    width={112 / MAX_WEEKS_BY_AGE - 0.4}
                    x={x + 24 + column * (112 / MAX_WEEKS_BY_AGE)}
                    y={week.state === "current" ? y - 1 : y}
                  />
                ))}
              </g>
            );
          })}
        </svg>

        <label
          className="mb-3 flex flex-col gap-2 text-base"
          htmlFor={`${id}-year`}
        >
          Explorer une année
          <select
            className="bg-background h-11 w-full rounded-md border px-3 text-base focus-visible:outline-2 focus-visible:outline-blue-800"
            id={`${id}-year`}
            onChange={(event) => {
              setAge(Number(event.target.value));
              setSelectedNumber(null);
            }}
            value={age}
          >
            {years.map((_, index) => (
              <option
                key={index}
                value={index}
              >{`De ${index} à ${index + 1} ${index === 0 ? "an" : "ans"}${current?.age === index ? " — semaine actuelle" : ""}`}</option>
            ))}
          </select>
        </label>

        <Button
          className="h-11 w-full"
          onClick={() => {
            returnScroll.current = window.scrollY;
            setDetailsOpen(true);
          }}
          ref={openButton}
          type="button"
        >
          Explorer cette année
        </Button>
      </div>

      {detailsOpen && (
        <section aria-labelledby={`${id}-heading`}>
          <Button
            className="mb-6 h-11 w-full"
            onClick={() => setDetailsOpen(false)}
            type="button"
            variant="outline"
          >
            Revenir à toute ma vie
          </Button>

          <h2
            className="mb-2 text-xl font-semibold focus-visible:outline-2 focus-visible:outline-blue-800"
            id={`${id}-heading`}
            ref={heading}
            tabIndex={-1}
          >
            {`De ${age} à ${age + 1} ${age === 0 ? "an" : "ans"}`}
          </h2>

          <p className="mb-4 text-sm">{`Du ${dateLabel(anniversary(birth, age))} au ${dateLabel(subDays(anniversary(birth, age + 1), 1))}`}</p>

          <p
            aria-label="Détails de la semaine"
            className="bg-background sticky top-2 z-10 mb-4 rounded-md border p-3 text-sm"
            role="status"
          >
            {selected
              ? describeWeek(selected)
              : "Sélectionne une semaine pour consulter ses détails. Au clavier, utilise Tab, puis Entrée ou Espace."}
          </p>

          <WeekList
            onSelect={setSelectedNumber}
            selectedNumber={selectedNumber}
            weekList={weeks}
          />
        </section>
      )}
    </div>
  );
}
