"use client";

import { useId, useMemo, useRef, useState } from "react";

import { BirthDateInput } from "@/features/life-calendar/components/birth-date-input";
import { Calendar } from "@/features/life-calendar/components/calendar";
import { Legend } from "@/features/life-calendar/components/legend";
import { TimeSinceBirth } from "@/features/life-calendar/components/time-since-birth";
import { NUMBER_OF_YEARS_BY_LIFE } from "@/features/life-calendar/constants";
import { useBirthDate } from "@/features/life-calendar/hooks/use-birth-date";
import { useCurrentDay } from "@/features/life-calendar/hooks/use-current-day";
import { buildWeekList } from "@/features/life-calendar/lib/build-week-list";
import { isValidHorizon } from "@/features/life-calendar/lib/calendar-horizon";
import { lifeSummary } from "@/features/life-calendar/lib/life-dates";
import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const dateLabel = (date: Date) => format(date, "d MMMM yyyy", { locale: fr });
const numberLabel = (number: number) => number.toLocaleString("fr-FR");

export function LifeCalendar() {
  const { birthDate, saveBirthDate, clearBirthDate, message, ready } =
    useBirthDate();
  const birthInput = useRef<HTMLButtonElement>(null);
  const [horizon, setHorizon] = useState(NUMBER_OF_YEARS_BY_LIFE);
  const [horizonDraft, setHorizonDraft] = useState(String(horizon));
  const [horizonError, setHorizonError] = useState("");
  const horizonInput = useRef<HTMLInputElement>(null);
  const horizonId = useId();
  const today = useCurrentDay();
  const weekList = useMemo(
    () => (birthDate ? buildWeekList(birthDate, today, horizon) : []),
    [birthDate, today, horizon],
  );
  const currentWeek = weekList.find((week) => week.state === "current");
  const currentDay = parseISO(today);
  const birth = birthDate ? parseISO(birthDate) : null;
  const summary = birth ? lifeSummary(birth, currentDay) : null;

  return (
    <>
      <section
        aria-labelledby="birth-title"
        className="story-section story-soft"
        id="birth"
      >
        <div className="story-shell story-split">
          <div>
            <p className="story-kicker">02 / Le point de départ</p>

            <h2 id="birth-title">
              Tout commence
              <br />
              un jour.
            </h2>

            <p className="story-copy">
              Ta date de naissance suffit pour dessiner ton calendrier. Aucun
              compte à créer : elle reste dans le stockage local de ce
              navigateur.
            </p>
          </div>

          <div className="story-birth-field">
            <p className="mb-3 font-medium">Ta date de naissance</p>

            <BirthDateInput
              disabled={!ready}
              onChange={saveBirthDate}
              ref={birthInput}
              value={birthDate}
            />

            <p
              aria-label="Sauvegarde de la date de naissance"
              className="story-note"
              role="status"
            >
              {message}
            </p>

            {(birthDate || message.startsWith("L’effacement")) && (
              <Button
                className="story-button mt-3"
                disabled={!ready}
                onClick={() => {
                  clearBirthDate();
                  birthInput.current?.focus();
                }}
                variant="ghost"
              >
                Effacer ma date
              </Button>
            )}

            <form
              className="mt-6"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                const value = Number(horizonDraft);

                if (!isValidHorizon(value)) {
                  setHorizonError("Choisis un âge entier entre 1 et 120 ans.");
                  horizonInput.current?.focus();

                  return;
                }
                setHorizon(value);
                setHorizonDraft(String(value));
                setHorizonError("");
                horizonInput.current?.focus();
              }}
            >
              <label className="mb-3 block font-medium" htmlFor={horizonId}>
                Horizon du calendrier (ans)
              </label>

              <Input
                aria-describedby={`${horizonId}-note${horizonError ? ` ${horizonId}-error` : ""}`}
                aria-invalid={horizonError ? true : undefined}
                className="min-h-12 text-base"
                id={horizonId}
                max={120}
                min={1}
                onChange={(event) => setHorizonDraft(event.target.value)}
                ref={horizonInput}
                step={1}
                type="number"
                value={horizonDraft}
              />

              <p className="story-note" id={`${horizonId}-note`}>
                Cet horizon est un repère personnel, pas une prédiction.
                <span className="block">
                  Ce choix s’applique à la visite en cours.
                </span>
              </p>

              {horizonError && (
                <p
                  className="story-note"
                  id={`${horizonId}-error`}
                  role="alert"
                >
                  {horizonError}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-3">
                <Button className="story-button" type="submit">
                  Appliquer
                </Button>

                <Button
                  className="story-button"
                  onClick={() => {
                    setHorizon(NUMBER_OF_YEARS_BY_LIFE);
                    setHorizonDraft(String(NUMBER_OF_YEARS_BY_LIFE));
                    setHorizonError("");
                  }}
                  type="button"
                  variant="outline"
                >
                  Revenir à 90 ans
                </Button>
              </div>
            </form>

            {!birthDate && (
              <p className="story-note">
                Sélectionne ta date de naissance pour afficher ton calendrier.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="journey-title"
        className="story-section story-reveal"
        id="journey"
      >
        <div className="story-shell">
          <p className="story-kicker">03 / Le chemin parcouru</p>

          {summary ? (
            <>
              <div className="story-split">
                <div>
                  <p className="story-total">
                    {numberLabel(summary.completedWeeks)}
                  </p>

                  <h2 className="story-total-label" id="journey-title">
                    semaines entières
                    <br />
                    déjà vécues.
                  </h2>

                  <p className="story-copy">
                    Des jours ordinaires, des premières fois, des souvenirs.
                    Chaque point garde une place pour ce que tu as vécu.
                  </p>
                </div>

                <dl className="story-other-views">
                  <div>
                    <dt>Jours vécus</dt>

                    <dd>{numberLabel(summary.elapsedDays)}</dd>
                  </div>

                  <div>
                    <dt>Anniversaires célébrés</dt>

                    <dd>
                      <span>{summary.age}</span>

                      <span className="story-note">
                        {summary.age === 1 ? " an" : " ans"}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="story-counter">
                <p className="story-note">Et le temps continue.</p>

                <TimeSinceBirth birthDate={birthDate} today={today} />
              </div>
            </>
          ) : (
            <>
              <h2 id="journey-title">
                <span className="block">Des semaines.</span>

                <span className="block">Une histoire.</span>
              </h2>

              <p className="story-copy">
                Renseigne ta naissance pour découvrir les semaines et les jours
                que tu as déjà vécus.
              </p>

              <a className="story-text-link" href="#birth">
                Choisir ma date
              </a>
            </>
          )}
        </div>
      </section>

      <div className="story-section" id="calendar">
        <div className="story-shell">
          <div className="story-calendar-head">
            <div>
              <p className="story-kicker">04 / La vue d’ensemble</p>

              <h2>
                <span className="block">Ton temps,</span>

                <em className="block">en entier.</em>
              </h2>
            </div>

            <p className="story-copy">
              Un point, une semaine. Une ligne, une année d’âge. Lis de gauche à
              droite, puis de haut en bas.
            </p>
          </div>

          {birthDate ? (
            <section aria-label="Calendrier de vie">
              <Legend />

              <p className="story-note mb-6">
                {currentWeek
                  ? `Semaine actuelle : semaine ${currentWeek.number}, dans l’année d’âge de ${currentWeek.age} ${currentWeek.age === 1 ? "an" : "ans"} (repère A).`
                  : "Tu as dépassé l'horizon choisi"}
              </p>

              <Calendar
                horizon={horizon}
                key={`${birthDate}-${horizon}`}
                weekList={weekList}
              />

              {birthDate.endsWith("02-29") && (
                <p className="story-note">
                  Pour une naissance le 29 février, l’anniversaire de référence
                  est le 1er mars les années non bissextiles.
                </p>
              )}
            </section>
          ) : (
            <div className="story-empty">
              <p>Ton calendrier prendra forme à partir de ta naissance.</p>

              <Button asChild className="story-button mt-5">
                <a href="#birth">Choisir ma date</a>
              </Button>
            </div>
          )}

          <p className="story-note mt-6">
            {`Ce calendrier va jusqu’à ton ${horizon === 1 ? "1er" : `${horizon}ᵉ`} anniversaire. C’est un horizon de représentation, pas une estimation de ta durée de vie.`}
          </p>
        </div>
      </div>

      <section
        aria-labelledby="present-title"
        className="story-section story-soft"
        id="present"
      >
        <div className="story-shell">
          <p className="story-kicker">05 / Revenir au présent</p>

          <div className="story-split">
            <div>
              <h2 id="present-title">
                <span className="block">Cette semaine,</span>

                <span className="block">c’est la tienne.</span>
              </h2>

              {ready && (
                <p className="story-copy">
                  {`Aujourd’hui, ${format(currentDay, "EEEE d MMMM yyyy", { locale: fr })}.`}
                </p>
              )}

              {currentWeek && (
                <>
                  <p className="story-current-summary">
                    <span className="block">{`Semaine ${currentWeek.number}`}</span>

                    <span className="story-note">
                      {`Du ${dateLabel(currentWeek.start)} au ${dateLabel(currentWeek.end)}`}
                    </span>
                  </p>

                  <ol
                    aria-label="Les jours de ta semaine actuelle"
                    className="story-day-strip"
                  >
                    {Array.from(
                      {
                        length:
                          differenceInCalendarDays(
                            currentWeek.end,
                            currentWeek.start,
                          ) + 1,
                      },
                      (_, index) => {
                        const day = addDays(currentWeek.start, index);
                        const state =
                          day < currentDay
                            ? "past"
                            : day > currentDay
                              ? "future"
                              : "current";

                        return (
                          <li
                            aria-current={
                              state === "current" ? "date" : undefined
                            }
                            className={`story-day ${state}`}
                            key={index}
                          >
                            <span className="sr-only">
                              {state === "current" ? "Aujourd’hui, " : ""}

                              {dateLabel(day)}
                            </span>

                            <span aria-hidden="true">
                              <span className="block">
                                {format(day, "EEEEE", { locale: fr })}
                              </span>

                              <span className="block">{format(day, "d")}</span>
                            </span>
                          </li>
                        );
                      },
                    )}
                  </ol>
                </>
              )}

              {!birth && (
                <p className="story-note">
                  Avec ta date de naissance, retrouve ici ta semaine actuelle et
                  ton prochain anniversaire.
                </p>
              )}
            </div>

            {summary && (
              <div className="story-birthday">
                <p className="story-note">
                  {summary.birthdayToday
                    ? "C’est ton anniversaire !"
                    : "Ton prochain anniversaire"}
                </p>

                <p className="story-birthday-number">
                  {summary.birthdayToday ? summary.age : summary.birthdayDays}

                  <span>
                    {summary.birthdayToday
                      ? summary.age === 1
                        ? " an"
                        : " ans"
                      : summary.birthdayDays === 1
                        ? " jour"
                        : " jours"}
                  </span>
                </p>

                <p>
                  {summary.birthdayToday
                    ? `Aujourd’hui, tu fêtes tes ${summary.age} ${summary.age === 1 ? "an" : "ans"}.`
                    : `Le ${dateLabel(summary.nextBirthday)}, tu auras ${summary.age + 1} ${summary.age === 0 ? "an" : "ans"}.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
