import { useId, useLayoutEffect, useRef, useState } from "react";

import { MAX_WEEKS_BY_AGE } from "@/features/life-calendar/constants";
import { describeWeek } from "@/features/life-calendar/lib/describe-week";
import { anniversary } from "@/features/life-calendar/lib/life-dates";
import { WeekCell } from "@/features/life-calendar/types";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";

import { Button } from "@/components/ui/button";

import { WeekList } from "./week-list";

export function Calendar({
  weekList,
  horizon,
}: {
  weekList: WeekCell[];
  horizon: number;
}) {
  const years = Array.from({ length: horizon }, () => [] as WeekCell[]);

  for (const week of weekList) years[week.age].push(week);
  const chartHeight =
    41 + (horizon - 1) * 7 + Math.floor((horizon - 1) / 10) * 9;
  const chart = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(300);

  useLayoutEffect(() => {
    const element = chart.current;

    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width) setWidth(entry.contentRect.width);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);
  const id = useId();
  const current = weekList.find((week) => week.state === "current");
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
    <div className="story-calendar-body">
      <div hidden={detailsOpen}>
        <svg
          aria-describedby={`${id}-description`}
          aria-labelledby={`${id}-title`}
          className="life-points"
          ref={chart}
          role="img"
          style={{ height: chartHeight }}
          viewBox={`0 0 ${width} ${chartHeight}`}
        >
          <title
            id={`${id}-title`}
          >{`Aperçu ${horizon === 1 ? "de 1 année" : `des ${horizon} années`}`}</title>

          <desc id={`${id}-description`}>
            {`De 0 à ${horizon - 1} ans. ${current ? `Semaine actuelle : ${current.number}, à ${current.age} ans, repère A.` : `Toutes les semaines sont écoulées : horizon de ${horizon} ${horizon === 1 ? "an" : "ans"} dépassé.`} Les grands points sont écoulés, les petits points sont à venir. Lis de gauche à droite, puis de haut en bas.`}
          </desc>

          {years.map((year, index) => {
            const y = 18 + index * 7 + Math.floor(index / 10) * 9;
            const step = (width - 34) / MAX_WEEKS_BY_AGE;

            return (
              <g aria-hidden="true" data-age={index} key={index}>
                {(index % 10 === 0 ||
                  index === current?.age ||
                  index === horizon - 1) && (
                  <text
                    className={
                      current?.age === index
                        ? "point-label current"
                        : "point-label"
                    }
                    fontSize="12"
                    x="0"
                    y={y + 4}
                  >
                    {index}

                    {current?.age === index ? " A" : ""}
                  </text>
                )}

                {year.map((week, column) => {
                  const radius =
                    (Math.min(4.6, step * 0.66) / 2) *
                    (week.state === "current"
                      ? 1.25
                      : week.state === "past"
                        ? 1
                        : 0.48);
                  const x = 34 + column * step + step / 2;

                  return (
                    <g key={week.number}>
                      <circle
                        className={`life-point ${week.state}`}
                        cx={x}
                        cy={y}
                        data-state={week.state}
                        data-week={week.number}
                        r={radius}
                      />

                      {week.state === "current" && (
                        <circle
                          className="point-ring"
                          cx={x}
                          cy={y}
                          r={radius + 1.6}
                        />
                      )}
                    </g>
                  );
                })}
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
            className="story-year-select"
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
          className="story-button w-full"
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
            className="story-button mb-6 w-full"
            onClick={() => setDetailsOpen(false)}
            type="button"
            variant="outline"
          >
            Revenir à toute ma vie
          </Button>

          <h2
            className="focus-visible:outline-ring mb-3 focus-visible:outline-2"
            id={`${id}-heading`}
            ref={heading}
            tabIndex={-1}
          >
            {`De ${age} à ${age + 1} ${age === 0 ? "an" : "ans"}`}
          </h2>

          <p className="mb-4 text-sm">{`Du ${dateLabel(anniversary(birth, age))} au ${dateLabel(subDays(anniversary(birth, age + 1), 1))}`}</p>

          <p
            aria-label="Détails de la semaine"
            className="story-week-status"
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
