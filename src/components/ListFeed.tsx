'use client'
import { useEffect, useRef, useState } from "react";
import getListingAction from "../../actions/getListingAction";
import ListingCard from "./ListingCard";
import { useSearchParams } from 'next/navigation';
import FilterComponent from "./FilterOptions";
import { useForm } from "react-hook-form";

function ListFeed() {
    const params = useSearchParams();
    const search = params.get('query');
    const [listings, setListings] = useState([]);

    const ref = useRef<HTMLFormElement>(null);

    const form = useForm<any>({
        mode: "onChange",
    });

    useEffect(()=> {
        console.log(search)
        const fetchLists = () => {
            try {
                getListingAction(search).then((response)=> {
                    console.log(response)
                    setListings(response?.data);
                    if(response.location){
                        form.setValue('city',response.location);
                    }
                    if(response.category){
                        form.setValue('category',response.category);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchLists();
    },[search]);
    // const listings = await getListingAction(search); // Assuming getListingAction handles search
    const handleFilter = (data: any) => {
        const category = data.category;
        const city = data.city;
        const searchString =  category+' '+city;
        try {
            getListingAction(searchString).then((response)=> {
                setListings(response?.data);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="grid grid-cols-1 md:grid-cols-8 mt-5 sm:px-5">
        <FilterComponent ref={ref} form={form} handleFilter={handleFilter} />
        {listings?.map((listing: any) => ( 
            <ListingCard key={listing._id} listing={listing} />
        ))}
    </div>
}

export default ListFeed;