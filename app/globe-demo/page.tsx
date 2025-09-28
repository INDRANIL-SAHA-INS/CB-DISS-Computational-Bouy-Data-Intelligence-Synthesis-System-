import Globe from "@/components/ui/globe";
import Navigation from "@/components/Navigation";

export default function GlobeDemo() {
  return (
  <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Interactive Globe Demo
          </h1>
          <Globe />
        </div>
      </main>
    </div>
  );
}