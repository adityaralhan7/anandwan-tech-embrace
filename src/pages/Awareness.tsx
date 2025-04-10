
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Book, Heart, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const Awareness = () => {
  const [activeTab, setActiveTab] = useState('causes');

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const text = "Learn about leprosy awareness and help fight the stigma. Check out Anandwan's initiatives:";
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-nature-800 mb-4">Understanding Leprosy</h1>
          <p className="text-lg text-nature-600 max-w-3xl mx-auto">
            Education is the first step toward eliminating stigma. Learn about leprosy, its causes, symptoms,
            treatment options, and the truth behind common myths.
          </p>
          
          <div className="flex justify-center mt-6 space-x-2">
            <Button onClick={() => shareOnSocial('facebook')} size="sm" variant="outline" className="rounded-full">
              <Facebook className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={() => shareOnSocial('twitter')} size="sm" variant="outline" className="rounded-full">
              <Twitter className="h-4 w-4 mr-2" />
              Tweet
            </Button>
            <Button onClick={() => shareOnSocial('linkedin')} size="sm" variant="outline" className="rounded-full">
              <Linkedin className="h-4 w-4 mr-2" />
              Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-nature-50 rounded-xl p-6 border border-nature-100 sticky top-24">
              <h2 className="text-xl font-semibold text-nature-800 mb-4 flex items-center">
                <Book className="h-5 w-5 mr-2 text-nature-600" />
                Educational Sections
              </h2>
              
              <div className="space-y-2">
                <Button
                  variant={activeTab === 'causes' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'causes' ? 'bg-nature-600 text-white' : 'text-nature-700'}`}
                  onClick={() => setActiveTab('causes')}
                >
                  Causes & Transmission
                </Button>
                <Button
                  variant={activeTab === 'symptoms' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'symptoms' ? 'bg-nature-600 text-white' : 'text-nature-700'}`}
                  onClick={() => setActiveTab('symptoms')}
                >
                  Signs & Symptoms
                </Button>
                <Button
                  variant={activeTab === 'treatment' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'treatment' ? 'bg-nature-600 text-white' : 'text-nature-700'}`}
                  onClick={() => setActiveTab('treatment')}
                >
                  Treatment Options
                </Button>
                <Button
                  variant={activeTab === 'myths' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'myths' ? 'bg-nature-600 text-white' : 'text-nature-700'}`}
                  onClick={() => setActiveTab('myths')}
                >
                  Myths & Facts
                </Button>
                <Button
                  variant={activeTab === 'stories' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'stories' ? 'bg-nature-600 text-white' : 'text-nature-700'}`}
                  onClick={() => setActiveTab('stories')}
                >
                  Real Stories
                </Button>
              </div>
              
              <div className="mt-8 p-4 bg-nature-100 rounded-lg">
                <h3 className="font-medium text-nature-800 mb-2 flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-nature-600" />
                  Spread Awareness
                </h3>
                <p className="text-sm text-nature-700 mb-3">
                  Help us reach more people by sharing this information with friends and family.
                </p>
                <Button onClick={() => shareOnSocial('facebook')} variant="outline" size="sm" className="w-full mb-2">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share this page
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="hidden">
                <TabsTrigger value="causes">Causes</TabsTrigger>
                <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                <TabsTrigger value="treatment">Treatment</TabsTrigger>
                <TabsTrigger value="myths">Myths & Facts</TabsTrigger>
                <TabsTrigger value="stories">Real Stories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="causes" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-nature-800 mb-4">Causes & Transmission of Leprosy</h2>
                    
                    <div className="prose max-w-none text-nature-700">
                      <p>
                        Leprosy, also known as Hansen's disease, is caused by a slow-growing bacteria called 
                        <em> Mycobacterium leprae</em>. It primarily affects the skin, peripheral nerves, 
                        and the upper respiratory tract.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-nature-800 mt-6 mb-3">How It Spreads</h3>
                      
                      <p>
                        Contrary to popular belief, leprosy is not highly contagious. It spreads primarily 
                        through droplets from the nose and mouth during close and frequent contact with 
                        untreated cases. Some key facts about transmission:
                      </p>
                      
                      <ul className="list-disc pl-6 mt-2 mb-4 space-y-1">
                        <li>Approximately 95% of the world's population has natural immunity to leprosy</li>
                        <li>It is not spread by casual contact such as handshakes or hugs</li>
                        <li>It cannot be transmitted by touching an object that was previously touched by a person with leprosy</li>
                        <li>The disease has a long incubation period (typically 3-5 years but can take up to 20 years)</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold text-nature-800 mt-6 mb-3">Risk Factors</h3>
                      
                      <p>
                        Several factors may increase the risk of developing leprosy:
                      </p>
                      
                      <ul className="list-disc pl-6 mt-2 mb-4 space-y-1">
                        <li>Close contact with untreated individuals who have leprosy</li>
                        <li>Living in areas where leprosy is endemic (parts of India, Brazil, and other countries)</li>
                        <li>Genetic factors that may make some people more susceptible</li>
                        <li>Compromised immune system</li>
                        <li>Poor nutrition and living conditions</li>
                      </ul>
                      
                      <div className="bg-sky-50 p-4 rounded-lg border border-sky-100 my-6">
                        <h4 className="font-semibold text-sky-800 mb-2">Important to Know</h4>
                        <p className="text-sky-700 text-sm">
                          Most people who come in contact with the leprosy bacteria do not develop the disease. 
                          Once treatment has begun, the person is no longer contagious, though they must complete 
                          the full course of treatment to prevent relapse and antibiotic resistance.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="symptoms" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-nature-800 mb-4">Signs & Symptoms of Leprosy</h2>
                    
                    <div className="prose max-w-none text-nature-700">
                      <p>
                        Leprosy primarily affects the skin, peripheral nerves, and in some cases, the eyes and upper respiratory tract.
                        Early detection is crucial for preventing complications and disability.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-nature-800 mt-6 mb-3">Common Symptoms</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="bg-nature-50 p-4 rounded-lg border border-nature-100">
                          <h4 className="font-semibold text-nature-800 mb-2">Skin Signs</h4>
                          <ul className="list-disc pl-6 space-y-1 text-nature-700">
                            <li>Discolored patches of skin (lighter than surrounding skin)</li>
                            <li>Skin lesions that are painless but may be numb to touch</li>
                            <li>Nodules or lumps on the skin</li>
                            <li>Thick, stiff, or dry skin</li>
                            <li>Loss of hair, particularly on eyebrows or eyelashes</li>
                            <li>Skin ulcers that don't heal normally</li>
                          </ul>
                        </div>
                        
                        <div className="bg-nature-50 p-4 rounded-lg border border-nature-100">
                          <h4 className="font-semibold text-nature-800 mb-2">Nerve-Related Signs</h4>
                          <ul className="list-disc pl-6 space-y-1 text-nature-700">
                            <li>Numbness in affected areas</li>
                            <li>Muscle weakness, especially in hands and feet</li>
                            <li>Enlarged nerves, especially around elbows, knees</li>
                            <li>Loss of temperature sensation</li>
                            <li>Pain or tenderness along nerves</li>
                            <li>Loss of finger/toe sensation</li>
                          </ul>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-nature-800 mt-6 mb-3">Types of Leprosy</h3>
                      
                      <p>
                        Leprosy presents in different forms, ranging from a few skin lesions to more widespread involvement:
                      </p>
                      
                      <Accordion type="single" collapsible className="mt-4">
                        <AccordionItem value="paucibacillary">
                          <AccordionTrigger className="text-nature-800">Paucibacillary (PB) Leprosy</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-nature-700 mb-2">
                              This is the milder form, characterized by:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-nature-700">
                              <li>1-5 skin lesions</li>
                              <li>No bacteria detected in skin smears</li>
                              <li>Asymmetric nerve involvement</li>
                              <li>Typically responds well to treatment</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="multibacillary">
                          <AccordionTrigger className="text-nature-800">Multibacillary (MB) Leprosy</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-nature-700 mb-2">
                              This is the more severe form, characterized by:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-nature-700">
                              <li>More than 5 skin lesions</li>
                              <li>Bacteria detected in skin smears</li>
                              <li>Symmetric nerve involvement</li>
                              <li>Requires longer treatment duration</li>
                              <li>Higher risk of complications if not treated promptly</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 my-6">
                        <h4 className="font-semibold flex items-center text-yellow-800 mb-2">
                          <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
                          When to Seek Medical Attention
                        </h4>
                        <p className="text-yellow-700 text-sm">
                          If you notice persistent skin patches, especially with decreased sensation,
                          or unexplained numbness and muscle weakness, consult a healthcare provider promptly.
                          Early diagnosis and treatment can prevent complications and disability.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="treatment" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-nature-800 mb-4">Treatment Options for Leprosy</h2>
                    
                    <div className="prose max-w-none text-nature-700">
                      <p>
                        Leprosy is a curable disease, and early treatment is crucial to prevent complications and
                        disability. Modern treatment approaches have revolutionized leprosy care.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-nature-800 mt-6 mb-3">Multi-Drug Therapy (MDT)</h3>
                      
                      <p>
                        The World Health Organization (WHO) recommends Multi-Drug Therapy (MDT) as the standard 
                        treatment for leprosy. MDT combines different antibiotics to effectively kill the bacteria 
                        and prevent drug resistance.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="bg-nature-50 p-4 rounded-lg border border-nature-100">
                          <h4 className="font-semibold text-nature-800 mb-2">Paucibacillary (PB) Treatment</h4>
                          <p className="text-nature-700 text-sm mb-2">For milder cases with 1-5 skin lesions:</p>
                          <ul className="list-disc pl-6 space-y-1 text-nature-700 text-sm">
                            <li>Combination of rifampicin and dapsone</li>
                            <li>Treatment duration: 6 months</li>
                            <li>Monthly supervised dose at healthcare facility</li>
                            <li>Daily self-administered dose at home</li>
                          </ul>
                        </div>
                        
                        <div className="bg-nature-50 p-4 rounded-lg border border-nature-100">
                          <h4 className="font-semibold text-nature-800 mb-2">Multibacillary (MB) Treatment</h4>
                          <p className="text-nature-700 text-sm mb-2">For more severe cases with 6+ skin lesions:</p>
                          <ul className="list-disc pl-6 space-y-1 text-nature-700 text-sm">
                            <li>Combination of rifampicin, clofazimine, and dapsone</li>
                            <li>Treatment duration: 12 months</li>
                            <li>Monthly supervised dose at healthcare facility</li>
                            <li>Daily self-administered dose at home</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100 my-6">
                        <h4 className="font-semibold flex items-center text-green-800 mb-2">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          Treatment Success
                        </h4>
                        <p className="text-green-700 text-sm">
                          MDT is highly effective, with cure rates exceeding 95% when completed as prescribed.
                          Patients become non-infectious within just a few days of starting treatment, although 
                          the full course must be completed to prevent relapse.
                        </p>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-nature-800 mt-6 mb-3">Supportive Care & Rehabilitation</h3>
                      
                      <p>
                        Beyond medication, comprehensive leprosy care includes:
                      </p>
                      
                      <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
                        <li>
                          <strong>Wound care and skin management:</strong> Proper care for skin lesions, ulcers, and injuries to
                          prevent infection and promote healing.
                        </li>
                        <li>
                          <strong>Physical therapy:</strong> Exercises to maintain or improve muscle strength and joint mobility,
                          particularly in hands and feet.
                        </li>
                        <li>
                          <strong>Self-care training:</strong> Patients learn to protect insensitive hands, feet, and eyes from injury,
                          inspect themselves daily, and manage wounds.
                        </li>
                        <li>
                          <strong>Orthopedic interventions:</strong> Special footwear, splints, or assistive devices to prevent
                          deformities or improve function.
                        </li>
                        <li>
                          <strong>Surgical procedures:</strong> In some cases, reconstructive surgery may help restore function
                          or correct deformities.
                        </li>
                        <li>
                          <strong>Psychosocial support:</strong> Counseling and community support to address stigma, anxiety,
                          depression, and social rehabilitation.
                        </li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold text-nature-800 mt-6 mb-3">At Anandwan</h3>
                      
                      <p>
                        Anandwan provides comprehensive care that includes:
                      </p>
                      
                      <ul className="list-disc pl-6 mt-2 mb-4 space-y-1">
                        <li>Medical treatment following WHO guidelines</li>
                        <li>Rehabilitation services and physical therapy</li>
                        <li>Vocational training for economic independence</li>
                        <li>Community-based support and social reintegration</li>
                        <li>Education and awareness to combat stigma</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="myths" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-nature-800 mb-4">Myths & Facts About Leprosy</h2>
                    
                    <div className="prose max-w-none text-nature-700">
                      <p>
                        Leprosy is one of the most misunderstood diseases, surrounded by myths and misconceptions
                        that contribute to stigma and discrimination. Here, we separate fact from fiction.
                      </p>
                      
                      <div className="space-y-6 mt-6">
                        <div className="border border-red-200 rounded-lg overflow-hidden">
                          <div className="bg-red-50 p-4">
                            <h3 className="text-lg font-semibold text-red-800">MYTH: Leprosy is highly contagious</h3>
                          </div>
                          <div className="p-4 bg-green-50">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">FACT:</h3>
                            <p className="text-nature-700">
                              Leprosy is not highly contagious. Over 95% of the world's population has natural immunity to the disease.
                              It requires prolonged, close contact with untreated individuals, typically over months or years.
                              Once treatment begins, a person is no longer contagious.
                            </p>
                          </div>
                        </div>
                        
                        <div className="border border-red-200 rounded-lg overflow-hidden">
                          <div className="bg-red-50 p-4">
                            <h3 className="text-lg font-semibold text-red-800">MYTH: Leprosy causes body parts to fall off</h3>
                          </div>
                          <div className="p-4 bg-green-50">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">FACT:</h3>
                            <p className="text-nature-700">
                              Leprosy does not cause body parts to "fall off." This misconception comes from the nerve damage that can
                              lead to loss of sensation. Without feeling pain, individuals may injure themselves without noticing,
                              leading to infections and tissue damage. With proper treatment and care, these complications are preventable.
                            </p>
                          </div>
                        </div>
                        
                        <div className="border border-red-200 rounded-lg overflow-hidden">
                          <div className="bg-red-50 p-4">
                            <h3 className="text-lg font-semibold text-red-800">MYTH: Leprosy is a curse or punishment for sins</h3>
                          </div>
                          <div className="p-4 bg-green-50">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">FACT:</h3>
                            <p className="text-nature-700">
                              Leprosy is a bacterial infection caused by <em>Mycobacterium leprae</em>. It is a medical condition,
                              not a curse, divine punishment, or result of moral failing. Such beliefs have no scientific basis
                              and only contribute to harmful stigma and discrimination against those affected.
                            </p>
                          </div>
                        </div>
                        
                        <div className="border border-red-200 rounded-lg overflow-hidden">
                          <div className="bg-red-50 p-4">
                            <h3 className="text-lg font-semibold text-red-800">MYTH: Leprosy cannot be cured</h3>
                          </div>
                          <div className="p-4 bg-green-50">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">FACT:</h3>
                            <p className="text-nature-700">
                              Leprosy is completely curable with Multi-Drug Therapy (MDT). The treatment is effective,
                              available free of charge worldwide, and has cured over 16 million people since 1981.
                              Early diagnosis and treatment are key to preventing complications.
                            </p>
                          </div>
                        </div>
                        
                        <div className="border border-red-200 rounded-lg overflow-hidden">
                          <div className="bg-red-50 p-4">
                            <h3 className="text-lg font-semibold text-red-800">MYTH: People with leprosy must be isolated from society</h3>
                          </div>
                          <div className="p-4 bg-green-50">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">FACT:</h3>
                            <p className="text-nature-700">
                              There is no medical reason to isolate people with leprosy from society. Once treatment begins,
                              they are no longer contagious. People with leprosy can lead normal lives, work, attend school,
                              and participate fully in community activities. Isolation and segregation are outdated practices
                              based on fear, not science.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-nature-50 p-4 rounded-lg border border-nature-100 my-6">
                        <h4 className="font-semibold text-nature-800 mb-2">Breaking the Stigma</h4>
                        <p className="text-nature-700 text-sm">
                          Stigma remains one of the biggest challenges in leprosy control. By spreading accurate information,
                          using appropriate language (avoiding terms like "leper"), and promoting inclusion, we can help
                          combat discrimination and ensure that affected individuals receive the support and dignity they deserve.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="stories" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-nature-800 mb-4">Real Stories from Anandwan</h2>
                    
                    <div className="prose max-w-none text-nature-700">
                      <p>
                        Behind every statistic is a human story of challenge, resilience, and triumph.
                        These stories from Anandwan residents demonstrate the transformative power of 
                        community, dignity, and opportunity.
                      </p>
                      
                      <div className="bg-nature-50 rounded-lg p-6 my-6 border border-nature-100">
                        <h3 className="text-xl font-semibold text-nature-800 mb-2">Rajesh's Journey: From Patient to Teacher</h3>
                        
                        <p className="italic text-nature-600 mb-4">
                          "When I first came to Anandwan, I had lost everything – my health, my family's support,
                          and my hope for the future. The disease had affected my hands, and I couldn't continue my work as a carpenter."
                        </p>
                        
                        <p className="text-nature-700">
                          Rajesh was diagnosed with leprosy at age 28. After facing rejection from his village,
                          he arrived at Anandwan seeking treatment. Through comprehensive medical care, rehabilitation,
                          and educational opportunities, Rajesh not only recovered but discovered a new purpose.
                        </p>
                        
                        <p className="text-nature-700 mt-2">
                          Today, at 45, he works as a mathematics teacher in Anandwan's school, inspiring children
                          with his knowledge and life story. He has married, started a family, and built a fulfilling life.
                        </p>
                        
                        <p className="italic text-nature-600 mt-4">
                          "Anandwan didn't just heal my body; it restored my dignity and gave me purpose. Now I help others
                          see that their circumstances don't define their potential."
                        </p>
                      </div>
                      
                      <div className="bg-nature-50 rounded-lg p-6 my-6 border border-nature-100">
                        <h3 className="text-xl font-semibold text-nature-800 mb-2">Meena's Transformation: Artisan and Advocate</h3>
                        
                        <p className="italic text-nature-600 mb-4">
                          "The hardest part wasn't the physical pain, but the way people looked at me – with fear,
                          disgust, or pity. At Anandwan, for the first time, people saw me as a person first, not my disease."
                        </p>
                        
                        <p className="text-nature-700">
                          Meena was only 16 when she noticed the first patches on her skin. After diagnosis and facing
                          stigma in her community, she came to Anandwan for treatment. Though she experienced nerve damage
                          in her hands, the rehabilitation programs helped her develop new skills in weaving and textile arts.
                        </p>
                        
                        <p className="text-nature-700 mt-2">
                          Now 39, Meena leads a cooperative of 15 women who create handcrafted textiles sold throughout India.
                          She also serves as a community health educator, visiting villages to raise awareness about early
                          signs of leprosy and fighting stigma through education.
                        </p>
                        
                        <p className="italic text-nature-600 mt-4">
                          "My hands may be different, but they create beautiful things. I want people to see that disability
                          doesn't mean inability. We all have gifts to share with the world."
                        </p>
                      </div>
                      
                      <div className="bg-nature-50 rounded-lg p-6 my-6 border border-nature-100">
                        <h3 className="text-xl font-semibold text-nature-800 mb-2">Sunil's Story: Agricultural Innovation</h3>
                        
                        <p className="italic text-nature-600 mb-4">
                          "When I came to Anandwan, I thought my life as a farmer was over. How could I work the land
                          when I couldn't feel the soil between my fingers? But here, I learned that adaptation is possible."
                        </p>
                        
                        <p className="text-nature-700">
                          Sunil, a third-generation farmer from Maharashtra, was devastated when leprosy affected the
                          sensation in his hands and feet. After treatment at Anandwan, he joined the agricultural program,
                          where he learned adaptive farming techniques and sustainable practices.
                        </p>
                        
                        <p className="text-nature-700 mt-2">
                          Today, at 52, Sunil oversees one of Anandwan's organic farming projects, implementing innovative
                          irrigation systems and teaching sustainable agriculture to others. His methods have increased
                          crop yields while preserving soil health.
                        </p>
                        
                        <p className="italic text-nature-600 mt-4">
                          "Anandwan taught me that challenges can lead to innovation. Now I'm not just a farmer – I'm
                          developing better ways to work with nature that others can use too, regardless of ability."
                        </p>
                      </div>
                      
                      <Separator className="my-8" />
                      
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-nature-800 mb-4">Share Your Story</h3>
                        <p className="text-nature-700">
                          Have you or someone you know been affected by leprosy? Sharing personal stories
                          helps raise awareness and combat stigma.
                        </p>
                        <Button className="mt-4 bg-nature-600 hover:bg-nature-700">
                          Submit Your Story
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awareness;
