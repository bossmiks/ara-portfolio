import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import PrintableResume from "@/components/PrintableResume";
import SkillsSection from "@/components/SkillsSection";
import { 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award,
  CheckCircle2,
  Brain,
  Cpu,
  Database,
  Globe,
  GitBranch,
  Palette,
  Wrench,
  Target,
  Bot
} from "lucide-react";

const Resume = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("skills");

  const education = [
    {
      institution: "Southern Luzon Technological College Foundation, Inc.",
      degree: "Bachelor Degree",
      field: "Bachelor of Science in Information System (Specialization in Web Development and IoT & Smart Systems)",
      duration: "2021 - 2025",
      gpa: "1.25",
      location: "Legazpi City, Albay",
    },
    {
      institution: "Sorsogon National High School",
      degree: "Senior High School",
      field: "TVL-Drafting and Animation",
      duration: "2019 - 2021",
      gpa: "91%",
      location: "Sorsogon City, Sorsogon",
    },
  ];

  const experience = [

     {
    position: "Software Engineer Full-time",
    company: "Quanby Solution, Inc.",
    duration: "Present",
    description: "Designing, developing, and maintaining scalable web applications by implementing full-stack solutions, optimizing performance, and ensuring high-quality user experiences.",
responsibilities: [
  "Built and optimized front-end interfaces with React, JavaScript, HTML, and CSS to deliver responsive and user-friendly designs",
  "Developed and maintained RESTful APIs and backend services using Node.js and Express",
  "Integrated and managed relational and cloud databases (MySQL, Supabase) for efficient data handling",
  "Collaborated with cross-functional teams to deliver new features, resolve issues, and improve system reliability",
]
    },
    
      {
     position: "Web Developer Intern",
    company: "Quanby Solution, Inc.",
    duration: "June 2023 - 2024",
    description: "Assisted in developing and maintaining web applications, contributing to front-end and back-end features while gaining hands-on experience in modern web technologies.",
responsibilities: [
  "Developed responsive front-end interfaces using HTML, CSS, JavaScript, and React",
  "Assisted in building RESTful APIs and server-side features with Node.js and Express",
  "Worked with databases (MySQL, Supabase) for data storage and retrieval",
  "Collaborated with the development team on debugging, testing, and feature enhancements",
]
    },
    {
      position: "Freelance Developer",
      company: "Self-employed",
      duration: "January 2023 - Present",
      description: "Working as a freelance developer on various projects, specializing in web development and IoT & Smart Systems.",
     responsibilities: [
  "Designed and deployed full-stack web applications using modern frameworks (React, Node.js)",
  "Developed IoT-based solutions integrating microcontrollers, sensors, and cloud services",
  "Collaborated with clients to gather requirements and deliver tailored solutions",
  "Ensured code quality, documentation, and scalable project architecture"
]
    },
  ];

  const projects = [
    {
      title: "Event and Booking Management System",
      description: "A system to manage events and bookings for a local community center.",
      technologies: ["PHP", "JavaScript", "SQL", "HTML", "CSS", "Bootstrap"],
      duration: "01/2024 - 04/2024",
      type: "Web Development",
      accomplishments: [
        "Developed comprehensive booking system with calendar integration",
        "Implemented user authentication and role-based access control",
        "Created responsive interface for both desktop and mobile users"
      ]
    },
    {
      title: "InternNet: A Smart OJT Placement and Management Portal",
      description: "A web application to help OJT employers manage their placement process and students.",
      technologies: ["PHP", "JavaScript", "SQL", "HTML", "CSS", "Bootstrap"],
      duration: "08/2023 - 12/2023",
      type: "Academic Project",
      accomplishments: [
        "Built matching algorithm for students and employers",
        "Implemented document management system for OJT requirements",
        "Created dashboard for tracking student progress and evaluations"
      ]
    },
    {
      title: "Manual Besom: IoT-based sustainable cleaning system",
      description: "An IoT system to monitor and clean a room using a manual cleaning robot.",
      technologies: ["C++", "Arduino", "ESP8266"],
      duration: "03/2024 - 06/2024",
      type: "IoT Project",
      accomplishments: [
        "Designed autonomous navigation system for cleaning robot",
        "Integrated multiple sensors for obstacle detection and mapping",
        "Implemented remote monitoring through mobile application"
      ]
    },
    {
      title: "Smart Trash Bin: Automated waste management with Arduino",
      description: "An IoT system to monitor and manage waste disposal using an Arduino board.",
      technologies: ["C++", "Arduino", "Ultrasonic Sensor"],
      duration: "09/2023 - 11/2023",
      type: "IoT Project",
      accomplishments: [
        "Developed automatic lid opening mechanism using servo motors",
        "Implemented waste level monitoring with real-time notifications",
        "Created data logging system for waste management analytics"
      ]
    },
    {
      title: "Personal Portfolio",
      description: "A responsive personal portfolio website showcasing projects and skills.",
      technologies: ["React", "Node.js", "HTML", "CSS"],
      duration: "05/2024 - 07/2024",
      type: "Web Development",
      accomplishments: [
        "Built modern responsive design with smooth animations",
        "Implemented contact form with email integration",
        "Optimized for SEO and fast loading performance"
      ]
    },
  ];

  const certifications = [
    {
      name: "Security Operatoins Fundamentals",
      issuer: "paloalto",
      date: "December 2023",
      skills: "Security Operations, Incident Response, Threat Detection",
      credential: "PST-SOF-2023"
    },
    {
      name: "Cloud Security Fundamentals",
      issuer: "paloalto",
      date: "December 2023",
      skills: "Cloud Security, Identity and Access Management, Threat Detection",
      credential: "MSLI-CSF-2023"
    },
    {
      name: "Network Security Fundamentals",
      issuer: "paloalto",
      date: "January 2024",
      skills: "Network Security, Firewalls, Intrusion Detection",
      credential: "ISB-NSF-2024"
    },
    {
      name: "Internet Computer Protocol (ICP) Blockchain",
      issuer: "SparkPoint",
      date: "March 2023",
      skills: "Internet Computer Protocol, Blockchain, Smart Contracts",
      credential: "SP-ICP-2023"
    },
    {
      name: "DEVCON Legazpi Code Camp Mentors Training",
      issuer: "DEVCON Legazpi",
      date: "April 2024",
      skills: "Mentorship, Software Development, Problem Solving, Collaboration, Leadership",
      credential: "DEVCON-LEG-2024"
    },
      {
      name: "Node key NFT Workshop",
      issuer: "BitPinas",
      date: "June 2024",
      skills: "Blockchain, NFTs, Smart Contracts, Web3 Development, Digital Asset Management",
      credential: "BP-NFT-2024"
    },
      {
      name: "Philippines Startup Awareness of the DICT2023",
      issuer: "BitPinas",
      date: "May 2023",
       skills: "Startup Ecosystem, Entrepreneurship, Innovation, Business Development, Tech Industry Awareness",
      credential: "BP-SAW-2023"
    },
  ];

  const softSkills = [
    { skill: "Problem Solving", description: "Analytical approach to complex technical challenges" },
    { skill: "Communication", description: "Clear technical and non-technical communication" },
    { skill: "Team Collaboration", description: "Effective work in cross-functional teams" },
    { skill: "Adaptability", description: "Quick learning of new technologies and methodologies" },
    { skill: "Time Management", description: "Efficient project delivery within deadlines" },
    { skill: "Critical Thinking", description: "Analytical evaluation of solutions and approaches" },
  ];

  const resumeHighlights = [
    { 
      title: "IoT & Smart Systems Specialist", 
      description: "Specialized in IoT systems and smart device integration with practical implementation experience",
      icon: <Brain className="h-8 w-8 text-brand-purple" />
    },
    { 
      title: "Full-Stack Developer", 
      description: "Proficient in both front-end and back-end technologies, creating complete web solutions",
      icon: <Code className="h-8 w-8 text-brand-purple" />
    },
    { 
      title: "Web Developer", 
      description: "Experienced in building web applications using react framework and plain HTML and CSS",
      icon: <Cpu className="h-8 w-8 text-brand-purple" />
    },
    { 
      title: "Data Analyst", 
      description: "Skilled in data analysis, visualization, and extracting actionable insights",
      icon: <Database className="h-8 w-8 text-brand-purple" />
    },
  ];

  const tabContent = {
    skills: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {resumeHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-panel p-6 rounded-lg flex items-start backdrop-blur-md border border-white/10"
            >
              <div className="mr-4 bg-brand-purple/10 p-3 rounded-full">
                {highlight.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-white">{highlight.title}</h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <SkillsSection />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="glass-panel p-6 rounded-lg backdrop-blur-md border border-white/10"
        >
          <h3 className="text-xl font-semibold mb-6 text-white">Soft Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {softSkills.map((item, index) => (
              <div key={index} className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium text-lg mb-1">{item.skill}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    ),
    education: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {education.map((edu, index) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-panel p-6 rounded-lg"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
              <div className="flex-1">
                <div className="flex items-start">
                  <div className="bg-brand-purple/10 p-2 rounded-full mr-4 hidden md:block">
                    <GraduationCap className="h-6 w-6 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <div className="text-lg mt-1">{edu.institution}</div>
                    <div className="text-muted-foreground mt-1">{edu.field}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end text-right">
                <div className="px-3 py-1 rounded-full text-sm bg-brand-purple/10 text-brand-purple">
                  {edu.gpa}
                </div>
                <div className="text-sm text-muted-foreground mt-2">{edu.duration}</div>
                <div className="text-sm text-muted-foreground mt-1">{edu.location}</div>
              </div>
            </div>
            <div className="mt-4 pl-4 border-l-2 border-brand-purple/30">
              <h4 className="font-medium mb-2">Key Courses:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {edu.institution.includes("Southern Luzon") ? (
                  <>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Computer Programming
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Software Engineering
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Data Structures and Algorithms
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Database Management Systems
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Enterprise Systems
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Data Analytics
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Artificial Intelligence in IS
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Information Security & Assurance
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Web Technologies
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Cloud Computing
                    </li>
                  </>
                ) : (
                  <>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Technical Drafting
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Computer-Aided Design
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      2D/3D Animation
                    </li>
                    <li className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 bg-brand-purple rounded-full mr-2"></span>
                      Digital Graphics
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    ),
    experience: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {experience.map((exp, index) => (
          <motion.div
            key={exp.position}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-panel p-6 rounded-lg"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
              <div className="flex-1">
                <div className="flex items-start">
                  <div className="bg-brand-purple/10 p-2 rounded-full mr-4 hidden md:block">
                    <Briefcase className="h-6 w-6 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                    <div className="text-lg mt-1">{exp.company}</div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground md:text-right">
                {exp.duration}
              </div>
            </div>
            <p className="text-muted-foreground mb-4 pl-0 md:pl-12">{exp.description}</p>
            <div className="pl-0 md:pl-12">
              <h4 className="font-medium mb-2">Key Responsibilities:</h4>
              <ul className="space-y-2">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-purple mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    ),
    projects: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-panel p-6 rounded-lg"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs py-1 px-3 bg-brand-purple/10 text-brand-purple rounded-full">
                  {project.type}
                </span>
                <span className="text-xs text-muted-foreground">
                  {project.duration}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Key Accomplishments:</h4>
              <ul className="space-y-2">
                {project.accomplishments.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-purple mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="text-xs py-1 px-3 bg-secondary rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    ),
    certifications: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-panel p-6 rounded-lg"
          >
            <div className="flex items-start">
              <div className="bg-brand-purple/10 p-2 rounded-full mr-4 flex-shrink-0">
                <Award className="h-5 w-5 text-brand-purple" />
              </div>
              <div>
                <h3 className="font-semibold">{cert.name}</h3>
                <div className="text-sm text-muted-foreground mb-2">
                  {cert.issuer} • {cert.date}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {cert.skills.split(', ').map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 bg-secondary inline-block rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                {cert.credential && (
                  <div className="text-xs text-muted-foreground">
                    Credential ID: {cert.credential}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    ),
  };

  return (
    <Layout>
      <section className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-brand-purple/10 text-brand-purple mb-4 backdrop-blur-sm border border-brand-purple/20">
              Resume
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <AnimatedText text="Professional Experience" once />
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground">
                I'm an aspiring developer specializing in web development, AI, and machine learning.
                My goal is to leverage these technologies to create innovative solutions for real-world problems.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-12"
          >
            <PrintableResume />
          </motion.div>

          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: "skills", icon: <Code className="h-5 w-5" />, label: "Skills" },
                { id: "education", icon: <GraduationCap className="h-5 w-5" />, label: "Education" },
                { id: "experience", icon: <Briefcase className="h-5 w-5" />, label: "Experience" },
                { id: "projects", icon: <Code className="h-5 w-5" />, label: "Projects" },
                { id: "certifications", icon: <Award className="h-5 w-5" />, label: "Certifications" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors backdrop-blur-sm border ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white border-white/30"
                      : "bg-black/20 text-gray-300 hover:bg-black/30 border-gray-600/30"
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="min-h-[400px]">
            {tabContent[activeTab as keyof typeof tabContent]}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resume;
