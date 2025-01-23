'use client';
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
  } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";

function SelectInputFormItem({form, field, options, fieldName, setOptions, displayName, disableAdd = false }: any) {
        const [inputValue, setInputValue] = useState("");
        const [open, setOpen] = useState(false);

        const handleAddOption = () => {
            const newOption = { name: inputValue, display: inputValue };
            setOptions((prevOptions: any) => [...prevOptions, newOption]);
            form.setValue(fieldName, newOption.name);
            setInputValue("");
            setOpen(false);
           
        };

        return (
            <FormItem className="flex flex-col">
            <FormLabel>{displayName}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                <FormControl>
                    <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                    )}
                    >
                    {field.value
                        ? options.find(
                            (option:any) => option.name === field.value
                        )?.display
                        : `Select ${displayName}`}
                    <ChevronsUpDown className="opacity-50" />
                    </Button>
                </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 "  >
                <Command>
                    <CommandInput
                     placeholder="Search or add new"
                     className="h-9"
                     value={inputValue}
                     onValueChange={(e) => setInputValue(e)}
                    />
                    <CommandList>
                    {disableAdd ? <div></div> : <CommandEmpty onClick={handleAddOption}>Create "{inputValue}"</CommandEmpty>}
                    <CommandGroup>
                        {options.map((option:any) => (
                        <CommandItem
                            value={option.name}
                            key={option.name}
                            onSelect={() => {
                                setOpen(false);  
                                form.setValue(fieldName, option.name)
                            }}
                        >
                            {option.display}
                            <Check
                            className={cn(
                                "ml-auto",
                                option.name === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                            />
                        </CommandItem>
                        ))}
                    </CommandGroup>
                    </CommandList>
                </Command>
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    )
}

export default SelectInputFormItem;

