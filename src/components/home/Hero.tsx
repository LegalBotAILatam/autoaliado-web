import { MessageCircle, PlayCircle, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/home/HeroVisual";

const trustItems = [
  { icon: MessageCircle, title: "Asistencia por WhatsApp", caption: "Siempre contigo" },
  { icon: Zap, title: "Respuesta rápida", caption: "En minutos" },
  { icon: ShieldCheck, title: "Póliza y asistencia", caption: "En todo momento" },
];

export function Hero() {
  return (
    <section className="overflow-hidden pb-10 pt-8 sm:pb-16 lg:min-h-[700px] lg:pb-20 lg:pt-10">
      <Container className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8 xl:gap-12">
        <div className="flex w-full flex-col items-start lg:w-[44%] lg:pb-10">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-aa-blue-600 sm:text-xs">
            Más que seguros, un aliado en tu camino
          </p>
          <h1 className="max-w-[680px] font-display text-[clamp(3.1rem,7vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-aa-navy-950">
            Tu auto siempre tiene un <span className="text-aa-coral-500">aliado.</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-8 text-aa-gray-600 sm:text-xl">
            Mantén tu póliza y la información de tu auto a la mano, recibe recordatorios y obtén asistencia cuando la necesites, todo por WhatsApp.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button className="min-h-14 w-full px-7 text-base sm:w-auto" withArrow>
              <MessageCircle aria-hidden="true" size={20} />
              Escríbenos por WhatsApp
            </Button>
            <a
              href="#beneficios"
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-aa-navy-900 bg-white px-7 text-base font-semibold text-aa-navy-900 transition hover:-translate-y-px hover:bg-aa-gray-50 sm:w-auto"
            >
              <PlayCircle aria-hidden="true" size={21} />
              Ver cómo funciona
            </a>
          </div>
          <div className="mt-10 flex w-full flex-wrap gap-x-6 gap-y-5 border-t border-aa-border pt-6 sm:gap-x-8">
            {trustItems.map(({ icon: Icon, title, caption }) => (
              <div key={title} className="flex min-w-[140px] items-start gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-aa-blue-600">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <span>
                  <span className="block text-xs font-bold leading-4 text-aa-navy-900">{title}</span>
                  <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-aa-gray-500">{caption}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:w-[56%]">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
