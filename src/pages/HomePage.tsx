import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import type { PreloadedState } from "@/types";

interface HomePageProps {
  /** Pre-loaded state injected by SSR (or hydrated from window.__PRELOADED_STATE__) */
  preloadedState?: PreloadedState;
}

export default function HomePage({ preloadedState }: HomePageProps) {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
