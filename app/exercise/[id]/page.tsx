import AddToPlanButton from "@/app/components/Exercise/AddToPlanButton";
import SaveButton from "@/app/components/Exercise/SaveButton";
import { IWorkout } from "@/app/types/workout";
import Link from "next/link";

interface ExerciseDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const getWorkout = async (id: string): Promise<IWorkout> => {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);

  if (!res.ok) {
    throw new Error("Exercise not found");
  }

  return res.json();
};

const ExerciseDetailsPage = async ({ params }: ExerciseDetailsProps) => {
  const { id } = await params;

  const workout = await getWorkout(id);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-semibold text-slate-500 transition hover:text-white"
        >
          ← Back to Library
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative min-h-[550px]">
              <img
                src={workout.image}
                alt={workout.name}
                className="h-full min-h-[550px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-7 lg:p-12">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {workout.difficulty}
                </span>

                <span className="font-bold text-white">
                  ⭐ {workout.rating}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-black text-white md:text-5xl">
                {workout.name}
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-400">
                {workout.description}
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">Equipment</p>
                  <p className="mt-2 text-sm font-bold text-white">
                    {workout.equipment}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">Sets</p>
                  <p className="mt-2 font-bold text-white">{workout.sets}</p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">Reps</p>
                  <p className="mt-2 font-bold text-white">{workout.reps}</p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="mt-2 font-bold text-white">
                    {workout.duration}m
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-slate-950 p-4">
                <p className="text-xs text-slate-500">Calories Burned</p>

                <p className="mt-2 font-bold text-white">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              {/* Instructions */}
              <div className="mt-10">
                <h2 className="text-2xl font-black text-white">Instructions</h2>

                <ol className="mt-5 space-y-4">
                  {workout.instructions.map((instruction, index) => (
                    <li
                      key={instruction}
                      className="flex gap-4 text-sm leading-7 text-slate-400"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 font-bold text-slate-950">
                        {index + 1}
                      </span>

                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <AddToPlanButton workout={workout} />

                <SaveButton workout={workout} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExerciseDetailsPage;
