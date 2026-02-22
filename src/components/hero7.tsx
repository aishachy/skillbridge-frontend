
import { cn } from "@/lib/utils";

import Link from "next/link";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
    className?: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
  className?: string;
}

const Hero7 = ({
  heading = "Connect With Expert Tutors!!",
  description = "Find highly qualified tutors tailored to your learning needs. Browse profiles, compare expertise, read reviews, and book sessions with confidence — all in one place.",
  className,
}: Hero7Props) => {
  return (
    <section
      className={cn(
        "relative w-full min-h-screen bg-[url('/tutor-girl-home-writing-new-information_23-2148511025.jpg')] bg-cover bg-center bg-no-repeat mb-10",
        className
      )}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center min-h-screen px-6 sm:px-10 lg:px-20">
        <div className="flex flex-col items-center gap-6 max-w-5xl text-center">
          <h1 className="text-3xl lg:text-6xl font-semibold text-white">{heading}</h1>
          <p className="text-white lg:text-lg text-balance">{description}</p>

          <Link
            href="/tutors"
            className="inline-block mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg max-w-max hover:bg-gray-300 transition-colors"
          >
            Find All Tutors
          </Link>
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
