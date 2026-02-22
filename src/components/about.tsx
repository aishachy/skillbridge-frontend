import { FaSearch, FaCalendarAlt, FaBook } from "react-icons/fa";

export default function About() {
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
        <>

            {/* ================= HOW IT WORKS ================= */}
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

            {/* ================= PLATFORM METRICS ================= */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-16">
                        <p className="text-sm tracking-widest text-indigo-500 font-semibold uppercase">
                            Platform Metrics
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                            REAL-TIME IMPACT
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                        {[
                            { title: "Total Tutors", value: "15", icon: "👥" },
                            { title: "Active Students", value: "18", icon: "🎓" },
                            { title: "Expert Subjects", value: "10", icon: "📚" },
                            { title: "Global Reach", value: "9", icon: "🌍" },
                            { title: "Success Rate", value: "90%", icon: "📈" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition duration-300"
                            >
                                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-indigo-100 text-xl mb-4">
                                    {item.icon}
                                </div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide">
                                    {item.title}
                                </p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                    {item.value}
                                </h3>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
}