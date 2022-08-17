import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Layout from "../../layout";
import {  yup, yupResolver, useForm, toast, axios, routes } from "../../config/services";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText  } from '@mui/material';
import { useInventoryContext } from "../../ContextApi";

const Create = () => {

  const schema = yup.object().shape({
          firstName : yup.string().required(),
          lastName : yup.string().required(),
          email : yup.string().required(),
          group : yup.string().required(),
          password : yup.string().required(),
     })

     const { register, handleSubmit, setError, reset, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
      });

     const navigate = useNavigate();
     const { contextData, setContextData } = useInventoryContext();


  const handleForm = async (data, e) => {

        setContextData({...contextData, loading : true});
        axios({
                url: "user/users",
                method: 'POST',
                data : data
            })
            .then((res) => {
                 const {status, data } = res.data;

                 if(status === 'success'){
                      toast("User Added Successfully");
                      navigate(routes.users.home);
                 }
                     
            })
            .catch((e) => {

              const { data } = e.response.data;

                for (const key in data) {
                    setError(key, {type : 'custom', message : data[key] });
                }

                    
            }).finally(() => {

              setContextData({...contextData, loading : false})

            });

    }



return (
    <Layout>
          <section class="p-4 space-y-5">
            <Link
                    to={routes.users.home} 
                    class="text-green-500 bg-gray-50 p-2">
                    <i class="las la-plus"></i>
                    <span>All Users</span>
           </Link>

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

             <FormControl class="form-group">
                 <InputLabel>User Group</InputLabel>
                    <Select {...register('group')} fullWidth label="User Group">
                        <MenuItem value="1">Super Admin</MenuItem>
                        <MenuItem value="2">User Mtayleb</MenuItem>
                        <MenuItem value="3">User Zikrit</MenuItem>
                        <MenuItem value="4">Dormant User</MenuItem>
                    </Select>
                    <FormHelperText>{errors.group?.message}</FormHelperText>
            </FormControl>

             <TextField 
                            error={errors.password} 
                            {...register('password')}
                            label="Password"
                            variant="outlined" 
                            helperText={errors.password?.message}
                            type="password" 
                            fullWidth  
                        />


             <div class="form-group col-span-3 flex justify-end">
                 <button type="submit" class="btn bg-green-500 text-white p-3">Create</button>
             </div>

         </form>

      </div>


            </section>
    </Layout>
  );
}


export default Create;
