import { motion } from "framer-motion";
import { Award, Users, Globe, Shield, Zap, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <section className="relative pt-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium">
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Empowering Event Success
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto mb-8">
            Since 2020, EventHub has been revolutionizing the way events are created,
            managed, and experienced across Nigeria and beyond.
          </p>
        </motion.div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-800 text-transparent bg-clip-text mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-zinc-600 mb-6">
                We&apos;re on a mission to democratize event management and make world-class
                event experiences accessible to everyone. By combining cutting-edge
                technology with local expertise, we&apos;re building the future of events
                in Africa.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: <Globe className="w-6 h-6 text-indigo-600" />,
                    title: "Pan-African Reach",
                    description: "Supporting events across the continent"
                  },
                  {
                    icon: <Shield className="w-6 h-6 text-indigo-600" />,
                    title: "Secure Platform",
                    description: "Enterprise-grade security for all events"
                  },
                  {
                    icon: <Zap className="w-6 h-6 text-indigo-600" />,
                    title: "Innovation First",
                    description: "Constantly evolving with new features"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="p-2 bg-indigo-50 rounded-lg">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                      <p className="text-zinc-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://img.freepik.com/free-photo/business-work-concept_1388-220.jpg?ga=GA1.1.1943856801.1730164010&semt=ais_hybrid"
                  alt="Team collaboration"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-800 text-transparent bg-clip-text mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              A diverse team of innovators, event enthusiasts, and tech experts
              working together to transform the events industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jane Doe",
                role: "CEO & Co-founder",
                bio: "Former event organizer with 10+ years experience in tech",
                image: "https://img.freepik.com/free-photo/happy-young-female-professional-posing-with-arms-folded_74855-2010.jpg?ga=GA1.1.1943856801.1730164010&semt=ais_hybrid"
              },
              {
                name: "Jane Doe",
                role: "Chief Technology Officer",
                bio: "Led engineering teams at major tech companies",
                image: "https://img.freepik.com/free-photo/happy-young-female-professional-posing-with-arms-folded_74855-2010.jpg?ga=GA1.1.1943856801.1730164010&semt=ais_hybrid"
              },
              {
                name: "Jane Doe",
                role: "Head of Operations",
                bio: "Scaled operations across 5 African countries",
                image: "https://img.freepik.com/free-photo/happy-young-female-professional-posing-with-arms-folded_74855-2010.jpg?ga=GA1.1.1943856801.1730164010&semt=ais_hybrid"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-2">{member.role}</p>
                <p className="text-zinc-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-800 text-transparent bg-clip-text mb-4">
              Our Values
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6 text-indigo-600" />,
                title: "Community First",
                description: "Building meaningful connections through events"
              },
              {
                icon: <Award className="w-6 h-6 text-indigo-700" />,
                title: "Excellence",
                description: "Setting the highest standards in event management"
              },
              {
                icon: <Heart className="w-6 h-6 text-indigo-700" />,
                title: "Passion",
                description: "Deeply committed to event success"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-zinc-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-semibold mb-6">
              Join Us in Shaping the Future of Events
            </h2>
            <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
              Whether you&apos;re an event organizer or attendee, be part of our growing
              community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
                Create Events
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                Join Our Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;