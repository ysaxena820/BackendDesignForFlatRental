import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Box, Badge, Image, Grid, GridItem, ScaleFade, Slide } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { FaSpinner } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios'

function PropertyCard() {


    const [propertyList, setPropertyList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const locationFilter = searchParams.get("location")
    const typeFilter = searchParams.get("type")
    const priceFilter = searchParams.get("price")

    useEffect(() => {
        setLoading(true)
        axios.get('https://flat-apartment-rental.vercel.app/property/getAll').then(res => {
            console.log('here is response', res.data.propertyList);
            setPropertyList(res.data.propertyList);
        }).catch(
            err => {
                console.error('Error fetching Data:', err);
                toast.error("There is some problem in fetching data check your internet connection!!")

            }
        ).finally(() => {
            setLoading(false);
        });
    }, [])

    if (loading) {
        return (
            <div className='self-center absolute top-1/2 left-1/2'>
                <FaSpinner className='animate-spin bg-transparent text-5xl mt-auto' />

            </div>
        )
    }
    if (locationFilter || priceFilter || typeFilter) {
        // console.log(price)
        // console.log(location)
        let newPropertyList = propertyList;
        if (locationFilter) {
            newPropertyList = newPropertyList.filter(item => item.location === locationFilter)
        }
        if (priceFilter) {
            newPropertyList = newPropertyList.filter(item => item.price < Number(priceFilter))
        }

        if (typeFilter) {
            newPropertyList = newPropertyList.filter(item => item.type === typeFilter)
        }

        // console.log(newPropertyList)
        // console.log('selected Id hit', selectedId)
        return (
            <Grid templateColumns='repeat(4, 1fr)' gap={6} >
                {newPropertyList.map(property => {
                    return (
                        <GridItem key={property.id}>
                            <Link to={`/rent/${property.id}`}
                                state={{ search: `?${searchParams}`, currentHome: property }}
                            >
                                <ScaleFade initialScale={0.5} in={true}>
                                    <Box maxW='350px' borderWidth='1px' borderRadius='lg' overflow='hidden' className='bg-cyan-950'>
                                        <Image src={property.imageUrl} alt={property.imageAlt} className='h-72' />

                                        <Box p='6'>
                                            <Box display='flex' alignItems='baseline'>
                                                <Badge borderRadius='full' px='2' colorScheme='teal'>
                                                    New
                                                </Badge>
                                                <Box
                                                    color='gray.500'
                                                    fontWeight='semibold'
                                                    letterSpacing='wide'
                                                    fontSize='xs'
                                                    textTransform='uppercase'
                                                    ml='2'
                                                >
                                                    {property.location}
                                                </Box>
                                            </Box>

                                            <Box
                                                mt='1'
                                                fontWeight='semibold'
                                                as='h4'
                                                lineHeight='tight'
                                                noOfLines={1}
                                            >
                                                {property.title}
                                            </Box>

                                            <Box>
                                                {property.price}
                                                <Box as='span' color='gray.600' fontSize='sm'>
                                                    / month
                                                </Box>
                                            </Box>

                                            <Box display='flex' mt='2' alignItems='center'>
                                                {Array(5)
                                                    .fill('')
                                                    .map((_, i) => (
                                                        <StarIcon
                                                            key={i}
                                                            color={i < property.rating ? 'teal.500' : 'gray.300'}
                                                        />
                                                    ))}
                                                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                                    {property.reviewCount} ratings
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </ScaleFade >
                            </Link>
                        </GridItem>

                    )
                })}
            </Grid>
        )
    }

    return (

        <Grid templateColumns='repeat(4, 1fr)' gap={6} >
            {propertyList.map((property, index) => {
                return (

                    <GridItem key={property.id}>
                        <Link to={`/rent/${property.id}`}
                            state={{ search: `?${searchParams}`, currentHome: property }}
                        >
                            <ScaleFade initialScale={0.5} in={true}>
                                <Box maxW='350px' borderWidth='1px' borderRadius='lg' overflow='hidden' className='bg-cyan-950'>
                                    <Image src={property.imageUrl} alt={property.imageAlt} className='h-72' />

                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>
                                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                                New
                                            </Badge>
                                            <Box
                                                color='gray.500'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='xs'
                                                textTransform='uppercase'
                                                ml='2'
                                            >
                                                {property.location}
                                            </Box>
                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={1}
                                        >
                                            {property.title}
                                        </Box>

                                        <Box>
                                            {property.price}
                                            <Box as='span' color='gray.600' fontSize='sm'>
                                                / month
                                            </Box>
                                        </Box>

                                        <Box display='flex' mt='2' alignItems='center'>
                                            {Array(5)
                                                .fill('')
                                                .map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        color={i < property.rating ? 'teal.500' : 'gray.300'}
                                                    />
                                                ))}
                                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                                {property.reviewCount} reviews
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </ScaleFade >
                        </Link>
                    </GridItem>

                )
            })}
        </Grid >
    )
}

export default PropertyCard

