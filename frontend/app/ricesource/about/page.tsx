import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Users, Heart, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">


      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
                Community Platform
              </Badge>
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                About{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Ricesource
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                A community-driven platform celebrating the art of Linux desktop customization, inspired by the
                open-source spirit of DOSCOM and TeaLinuxOS.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Join Community
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 group"
              >
                <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Submit Rice
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/image/hero_2.png"
                alt="Linux Desktop Customization"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/50 backdrop-blur-sm border-y">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Upload, value: "500+", label: "Rice Submissions", color: "from-blue-500 to-blue-600" },
              { icon: Users, value: "1.2K+", label: "Community Members", color: "from-emerald-500 to-emerald-600" },
              { icon: Eye, value: "5K+", label: "Monthly Visitors", color: "from-purple-500 to-purple-600" },
              { icon: Heart, value: "10K+", label: "Interactions", color: "from-pink-500 to-pink-600" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Collaborating with leading open-source communities to promote Linux desktop customization
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">DOSCOM</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    A vibrant community focused on Information Technology and open-source software. Based at Dinus
                    University, DOSCOM plays a crucial role in promoting open-source adoption and education in
                    Indonesia.
                  </p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300"
                  >
                    Visit DOSCOM
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">TeaLinuxOS</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    TeaLinuxOS is DOSCOM's flagship product - a Linux distribution designed specifically for developers
                    and students. It provides a complete development environment while maintaining ease of use and
                    elegance.
                  </p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all duration-300"
                  >
                    Visit TeaLinuxOS
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border-y">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              To create a vibrant community where Linux enthusiasts can share their desktop customizations, inspire
              others, and promote the beauty and flexibility of open-source software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Rices
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-white transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
