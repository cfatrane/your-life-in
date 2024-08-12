import { LIFE_PERIOD, NUMBER_OF_CASE_FOR_WEEKS } from "@/constants/layout";

function Period() {
  return (
    <div className="rounded-lg border-2 border-black p-4">
      <h5 className="mb-4 text-xl">Période</h5>

      {LIFE_PERIOD.map((item) => (
        <div className="mb-1 flex items-center" key={item.label}>
          <p className="mr-2">
            <span className="font-semibold">{item.label}: </span>

            <span>
              {item.min} - {item.max}
            </span>
          </p>

          <div
            className={`size-3 shrink-0 rounded-sm border border-black ${item.color}`}
          />
        </div>
      ))}
    </div>
  );
}
export default Period;
