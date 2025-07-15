
// src/app/page.tsx
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronRight, Star, BrainCircuit, BookOpen, Share2, AreaChart, Target, Zap, TrendingUp } from "lucide-react";
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
        <div className="flex flex-col items-center w-full">

        {/* Hero Section */}
        <section className="w-full grid-bg relative">
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
           <div className="container mx-auto text-center py-20 md:py-28 relative z-10">
            <Badge variant="outline" className="mb-4 bg-card/50 backdrop-blur">
              <Star className="w-3 h-3 mr-1.5 fill-current" />
              Powered by the latest AI models
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 max-w-4xl mx-auto">
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
            </div>
          </div>
        </section>

        {/* New Modern Features Section */}
        <section className="relative w-full py-16 md:py-24 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute -z-10 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full"></div>
                <div className="absolute -z-10 w-96 h-96 left-48 top-24 bg-purple-500/20 blur-[120px] rounded-full"></div>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-card/50 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex flex-col items-start gap-4">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="font-bold text-lg">AI-Powered Generation</h3>
                        <Zap className="text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">Instantly create quizzes on any topic. Our AI generates relevant questions and answers in seconds.</p>
                </Card>
                <Card className="bg-card/50 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex flex-col items-start gap-4">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="font-bold text-lg">Interactive Learning</h3>
                        <BookOpen className="text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">Go beyond testing with our "Learn Mode" that provides instant explanations to reinforce concepts.</p>
                </Card>
                <Card className="bg-card/50 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex flex-col items-start gap-4">
                     <div className="flex items-center justify-between w-full">
                        <h3 className="font-bold text-lg">Performance Analytics</h3>
                        <TrendingUp className="text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">Track your progress, identify strengths, and pinpoint areas for improvement with our smart analytics.</p>
                </Card>
                <Card className="bg-card/50 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex flex-col items-start gap-4">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="font-bold text-lg">Customizable Difficulty</h3>
                        <Target className="text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">Tailor quizzes to your needs. Choose from easy, medium, or hard difficulty levels for a perfect challenge.</p>
                </Card>
            </div>
        </section>


        {/* How it Works Section */}
        <section className="w-full py-16 md:py-24 bg-card/30">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-2">How It Works</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Create a Quiz in 3 Simple Steps</h2>
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
        <section id="pricing" className="w-full py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
                <Badge variant="secondary" className="mb-2">Pricing</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Choose the Perfect Plan</h2>
                <p className="text-muted-foreground mb-12">
                Whether you're just starting or scaling up, QuizForge has a plan that fits your needs.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
              {/* Basic Plan */}
              <Card className="flex flex-col h-full border-border">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-2xl font-bold">Basic</CardTitle>
                  <CardDescription>For individuals and casual use.</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Button className="w-full" variant="outline" asChild><Link href="/signup">Get Started</Link></Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">Billed monthly.</p>
                  <div className="mt-6 space-y-3">
                      <p className="font-semibold text-sm">Free Plan includes:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary/50" />5 Quizzes per month</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary/50" />Up to 10 questions per quiz</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary/50" />Standard AI model</li>
                      </ul>
                  </div>
                </CardContent>
              </Card>
              
              {/* Pro Plan */}
              <Card className="relative flex flex-col h-full bg-gradient-to-br from-gradient-pro-start to-gradient-pro-end border-0 text-black shadow-lg shadow-emerald-500/30">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <Badge>Most Popular</Badge>
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                  <CardDescription className="text-black/80">For educators, trainers, and power users.</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">$10</span>
                    <span className="text-sm font-normal text-black/80">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                   <Button className="w-full bg-emerald-800 text-white hover:bg-emerald-800/90" asChild><Link href="/signup">Choose Pro</Link></Button>
                   <p className="text-xs text-black/80 text-center mt-2">Billed monthly.</p>
                   <div className="mt-6 space-y-3">
                      <p className="font-semibold text-sm">All Free plan features, plus:</p>
                      <ul className="space-y-2 text-sm text-black/80">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4" />Unlimited Quizzes</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4" />Up to 50 questions per quiz</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4" />Advanced AI model</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4" />Priority Support</li>
                      </ul>
                   </div>
                </CardContent>
              </Card>

              {/* Team Plan */}
              <Card className="flex flex-col h-full border-border">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-2xl font-bold">Team</CardTitle>
                  <CardDescription>For schools and organizations.</CardDescription>
                  <div className="pt-4">
                    <p className="text-4xl font-bold">Contact Us</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                   <Button className="w-full" variant="outline">Contact Sales</Button>
                   <p className="text-xs text-muted-foreground text-center mt-2">Billed annually.</p>
                   <div className="mt-6 space-y-3">
                      <p className="font-semibold text-sm">All Pro plan features, plus:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary/50" />Multi-user accounts</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary/50" />Centralized billing</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary/50" />Dedicated Support</li>
                      </ul>
                   </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="w-full py-16 md:py-24 bg-card/30">
          <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Loved by Educators and Learners</h2>
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
        <section id="faq" className="w-full py-16 md:py-24">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Your Questions, Answered</h2>
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
        <section id="contact" className="w-full py-16 md:py-24 bg-card/30">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Get in Touch</h2>
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
