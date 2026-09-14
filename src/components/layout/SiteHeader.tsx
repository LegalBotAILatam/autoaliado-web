import { Menu, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const links = [
  { label: "Cómo funciona", href: "#beneficios" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Asistencia", href: "#asistencia" },
  { label: "Contacto", href: "#contacto" },
];

export function SiteHeader() {
  return (
    <header className="relative z-20 bg-transparent">
      <Container className="flex h-[84px] items-center justify-between gap-6 lg:h-[96px]">
        <BrandLogo width={205} priority />
        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-aa-navy-900 transition-colors hover:text-aa-blue-600"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <a href="#iniciar-sesion" className="text-sm font-medium text-aa-navy-900 hover:text-aa-blue-600">
            Iniciar sesión
          </a>
          <Button className="min-h-11 px-5" withArrow>
            <MessageCircle aria-hidden="true" size={17} />
            Escríbenos por WhatsApp
          </Button>
        </div>
        <button
          type="button"
          aria-label="Abrir menú"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-aa-navy-900 hover:bg-aa-surface-soft lg:hidden"
        >
          <Menu aria-hidden="true" size={28} strokeWidth={2.2} />
        </button>
      </Container>
    </header>
  );
}
