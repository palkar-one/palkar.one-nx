'use client'
import { useState, useEffect, SetStateAction, useRef } from 'react';
import { Select } from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';
import SelectInputFormItem from './SelectInputFormItem';
import { Form, FormField } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { states,categories } from '@/lib/constants';
import { Button } from './ui/button';
const cities = [...new Set(Object.values(states).flat())].map((item) => ({ name: item, value: item, display:item }));

interface FilterComponentProps {
  ref: React.RefObject<HTMLFormElement | null>;
  form: any;
  handleFilter: any;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ref, form, handleFilter}) => {
    const [allCategories,setAllCategories] = useState(categories);
    const [allCities, setAllCities] = useState(cities);
 

  return (
    <div className="col-span-full my-4 bg-white rounded-md border shadow-sm p-4">
        <Form {...form}>
            <form ref={ref} onSubmit={(e) => {
                e.preventDefault();
                const promise = form.handleSubmit(handleFilter);
                toast.promise(promise, {
                    success: "Trying to fetch lists",
                })
            }} method="POST" >
                <div className='flex flex-wrap'>
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
                <div className='flex items-end pb-2 px-2'>
                    <Button variant={"outline"} onSubmit={handleFilter}>Filter</Button>
                </div>
                </div>
            </form>
        </Form>
    </div>
  );
};

export default FilterComponent;