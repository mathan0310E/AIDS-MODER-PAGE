import { Reveal } from "@/components/Reveal";
import { site } from "@/data/department";
import { PinIcon, MailIcon } from "@/components/icons";

export function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    site.mapsQuery,
  )}&output=embed`;

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">
            › Contact &amp; reach us
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Come{" "}
            <span className="text-gradient-cyan">build with us</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
          {/* Details */}
          <Reveal>
            <div className="space-y-6">
              <div className="rounded-xl border border-cyan/15 bg-void-2/50 p-6">
                <div className="flex items-start gap-3">
                  <PinIcon className="size-6 shrink-0 text-cyan" />
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-mist-faint uppercase">
                      Campus address
                    </p>
                    <p className="mt-2 font-display text-sm leading-relaxed text-mist-soft">
                      {site.address.line1}
                      <br />
                      {site.address.line2}
                      <br />
                      {site.address.line3}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-cyan/15 bg-void-2/50 p-6">
                <div className="flex items-start gap-3">
                  <MailIcon className="size-6 shrink-0 text-violet-bright" />
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-mist-faint uppercase">
                      Department email
                    </p>
                    <a
                      href={`mailto:${site.departmentEmail}`}
                      className="mt-2 block font-display text-sm text-cyan hover:underline"
                    >
                      {site.departmentEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-mist-faint/15 bg-void-3/40 p-6">
                <p className="font-mono text-[10px] tracking-widest text-mist-faint uppercase">
                  Affiliation &amp; approval
                </p>
                <p className="mt-2 font-display text-sm text-mist-soft">
                  Affiliated to {site.affiliatedTo}
                </p>
                <p className="font-display text-sm text-mist-soft">
                  Approved by {site.approvedBy}
                </p>
                <a
                  href={site.collegeWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-display text-sm text-cyan hover:underline"
                >
                  {site.collegeName} ↗
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-xl border border-cyan/15 glow-cyan">
              <iframe
                title="SKP Engineering College location"
                src={mapSrc}
                className="h-full min-h-[24rem] w-full grayscale-[0.3] invert-[0.85] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
