import React, { useState } from 'react';
import { ArrowDown, Download, Linkedin, Github, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ProjectsSection } from '@/components/ProjectsSection';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);

  const handleDownloadResume = () => {
    window.open('https://github.com/gsaikrishna8/gnana-sai-krishna-portfolio/blob/main/G%20Gnana%20Sai%20Krishna%20Resume.pdf', '_blank');
    toast({
      title: "Resume download started!",
      description: "Your resume is being downloaded.",
    });
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/gnana-sai-krishna/', '_blank');
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/gsaikrishna8', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:bestasaikri1998@gmail.com', '_blank');
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      toast({
        title: "Message sent!",
        description: "I'll reply shortly.",
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
      // Add shake animation class to form
      const form = e.target as HTMLFormElement;
      form.classList.add('animate-bounce');
      setTimeout(() => form.classList.remove('animate-bounce'), 500);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleExperience = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  const skills = {
    Frontend: ['React.js', 'Redux', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Material UI'],
    Backend: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'],
    'Cloud & Infrastructure': ['Microsoft Azure', 'Terraform', 'Azure DevOps', 'CI/CD', 'PowerShell'],
    Databases: ['MySQL', 'MongoDB', 'Azure Cosmos DB'],
    Testing: ['Jest', 'React Testing Library'],
    'Version Control & CI/CD': ['Git', 'GitHub', 'Azure Repos', 'Azure DevOps']
  };

  const experiences = [
    {
      title: 'Administrator',
      company: 'Microland, Bangalore, Karnataka, India',
      period: 'Jan 2022 – Present',
      summary: 'Developed and optimized scalable web applications and managed cloud infrastructure.',
      details: [
        'Developed and optimized scalable web applications using React.js, Redux, TypeScript, and Node.js, improving responsiveness and reducing load times by 35%',
        'Integrated third-party APIs and optimized RESTful API performance, reducing response times by 30% for better application efficiency',
        'Developed and managed CI/CD pipelines in Azure DevOps, automating build, testing, and deployment, reducing manual efforts by 40%',
        'Implemented PowerShell scripts for infrastructure automation, log analysis, and deployment, enhancing system reliability and performance',
        'Worked on cloud infrastructure provisioning using Terraform on Azure, ensuring scalability, high availability, and continuous integration',
        'Optimized user retrieval logic in the backend, reducing query execution time by 40% for 1,500+ users',
        'Implemented pagination and indexing in Azure Cosmos DB/MySQL/MongoDB, improving response time for large datasets',
        'Collaborated with UI/UX teams to implement responsive web designs, enhancing user experience across different platforms',
        'Participated in Agile methodologies including sprint planning and daily stand-ups, ensuring efficient delivery of features and bug fixes',
        'Worked on connected applications and IoT integration, improving functionality within enterprise networks and cloud platforms'
      ]
    },
    // {
    //   title: 'Graduate Engineer Trainee',
    //   company: 'Microland, Bangalore, Karnataka, India',
    //   period: '2021 – 2022',
    //   summary: 'Started my journey at Microland with hands-on training in application support and cloud fundamentals.',
    //   details: [
    //     'Hands-on training with Azure cloud services, React Native, and REST APIs',
    //     'Learned the fundamentals of application support and cross-team collaboration',
    //     'Gained foundational knowledge in cloud basics that shaped my career in cloud infrastructure',
    //     'Contributed to internal projects and helped document system architecture',
    //     'Collaborated with cross-functional teams on cloud-native solutions',
    //     'Built strong foundations in enterprise software development practices'
    //   ]
    // }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Block */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl text-muted-foreground font-normal">
                  👋 Meet G Gnana Sai Krishna
                </h1>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                  Full Stack Developer · Cloud Application Developer
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                <strong>3.5+ years</strong> of crafting scalable, cloud-ready applications at <strong>Microland, Bangalore</strong>.
              </p>
              <blockquote className="text-lg md:text-xl text-foreground italic border-l-4 border-primary pl-6">
                I love bringing ideas to life with clean, performant code and building enterprise-grade projects that scale for thousands of users.
              </blockquote>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={handleDownloadResume}
                className="px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
              <Button 
                variant="outline"
                onClick={handleLinkedInClick}
                className="px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </Button>
              <Button 
                variant="outline"
                onClick={handleGitHubClick}
                className="px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl overflow-hidden">
                <img 
                  src="https://github.com/gsaikrishna8.png?size=400"
                  alt="G Gnana Sai Krishna"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-xl">
                <span className="text-primary-foreground text-2xl font-bold">GSK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                🧭 About Me
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate <strong>Full Stack Developer</strong> at <strong>Microland, Bangalore</strong>, who loves crafting scalable, cloud-ready applications and bringing ideas to life with clean, performant code. I work on enterprise-grade projects using <strong>React.js, TypeScript, Node.js, and Azure Cosmos DB</strong>, where I optimize web app performance and responsiveness for thousands of users.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Key Achievements:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>⚡ <strong>Reduced load times by 35%</strong> with React.js and Node.js optimizations</li>
                    <li>🔗 <strong>Improved API efficiency by 30%</strong> through smart integration and RESTful API tuning</li>
                    <li>🚀 <strong>Automated CI/CD pipelines</strong> with Azure DevOps, cutting manual effort by 40%</li>
                    <li>☁️ Worked with <strong>Terraform on Azure</strong> for scalable cloud infrastructure provisioning</li>
                    <li>📊 Enhanced database queries with pagination + indexing, <strong>reducing execution time by 40%</strong></li>
                    <li>🌐 Explored <strong>IoT integrations</strong>, connecting apps to enterprise networks and cloud platforms</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">What I Enjoy:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Building intuitive UIs and smooth user experiences</li>
                    <li>• Designing reliable backend systems that scale</li>
                    <li>• Exploring IoT and cloud integrations</li>
                    <li>• Constantly learning new tools and technologies to solve real-world problems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-foreground mb-8">🛠️ Skills & Tech Stack</h3>
              
              <div className="space-y-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-semibold text-foreground">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer"
                          title={`Experience with ${skill}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              💼 Work Experience
            </h2>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-muted-foreground">{exp.period}</p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => toggleExperience(index)}
                      className="p-2"
                    >
                      {expandedExperience === index ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground">{exp.summary}</p>
                  
                  {expandedExperience === index && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <ul className="space-y-2 text-muted-foreground">
                        {exp.details.map((detail, idx) => (
                          <li key={idx}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              🎓 Education
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="p-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">B.E., Electronics & Communication</h3>
                <p className="text-primary font-medium">G. Pullaiah College Of Engineering & Technology</p>
                <p className="text-muted-foreground">2016 – 2021</p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Intermediate, MPC</h3>
                <p className="text-primary font-medium">Narayana Institutions, Kurnool</p>
                <p className="text-muted-foreground">2014 – 2016</p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">SSC</h3>
                <p className="text-primary font-medium">Sri Lakshmi High School, Kurnool</p>
                <p className="text-muted-foreground">2013 – 2014</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Dynamic Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              📬 Contact
            </h2>
            <p className="text-xl text-muted-foreground">
              I'm open to freelance, collaborations, mentorship, or full-time engineering roles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={formErrors.name ? 'border-destructive' : ''}
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <p className="text-destructive text-sm">{formErrors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value && !validateEmail(e.target.value)) {
                        setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
                      }
                    }}
                    className={formErrors.email ? 'border-destructive' : ''}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-destructive text-sm">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full py-6 text-lg transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Social Links */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Connect With Me</h3>
                <p className="text-muted-foreground">
                  Feel free to reach out through any of these channels. I'm always excited to discuss new opportunities and innovative ideas.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={handleLinkedInClick}
                  className="w-full justify-start p-6 text-lg transition-all duration-300"
                >
                  <Linkedin className="mr-3 h-5 w-5" />
                  LinkedIn
                </Button>

                <Button
                  variant="outline"
                  onClick={handleGitHubClick}
                  className="w-full justify-start p-6 text-lg transition-all duration-300"
                >
                  <Github className="mr-3 h-5 w-5" />
                  GitHub
                </Button>

                <Button
                  variant="outline"
                  onClick={handleEmailClick}
                  className="w-full justify-start p-6 text-lg transition-all duration-300"
                >
                  <Mail className="mr-3 h-5 w-5" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-24 bg-card border-t">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 G Gnana Sai Krishna – Built with React · TailwindCSS · TypeScript · Designed for clarity
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;