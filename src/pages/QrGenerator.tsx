
import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Download, QrCode, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import QRCode from 'qrcode.react';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters.' }).max(5000, { message: 'Content must not exceed 5000 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">Staff Login</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <Input 
              id="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username" 
              required 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        <p className="w-full">For Anandwan staff only. <br /> Default credentials: username: anandwan, password: admin123</p>
      </CardFooter>
    </Card>
  );
};

const QrGenerator = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [qrData, setQrData] = useState<string | null>(null);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Set a maximum file size (2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Image must be less than 2MB",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        // Store image as data URL but with size limitation
        const result = reader.result as string;
        setSelectedImage(result);
      };
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read image file",
          variant: "destructive"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log('QR Generator form submitted:', data);
    
    try {
      // Create QR data content - limit the image size in the QR code
      const qrContent = {
        title: data.title,
        content: data.content,
        // Only include image info, not the full data URL
        hasImage: !!selectedImage,
        createdBy: user,
        createdAt: new Date().toISOString(),
      };
      
      // Convert to JSON string
      const jsonData = JSON.stringify(qrContent);
      
      // Set QR data and show QR code
      setQrData(jsonData);
      setQrGenerated(true);
      
      toast({
        title: "QR Code Generated",
        description: "Your QR code has been successfully generated.",
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadQrCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        try {
          const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = `anandwan-qr-${form.getValues('title').replace(/\s+/g, '-').toLowerCase() || 'code'}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          toast({
            title: "Success",
            description: "QR code downloaded successfully",
          });
        } catch (error) {
          console.error("Error downloading QR code:", error);
          toast({
            title: "Download Failed",
            description: "Could not download the QR code. Try again.",
            variant: "destructive"
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-nature-800 mb-4">
            Anandwan QR Code Generator
          </h1>
          <p className="text-lg text-nature-600 max-w-3xl mx-auto">
            Create QR codes with educational content to place throughout the Anandwan campus,
            making information accessible to visitors and residents.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <Lock className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Staff Access Only</h3>
                  <p className="text-yellow-700">
                    The QR code generator is restricted to Anandwan staff members. 
                    Please log in with your staff credentials to create QR codes for campus use.
                  </p>
                </div>
              </div>
            </div>
            
            <LoginForm />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="h-5 w-5 mr-2" />
                    Create New QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter a descriptive title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter the information that will be displayed when scanning the QR code (1000-2000 words recommended)"
                                className="min-h-[200px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <p className="text-sm text-muted-foreground mt-1">
                              {field.value.length}/5000 characters
                            </p>
                          </FormItem>
                        )}
                      />
                      
                      <FormItem>
                        <FormLabel>Image (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange}
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      
                      {selectedImage && (
                        <div className="mt-2">
                          <p className="text-sm font-medium mb-2">Image Preview:</p>
                          <img 
                            src={selectedImage} 
                            alt="Preview" 
                            className="max-h-32 rounded-md border" 
                          />
                        </div>
                      )}
                      
                      <Button type="submit" className="w-full bg-nature-600 hover:bg-nature-700">
                        Generate QR Code
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-nature-600">
                  Logged in as: <span className="font-medium">{user}</span>
                </p>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Generated QR Code</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {qrGenerated ? (
                    <div ref={qrRef} className="bg-white p-6 rounded-lg shadow-sm border">
                      <QRCode 
                        value={qrData || ''} 
                        size={256}
                        level="H"
                        includeMargin={true}
                      />
                      <p className="text-center mt-4 font-medium">{form.getValues('title')}</p>
                    </div>
                  ) : (
                    <div className="text-center py-16 px-4">
                      <QrCode className="h-16 w-16 text-nature-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-nature-800 mb-2">
                        No QR Code Generated Yet
                      </h3>
                      <p className="text-nature-600 max-w-sm mx-auto">
                        Fill out the form on the left and click "Generate QR Code" to create a QR code for Anandwan campus.
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    onClick={downloadQrCode}
                    className="bg-nature-600 hover:bg-nature-700"
                    disabled={!qrGenerated}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">How to Use QR Codes at Anandwan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-nature-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-nature-500 font-bold">1.</span>
                      <span>Create informational QR codes for different locations at Anandwan.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-nature-500 font-bold">2.</span>
                      <span>Print the QR codes and laminate them for weather protection.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-nature-500 font-bold">3.</span>
                      <span>Place QR codes at relevant locations around the campus.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-nature-500 font-bold">4.</span>
                      <span>Visitors can scan the codes with their smartphone cameras to access information.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-nature-500 font-bold">5.</span>
                      <span>Update content regularly to keep information current and relevant.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrGenerator;
