import { useForm } from 'react-hook-form'
import axios from 'axios';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react';


export default function Formpage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  
  const onSubmit = (data) => {
    const userData = sessionStorage.getItem("token");
    console.log(userData);
    const allData = { ...data, userData: userData }; // Assign userData as a property
    axios
      .post("https://s54-travel-advisory2.onrender.com/travel/Data", allData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error:", error); 
      });
  };

  return (
    <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl minW={"sm"} isInvalid={errors.name}>
        <FormLabel htmlFor='name'>Place name</FormLabel>
        <Input
          id='name'
          placeholder='enter place name'
          {...register('name', {
            required: 'name is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
          <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      
      </FormControl>
      <FormControl maxW={"sm"} isInvalid={errors.name}>
        <FormLabel htmlFor='state'>State</FormLabel>
        <Input
          id='name'
          placeholder='enter state'
          {...register('state', {
            required: 'state is required',
          })}
        />
          <FormErrorMessage>
          {errors.state && errors.state.message}
        </FormErrorMessage>
      
      </FormControl>
      <FormControl maxW={"sm"} isInvalid={errors.name}>
        <FormLabel htmlFor='rating'>rating</FormLabel>
        <Input
          id='rating'
          placeholder='enter rating'
          {...register('rating', {
            required: 'rating is required',
          })}
        />
          <FormErrorMessage>
          {errors.rating && errors.rating.message}
        </FormErrorMessage>
      
      </FormControl>


      <FormControl maxW={"sm"} isInvalid={errors.name}>
        <FormLabel htmlFor=''>Review</FormLabel>
        <Input
          id='review'
          placeholder='enter review'
          {...register('review', {
            required: 'review is required'
          })}
        />
          <FormErrorMessage>
          {errors.review && errors.review.message}
        </FormErrorMessage>
      
      </FormControl>


      <FormControl maxW={"sm"} isInvalid={errors.name}>
        <FormLabel htmlFor='img'>Place image</FormLabel>
        <Input
          placeholder='enter place image'
          {...register('img', {
            required: 'image is required'
          })}
        />
          <FormErrorMessage>
          {errors.img && errors.img.message}
        </FormErrorMessage>
      
      </FormControl>

      <FormControl maxW={"sm"} isInvalid={errors.name}>
        <FormLabel htmlFor='infrastructure'> infrastructure</FormLabel>
        <Input
          placeholder='enter infrastructure'
          {...register('infrastructure', {
            required: 'infrastructure is required'
          })}
        />
          <FormErrorMessage>
          {errors.infrastructure && errors.infrastructure.message}
        </FormErrorMessage>
      
      </FormControl>

      <FormControl maxW={"sm"} isInvalid={errors.name}>
        <FormLabel htmlFor='cameragoogle_map_location'>google_map_location</FormLabel>
        <Input
          placeholder='enter google_map_location '
          {...register('google_map_location', {
            required: 'google_map_location is required'
          })}
        />
          <FormErrorMessage>
          {errors.google_map_location && errors.google_map_location.message}
        </FormErrorMessage>
      
      </FormControl>

      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
    </div>

  )
}