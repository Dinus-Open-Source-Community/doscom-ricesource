import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Users, Code, Monitor, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">About Ricesource</h1>
              <p className="text-lg text-muted-foreground mb-6">
                A community-driven platform celebrating the art of Linux desktop
                customization, inspired by the open-source spirit of DOSCOM and
                TeaLinuxOS.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg" className="gap-2">
                    <Users className="w-4 h-4" />
                    Join Community
                  </Button>
                </Link>
                <Link href="/submit">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Monitor className="w-4 h-4" />
                    Submit Rice
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-video">
              <Image
                src="/image/placeholder-card.png"
                alt="Linux Desktop Customization"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Rice Submissions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">1.2K+</p>
              <p className="text-sm text-muted-foreground">Community Members</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">5K+</p>
              <p className="text-sm text-muted-foreground">Monthly Visitors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">10K+</p>
              <p className="text-sm text-muted-foreground">Interactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* DOSCOM Card */}
          <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">DOSCOM</h3>
                    <p className="text-sm text-muted-foreground">
                      Dinus Open Source Community
                    </p>
                  </div>
                </div>
                <p className="mb-6 text-muted-foreground">
                  A vibrant community focused on Information Technology and
                  open-source software. Based at Dinus University, DOSCOM plays
                  a crucial role in promoting open-source adoption and education
                  in Indonesia.
                </p>
                <Link
                  href="https://doscom.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Visit DOSCOM
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* TeaLinuxOS Card */}
          <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Monitor className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">TeaLinuxOS</h3>
                    <p className="text-sm text-muted-foreground">
                      A Linux Distribution by DOSCOM
                    </p>
                  </div>
                </div>
                <p className="mb-6 text-muted-foreground">
                  TeaLinuxOS is DOSCOM&apos;s flagship product - a Linux
                  distribution designed specifically for developers and
                  students. It provides a complete development environment while
                  maintaining ease of use and elegance.
                </p>
                <Link
                  href="https://tealinuxos.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Visit TeaLinuxOS
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-card border-y">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              To create a vibrant community where Linux enthusiasts can share
              their desktop customizations, inspire others, and promote the
              beauty and flexibility of open-source software.
            </p>
            <Separator className="my-8" />
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/explore">
                <Button variant="outline" size="lg" className="gap-2">
                  Explore Rices
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
