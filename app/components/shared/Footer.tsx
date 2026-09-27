const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black text-white">
              Fit<span className="text-emerald-400">Log</span>
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Workout Library — Train hard, log honest.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 FitLog — Workout Library.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
