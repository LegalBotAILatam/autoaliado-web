import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

const features = [
  { title: "Póliza a la mano", body: "Tu información importante, disponible cuando la necesitas.", image: "/assets/cards/policy-at-hand.png" },
  { title: "Asistencia inmediata", body: "Encuentra los teléfonos correctos para actuar con calma.", image: "/assets/cards/immediate-assistance.png" },
  { title: "Recordatorios a tiempo", body: "Anticípate a fechas importantes de tu auto.", image: "/assets/cards/drive-calm.png" },
];

export function FeatureStrip() {
  return (
    <section id="beneficios" className="border-t border-aa-border bg-white py-16 sm:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-aa-blue-600">Siempre contigo</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] text-aa-navy-950 sm:text-4xl">Todo lo que necesitas, en un solo lugar.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-aa-gray-600">Una forma más sencilla de cuidar la información y el camino de tu auto.</p>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {features.map((feature) => (
            <SurfaceCard key={feature.title} className="flex min-h-[260px] flex-1 flex-col overflow-hidden p-6">
              <div className="relative h-28 w-full">
                <Image src={feature.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain object-left" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-aa-navy-950">{feature.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-aa-gray-600">{feature.body}</p>
            </SurfaceCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
