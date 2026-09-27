import Link from "next/link";
import { IWorkout } from "@/types/workout";

const WorkoutCard = ({ workout }: { workout: IWorkout }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl">
      <div className="relative h-60 overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-white backdrop-blur"
            >
              {muscle}
            </span>
          ))}
        </div>

        <span className="absolute right-4 top-4 rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-slate-950">
          ⭐ {workout.rating}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-black text-white">{workout.name}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
          {workout.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-y border-slate-800 py-4 text-sm">
          <span className="text-slate-400">⏱ {workout.duration} min</span>

          <span className="text-slate-400">
            🔥 {workout.caloriesBurned} kcal
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {workout.difficulty}
          </span>

          <Link
            href={`/exercise/${workout.id}`}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            View Exercise
          </Link>
        </div>
      </div>
    </article>
  );
};

export default WorkoutCard;
