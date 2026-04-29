import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-white">
      <Image
        src="/Hyerr.gif"
        alt="Hyerr coming soon"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover"
      />
    </main>
  );
}
