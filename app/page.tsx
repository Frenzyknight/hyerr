export default function Home() {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-white">
      <picture>
        <source media="(max-width: 639px)" srcSet="/Hyerr_Mobile.gif" />
        <img
          src="/Hyerr.gif"
          alt="Hyerr coming soon"
          className="h-dvh w-full object-cover"
          fetchPriority="high"
        />
      </picture>
    </main>
  );
}
