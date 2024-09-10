"use client";

import Image from "next/image";
import { useEffect } from "react";

export function HeroSectionDark() {
  useEffect(() => {
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement)
        .getAttribute("href")
        ?.slice(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    const menuLink = document.querySelector('a[href="#menu"]');
    if (menuLink) {
      menuLink.addEventListener("click", smoothScroll);
    }

    return () => {
      if (menuLink) {
        menuLink.removeEventListener("click", smoothScroll);
      }
    };
  }, []);

  return (
    <section className="w-full relative">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Delicious soul food spread"
          className="object-cover object-center"
          fill
          src="https://food-pickup-app.vercel.app/images/soulfood-banner-1.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-zinc-900/10" />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40 xl:py-48">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-amber-400 mb-6">
            Savor the Flavor of Home
          </h1>
          <p className="max-w-[600px] text-zinc-300 md:text-xl mb-8">
            Experience the warmth and comfort of authentic soul food. Our
            recipes are crafted with love, just like grandma used to make.
          </p>
          <a
            href="#menu"
            className="inline-flex h-12 items-center justify-center rounded-md bg-amber-600 px-8 text-base font-medium text-zinc-950 shadow transition-colors hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50"
          >
            View Our Menu
          </a>
        </div>
      </div>
    </section>
  );
}
