// ReviewForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Input, Button, Textarea, VStack, Flex } from '@chakra-ui/react';
import { FaSpinner } from "react-icons/fa";
import { toast } from 'react-toastify';

const ReviewsPage = ({ productId, onReviewSubmit }) => {
    const [message, setMessage] = useState('');
    const [reviewList, setReviewList] = useState(null);
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    console.log(id)


    useEffect(() => {
        fetchReviewData();
    }, [id])
    const fetchReviewData = async () => {
        try {
            setLoading(true);
            const response = await axios.post('https://flat-apartment-rental.vercel.app/reviews/getById', {
                id
            });

            if (response.status === 200) {
                console.log(response.data);
                setReviewList(response.data.review);
            } else {
                console.log('Failed to fetch');
            }
        } catch (error) {
            console.error('Error fetching review data:', error);
            toast.error("There is some problem in fetching review data. Check your internet connection!!");
        } finally {
            setLoading(false);
        }
    }
    const handleSubmit = async () => {
        if (!localStorage.getItem("user")) {
            toast.error("Please login before submitting a review!")
        }
        else {
            try {
                // Send review data to the backend
                const response = await axios.post('https://flat-apartment-rental.vercel.app/reviews/submit', {
                    id,
                    username: localStorage.getItem("user"),
                    message,
                });

                if (response.status == 200) {
                    toast.success("review successfully submitted!");
                }

            } catch (error) {
                console.error('Error submitting review:', error);
            }
        }
    };

    return (
        <div className='flex flex-col h-full justify-between'>
            <div className='w-full min-h-[10rem] pt-2 pd-2 scroll-container'>
                {loading ? <FaSpinner className='animate-spin bg-transparent text-3xl mt-auto' /> :
                    (reviewList?.length > 0 ?
                        (
                            reviewList.map((review, index) => (
                                <div>
                                    <div key={index} className='flex justify-between pr-2 pl-2 gap-2'>
                                        <p className='text-sm'>{review.message}</p>
                                        <p className='text-xs text-gray-300'>{review.username}</p>
                                    </div>
                                    <hr className='mb-2 mt-1' />
                                </div>
                            ))
                        ) : <p>No Reviews here...</p>)
                }
            </div>
            <div className='flex gap-2 '>
                <Input
                    placeholder="Write your review here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button h='10' colorScheme="teal" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>

    );
};





export default ReviewsPage;
