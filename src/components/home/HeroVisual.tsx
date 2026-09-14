import Image from "next/image";
import { Bell, FileText, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingCardProps = { className?: string; children: React.ReactNode };

function FloatingCard({ className, children }: FloatingCardProps) {
  return (
    <div
      className={cn(
        "aa-hero-card absolute z-10 hidden items-center rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-xs font-semibold text-aa-navy-900 shadow-[var(--aa-shadow-md)] backdrop-blur-sm sm:flex",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[0.98] w-full max-w-[700px] min-w-0 sm:aspect-[1.08] lg:aspect-[1.02]">
      <Image
        src="/assets/hero/brand-arch.png"
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 56vw"
        className="aa-hero-arch object-contain object-center"
      />
      <Image
        src="/assets/hero/whatsapp-phone.png"
        alt="Conversación de Autoaliado en WhatsApp"
        width={1122}
        height={1402}
        priority
        sizes="(max-width: 640px) 62vw, (max-width: 1024px) 42vw, 27vw"
        className="aa-hero-phone absolute right-[3%] top-[8%] z-[2] h-[76%] w-auto object-contain drop-shadow-[0_22px_30px_rgba(7,20,66,0.18)]"
      />
      <Image
        src="/assets/hero/podium.png"
        alt=""
        width={1254}
        height={1254}
        sizes="(max-width: 640px) 96vw, 52vw"
        className="absolute bottom-[3%] left-[0%] z-[3] h-[37%] w-full object-contain object-bottom"
      />
      <Image
        src="/assets/hero/car-sedan.png"
        alt=""
        width={1122}
        height={1402}
        priority
        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
        className="aa-hero-car absolute bottom-[16%] left-[7%] z-[4] h-[44%] w-[79%] object-contain object-bottom"
      />
      <FloatingCard className="aa-hero-card-a left-[1%] top-[30%]">
        <FileText aria-hidden="true" className="mr-2 text-aa-blue-600" size={16} /> Póliza a la mano
      </FloatingCard>
      <FloatingCard className="aa-hero-card-b left-[5%] top-[48%]">
        <Bell aria-hidden="true" className="mr-2 text-aa-coral-500" size={16} /> Asistencia 24/7
      </FloatingCard>
      <FloatingCard className="aa-hero-card-b bottom-[9%] right-[-1%] max-w-[170px] text-center">
        <ShieldCheck aria-hidden="true" className="mr-2 shrink-0 text-aa-blue-600" size={17} />
        Conduce tranquilo, nosotros te respaldamos.
      </FloatingCard>
    </div>
  );
}
