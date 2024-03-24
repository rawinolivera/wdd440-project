'use client'
import React from "react";
import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from 'yup';
import { filterFormikErrors } from "@/app/utils/formikHelpers";
import { POST } from "@/app/api/users/routes";



const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required!"),
    email: yup.string().email("Invalid Email!").required("Email is required!"),
    password: yup.string().min(8,"Password must be at least 8 characters.").required("Password is required!")
})

export default function SignUp() {
    const {
        values, 
        handleChange, 
        handleBlur, 
        handleSubmit, 
        isSubmitting, 
        errors, 
        touched} 
        = useFormik({
        initialValues: {name: "", email: "", password: ""},
        validationSchema,
        onSubmit:async (values, action) => {
          action.setSubmitting(true);
            await fetch("/api/users", {
              method: "POST",
              body: JSON.stringify(values),
            }).then(async res => {
              if(res.ok){
               const result = await res.json();
               console.log(result);
              }
              action.setSubmitting(false);
            })
        },
    })

  const formErrors: string[] = filterFormikErrors(errors, touched, values);

  const { email, name, password } = values

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}  >
      <Input name="name" label="Name" onBlur={handleBlur} onChange={handleChange} value={name}/>
      <Input name="email" label="Email" onBlur={handleBlur} onChange={handleChange} value={email} />
      <Input 
        name="password" 
        label="Password" 
        type="password" 
        onBlur={handleBlur} 
        onChange={handleChange} 
        value={password} 
      />
      <Button disabled = {isSubmitting} type="submit" className="w-full">
        Sign up
      </Button>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div key={err} className="space-x-1 flex items-center text-red-500">
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}