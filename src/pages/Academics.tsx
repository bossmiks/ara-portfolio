
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { BookOpen } from "lucide-react";
import EducationCard from "@/components/EducationCard";
import CertificationCard from "@/components/CertificationCard";

const Academics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const education = [
    {
      id: 1,
      institution: "Southern Luzon Technological College Foundation, Inc.",
      degree: "Bachelor Degree",
      field: "Bachelor of Science in Information System (Specialization in Web Development and IoT & Smart Systems)",
      duration: "2021 - 2025",
      location: "Legazpi City, Albay",
      cgpa: "1.25",
      details: [
        "Specializing in Information Systems and Business Technology",
        "Key courses include Systems Analysis, Database Design, Business Process Management",
        "Actively participating in research projects related to Information Systems and Business Analytics"
      ]
    },
    {
      id: 2,
      institution: "Sorsogon National High School",
      degree: "Senior High School",
      field: "TVL-Drafting and Animation",
      duration: "2019 - 2021",
      location: "Sorsogon City, Sorsogon",
      cgpa: "91",
      details: [
        "Major subjects included Technical Drafting, Computer-Aided Design, 2D/3D Animation, Digital Graphics",
        "Highlights: Technical Drafting & Animation Design",
        "Developed strong foundation in design principles and digital animation"
      ]
    },
    {
      id: 3,
      institution: "Sorsogon National High School",
      degree: "Junior High School",
      field: "K-12 curriculum",
      duration: "2015 - 2019",
      location: "Sorsogon City, Sorsogon",
      cgpa: "85",
      details: [
        "Strong foundation in core academic subjects",
        "Developed critical thinking and problem-solving skills"
      ]
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "Security Operatoins Fundamentals",
      issuer: "paloalto",
      date: "December 2023",
      description: "Comprehensive training on security operations, incident response, and threat detection."
    },
    {
      id: 2,
      name: "Cloud Security Fundamentals",
      issuer: "paloalto",
      date: "December 2023",
      description: "In-depth training on cloud security, identity and access management, and threat detection."
    },
    {
      id: 3,
      name: "Network Security Fundamentals",
      issuer: "paloalto",
      date: "January 2024",
      description: "Introduction to network security, firewalls, and intrusion detection systems."
    },
    {
      id: 4,
      name: "Internet Computer Protocol (ICP) Blockchain",
      issuer: "SparkPoint",
      date: "March 2023",
      description: "Training on Internet Computer Protocol, blockchain technology, and smart contracts."
    },

  ];

  const courseHighlights = [
    "Computer Programming",
    "Software Engineering", 
    "Data Structures and Algorithms",
    "Database Management Systems",
    "Enterprise Systems",
    "Data Analytics",
    "Artificial Intelligence in IS",
    "Information Security & Assurance",
    "Web Technologies",
    "Cloud Computing"
  ];

  return (
    <Layout>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 mb-4">
              Academics
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <AnimatedText text="Educational Background" once />
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground">
                My academic journey, courses, and educational achievements that have shaped my technical expertise.
              </p>
            </div>
          </motion.div>

          {/* Education Cards */}
          <div className="mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold mb-12 text-center"
            >
              Education
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {education.map((edu, index) => (
                <EducationCard
                  key={edu.id}
                  institution={edu.institution}
                  degree={edu.degree}
                  field={edu.field}
                  duration={edu.duration}
                  location={edu.location}
                  cgpa={edu.cgpa}
                  details={edu.details}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Key Courses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(155, 135, 245, 0.1)" }}
            className="mb-24"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Key Courses</h2>
            
            <div className="glass-panel p-10 rounded-lg">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-teal-500/10 p-4 rounded-full">
                  <BookOpen className="h-8 w-8 text-teal-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseHighlights.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(155, 135, 245, 0.2)", 
                      color: "#9b87f5"
                    }}
                    className="flex items-center p-4 bg-secondary/50 rounded-lg"
                  >
                    <div className="h-2 w-2 rounded-full bg-teal-400 mr-3" />
                    <span>{course}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Certifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard 
                  key={cert.id}
                  name={cert.name}
                  issuer={cert.issuer}
                  date={cert.date}
                  description={cert.description}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Academics;
