"use client";

import { useWorkout } from "@/app/context/WorkoutContext";
import { IWorkout } from "@/app/types/workout";

const SaveButton = ({ workout }: { workout: IWorkout }) => {
  const { saveWorkout, removeSavedWorkout, isSaved } = useWorkout();

  const saved = isSaved(workout.id);

  const handleClick = () => {
    if (saved) {
      removeSavedWorkout(workout.id);
    } else {
      saveWorkout(workout);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-xl border px-6 py-4 font-bold transition ${
        saved
          ? "border-emerald-400 text-emerald-400"
          : "border-slate-700 text-white hover:border-emerald-400 hover:text-emerald-400"
      }`}
    >
      {saved ? "♥ Saved" : "♡ Save for Later"}
    </button>
  );
};

export default SaveButton;
