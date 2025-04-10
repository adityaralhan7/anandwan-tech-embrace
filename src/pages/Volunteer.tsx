
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Check, Users, Leaf, Clock, Heart, MountainSnow } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  skill: z.enum(['medical', 'teaching', 'creative', 'tech', 'manual']),
  availabilityDate: z.date({ required_error: 'Please select a date.' }),
  duration: z.string().min(1, { message: 'Please specify your availability duration.' }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Volunteer = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      skill: 'medical',
      duration: '',
      message: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    // In a real app, this would be sent to a server
    // For now, we'll just save to localStorage
    
    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
    volunteers.push({
      ...data,
      id: Date.now(),
      availabilityDate: data.availabilityDate.toISOString(),
      submittedAt: new Date().toISOString(),
    });
    
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
    setIsSubmitted(true);
    toast.success('Thank you for volunteering!', {
      description: 'Your registration has been submitted successfully.',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-nature-800 mb-4">Join the Anandwan Volunteer Tribe</h1>
          <p className="text-lg text-nature-600 max-w-3xl mx-auto">
            Your skills and time can make a significant difference in the lives of our community members. 
            Register today to become part of our volunteer family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-nature-50 rounded-xl p-6 border border-nature-100 sticky top-24">
              <h2 className="text-xl font-semibold text-nature-800 mb-4 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-nature-600" />
                Why Volunteer With Us?
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-nature-100 p-2 rounded-full mt-1">
                    <Users className="h-4 w-4 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-nature-800">Make Real Impact</h3>
                    <p className="text-sm text-nature-600">Work directly with community members and see the difference your contribution makes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-nature-100 p-2 rounded-full mt-1">
                    <MountainSnow className="h-4 w-4 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-nature-800">Experience Anandwan</h3>
                    <p className="text-sm text-nature-600">Immerse yourself in our unique self-sustaining community surrounded by nature.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-nature-100 p-2 rounded-full mt-1">
                    <Heart className="h-4 w-4 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-nature-800">Share Your Skills</h3>
                    <p className="text-sm text-nature-600">Whether medical, educational, creative, or technical, your expertise is valuable.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-nature-100 p-2 rounded-full mt-1">
                    <Clock className="h-4 w-4 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-nature-800">Flexible Commitment</h3>
                    <p className="text-sm text-nature-600">Volunteer for a day, a week, or longer based on your availability.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-nature-100 rounded-lg p-4">
                <p className="text-sm text-nature-700 italic">
                  "Volunteering at Anandwan was one of the most meaningful experiences of my life. The community's resilience and spirit is truly inspiring."
                </p>
                <p className="text-sm font-medium text-nature-800 mt-2">- Maya S., Medical Volunteer</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-nature-800 mb-2">Thank You for Volunteering!</h2>
                  <p className="text-nature-600 mb-6">
                    Your registration has been submitted successfully. We'll contact you soon with next steps.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)} 
                    variant="outline" 
                    className="mr-2"
                  >
                    Submit Another Registration
                  </Button>
                  <Button asChild className="bg-nature-600 hover:bg-nature-700">
                    <a href="#volunteer-followup">Join WhatsApp Group</a>
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <h2 className="text-xl font-semibold text-nature-800 mb-4">Volunteer Registration Form</h2>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Your contact number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="skill"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Primary Skill / Interest Area</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="medical" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Medical
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="teaching" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Teaching
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="creative" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Creative Arts
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="tech" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Technology
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="manual" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Manual Labor
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="availabilityDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Availability Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date()
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration of Stay</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g., 1 week, 2 months" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about yourself, your experience, and what you hope to contribute..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-nature-600 hover:bg-nature-700">
                      Submit Registration
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
