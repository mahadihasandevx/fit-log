"use client";

import { IWorkout } from "@/types/workout";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface WorkoutContextType {
  plan: IWorkout[];
  saved: IWorkout[];

  addToPlan: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: IWorkout) => void;
  removeSavedWorkout: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
  }, []);

  // Save plan
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  // Save saved workouts
  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: IWorkout) => {
    if (plan.length >= 5) {
      alert("You can add maximum 5 workouts to today's plan.");
      return;
    }

    if (plan.some((item) => item.id === workout.id)) {
      return;
    }

    setPlan((previous) => [...previous, workout]);
  };

  const removeFromPlan = (id: number) => {
    setPlan((previous) => previous.filter((item) => item.id !== id));
  };

  const saveWorkout = (workout: IWorkout) => {
    if (saved.some((item) => item.id === workout.id)) {
      return;
    }

    setSaved((previous) => [...previous, workout]);
  };

  const removeSavedWorkout = (id: number) => {
    setSaved((previous) => previous.filter((item) => item.id !== id));
  };

  const isInPlan = (id: number) => {
    return plan.some((item) => item.id === id);
  };

  const isSaved = (id: number) => {
    return saved.some((item) => item.id === id);
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSavedWorkout,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useWorkout must be used inside WorkoutProvider");
  }

  return context;
};
