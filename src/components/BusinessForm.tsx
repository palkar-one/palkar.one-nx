'use client';
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "./ui/form";
import { Input } from "./ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./ui/select"
  import { Textarea } from "./ui/textarea"
import BusinessFormInstructions from "./BusinessFormInstructions";
import { Switch } from "./ui/switch";
import SelectInputFormItem from "./SelectInputFormItem";
import { categories, states } from "@/lib/constants";
import createBusinessListingAction from "../../actions/createBusinessListingActions";

const cities = [...new Set(Object.values(states).flat())].map((item) => ({ name: item, value: item, display:item }));

interface BusinessFormProps {
    showBusinessModal: boolean;
    setShowBusinessModal: (open: boolean) => void;
}

const businessFormSchema = z.object({
    isIndividual: z.boolean().default(true),
    businessName: z
      .string()
      .min(2, {
        message: "Business Name must be at least 2 characters.",
      })
      .max(35, {
        message: "Business Name must not be longer than 35 characters.",
      }),
    yourName:z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(35, {
      message: "Username must not be longer than 30 characters.",
    }),
    category: z
    .string({
      required_error: "Please select a category.",
    }),
    listingImage:  z
    .any().optional(),
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email().optional(),
    phone: z.string().min(8,{message:"Enter a valid phone number"}).max(12,{message:"Enter a valid phone number"}),
    isAvailableOnline: z.boolean().optional(),
    isPublicEntry: z.boolean().optional(),
    city: z.string().max(160).min(4),
    googleMapLink:z.string().refine((link) => {
        const googleMapsRegex = /^(https?:\/\/)?(www\.)?(google\.com\/maps|goo\.gl\/maps)\/.+/;
        return googleMapsRegex.test(link);
      }, {
        message: "Invalid Google Map link. Please enter a valid URL.",
      }),
    pincode:z.string().max(20).min(4),
    whatYouDo:z.string().max(300).min(4).optional(),
    query:z.string().max(300).min(4).optional(),
  });

type BusinessFormValues = z.infer<typeof businessFormSchema>

const defaultValues: Partial<BusinessFormValues> = {
    isAvailableOnline: false,
    isIndividual: false,
    isPublicEntry: false
}

function BusinessForm({ showBusinessModal, setShowBusinessModal }: BusinessFormProps) {
    const [selectedTab, setSelectedTab] = useState("instructions");
    const switchTabToForm = () => {
        setSelectedTab("form");
    } 
    const ref = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<BusinessFormValues>({
        resolver: zodResolver(businessFormSchema),
        defaultValues,
        mode: "onChange",
      })
    

    
      const [allCategories,setAllCategories] = useState(categories);
      const [allCities,setAllCities] = useState(cities);

    const handleSubmit = async (data: BusinessFormValues) => {
        const formDataCopy = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formDataCopy.append(key, value as string | Blob);
        });
        try {
            await createBusinessListingAction(formDataCopy);
            ref.current?.reset();
            setShowBusinessModal(false);
        } catch(error){
            console.log("Error creating listing ", error);
            throw new Error("failed");
        }

    } 
    
    return (
        <Dialog open={showBusinessModal} onOpenChange={setShowBusinessModal}>
            <DialogContent className="overflow-y-auto sm:max-w-[425px] md:max-w-5xl lg:max-w-6xl">
                <DialogHeader>
                <DialogTitle>Create Business Listing</DialogTitle>
                <DialogDescription>
                    Read the instructions and Fill out the details. Your business will be listed after the approval. If you want to know the status for your listing, Check out the Business Tab
                </DialogDescription>
                </DialogHeader>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="instructions">Instructions</TabsTrigger>
                        <TabsTrigger value="form">Registration Form</TabsTrigger>
                    </TabsList>
                    <TabsContent value="instructions"> 
                        <div className="mt-4 mx-5 md:leading-8 text-gray-500 md:max-h-[75vh] max-h-[60vh]">
                        <BusinessFormInstructions />
                        <Button onClick={switchTabToForm} className="my-4 text-gray-900" variant={"outline"}>Register</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="form"> 
                        <div className="mt-4 overflow-y-auto md:max-h-[75vh] max-h-[60vh]">
                            <Form {...form}>
                                <form ref={ref} onSubmit={(e) => {
                                    e.preventDefault();
                                    const promise = form.handleSubmit(handleSubmit);
                                    toast.promise(promise, {
                                        loading: "List Submitted...",
                                        success: "List created",
                                        error: "Error creating list"
                                    })
                                }} method="POST" >
                                <div className="mx-2 my-2">
                                <FormField
                                    control={form.control}
                                    name="isIndividual"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                            Individual Entity or Service
                                            </FormLabel>
                                            <FormDescription>
                                            Please select if you are the only person associated with the listing.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        </FormItem>
                                    )}
                                />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <SelectInputFormItem
                                                options = {allCategories}
                                                field = {field}
                                                fieldName={"category"}
                                                displayName={"Category"}
                                                form={form}
                                                setOptions={setAllCategories}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="businessName"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Business Name*</FormLabel>
                                            <FormDescription>
                                                This is your public display name.
                                            </FormDescription>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="yourName"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Your Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Phone Number *</FormLabel>
                                            <FormControl>
                                                <Input type="string" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="listingImage"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Listing Image</FormLabel>
                                            <FormControl>
                                                <Input type="file" accept="image/*" onChange={(e) => {
                                                    // handleImageUpload(e);
                                                    if (e.target.files) {
                                                        field.onChange(e.target.files[0]); // Sync with form control
                                                    }
                                                  }} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mx-2 my-2">
                                <FormField
                                    control={form.control}
                                    name="isAvailableOnline"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                            Available Online
                                            </FormLabel>
                                            <FormDescription>
                                            Please select if your services are available online or selling products online.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        </FormItem>
                                    )}
                                />
                                </div>
                                <div className="mx-2 my-2">
                                <FormField
                                    control={form.control}
                                    name="isPublicEntry"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                            Public Entry
                                            </FormLabel>
                                            <FormDescription>
                                            Please select if you are referring some one else business. Note this may require a communication and consent from the owner before the listing.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        </FormItem>
                                    )}
                                />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="googleMapLink"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Google Map Link</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="whatYouDo"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>What you do?</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <SelectInputFormItem
                                                options = {allCities}
                                                field = {field}
                                                fieldName={"city"}
                                                displayName={"City"}
                                                form={form}
                                                setOptions={setAllCities}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="pincode"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Pincode</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mx-2 my-2">
                                    <FormField
                                        control={form.control}
                                        name="query"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Any Other Query</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button className="mt-2 mx-2" type="submit">Save changes</Button>
                                </form>
                            </Form>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default BusinessForm;