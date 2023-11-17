import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Box, Badge, Image, Grid, GridItem, ScaleFade, Slide } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'

function PropertyCard() {


    // https://ibb.co/0hHt6Bg

    const propertyList = [{
        id: 1,
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        location: 'Darpan',
        title: 'Modern home in city center in the heart of historic Los Angeles',
        type: 'Flat',
        price: 3900,
        reviewCount: 34,
        rating: 4,
    },
    {
        id: 2,
        imageUrl: 'https://i.ibb.co/kGgZ1Zv/452311982-O-1697875180375.jpg',
        imageAlt: 'Rear view of modern home with pool',
        location: 'Bhago Majra',
        title: 'Modern home in city center in the heart of historic Los Angeles',
        type: 'PG',
        price: 14900,
        reviewCount: 34,
        rating: 4,
    },
    {
        id: 3,
        imageUrl: 'https://i.ibb.co/JcHndgb/448262314-O-1696041109099.jpg" alt="448262314-O-1696041109099',
        imageAlt: 'Rear view of modern home with pool',
        location: 'Shivjot',
        title: 'Modern home in city center in the heart of historic Los Angeles',
        type: 'Flat',
        price: 5000,
        reviewCount: 34,
        rating: 4,
    },

    {
        id: 4,
        imageUrl: 'https://i.ibb.co/QDNy45p/449999468-O-1696846975857.jpg" alt="449999468-O-1696846975857',
        imageAlt: 'Rear view of modern home with pool',
        location: 'Omega City',
        title: 'Modern home in city center in the heart of historic Los Angeles',
        type: 'Flat',
        price: 3500,
        reviewCount: 34,
        rating: 4,
    },
    {
        id: 5,
        imageUrl: 'https://i.ibb.co/ydVTz7k/452305856-O-1697876155598.jpg" alt="452305856-O-1697876155598',
        imageAlt: 'Rear view of modern home with pool',
        location: 'Modern Valley',
        title: 'Modern home in city center in the heart of historic Los Angeles',
        type: 'PG',
        price: 3600,
        reviewCount: 34,
        rating: 4,
    },
    {
        id: 6,
        imageUrl: 'https://i.ibb.co/sy8HN50/453330572-O-1698405964290.jpg" alt="453330572-O-1698405964290',
        imageAlt: 'Rear view of modern home with pool',
        location: 'GBP Crest',
        title: 'Modern home in city center in the heart of historic Los Angeles',
        type: 'PG',
        price: 4000,
        reviewCount: 34,
        rating: 4,
    }]

    const [selectedId, setSelectedId] = useState(null)
    const [filters, setFilters] = useState(false);
    const { location, price } = useSelector((state) => state.rent);
    const [searchParams, setSearchParams] = useSearchParams();
    const locationFilter = searchParams.get("location")
    const typeFilter = searchParams.get("type")
    const priceFilter = searchParams.get("price")

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
                                state={{ search: `?${searchParams}`, type: typeFilter }}
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

