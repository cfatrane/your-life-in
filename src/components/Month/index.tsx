import { NUMBER_OF_WEEKS_BY_YEAR } from "@/constants/layout";

function Month({ weeksAlive }) {
  return (
    <div
      className={`grid shrink-0 place-items-center`}
      style={{
        gridTemplateColumns: `repeat(${NUMBER_OF_WEEKS_BY_YEAR / NUMBER_OF_WEEKS_BY_YEAR}, minmax(0, 1fr))`,
      }}
    >
      Month
    </div>
  );
}
export default Month;
