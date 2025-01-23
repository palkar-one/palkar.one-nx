'use client';
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useForm } from 'react-hook-form';
import { format } from "date-fns"
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import createPollAction from "../../actions/createPollAction";


interface PollFormProps {
    showPollModal: boolean;
    setShowPollModal: (open: boolean) => void;
}

const pollFormSchema = z.object({
    question: z.string().max(200),
    enableMultipleOptions:z.boolean().default(false),
    requiresResponseForReport:z.boolean().default(false),
    reportAfterClosingThePoll:z.boolean().default(false),
    numberOfOptions:z.number().min(2).max(10),
    category: z
    .string({
      required_error: "Please select a category.",
    }),
    pollImage:  z
    .any().optional(),
    option_1: z.string().min(1).max(150),
    option_2: z.string().min(1).max(150),
    option_3: z.string().min(1).max(150).optional(),
    option_4: z.string().min(1).max(150).optional(),
    option_5: z.string().min(1).max(150).optional(),
    option_6: z.string().min(1).max(150).optional(),
    option_7: z.string().min(1).max(150).optional(),
    option_8: z.string().min(1).max(150).optional(),
    option_9: z.string().min(1).max(150).optional(),
    option_10: z.string().min(1).max(150).optional(),
    pollCloseDate:z.date().default(new Date(new Date().setDate(new Date().getDate() + 30))),
    notes: z.string().max(200,{message:"Should not exceed 200 characters"}),
  });

type PollFormValues = z.infer<typeof pollFormSchema>

const defaultValues: Partial<PollFormValues> = {}

function PollForm({ showPollModal, setShowPollModal }: PollFormProps) {
    const [numberOfInputs, setNumberOfInputs] = useState(0); 

    const ref = useRef<HTMLFormElement>(null);

    const form = useForm<PollFormValues>({
        resolver: zodResolver(pollFormSchema),
        defaultValues,
        mode: "onChange",
      })

    const handleInputChange = (value : string) => {
        const valueInt = parseInt(value);
        setNumberOfInputs(valueInt > 0 ? valueInt : 1); 
    };
    
    const renderInputs = () => {
        const inputs = [];
        for (let i = 1; i < 10; i++) {
          inputs.push(
            <SelectItem value={(i+1).toString()}>{i+1}</SelectItem>
          );
        }
        return inputs;
      };

    const handleSubmit = async (data: PollFormValues) => {
        const formDataCopy = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formDataCopy.append(key, value as string | Blob);
        });
        try {
            await createPollAction(formDataCopy);
            ref.current?.reset();
            setShowPollModal(false);
        } catch(error){
            console.log("Error creating listing ", error);
            throw new Error("failed");
        }

    } 
    
    return (
        <Dialog open={showPollModal} onOpenChange={setShowPollModal}>
            <DialogContent className="overflow-y-auto sm:max-w-[425px] md:max-w-5xl lg:max-w-6xl">
                <DialogHeader>
                <DialogTitle>Create a Poll</DialogTitle>
                <DialogDescription>
                    You can create upto 10 options and the user can select multiple options as well.
                </DialogDescription>
                </DialogHeader>
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
                                    name="question"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Question</FormLabel>
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
                                    name="pollImage"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Image</FormLabel>
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
                            <div className="mx-2 my-4">
                            <FormField
                                control={form.control}
                                name="enableMultipleOptions"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                        Enable Multiple Option Select
                                        </FormLabel>
                                        <FormDescription>
                                        Select the Option if you want the users to selection multiple options for the question.
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
                            <div className="mx-2 my-4">
                            <FormField
                                control={form.control}
                                name="requiresResponseForReport"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                        Requires Response For Report
                                        </FormLabel>
                                        <FormDescription>
                                        Select the Option if you want the users to see the report only after answering the question.
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
                            <div className="mx-2 my-4">
                            <FormField
                                control={form.control}
                                name="reportAfterClosingThePoll"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                        Report Available after the Poll is Closed.
                                        </FormLabel>
                                        <FormDescription>
                                        Select the Option if you want the users to see the report only after answering the poll is closed.
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
                                    name="numberOfOptions"
                                    render={({ field }) => (
                                        <Select onValueChange={(value)=>{
                                            field.onChange(value);
                                            handleInputChange(value.toString());
                                        }} defaultValue={field.value.toString()}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Number of Options" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {renderInputs()}
                                        </SelectContent>
                                      </Select>
                                        
                                    )}
                                />
                            </div>
                            <div className="flex flex-wrap">
                                {Array.from({ length: numberOfInputs }).map((_, index) => (
                                    <div className="mx-2 my-2" key={index}>
                                        <FormField
                                            control={form.control}
                                            name={`option_${index + 1}` as keyof PollFormValues}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Option {index + 1}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mx-2 my-2">
                            <FormField
                                control={form.control}
                                name="pollCloseDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Poll Close Date</FormLabel>
                                    <FormDescription>
                                        Answering the poll will be disable and poll will be closed after the date.
                                    </FormDescription>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
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
                                                date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 30))
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="mx-2 my-2">
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Internal Notes</FormLabel>
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
            </DialogContent>
        </Dialog>
    )
}

export default PollForm;