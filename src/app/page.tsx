import { HealthInformation } from "@/features/life-calendar/components/health-information";
import { LifeCalendar } from "@/features/life-calendar/components/life-calendar";
import { TimeTravel } from "@/features/time-travel/components/time-travel";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <header className="story-header">
        <div className="story-shell story-header-inner">
          <a className="story-brand" href="#intro">
            Your Life In Weeks
          </a>

          <Button asChild className="story-button" variant="outline">
            <a href="#calendar">Mon calendrier</a>
          </Button>
        </div>
      </header>

      <section
        aria-labelledby="intro-title"
        className="story-shell story-hero"
        id="intro"
      >
        <div className="story-split">
          <div>
            <p className="story-kicker">01 / Prendre du recul</p>

            <h1 id="intro-title">
              <span className="block">Ta vie,</span>

              <span className="block">semaine après</span>

              <em className="block">semaine.</em>
            </h1>

            <p className="story-copy">
              Le temps paraît immense. Un calendrier le rend concret. Découvre
              le chemin déjà parcouru, puis regarde où tu en es aujourd’hui.
            </p>

            <div className="story-actions">
              <Button asChild className="story-button">
                <a href="#birth">Découvrir ma vie</a>
              </Button>

              <a className="story-text-link" href="#calendar">
                Aller au calendrier
              </a>
            </div>
          </div>

          <div className="story-motif">
            <div aria-hidden="true" className="story-seven">
              7
            </div>

            <p>
              Sept jours.
              <br />
              Un point de ta vie.
            </p>
          </div>
        </div>

        <nav aria-label="Les étapes du calendrier" className="story-chapters">
          <a href="#birth">
            <span>02</span> Ta naissance
          </a>

          <a href="#journey">
            <span>03</span> Ton parcours
          </a>

          <a href="#calendar">
            <span>04</span> Toute ta vie
          </a>

          <a href="#present">
            <span>05</span> Aujourd’hui
          </a>
        </nav>
      </section>

      <LifeCalendar />

      <TimeTravel />

      <HealthInformation />
    </>
  );
}
