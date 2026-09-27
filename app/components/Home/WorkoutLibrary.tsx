import WorkoutCard from "./WorkoutCard";
import { IWorkout } from "@/types/workout";

const getWorkouts = async (): Promise<IWorkout[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
};

const WorkoutLibrary = async () => {
  const workouts = await getWorkouts();

  return (
    <section id="workouts" className="bg-slate-950 px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
            The Library
          </p>

          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            Twelve lifts. Every major muscle.
          </h2>

          <p className="mt-4 max-w-2xl text-slate-500">
            Find an exercise, check the details, and add it directly to
            today&apos;s plan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutLibrary;
