
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  subject: z.enum(['general', 'volunteering', 'donating', 'awareness', 'tech']),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: 'general',
      message: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Contact form submitted:', data);
    
    // In a real app, this would be sent to a server
    // For now, we'll just save to localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({
      ...data,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    });
    
    localStorage.setItem('contacts', JSON.stringify(contacts));
    setIsSubmitted(true);
    toast.success('Message sent!', {
      description: 'We have received your message and will get back to you soon.',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-nature-800 mb-4">Contact Anandwan</h1>
          <p className="text-lg text-nature-600 max-w-3xl mx-auto">
            Have questions or want to connect with us? We're here to help. Reach out to us for any
            inquiries about volunteering, donations, or general information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-nature-800 mb-2">Message Sent!</h2>
                  <p className="text-nature-600 mb-6">
                    Thank you for reaching out. We've received your message and will get back to you as soon as possible.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)} 
                    variant="outline" 
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <h2 className="text-xl font-semibold text-nature-800 mb-4">Get in Touch</h2>
                    
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
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="volunteering">Volunteering</SelectItem>
                              <SelectItem value="donating">Donations</SelectItem>
                              <SelectItem value="awareness">Awareness Programs</SelectItem>
                              <SelectItem value="tech">Technology Support</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?"
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-nature-600 hover:bg-nature-700">
                      Send Message
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-w-16 aspect-h-9 w-full h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29772.347545290993!2d79.02915643955077!3d20.237386500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd36cdf21378e15%3A0xbb04e56e3a72e3a5!2sAnandwan!5e0!3m2!1sen!2sin!4v1686904234653!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Anandwan Location"
                    className="rounded-t-xl"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-nature-800 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-nature-100 p-2 rounded-full mt-1">
                    <MapPin className="h-5 w-5 text-nature-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-nature-800">Address</h3>
                    <p className="text-nature-600">
                      Anandwan, Warora,<br />
                      Maharashtra 442914, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-nature-100 p-2 rounded-full mt-1">
                    <Phone className="h-5 w-5 text-nature-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-nature-800">Phone</h3>
                    <p className="text-nature-600">
                      Main Office: +91 1234567890<br />
                      Volunteer Coordinator: +91 9876543210
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-nature-100 p-2 rounded-full mt-1">
                    <Mail className="h-5 w-5 text-nature-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-nature-800">Email</h3>
                    <p className="text-nature-600">
                      General Inquiries: info@anandwan.org<br />
                      Volunteer Programs: volunteer@anandwan.org<br />
                      Donations: donations@anandwan.org
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-nature-100 p-2 rounded-full mt-1">
                    <Clock className="h-5 w-5 text-nature-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-nature-800">Hours</h3>
                    <p className="text-nature-600">
                      Administrative Office:<br />
                      Monday - Saturday: 9:00 AM - 5:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium text-nature-800 mb-3">Connect With Us</h3>
                <div className="flex space-x-3">
                  <a href="#" className="bg-nature-100 p-2 rounded-full hover:bg-nature-200 transition-colors">
                    <Facebook className="h-5 w-5 text-nature-600" />
                  </a>
                  <a href="#" className="bg-nature-100 p-2 rounded-full hover:bg-nature-200 transition-colors">
                    <Twitter className="h-5 w-5 text-nature-600" />
                  </a>
                  <a href="#" className="bg-nature-100 p-2 rounded-full hover:bg-nature-200 transition-colors">
                    <Instagram className="h-5 w-5 text-nature-600" />
                  </a>
                  <a href="#" className="bg-nature-100 p-2 rounded-full hover:bg-nature-200 transition-colors">
                    <Youtube className="h-5 w-5 text-nature-600" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-nature-50 rounded-xl p-6 border border-nature-100">
              <h3 className="font-medium text-nature-800 mb-3">Planning a Visit?</h3>
              <p className="text-nature-600 mb-4">
                Anandwan welcomes visitors who want to learn about our community and initiatives.
                To arrange a guided tour or schedule a visit, please contact us at least one week in advance.
              </p>
              <Button variant="outline" className="border-nature-600 text-nature-700 hover:bg-nature-100">
                Schedule a Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
