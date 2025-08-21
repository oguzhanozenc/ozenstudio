import ServicesComponent from "@/components/Services";

export default function Services() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[url('/grain.png')] bg-[length:800px_800px] opacity-[0.04]"
      />
      <main className="relative px-6 md:px-12 xl:px-24 py-12 space-y-12 w-full flex flex-col flex-wrap">
        <ServicesComponent />
      </main>
    </>
  );
}
