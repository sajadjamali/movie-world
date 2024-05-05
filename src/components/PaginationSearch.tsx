"use client"
import React, { useState } from "react";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import MoviesList from "@/components/MoviesList";
import { convertToPascalCase, isExistPoster, getFetchUrl } from '@/utils';
import { useGetSearchedItems } from "@/services/search";
import Actor from "./Actor";
import Loading from "./Loading";
import '@/styles/selectBox.css';
import { ActorType } from "@/types";

const PaginationSearch: React.FC<{ searchValue: string }> = ({ searchValue }) => {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [selectedItem, setSelectedItem] = useState<string>('1');

    const fetchUrl = getFetchUrl(searchValue, pageNumber, selectedItem);
    const { data, isLoading, isError } = useGetSearchedItems(searchValue, selectedItem, fetchUrl, pageNumber);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
    };

    if (isLoading) return <Loading />
    if (isError) return <p className="my-10 text-white text-center text-xl">error😑</p>
    if (!data.results.length) return (
        <div className="text-xl flex flex-col items-center space-y-10 text-white">
            <p>Searched text: <span className="text-rose-500">{searchValue}</span></p>
            <p>Unfortunately, there is no item with this name</p>
        </div>
    )

    // pascal code ro check kon

    return (
        <>
            <div className="select relative flex h-[3em] overflow-hidden ring-2 ring-yellow-500 w-10/12 min-[400px]:w-6/12 sm:w-5/12 lg:w-3/12 2xl:w-2/12 mx-auto rounded-md">
                <select value={selectedItem} onChange={(e) => { setSelectedItem(e.target.value); setPageNumber(1) }}>
                    <option value="1">Movies</option>
                    <option value="2">Actors</option>
                </select>
            </div>
            {
                isExistPoster(data.results) ? (
                    selectedItem === '1' ? (
                        <MoviesList title={`${convertToPascalCase(`Searched text: ${searchValue}`)}`} movies={data.results} />
                    ) : (
                        <>
                            <p className="text-white text-2xl text-center my-10">Searched text: <span className="text-rose-500">{searchValue}</span></p>
                            <div className="px-3 text-white grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 md:gap-5 justify-items-center gap-3">
                                {
                                    data.results.map((actor: ActorType) => (
                                        actor.profile_path && <Actor key={actor.id} actor={actor} />
                                    ))
                                }
                            </div>
                        </>
                    )
                ) : (
                    <p className="text-center text-rose-500 text-xl my-20">there is no information on this pagination page</p>
                )
            }

            <div className="flex justify-center text-white my-10">
                <Pagination
                    color="secondary"
                    count={data.total_pages > 500 ? 500 : data.total_pages}
                    page={pageNumber}
                    onChange={handleChange}
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            sx={{
                                '&.MuiPaginationItem-root': {
                                    fontSize: '20px',
                                    color: 'white',
                                },
                                '&.MuiPaginationItem-root:hover': {
                                    backgroundColor: 'aqua',
                                },
                            }}
                        />
                    )}
                />
            </div>
        </>
    )
}

export default PaginationSearch;