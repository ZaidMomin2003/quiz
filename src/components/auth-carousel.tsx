
'use client';

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function AuthCarousel() {
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

    const plugin = React.useRef(
        Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            opts={{
                align: "start",
                loop: true,
            }}
            orientation="vertical"
            className="w-full max-w-md"
            >
            <CarouselContent className="-mt-4 h-[32rem]">
                {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pt-4 md:basis-1/3">
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
    );
}
