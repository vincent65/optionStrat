import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: "/graph.jpg",
    title: "Interactive Profit/Loss Charts",
    description: "Visualize your options strategies with interactive charts."
  },
  {
    icon: "/realdata.png",
    title: "Real-Time Options Data",
    description: "Access real-time options data to make informed decisions."
  },
  {
    icon: "/condor.svg",
    title: "Customizable Strategies",
    description: "Customize your strategies to suit your trading style."
  },
  {
    icon: "/delta.png",
    title: "Options Greeks Analytics",
    description: "Analyze the Greeks to understand your options strategies and how they might change."
  },
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">Options Strategies Visualizer</h1>
        <p className="text-lg text-center sm:text-left">Plan, analyze, and optimize your trades with real-time data and advanced tools.</p>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <Image src={feature.icon} alt={feature.title} width={60} height={60} />
              <div>
                <h2 className="text-xl font-bold">{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-8">
        <Link href="/about">
          <div className="flex items-center gap-2 hover:underline hover:underline-offset-4">About Us</div>
        </Link>
        <Link href="/contact">
          <div className="flex items-center gap-2 hover:underline hover:underline-offset-4">Contact</div>
        </Link>
        <Link href="/privacy">
          <div className="flex items-center gap-2 hover:underline hover:underline-offset-4">Privacy Policy</div>
        </Link>
        <div className="flex items-center gap-4">
          <Image src="/twitter.svg" alt="Twitter" width={36} height={36} />
          <Image src="/linkedin.svg" alt="LinkedIn" width={36} height={36} />
          <Image src="/github.svg" alt="GitHub" width={36} height={36} />
        </div>
      </footer>
    </div>
  );
}
