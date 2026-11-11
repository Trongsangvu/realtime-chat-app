const steps = [
  { title: "1. Create a room", text: "A unique code is generated instantly." },
  { title: "2. Share the link", text: "Anyone with the code can join from a browser." },
  { title: "3. Talk directly", text: "Audio and video flow directly between peers." },
];

export const HowItWorks = () => (
  <section id="how" className="grid gap-4 pb-6 md:grid-cols-3">
    {steps.map((s) => (
      <div key={s.title} className="glass rounded-2xl p-4">
        <h3 className="text-sm font-semibold">{s.title}</h3>
        <p className="mt-1 text-xs text-ink-soft">{s.text}</p>
      </div>
    ))}
  </section>
);
