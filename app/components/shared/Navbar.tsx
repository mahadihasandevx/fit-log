import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-white"
        >
          Fit<span className="text-emerald-400">Log</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/#workouts"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            My Plan
          </Link>
        </nav>

        <Link
          href="/my-plan"
          className="rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
        >
          My Plan
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
