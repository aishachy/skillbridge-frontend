
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
