// src/app/page.tsx
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronRight, Star, BrainCircuit, BookOpen, Share2 } from "lucide-react";
import Link from "next/link";
import { PublicPageLayout } from "@/components/public-page-layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function Home() {
  const testimonials = [
    {
      name: 'Sarah K., Teacher',
      role: 'High School Educator',
      text: "QuizForge has revolutionized how I create assessments. I can generate a unique quiz on any topic in minutes, saving me hours of work each week. The students find it engaging too!",
    },
    {
      name: 'Michael B., Corporate Trainer',
      role: 'L&D Manager',
      text: "We use QuizForge for our internal training programs. The AI's ability to create varied and challenging questions is impressive. It's a fantastic tool for reinforcing learning.",
    },
     {
      name: 'David L., Student',
      role: 'University Student',
      text: "I use QuizForge to create practice tests for myself. It's a great way to study and test my knowledge on different subjects before exams. Super easy to use!",
    },
    {
      name: 'Emily R., Homeschooling Parent',
      role: 'Parent & Educator',
      text: "As a homeschooling parent, QuizForge is a lifesaver. I can instantly create fun and educational quizzes for my kids on any subject they're interested in.",
    },
    {
      name: 'John S., Developer',
      role: 'Tech Bootcamp Student',
      text: "I use QuizForge to quickly generate quizzes on programming concepts. It helps me verify my understanding and prepare for technical interviews. Highly recommended!",
    },
    {
      name: 'Maria G., HR Professional',
      role: 'Human Resources',
      text: "We've integrated QuizForge into our onboarding process. It's a simple and effective way to ensure new hires have grasped the essential company knowledge.",
    },
  ];

  return (
    <PublicPageLayout>
        <div className="flex flex-col items-center overflow-x-hidden -mt-12">

        {/* Hero Section */}
        <section className="w-full grid-bg relative">
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
           <div className="container mx-auto text-center py-24 md:py-32 relative z-10">
            <Badge variant="outline" className="mb-4 bg-card/50 backdrop-blur">
              <Star className="w-3 h-3 mr-1.5 fill-current" />
              Powered by the latest AI models
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4">
              Create Engaging Quizzes in Seconds with AI
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground mb-8">
              Stop spending hours creating quizzes. With QuizForge, just enter a topic and let our AI do the hard work. Perfect for educators, trainers, and lifelong learners.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/signup">
                  Get Started For Free <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28">
          <div className="container mx-auto text-center">
            <Badge variant="secondary" className="mb-2">Features</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The Smartest Way to Build Quizzes</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
              QuizForge is packed with features designed to make quiz creation effortless and effective.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <Card className="bg-card/50">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <BrainCircuit className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">AI-Powered Generation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Just provide a topic, and our advanced AI will generate relevant, high-quality multiple-choice questions and answers in an instant.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Customizable Difficulty</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Tailor your quizzes to any knowledge level. Choose from easy, medium, or hard difficulty settings to challenge your audience appropriately.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Share2 className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Instant Results & Scoring</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Get immediate feedback with automatic scoring. Review answers, identify knowledge gaps, and track performance with ease.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="w-full py-20 md:py-28 bg-card/30">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-2">How It Works</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Create a Quiz in 3 Simple Steps</h2>
              <p className="text-muted-foreground mb-8">
                We've simplified the quiz creation process so you can focus on what matters most: learning and assessment.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary font-bold rounded-full h-8 w-8 flex items-center justify-center shrink-0">1</div>
                  <div><span className="font-semibold text-foreground">Enter Your Topic:</span> Simply type any subject, from "World War II" to "JavaScript Fundamentals".</div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary font-bold rounded-full h-8 w-8 flex items-center justify-center shrink-0">2</div>
                  <div><span className="font-semibold text-foreground">Set Parameters:</span> Choose the number of questions and the desired difficulty level.</div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary font-bold rounded-full h-8 w-8 flex items-center justify-center shrink-0">3</div>
                  <div><span className="font-semibold text-foreground">Generate & Share:</span> Click generate! Your quiz is ready to be taken, shared, or even printed.</div>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <Card className="bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-bold">95%</CardTitle>
                    <CardDescription>Time Saved Compared to Manual Creation</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-background/50">
                   <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-bold">10,000+</CardTitle>
                    <CardDescription>Quizzes Generated by Our Users</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-background/50">
                   <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-bold">Infinite</CardTitle>
                    <CardDescription>Topics at Your Fingertips</CardDescription>
                  </CardHeader>
                </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-28">
          <div className="container mx-auto text-center">
            <Badge variant="secondary" className="mb-2">Pricing</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Simple Plans for Everyone</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
              Choose a plan that fits your needs. Start for free, and upgrade when you're ready for more power.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For individuals and casual use.</CardDescription>
                  <p className="text-4xl font-bold pt-4">$0 <span className="text-sm font-normal text-muted-foreground">/month</span></p>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />5 Quizzes per month</li>
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Up to 10 questions per quiz</li>
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Standard AI model</li>
                    </ul>
                </CardContent>
                <CardFooter>
                   <Button className="w-full" variant="ghost" asChild><Link href="/signup">Get Started</Link></Button>
                </CardFooter>
              </Card>
              <Card className="border-primary/50 ring-2 ring-primary/50 shadow-lg">
                 <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For educators, trainers, and power users.</CardDescription>
                  <p className="text-4xl font-bold pt-4">$10 <span className="text-sm font-normal text-muted-foreground">/month</span></p>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                     <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Unlimited Quizzes</li>
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Up to 50 questions per quiz</li>
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Advanced AI model</li>
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Priority Support</li>
                    </ul>
                </CardContent>
                <CardFooter>
                   <Button className="w-full" asChild><Link href="/signup">Choose Pro</Link></Button>
                </CardFooter>
              </Card>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                  <CardDescription>For schools and organizations.</CardDescription>
                  <p className="text-4xl font-bold pt-4">Contact Us</p>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Everything in Pro</li>
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Multi-user accounts</li>
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Centralized billing</li>
                      <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Dedicated Support</li>
                    </ul>
                </CardContent>
                <CardFooter>
                   <Button className="w-full" variant="ghost">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="w-full py-20 md:py-28 bg-card/30">
          <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Loved by Educators and Learners</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
                Don't just take our word for it. Here's what our users have to say.
              </p>
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 2000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1 h-full">
                        <Card className="bg-background/50 text-left h-full flex flex-col">
                          <CardContent className="pt-6 flex-grow">
                            <p className="italic">&quot;{testimonial.text}&quot;</p>
                          </CardContent>
                          <CardFooter className="flex items-center gap-4 pt-4 mt-auto">
                            <div className="flex flex-col">
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-28">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Your Questions, Answered</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
                Find answers to common questions about QuizForge.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What kind of topics can I create quizzes on?</AccordionTrigger>
                <AccordionContent>
                  Literally anything! Our AI is trained on a vast range of information. You can create quizzes on history, science, literature, coding, pop culture, and much more. If you can think of it, QuizForge can create a quiz for it.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                <AccordionContent>
                  We have a free "Basic" plan that you can use forever. It allows you to create up to 5 quizzes per month. If you need more, you can upgrade to our Pro plan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I share the quizzes I create?</AccordionTrigger>
                <AccordionContent>
                  Yes! Once you generate a quiz, you can easily share it with others. We're working on features to provide a unique link for each quiz you create.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-20 md:py-28 bg-card/30">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-12">
                Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <Card className="max-w-xl mx-auto bg-background/50">
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." rows={5} />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
}
