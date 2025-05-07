// Data for the portfolio website

// Project type definition
export type Project = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    tools: string[];
    link?: string;
    featured: boolean;
  };
  
  // Service type definition
  export type Service = {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
  
  // Testimonial type definition
  export type Testimonial = {
    id: string;
    name: string;
    company: string;
    avatar: string;
    quote: string;
  };
  
  // Skill type definition
  export type Skill = {
    name: string;
    level: number;
  };
  
  // Projects data
  export const projects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Website Redesign',
      description: 'Complete redesign of an e-commerce platform, improving user experience and increasing conversion rates by 35%.',
      imageUrl: 'https://images.pexels.com/photos/5076515/pexels-photo-5076515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Web Development',
      tools: ['React', 'Next.js', 'Tailwind CSS', 'Stripe'],
      link: 'https://example.com/project1',
      featured: true,
    },
    {
      id: '2',
      title: 'Financial Dashboard',
      description: 'Developed a comprehensive financial dashboard allowing users to track expenses, investments, and financial goals.',
      imageUrl: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Web Development',
      tools: ['React', 'TypeScript', 'D3.js', 'Firebase'],
      link: 'https://example.com/project2',
      featured: true,
    },
    {
      id: '3',
      title: 'Mobile Health App',
      description: 'Designed and developed a health tracking mobile application that helps users monitor fitness goals and nutrition.',
      imageUrl: 'https://images.pexels.com/photos/4031780/pexels-photo-4031780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Mobile Development',
      tools: ['React Native', 'Redux', 'Node.js', 'MongoDB'],
      link: 'https://example.com/project3',
      featured: false,
    },
    {
      id: '4',
      title: 'Restaurant Booking System',
      description: 'Created a reservation system for a chain of restaurants, streamlining the booking process and reducing no-shows.',
      imageUrl: 'https://images.pexels.com/photos/3880778/pexels-photo-3880778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Web Development',
      tools: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Twilio API'],
      link: 'https://example.com/project4',
      featured: true,
    },
    {
      id: '5',
      title: 'Educational Platform',
      description: 'Built an interactive learning platform for a coding bootcamp, including lesson management and student progress tracking.',
      imageUrl: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Web Development',
      tools: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
      link: 'https://example.com/project5',
      featured: false,
    },
    {
      id: '6',
      title: 'Real Estate Listing App',
      description: 'Developed a real estate platform allowing users to list properties, schedule viewings, and connect with agents.',
      imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Web Development',
      tools: ['Next.js', 'Firebase', 'Google Maps API', 'Tailwind CSS'],
      link: 'https://example.com/project6',
      featured: false,
    },
  ];
  
  // Services data
  export const services: Service[] = [
    {
      id: '1',
      title: 'Web Development',
      description: 'Custom web application development with modern frameworks like React and Next.js. From simple websites to complex web applications.',
      icon: 'code',
    },
    {
      id: '2',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile app development. Create smooth, performant applications that work on iOS and Android.',
      icon: 'smartphone',
    },
    {
      id: '3',
      title: 'UI/UX Design',
      description: 'User-centered design process to create intuitive, accessible, and visually appealing interfaces that delight users.',
      icon: 'palette',
    },
    {
      id: '4',
      title: 'E-commerce Solutions',
      description: 'End-to-end e-commerce implementation with payment processing, inventory management, and customer relationship tools.',
      icon: 'shopping-cart',
    },
  ];
  
  // Testimonials data
  export const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'Working with this freelancer was a game-changer for our business. The website they built exceeded our expectations and has significantly increased our online presence.',
    },
    {
      id: '2',
      name: 'Mark Thompson',
      company: 'Innovate Solutions',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'Incredible attention to detail and technical expertise. They delivered our project ahead of schedule and were a pleasure to work with throughout the process.',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      company: 'Creative Design Studio',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'I was blown away by the quality of work and professionalism. They took our vague ideas and transformed them into a beautiful, functional website that perfectly represents our brand.',
    },
  ];
  
  // Skills data
  export const skills: Skill[] = [
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'React & Next.js', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Database Design', level: 85 },
    { name: 'Mobile Development', level: 75 },
    { name: 'DevOps', level: 70 },
  ];
  
  // Nav links
  export const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#services', label: 'Services' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];