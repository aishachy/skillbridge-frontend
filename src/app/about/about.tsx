export default function About() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ===== PLATFORM METRICS ===== */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-indigo-500 font-semibold uppercase">
            Platform Metrics
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            REAL-TIME IMPACT
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-20">
          
          {/* Card */}
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

        {/* ===== HOW IT WORKS ===== */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How SkillBridge Works
          </h2>
          <p className="text-gray-500 mt-3">
            Your journey to mastery in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          {/* Step 1 */}
          <div>
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-indigo-100 text-2xl mb-6">
              🔍
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Find your match
            </h3>
            <p className="text-gray-500">
              Search by subject, price, or rating to find the perfect expert.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-indigo-100 text-2xl mb-6">
              📅
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Book a session
            </h3>
            <p className="text-gray-500">
              Choose a time that fits your schedule and book instantly.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-indigo-100 text-2xl mb-6">
              📖
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Start learning
            </h3>
            <p className="text-gray-500">
              Join your personalized 1-on-1 session via our secure platform.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}