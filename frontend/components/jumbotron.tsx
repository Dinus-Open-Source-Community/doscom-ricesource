import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Jumbotron() {
  return (
    <div className="bg-[url('/image/hero.png')] bg-cover text-primary-foreground">
      <div className="w-full h-full bg-black/70">
        <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Showcase Your Linux Rice
          </h1>
          <p className="mt-6 max-w-2xl text-xl sm:text-2xl">
            Discover stunning Linux desktop customizations, share your own
            creations, and get inspired by the community.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href="/submit">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-secondary hover:text-black"
              >
                Submit Your Rice
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-background text-background hover:bg-background/10"
              >
                Explore Rices
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
