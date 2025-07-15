
import { SignupForm } from "@/components/signup-form";
import { PublicPageLayout } from "@/components/public-page-layout";
import { Bot } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardFooter } from "@/components/ui/card";


export default function SignupPage() {
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
       <PublicPageLayout showHeader={false} showFooter={false}>
            <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
                 <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Create an account</h1>
                            <p className="text-balance text-muted-foreground">
                               Enter your information to get started
                            </p>
                        </div>
                        <SignupForm />
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline font-semibold text-primary">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                   <div className="flex flex-col justify-between h-full p-8 text-white bg-gradient-to-br from-gray-900 to-gray-800">
                        <Link className="flex items-center gap-2 font-semibold self-end" href="/">
                            <Bot className="h-6 w-6" />
                            <span className="font-headline text-xl">QuizForge</span>
                        </Link>
                        <div className="flex items-center justify-center h-full">
                            <Carousel
                                plugins={[
                                    Autoplay({
                                        delay: 2500,
                                        stopOnInteraction: false,
                                        stopOnMouseEnter: true,
                                    }),
                                ]}
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                orientation="vertical"
                                className="w-full max-w-md"
                                >
                                <CarouselContent className="-mt-4 h-[250px]">
                                    {testimonials.map((testimonial, index) => (
                                    <CarouselItem key={index} className="pt-4 basis-1/2">
                                        <div className="p-1 h-full">
                                            <Card className="bg-white/10 text-white border-0 h-full flex flex-col">
                                                <CardContent className="p-4 flex-grow">
                                                    <p className="text-sm italic">&quot;{testimonial.text}&quot;</p>
                                                </CardContent>
                                                <CardFooter className="p-4 pt-0 border-t-0">
                                                    <div>
                                                        <p className="font-semibold text-sm">{testimonial.name}</p>
                                                        <p className="text-xs text-white/70">{testimonial.role}</p>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                </Carousel>
                        </div>
                         <div/>
                   </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
