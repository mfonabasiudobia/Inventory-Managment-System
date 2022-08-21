import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Layout from "../../layout";
import {  yup, yupResolver, useForm, toast, axios, routes } from "../../config/services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TextField } from '@mui/material';
import { useInventoryContext } from "../../ContextApi";

const Profile = () => {

  const schema = yup.object().shape({
          firstName : yup.string().required(),
          lastName : yup.string().required(),
          email : yup.string().required(),
          password : yup.string(),
     })

     const { register, handleSubmit, setError, reset, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
      });

     const { contextData, setContextData } = useInventoryContext();

    useEffect(() => {
           setContextData({...contextData, loading : true});
            axios.get("user/profile")
            .then((res) => {
                   const {status, data } = res.data;
                   if(status === 'success')
                      reset({ firstName : data.first_name, lastName : data.last_name, email : data.email  })
              })
              .catch(console.log)
              .finally(() => setContextData({...contextData, loading : false}))        

  },[])


  const handleForm = async (data, e) => {
        setContextData({...contextData, loading : true});
        axios.post("user/profile", data)     
            .then((res) => {
                 const {status, data } = res.data;
                 if(status === 'success'){
                      toast("Profile Updated Successfully");      
                      reset({ password : ''});  
                }
                     
            })
            .catch((e) => {

              const { data } = e.response.data;

                for (const key in data) {
                    setError(key, {type : 'custom', message : data[key] });
                }

            }).finally(() => setContextData({...contextData, loading : false}));

    }



return (
    <Layout>
          <section class="p-4 space-y-5">
            <h1>My Profile</h1>

      <div class="p-5 py-10 space-y-5">

         <form class="grid grid-cols-3 gap-5" onSubmit={handleSubmit(handleForm)}>

            <TextField 
                            error={errors.firstName} 
                            {...register('firstName')}
                            label="First Name"
                            variant="outlined" 
                            helperText={errors.firstName?.message}
                            type="text" 
                            fullWidth  
                        />

            <TextField 
                            error={errors.lastName} 
                            {...register('lastName')}
                            label="Last Name"
                            variant="outlined" 
                            helperText={errors.lastName?.message}
                            type="text" 
                            fullWidth  
                        />


            <TextField 
                            error={errors.email} 
                            {...register('email')}
                            label="Email"
                            variant="outlined" 
                            helperText={errors.email?.message}
                            type="text" 
                            fullWidth  
                        />

            <TextField 
                            error={errors.password} 
                            {...register('password')}
                            label="Password"
                            variant="outlined" 
                            helperText={errors.password?.message}
                            type="text" 
                            fullWidth  
                        />


             <div class="form-group col-span-3 flex justify-end">
                 <button type="submit" class="btn bg-green-500 text-white p-3">Update</button>
             </div>

         </form>

      </div>


            </section>
    </Layout>
  );
}


export default Profile;
