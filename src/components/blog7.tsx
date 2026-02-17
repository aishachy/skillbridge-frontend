// import { ArrowRight } from "lucide-react";

// import { cn } from "@/lib/utils";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";

// interface Post {
//   id: string;
//   title: string;
//   summary: string;
//   label: string;
//   author: string;
//   published: string;
//   url: string;
//   image: string;
// }

// interface Blog7Props {
//   tagline: string;
//   heading: string;
//   description: string;
//   buttonText: string;
//   buttonUrl: string;
//   posts: Post[];
//   className?: string;
// }

// const Blog7 = ({
//   tagline = "Latest Updates",
//   heading = "Blog Posts",
//   description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
//   buttonText = "View all articles",
//   buttonUrl = "https://shadcnblocks.com",
//   posts = [
//     {
//       id: "post-1",
//       title: "Getting Started with shadcn/ui Components",
//       summary:
//         "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
//       label: "Tutorial",
//       author: "Sarah Chen",
//       published: "1 Jan 2024",
//       url: "https://shadcnblocks.com",
//       image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
//     },
//     {
//       id: "post-2",
//       title: "Building Accessible Web Applications",
//       summary:
//         "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
//       label: "Accessibility",
//       author: "Marcus Rodriguez",
//       published: "1 Jan 2024",
//       url: "https://shadcnblocks.com",
//       image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
//     },
//     {
//       id: "post-3",
//       title: "Modern Design Systems with Tailwind CSS",
//       summary:
//         "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
//       label: "Design Systems",
//       author: "Emma Thompson",
//       published: "1 Jan 2024",
//       url: "https://shadcnblocks.com",
//       image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
//     },
//   ],
//   className,
// }: Blog7Props) => {
//   return (
//     <section className={cn("py-32", className)}>
//       <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
//         <div className="text-center">
//           <Badge variant="secondary" className="mb-6">
//             {tagline}
//           </Badge>
//           <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
//             {heading}
//           </h2>
//           <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
//             {description}
//           </p>
//           <Button variant="link" className="w-full sm:w-auto" asChild>
//             <a href={buttonUrl} target="_blank">
//               {buttonText}
//               <ArrowRight className="ml-2 size-4" />
//             </a>
//           </Button>
//         </div>
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
//           {posts.map((post) => (
//             <Card
//               key={post.id}
//               className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
//             >
//               <div className="aspect-16/9 w-full">
//                 <a
//                   href={post.url}
//                   target="_blank"
//                   className="transition-opacity duration-200 fade-in hover:opacity-70"
//                 >
//                   <img
//                     src={post.image}
//                     alt={post.title}
//                     className="h-full w-full object-cover object-center"
//                   />
//                 </a>
//               </div>
//               <CardHeader>
//                 <h3 className="text-lg font-semibold hover:underline md:text-xl">
//                   <a href={post.url} target="_blank">
//                     {post.title}
//                   </a>
//                 </h3>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">{post.summary}</p>
//               </CardContent>
//               <CardFooter>
//                 <a
//                   href={post.url}
//                   target="_blank"
//                   className="flex items-center text-foreground hover:underline"
//                 >
//                   Read more
//                   <ArrowRight className="ml-2 size-4" />
//                 </a>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export { Blog7 };
import { FaSearch, FaCalendarAlt, FaBook } from "react-icons/fa"; // using react-icons

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="w-6 h-6 text-purple-600" />,
      title: "Find your match",
      description:
        "Search by subject, price, or rating to find the perfect expert.",
    },
    {
      icon: <FaCalendarAlt className="w-6 h-6 text-purple-600" />,
      title: "Book a session",
      description:
        "Choose a time that fits your schedule and book instantly.",
    },
    {
      icon: <FaBook className="w-6 h-6 text-purple-600" />,
      title: "Start learning",
      description:
        "Join your personalized 1-on-1 session via our secure platform.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900">How SkillBridge Works</h2>
        <p className="text-gray-500 mt-2 mb-12">
          Your journey to mastery in three simple steps
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 p-4 rounded-full mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
