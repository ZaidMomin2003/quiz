
// src/app/page.tsx
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronRight, Star, BrainCircuit, BookOpen, TrendingUp, Zap, Bot, LayoutDashboard, History, BookMarked, Bookmark, User as UserIcon } from "lucide-react";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function DemoDashboard() {
    return (
        <div className="flex w-full h-full bg-[#121212] text-white overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-primary/20">
            {/* Sidebar */}
            <aside className="w-1/5 bg-[#1a1a1a] p-4 flex-col justify-between hidden lg:flex">
                <div>
                    <div className="flex items-center gap-2 mb-8">
                        <Bot className="h-6 w-6 text-primary" />
                        <h1 className="font-bold text-lg">QuizForge</h1>
                    </div>
                    <nav className="space-y-2">
                        <a href="#" className="flex items-center gap-3 p-2 rounded-md bg-primary/10 text-primary font-semibold">
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Dashboard</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-2 rounded-md text-gray-400 hover:bg-gray-700">
                            <History className="h-4 w-4" />
                            <span>History</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-2 rounded-md text-gray-400 hover:bg-gray-700">
                            <BookMarked className="h-4 w-4" />
                            <span>Syllabus</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-2 rounded-md text-gray-400 hover:bg-gray-700">
                            <BookOpen className="h-4 w-4" />
                            <span>Learn</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-2 rounded-md text-gray-400 hover:bg-gray-700 relative">
                            <Bookmark className="h-4 w-4" />
                            <span>Bookmarks</span>
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">1</span>
                        </a>
                    </nav>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-md bg-gray-700/50">
                    <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-gray-600 text-gray-300 text-xs">Z</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Zaid</span>
                </div>
            </aside>
            {/* Main Content */}
            <main className="w-full lg:w-4/5 p-4 md:p-8 overflow-y-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                    <div className="bg-[#1a1a1a] p-3 md:p-4 rounded-lg">
                        <h3 className="text-xs md:text-sm text-gray-400">Quizzes Taken</h3>
                        <p className="text-2xl md:text-3xl font-bold mt-1">1</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-3 md:p-4 rounded-lg">
                        <h3 className="text-xs md:text-sm text-gray-400">Total Questions</h3>
                        <p className="text-2xl md:text-3xl font-bold mt-1">2</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-3 md:p-4 rounded-lg">
                        <h3 className="text-xs md:text-sm text-gray-400">Correct Answers</h3>
                        <p className="text-2xl md:text-3xl font-bold mt-1">50%</p>
                    </div>
                     <div className="bg-[#1a1a1a] p-3 md:p-4 rounded-lg">
                        <h3 className="text-xs md:text-sm text-gray-400">Average Score</h3>
                        <p className="text-2xl md:text-3xl font-bold mt-1">1.0/2.0</p>
                    </div>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg">
                    <div className="bg-primary p-4 rounded-t-lg">
                        <h3 className="text-lg md:text-xl font-bold text-primary-foreground">Create Your Next Challenge</h3>
                        <p className="text-sm text-primary-foreground/80">Fine-tune the details and generate the perfect quiz for your needs.</p>
                    </div>
                    <div className="p-4 md:p-6 space-y-4">
                        <div>
                            <Label className="text-xs text-gray-400">What topic do you want to practice today?</Label>
                            <Input type="text" placeholder="e.g., The Renaissance" className="bg-[#2a2a2a] border-gray-600 mt-1" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label className="text-xs text-gray-400">Number of Questions</Label>
                                <Input type="text" value="5" className="bg-[#2a2a2a] border-gray-600 mt-1" readOnly/>
                            </div>
                            <div>
                                <Label className="text-xs text-gray-400">Time per question (mins)</Label>
                                <Input type="text" value="1" className="bg-[#2a2a2a] border-gray-600 mt-1" readOnly/>
                            </div>
                             <div>
                                <Label className="text-xs text-gray-400">Difficulty</Label>
                                <div className="h-10 w-full mt-1 flex items-center justify-between rounded-md border border-gray-600 bg-[#2a2a2a] px-3 py-2 text-sm">
                                    <span>Easy</span>
                                    <ChevronRight className="h-4 w-4 opacity-50 -rotate-90" />
                                </div>
                            </div>
                        </div>
                        <Button className="w-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30">Generate Quiz</Button>
                    </div>
                </div>
                 <div className="mt-6 bg-[#2a2a2a] border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <BrainCircuit className="h-6 w-6 text-amber-400" />
                        <div>
                            <h3 className="font-bold">Practice Your Weaknesses</h3>
                            <p className="text-xs text-gray-400">We've identified some areas you can work on.</p>
                        </div>
                    </div>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">Generate Practice Quiz</Button>
                </div>
            </main>
        </div>
    );
}


function QuizGeneratorPrototype() {
  const router = useRouter();
  const [topic, setTopic] = useState('The Solar System');
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');

  const handleGenerate = () => {
    router.push('/signup');
  };

  return (
     <section className="w-full py-16 md:py-24 bg-card/30">
        <div className="container mx-auto">
             <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Experience It Live</h2>
                <p className="text-muted-foreground mb-12">
                Interact with the generator below to see how easy it is to create a quiz. When you're ready, hit "Generate" to sign up and get your results.
                </p>
            </div>
            <Card className="max-w-2xl mx-auto bg-background/50 shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                             <CardTitle>Quiz Generator</CardTitle>
                             <CardDescription>Create your quiz in an instant.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="prototype-topic">Topic</Label>
                        <Input 
                            id="prototype-topic" 
                            value={topic} 
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., The Renaissance"
                        />
                    </div>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>Number of Questions</Label>
                            <span className="w-12 text-center text-lg font-bold text-primary tabular-nums">{questionCount}</span>
                        </div>
                        <Slider
                            value={[questionCount]}
                            onValueChange={(value) => setQuestionCount(value[0])}
                            min={1}
                            max={10}
                            step={1}
                        />
                    </div>
                    <div className="space-y-2">
                         <Label>Difficulty</Label>
                         <ToggleGroup
                            type="single"
                            value={difficulty}
                            onValueChange={(value) => {
                                if (value) setDifficulty(value)
                            }}
                            className="grid grid-cols-3"
                         >
                            <ToggleGroupItem value="easy" aria-label="Easy">Easy</ToggleGroupItem>
                            <ToggleGroupItem value="medium" aria-label="Medium">Medium</ToggleGroupItem>
                            <ToggleGroupItem value="hard" aria-label="Hard">Hard</ToggleGroupItem>
                         </ToggleGroup>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full" onClick={handleGenerate}>
                        Generate Quiz & Sign Up
                    </Button>
                </CardFooter>
            </Card>
        </div>
     </section>
  )
}


export default function Home() {
  const testimonials = [
    {
      name: 'Priya S., NEET Aspirant',
      role: 'Kota, Rajasthan',
      text: "QuizForge is a game-changer for my NEET prep. I can generate unlimited practice questions for tricky Biology chapters. The weakness analysis helps me focus on exactly what I need to improve.",
    },
    {
      name: 'Rohan M., JEE Aspirant',
      role: 'Hyderabad, Telangana',
      text: "The AI-generated Physics questions are top-notch and match the JEE Advanced level. It's like having a personal question setter. This has saved me hours of searching for quality problems.",
    },
     {
      name: 'Ananya K., JEE Mains Aspirant',
      role: 'Mumbai, Maharashtra',
      text: "I love using QuizForge for daily revision of Chemistry concepts. The instant feedback and explanations are incredibly helpful. It's much more engaging than just reading textbooks.",
    },
    {
      name: 'Vikram P., Teacher',
      role: 'Physics Educator, Delhi',
      text: "As a teacher, I use QuizForge to create quick chapter-wise tests for my students. The ability to set difficulty levels is fantastic for catering to different batches. Highly recommended.",
    },
    {
      name: 'Sneha G., NEET Repeater',
      role: 'Chennai, Tamil Nadu',
      text: "This app helped me identify gaps in my preparation that I missed last year. The 'Practice Your Weaknesses' feature is pure gold for any serious aspirant. A must-have tool!",
    },
    {
      name: 'Aditya V., Student',
      role: 'Class 12, Bangalore',
      text: "I use QuizForge to prepare for my board exams alongside my JEE prep. It's so versatile. Being able to create a quiz on any topic, anytime, is amazing.",
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
              Perfect for NEET & JEE Aspirants
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-black tracking-tighter mb-6 max-w-4xl mx-auto">
              Ace Your Competitive Exams with AI-Powered Practice
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              Stop searching for question banks. With QuizForge, instantly generate high-quality MCQs for any NEET or JEE topic. Master concepts, identify weaknesses, and conquer your exams.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/signup">
                  Start Practicing For Free <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Static Dashboard Preview */}
        <div className="w-full h-[70vh] relative -mt-16 md:-mt-24">
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-10"></div>
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent z-10"></div>
            <div className="container mx-auto h-full p-4">
                <DemoDashboard />
            </div>
        </div>
        
        <QuizGeneratorPrototype />


        {/* New Modern Features Section */}
        <section id="features" className="relative w-full py-16 md:py-24 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute -z-10 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
                <div className="absolute -z-10 w-96 h-96 left-48 top-24 bg-purple-500/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-card/50 backdrop-blur-lg p-6 h-full flex flex-col items-start gap-4 md:col-span-2">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="font-bold text-lg">NEET & JEE Aligned AI</h3>
                        <Zap className="text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">Instantly create quizzes on any topic from the official syllabus. Our AI generates relevant, exam-pattern questions in seconds, tailored to your specified difficulty.</p>
                </Card>
                 <Card className="bg-card/50 backdrop-blur-lg p-6 h-full flex flex-col items-start gap-4">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="font-bold text-lg">Interactive Learning</h3>
                        <BookOpen className="text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">Go beyond testing with our "Learn Mode" that provides instant, detailed explanations for every question.</p>
                 </Card>
                <Card className="bg-card/50 backdrop-blur-lg p-6 h-full flex flex-col items-start gap-4">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="font-bold text-lg">Performance Analytics</h3>
                        <TrendingUp className="text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">Track your progress, see your scores, and identify your strong and weak chapters over time.</p>
                 </Card>
                 <Card className="bg-card/50 backdrop-blur-lg p-6 h-full flex flex-col items-start gap-4 md:col-span-2">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="font-bold text-lg">Weakness-Focused Practice</h3>
                        <BrainCircuit className="text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">Our AI analyzes your quiz results to find your weak spots and automatically generates new quizzes focused on those specific concepts, helping you turn weaknesses into strengths.</p>
                 </Card>
            </div>
        </section>


        {/* How it Works Section */}
        <section className="w-full py-16 md:py-24 bg-card/30">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-2">How It Works</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Create a Practice Test in Seconds</h2>
              <p className="text-muted-foreground mb-8">
                We've simplified the quiz creation process so you can focus on what matters most: practice and revision.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary font-bold rounded-full h-8 w-8 flex items-center justify-center shrink-0">1</div>
                  <div><span className="font-semibold text-foreground">Pick Your Topic:</span> Browse the complete NEET/JEE syllabus and pick any topic, from "Rotational Motion" to "p-Block Elements".</div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary font-bold rounded-full h-8 w-8 flex items-center justify-center shrink-0">2</div>
                  <div><span className="font-semibold text-foreground">Set Parameters:</span> Choose the number of questions and the desired difficulty level (Easy, Medium, Hard).</div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary font-bold rounded-full h-8 w-8 flex items-center justify-center shrink-0">3</div>
                  <div><span className="font-semibold text-foreground">Generate & Practice:</span> Click generate! Your test is ready instantly. Analyze your performance and practice your weak areas.</div>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <Card className="bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-bold">200,000+</CardTitle>
                    <CardDescription>Questions in our Growing Library</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-background/50">
                   <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-bold">95%</CardTitle>
                    <CardDescription>Time Saved Compared to Manual Creation</CardDescription>
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
              {/* Free Trial Plan */}
              <Card className="flex flex-col h-full border-border">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-2xl font-bold">Free Trial</CardTitle>
                  <CardDescription>Get a taste of our platform.</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">₹0</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Button className="w-full" variant="outline" asChild><Link href="/signup">Get Started</Link></Button>
                  <div className="mt-6 space-y-3">
                      <p className="font-semibold text-sm">Free Trial includes:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Generate 10 questions for free</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Standard AI model</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Basic analytics</li>
                      </ul>
                  </div>
                </CardContent>
              </Card>
              
              {/* Monthly Plan */}
              <Card className="relative flex flex-col h-full border-primary ring-2 ring-primary shadow-lg shadow-primary/20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <Badge>Most Popular</Badge>
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-2xl font-bold">Monthly</CardTitle>
                  <CardDescription>For dedicated learners.</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">₹299</span>
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                   <Button className="w-full" asChild><Link href="/signup">Choose Monthly</Link></Button>
                   <div className="mt-6 space-y-3">
                      <p className="font-semibold text-sm">All Free Trial features, plus:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Unlimited Quizzes</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Up to 50 questions per quiz</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Advanced AI model for exam accuracy</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Detailed Performance Analytics</li>
                      </ul>
                   </div>
                </CardContent>
              </Card>

              {/* Yearly Plan */}
              <Card className="flex flex-col h-full border-border">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-2xl font-bold">Yearly</CardTitle>
                  <CardDescription>Best value for serious aspirants.</CardDescription>
                  <div className="pt-4">
                     <span className="text-4xl font-bold">₹2999</span>
                    <span className="text-sm font-normal text-muted-foreground">/year</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                   <Button className="w-full" variant="outline" asChild><Link href="/signup">Choose Yearly</Link></Button>
                   <div className="mt-6 space-y-3">
                      <p className="font-semibold text-sm">All Monthly plan features, plus:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Access to the full question library</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Priority Support</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Save 15% compared to monthly</li>
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Loved by Toppers and Teachers</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
                Don't just take our word for it. Here's what our users have to say.
              </p>
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 2500,
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
                  You can create quizzes on any topic from the official NEET and JEE syllabus. Our AI is specifically trained to provide relevant questions for Physics, Chemistry, and Biology/Mathematics. Beyond that, you can try any topic you're curious about!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our "Free Trial" lets you generate up to 10 questions to experience the app. If you need more, you can upgrade to our Monthly or Yearly plans for unlimited access.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Are the questions truly relevant for competitive exams?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. We have specifically tuned our AI to generate questions that match the pattern, difficulty, and syllabus of major competitive exams like NEET, JEE Mains, and JEE Advanced.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I practice just the topics I'm weak in?</AccordionTrigger>
                <AccordionContent>
                  Yes! This is one of our best features. After you take a quiz, our AI analyzes your performance and identifies your weak concepts. You can then generate a new quiz focused specifically on those areas to turn your weaknesses into strengths.
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
