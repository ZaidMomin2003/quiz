import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronRight, Star, Bot } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const companyLogos = [
    { name: 'Google', src: 'https://placehold.co/100x40.png', hint: 'google logo' },
    { name: 'Framer', src: 'https://placehold.co/100x40.png', hint: 'framer logo' },
    { name: 'Apple', src: 'https://placehold.co/100x40.png', hint: 'apple logo' },
    { name: 'Adobe', src: 'https://placehold.co/100x40.png', hint: 'adobe logo' },
    { name: 'LinkedIn', src: 'https://placehold.co/100x40.png', hint: 'linkedin logo' },
    { name: 'Microsoft', src: 'https://placehold.co/100x40.png', hint: 'microsoft logo' },
  ];
  
  const testimonials = [
    {
      name: 'John Doe',
      role: 'CEO, Company',
      text: "This tool has been a game-changer for our SEO strategy. The insights are invaluable and have directly led to a significant increase in organic traffic. Highly recommended!",
      avatar: 'https://placehold.co/40x40.png',
      hint: 'portrait person'
    },
    {
      name: 'Jane Smith',
      role: 'Marketing Manager, Another Co',
      text: "I was skeptical at first, but SEOtalos delivered. It's intuitive, powerful, and the customer support is top-notch. Our keyword rankings have never been better.",
      avatar: 'https://placehold.co/40x40.png',
      hint: 'portrait smiling'
    },
     {
      name: 'Sam Wilson',
      role: 'Founder, Startup Inc.',
      text: "As a startup, we need tools that are both affordable and effective. SEOtalos fits the bill perfectly. It's helped us compete with much larger players in our niche.",
      avatar: 'https://placehold.co/40x40.png',
      hint: 'person glasses'
    },
  ];

  return (
    <div className="flex flex-col items-center overflow-x-hidden">

      {/* Hero Section */}
      <section className="w-full grid-bg relative">
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
         <div className="container mx-auto text-center py-24 md:py-32 relative z-10">
          <Badge variant="outline" className="mb-4 bg-card/50 backdrop-blur">
            <Star className="w-3 h-3 mr-1.5 fill-current" />
            Latest AI Integration Just Arrived
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            Boost your <br /> website&apos;s SEO
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Best analytics app for agencies, consultants, affiliates, e-commerce, and SaaS. Our proven methods help you achieve remarkable results.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Button size="lg">Start a Free Trial <ChevronRight className="ml-2 h-4 w-4" /></Button>
            <Button size="lg" variant="ghost">Watch Demo</Button>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <div className="container mx-auto text-center -mt-12 relative z-10">
        <p className="text-sm text-muted-foreground mb-6">Trusted by the world's best companies</p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {companyLogos.map(logo => (
            <Image key={logo.name} src={logo.src} alt={logo.name} width={100} height={40} className="opacity-50 hover:opacity-100 transition-opacity" data-ai-hint={logo.hint}/>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="w-full py-20 md:py-28">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-2">Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">SEO Tool That Delivers Real Results</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            Our proven methods help you climb search rankings faster than ever, with no technical skills required.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 text-left">
              <CardHeader>
                <CardTitle>Comprehensive Site Audits</CardTitle>
                <CardDescription>Identify and fix technical SEO issues with a single click.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Site Audit Feature" className="rounded-lg" data-ai-hint="dashboard chart" />
              </CardContent>
            </Card>
            <Card className="bg-card/50 text-left">
              <CardHeader>
                <CardTitle>Keyword Rank Tracking</CardTitle>
                <CardDescription>Monitor your keyword performance across multiple search engines.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Rank Tracking Feature" className="rounded-lg" data-ai-hint="analytics graph" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Proven Results Section */}
      <section className="w-full py-20 md:py-28 bg-card/30">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-2">Our Achievements</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Proven SEO Results You Can Trust</h2>
            <p className="text-muted-foreground mb-8">
              From startups to industry leaders, we've helped businesses achieve remarkable results in record time.
            </p>
            <Button variant="outline">Learn More</Button>
          </div>
          <div className="grid grid-cols-2 gap-6">
              <Card className="bg-background/50">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold">200%</CardTitle>
                  <CardDescription>Organic Traffic Increase</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/50">
                 <CardHeader>
                  <CardTitle className="text-4xl font-bold">50K+</CardTitle>
                  <CardDescription>Keywords Ranked</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/50 col-span-2">
                 <CardHeader>
                  <CardTitle className="text-4xl font-bold">1.5M+</CardTitle>
                  <CardDescription>Backlinks Built</CardDescription>
                </CardHeader>
              </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-20 md:py-28">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-2">Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Flexible Pricing for Every Business</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            No hidden fees. Choose a plan that's right for you and supercharge your growth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>For individuals and small teams just getting started.</CardDescription>
                <p className="text-4xl font-bold pt-4">$0 <span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />1 Project</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />100 Keywords</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Weekly Audits</li>
                  </ul>
              </CardContent>
              <CardFooter>
                 <Button className="w-full" variant="ghost">Get Started</Button>
              </CardFooter>
            </Card>
            <Card className="border-primary/50 ring-2 ring-primary/50 shadow-lg">
               <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For growing businesses that need more power and flexibility.</CardDescription>
                <p className="text-4xl font-bold pt-4">$19 <span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                   <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />5 Projects</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />1,000 Keywords</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Daily Audits</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />API Access</li>
                  </ul>
              </CardContent>
              <CardFooter>
                 <Button className="w-full">Choose Pro</Button>
              </CardFooter>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large organizations with custom needs and dedicated support.</CardDescription>
                <p className="text-4xl font-bold pt-4">$39 <span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Unlimited Projects</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Unlimited Keywords</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Real-time Audits</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary/50" />Dedicated Support</li>
                  </ul>
              </CardContent>
              <CardFooter>
                 <Button className="w-full" variant="ghost">Contact Us</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="w-full py-20 md:py-28 bg-card/30">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What People Say About Us</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
              Don&apos;t just take our word for it. Here&apos;s what our users have to say.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                 <Card key={index} className="bg-background/50 text-left">
                    <CardContent className="pt-6">
                      <p className="italic">&quot;{testimonial.text}&quot;</p>
                    </CardContent>
                    <CardFooter className="flex items-center gap-4">
                      <Image src={testimonial.avatar} alt={testimonial.name} width={40} height={40} className="rounded-full" data-ai-hint={testimonial.hint} />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardFooter>
                 </Card>
              ))}
            </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Your Questions, Answered</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
              Find answers to common questions about SEOtalos.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What services are included?</AccordionTrigger>
              <AccordionContent>
                Our plans include comprehensive site audits, keyword rank tracking, backlink analysis, competitor research, and detailed reporting. Higher-tier plans offer API access and dedicated support.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is there a free trial?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer a 14-day free trial for our Pro plan. No credit card is required to get started. You can explore all the features and see the value for yourself.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I contact you?</AccordionTrigger>
              <AccordionContent>
                You can reach our support team via email at support@seotalos.com or through the contact form on our website. Enterprise clients receive a dedicated support channel.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
