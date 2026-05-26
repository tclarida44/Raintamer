import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container size="full" className="flex min-h-[80vh] flex-col justify-center py-32">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-6 max-w-3xl font-display font-medium tracking-[-0.045em] text-bone-50 text-[clamp(3rem,8vw,7rem)] leading-[0.9]">
        That page didn&apos;t survive the storm.
      </h1>
      <p className="mt-8 max-w-xl text-[17px] leading-[1.55] text-bone-300">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-12 flex flex-wrap gap-3">
        <Button href="/">Back home</Button>
        <Button href="/services" variant="outline">Browse services</Button>
      </div>
    </Container>
  );
}
