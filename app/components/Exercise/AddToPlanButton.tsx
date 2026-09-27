"use client";

import { useWorkout } from "@/app/context/WorkoutContext";
import { IWorkout } from "@/app/types/workout";

const AddToPlanButton = ({ workout }: { workout: IWorkout }) => {
  const { addToPlan, removeFromPlan, isInPlan } = useWorkout();

  const added = isInPlan(workout.id);

  const handleClick = () => {
    if (added) {
      removeFromPlan(workout.id);
    } else {
      addToPlan(workout);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex-1 rounded-xl px-6 py-4 font-bold transition ${
        added
          ? "bg-slate-700 text-white hover:bg-red-500"
          : "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
      }`}
    >
      {added ? "✓ Added to Today's Plan" : "Add to Today's Plan"}
    </button>
  );
};

export default AddToPlanButton;
