
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Heart, Banknote, Shirt, Pill, HomeIcon } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  donationType: z.enum(['money', 'clothes', 'medical', 'appliances']),
  address: z.string().min(10, { message: 'Please provide your complete address.' }),
  amount: z.string().optional(),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const DonationCard = ({ icon, type, title, description, className = '' }: {
  icon: React.ReactNode;
  type: string;
  title: string;
  description: string;
  className?: string;
}) => (
  <Card className={`cursor-pointer transition-all hover:shadow-md ${className}`}>
    <CardHeader className="flex flex-row items-center gap-4 pb-2">
      <div className="bg-nature-50 p-2 rounded-full">
        {icon}
      </div>
      <div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
  </Card>
);

const Donate = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('donation-form');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      donationType: 'money',
      address: '',
      amount: '',
      description: '',
    },
  });

  const watchDonationType = form.watch('donationType');

  const onSubmit = (data: FormValues) => {
    console.log('Donation form submitted:', data);
    
    // In a real app, this would be sent to a server
    // For now, we'll just save to localStorage
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    donations.push({
      ...data,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    });
    
    localStorage.setItem('donations', JSON.stringify(donations));
    setIsSubmitted(true);
    toast.success('Thank you for your donation!', {
      description: 'Your donation request has been submitted successfully.',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-earth-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-earth-800 mb-4">Support Anandwan's Mission</h1>
          <p className="text-lg text-earth-600 max-w-3xl mx-auto">
            Your generous contributions help sustain our community and support the rehabilitation, 
            education, and well-being of our residents.
          </p>
        </div>

        <Tabs defaultValue="donation-form" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="donation-form">Make a Donation</TabsTrigger>
            <TabsTrigger value="donation-impact">Your Impact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="donation-form" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm sticky top-24">
                  <h2 className="text-xl font-semibold text-earth-800 mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-earth-600" />
                    Donation Types
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <DonationCard 
                      icon={<Banknote className="h-5 w-5 text-earth-600" />}
                      type="money"
                      title="Financial Support"
                      description="Fund our programs and initiatives"
                      className={watchDonationType === 'money' ? 'border-earth-300 bg-earth-50' : ''}
                    />
                    
                    <DonationCard 
                      icon={<Shirt className="h-5 w-5 text-earth-600" />}
                      type="clothes"
                      title="Clothing & Essentials"
                      description="Provide comfort and dignity"
                      className={watchDonationType === 'clothes' ? 'border-earth-300 bg-earth-50' : ''}
                    />
                    
                    <DonationCard 
                      icon={<Pill className="h-5 w-5 text-earth-600" />}
                      type="medical"
                      title="Medical Supplies"
                      description="Support healthcare initiatives"
                      className={watchDonationType === 'medical' ? 'border-earth-300 bg-earth-50' : ''}
                    />
                    
                    <DonationCard 
                      icon={<HomeIcon className="h-5 w-5 text-earth-600" />}
                      type="appliances"
                      title="Home Appliances"
                      description="Improve quality of life"
                      className={watchDonationType === 'appliances' ? 'border-earth-300 bg-earth-50' : ''}
                    />
                  </div>
                  
                  <div className="bg-earth-50 rounded-lg p-4">
                    <p className="text-sm text-earth-700">
                      All donations are tax-deductible. You will receive a receipt for your records.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-earth-800 mb-2">Thank You for Your Donation!</h2>
                      <p className="text-earth-600 mb-6">
                        Your contribution will make a meaningful difference in the lives of Anandwan residents.
                      </p>
                      <Button 
                        onClick={() => setIsSubmitted(false)} 
                        variant="outline" 
                        className="mr-2"
                      >
                        Make Another Donation
                      </Button>
                      <Button asChild className="bg-earth-600 hover:bg-earth-700">
                        <a href="#donation-receipt">View Receipt</a>
                      </Button>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <h2 className="text-xl font-semibold text-earth-800 mb-4">Donation Form</h2>
                        
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
                          name="donationType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Donation Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select donation type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="money">Financial Support</SelectItem>
                                  <SelectItem value="clothes">Clothing & Essentials</SelectItem>
                                  <SelectItem value="medical">Medical Supplies</SelectItem>
                                  <SelectItem value="appliances">Home Appliances</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {watchDonationType === 'money' && (
                          <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Donation Amount</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter amount" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        {watchDonationType !== 'money' && (
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description of Items</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Please describe what you would like to donate..."
                                    className="min-h-[120px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pickup/Delivery Address</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter your complete address"
                                  className="min-h-[80px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full bg-earth-600 hover:bg-earth-700">
                          Submit Donation
                        </Button>

                        {watchDonationType === 'money' && (
                          <div className="mt-4 p-4 bg-earth-50 rounded-lg">
                            <p className="text-sm text-earth-700 text-center">
                              For financial donations, you will be directed to our secure payment gateway after submission.
                            </p>
                          </div>
                        )}
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="donation-impact" className="mt-0">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-earth-800 mb-6 text-center">How Your Donation Makes a Difference</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-earth-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-earth-800 mb-4">Financial Donations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="bg-earth-200 p-1 rounded-full mt-1">
                        <Check className="h-4 w-4 text-earth-700" />
                      </div>
                      <span className="text-earth-700">Provide medication and treatment for leprosy patients</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="bg-earth-200 p-1 rounded-full mt-1">
                        <Check className="h-4 w-4 text-earth-700" />
                      </div>
                      <span className="text-earth-700">Support educational programs for children and adults</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="bg-earth-200 p-1 rounded-full mt-1">
                        <Check className="h-4 w-4 text-earth-700" />
                      </div>
                      <span className="text-earth-700">Fund agricultural initiatives and sustainable farming</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="bg-earth-200 p-1 rounded-full mt-1">
                        <Check className="h-4 w-4 text-earth-700" />
                      </div>
                      <span className="text-earth-700">Maintain housing and infrastructure for residents</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-earth-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-earth-800 mb-4">In-Kind Donations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="bg-earth-200 p-1 rounded-full mt-1">
                        <Check className="h-4 w-4 text-earth-700" />
                      </div>
                      <span className="text-earth-700">Clothing provides dignity and comfort to residents</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="bg-earth-200 p-1 rounded-full mt-1">
                        <Check className="h-4 w-4 text-earth-700" />
                      </div>
                      <span className="text-earth-700">Medical supplies support our healthcare initiatives</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="bg-earth-200 p-1 rounded-full mt-1">
                        <Check className="h-4 w-4 text-earth-700" />
                      </div>
                      <span className="text-earth-700">Home appliances improve quality of life</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="bg-earth-200 p-1 rounded-full mt-1">
                        <Check className="h-4 w-4 text-earth-700" />
                      </div>
                      <span className="text-earth-700">Educational materials support learning programs</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-earth-600 to-earth-700 text-white rounded-xl p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Your Impact in Numbers</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-1">₹1000</div>
                    <p className="text-earth-100 text-sm">Provides medication for 5 patients</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">₹5000</div>
                    <p className="text-earth-100 text-sm">Supports a child's education for 6 months</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">₹10000</div>
                    <p className="text-earth-100 text-sm">Funds farming equipment for sustainable agriculture</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">₹25000</div>
                    <p className="text-earth-100 text-sm">Helps build housing for a family</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button onClick={() => setActiveTab('donation-form')} className="bg-earth-600 hover:bg-earth-700">
                  Make a Donation Now
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Donate;
