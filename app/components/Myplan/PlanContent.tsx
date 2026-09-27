"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useWorkout } from "@/app/context/WorkoutContext";

const PlanContent = () => {
  const { plan, saved, removeFromPlan, removeSavedWorkout } = useWorkout();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const [sortBy, setSortBy] = useState("default");

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    const list = [...currentList];

    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "duration") {
      return list.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }

    return list;
  }, [currentList, sortBy]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
            My Plan
          </p>

          <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">
            Today&apos;s Workout
          </h1>

          <p className="mt-4 text-slate-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">Exercises</p>

            <p className="mt-2 text-4xl font-black text-white">{plan.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">Minutes</p>

            <p className="mt-2 text-4xl font-black text-white">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">Calories</p>

            <p className="mt-2 text-4xl font-black text-white">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mt-12 flex flex-col justify-between gap-5 border-b border-slate-800 pb-5 md:flex-row md:items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-xl px-5 py-3 text-sm font-bold ${
                activeTab === "plan"
                  ? "bg-emerald-400 text-slate-950"
                  : "bg-slate-900 text-slate-400"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-xl px-5 py-3 text-sm font-bold ${
                activeTab === "saved"
                  ? "bg-emerald-400 text-slate-950"
                  : "bg-slate-900 text-slate-400"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-500">Sort By</label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none"
            >
              <option value="default">Default</option>
              <option value="rating">Rating</option>
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="mt-8">
          {sortedList.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900 px-6 py-20 text-center">
              <div className="text-5xl">🏋️</div>

              <h2 className="mt-5 text-2xl font-black text-white">
                {activeTab === "plan"
                  ? "Your plan is empty"
                  : "No saved workouts"}
              </h2>

              <p className="mx-auto mt-3 max-w-md text-slate-500">
                {activeTab === "plan"
                  ? "Browse the workout library and add exercises to today's plan."
                  : "Save your favorite exercises for later."}
              </p>

              <Link
                href="/#workouts"
                className="mt-7 inline-block rounded-xl bg-emerald-400 px-6 py-3 font-bold text-slate-950"
              >
                Browse Workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedList.map((workout) => (
                <div
                  key={workout.id}
                  className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-28 w-full rounded-xl object-cover sm:w-40"
                  />

                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {workout.muscleGroups.map((muscle) => (
                        <span
                          key={muscle}
                          className="text-xs font-bold text-emerald-400"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>

                    <h3 className="mt-2 text-xl font-black text-white">
                      {workout.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>{workout.sets} sets</span>
                      <span>{workout.reps} reps</span>
                      <span>{workout.duration} min</span>
                      <span>{workout.caloriesBurned} kcal</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/exercise/${workout.id}`}
                      className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(workout.id)
                          : removeSavedWorkout(workout.id)
                      }
                      className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default PlanContent;
