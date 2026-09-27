import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/shared/Navbar";
import Footer from "@/app/components/shared/Footer";
import { WorkoutProvider } from "@/app/context/WorkoutContext";

export const metadata: Metadata = {
  title: "FitLog - Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WorkoutProvider>
          <Navbar />

          {children}

          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}
