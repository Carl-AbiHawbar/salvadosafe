import type { Metadata } from "next";
import { SectionHeading, FinalCTA } from "@/components/sections";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Blog and Security Guides",
  description: "Guides and answers on choosing safes, vault doors, fire ratings, security grades, and secure storage from Salvado Safe in Lebanon.",
};

const topics = [
  { title: "How to Choose the Right Safe", text: "Understand security grades, fire ratings, size, and lock types before you buy." },
  { title: "Fire Ratings Explained", text: "What fire-resistant safes protect, and how long their ratings last." },
  { title: "Security Grades I–V", text: "What each certified grade means and which fits your needs." },
  { title: "Vault Doors and Secure Rooms", text: "Planning a vault project for a villa, jeweler, or institution." },
  { title: "Caring for Your Safe", text: "Maintenance, lock service, and keeping your safe working correctly." },
  { title: "Watch Winders and Luxury Storage", text: "Keeping automatic watches wound and collectibles secure." },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-ink">
        <div className="container-x py-20 md:py-24">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Guides and Insights</p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-[52px]">
              Salvado Security Guides
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80">
              Practical guides to help you choose, install, and care for safes, vault doors, and secure storage. Full
              articles are on the way. Meanwhile, our team is always available to answer your questions directly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading eyebrow="Topics" title="What We'll Cover" />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t, i) => (
              <Reveal key={t.title} delay={i * 60} className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <h3 className="text-[16px] font-bold text-ink">{t.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{t.text}</p>
                <span className="mt-4 inline-block rounded-full bg-surface px-3 py-1 text-[12px] font-semibold text-muted">Coming soon</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title="Have a Question Now?"
        text="Don't wait for an article, message our team on WhatsApp and we'll guide you directly."
        waMessage="Hi Salvado, I have a question about choosing a safe."
      />
    </>
  );
}
