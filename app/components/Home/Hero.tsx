const Hero = () => {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Workout Library
          </p>

          <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl">
            Train with intent.
            <br />
            <span className="text-emerald-400">Log every set.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
            Pick a workout, lock it into today&apos;s plan, and keep track of
            the work that moves you forward.
          </p>

          <a
            href="#workouts"
            className="mt-9 inline-block rounded-xl bg-emerald-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            Browse Workouts
          </a>
        </div>
        <div>
          <img
            src="/banner.png"
            alt="Hero Image"
            className="mx-auto max-w-full rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
