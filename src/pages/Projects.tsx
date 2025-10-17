import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import ProjectCard from "@/components/ProjectCard";
import { 
  Bot, 
  MonitorSmartphone,
  Database,
  Cpu,
  Filter,
  Search,
  Code,
  Brain,
  BarChart
} from "lucide-react";

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: 1,
      title: "Event and Booking Management System",
      description: "A system to manage events and bookings for a local community center.",
      image: "https://images.unsplash.com/photo-1649433391719-2e784576d044?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Qm9va2luZ3xlbnwwfHwwfHx8MA%3D%3Ds",
      tags: ["PHP", "JavaScript", "SQL","HTML","CSS","Bootstrap"],
      code: "",
      category: "web"
    },
    {
      id: 2,
      title: "InternNet: A Smart  OJT Placement and Management Portal",
      description: "A web application to help OJT employers manage their placement process and students.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      tags: ["PHP", "JavaScript", "SQL","HTML","CSS","Bootstrap"],
      code: "",
      category: "web"
    },
    {
      id: 3,
      title: "Manual Besom: IoT-based sustainable cleaning system",
      description: "An IoT system to monitor and clean a room using a manual cleaning robot.",
      image: "https://images.unsplash.com/photo-1559819614-81fea9efd090?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFyZHVpbm98ZW58MHx8MHx8fDA%3D",
      tags: ["C++", "Arduino", "ESP8266"],
      category: "iot"
    },
    {
      id: 4,
      title: "Smart Trash Bin: Automated waste management with Arduino",
      description: "An IoT system to monitor and manage waste disposal using an Arduino board.",
      image: "https://media.istockphoto.com/id/1367145837/photo/data-management-with-computer-trash-banner-abstract-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=VW5CemgZ5kwE4KVEpmGj5y8xz1WVoDMsP2EAHxe4DfQ=",
      tags: ["C++", "Arduino", "ultrasonic sensor"],
      category: "iot"
    },
    {
      id: 5,
      title: "Personal Portfolio",
      description: "A responsive personal portfolio website showcasing projects and skills.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Node", "HTML","CSS"],
      code: "",
      category: "web"
    },
    {
      id: 6,
      title: "Syntax Cafe UI/UX Design",
      description: "A responsive UI/UX design for a fictional coffee shop.",
      image: "https://angie-portfolio-4p2c.vercel.app/src/atwsyntax.png",
      tags: ["UI/UX Design", "Canve", "Figma"],
      code: "",
      category: "ui"
    },
     {
      id: 7,
      title: "Qbyfi Internet UI/UX Design",
      description: "A responsive UI/UX design for a fictional internet service provider.",
      image: "https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-1/449711517_122108712506376081_3656056059964631465_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeGqlnorGHtanXzK-l9cg0xA2-YDVmZS4ZLb5gNWZlLhknGAwjObwXbHVTmL3H2Xks0prTeaS1NQnZF0PCbQZfcP&_nc_ohc=ULSJ9NS1pLYQ7kNvwFeaeU7&_nc_oc=AdmrlhDoBpR5_rYaRGKlC2HDBcon_LMnBjBSZQayy6vQHrE42kL0reyVDqZuRJ-Gv_8&_nc_zt=24&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=8jdb6p8b56GGEPzJoMj1QA&oh=00_AfadxQrYlw3xEq8jdzi0tgrSaU4p82lkH8sc6FKskOAf5A&oe=68E026D6",
      tags: ["UI/UX Design", "Canve", "Figma"],
      code: "",
      category: "ui"
    },
     {
      id: 8,
      title: "Smart Irrigation System",
      description: "An IoT system to monitor and control irrigation using sensors and actuators.",
      image: "https://images.unsplash.com/photo-1557855506-3619a44bab73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QXJkdWlub3xlbnwwfHwwfHx8MA%3D%3D",
      tags: ["Arduino", "Soil Moisture Sensor", "Actuator", "LCD/OLED Display"],
      code: "",
      category: "iot"
    },
     {
      id: 9,
      title: "Boarder's Compass site google",
      description: "A responsive website for a fictional boarder's compass service.",
      image: "/uploads/image.jpg",
      tags: ["UI/UX Design","Google site", "Canva"],
      code: "",
      category: "ui"
    },
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case "ai":
        return Bot;
      case "web":
        return MonitorSmartphone;
      case "blockchain":
        return Database;
      case "iot":
        return Cpu;
      case "ml":
        return Brain;
      case "data":
        return BarChart;
      default:
        return Code;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === "all" || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "iot", name: "IoT & Smart Systems" },
    { id: "ui", name: "UI/UX Design" },
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
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-brand-purple/10 text-brand-purple mb-4">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <AnimatedText text="My Projects" once />
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground">
                Explore a collection of my recent work across various technologies and domains.
              </p>
            </div>
          </motion.div>

          {/* Filter and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(155, 135, 245, 0.1)" }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between glass-panel p-6 rounded-lg">
              {/* Category Filter */}
              <div className="flex items-center">
                <Filter className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="mr-4 text-sm font-medium">Filter:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <motion.button
                      key={category.id}
                      onClick={() => setFilter(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                        filter === category.id 
                          ? "bg-white/30 text-white backdrop-blur-sm border border-white/50" 
                          : "bg-white/10 hover:bg-white/20 text-muted-foreground backdrop-blur-sm border border-white/20"
                      }`}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </div>
                <motion.input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(155, 135, 245, 0.3)" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  category={project.category}
                  icon={getIcon(project.category)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 glass-panel rounded-lg"
              >
                <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
                <motion.button
                  onClick={() => {
                    setFilter("all");
                    setSearchTerm("");
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: "#8B5CF6" }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-brand-purple text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
