import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Layout from "../../layout";
import {  yup, yupResolver, useForm, toast, axios, routes } from "../../config/services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText  } from '@mui/material';
import { useInventoryContext } from "../../ContextApi";

const Edit = () => {

  const schema = yup.object().shape({
          firstName : yup.string().required(),
          lastName : yup.string().required(),
          email : yup.string().required(),
          group : yup.string().required(),
     })

     const { register, handleSubmit, setError, getValues, reset, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
      });

     const navigate = useNavigate();
     const [group, setGroup] = useState('');
     const { id } = useParams();
     const { contextData, setContextData } = useInventoryContext();

    useEffect(() => {
           setContextData({...contextData, loading : true});
            axios.get("user/users/" + id)
            .then((res) => {
                   const {status, data } = res.data;
                   if(status === 'success'){
                        setGroup(data.user_group_id);
                   } 
                      reset({ firstName : data.first_name, lastName : data.last_name, email : data.email, group : data.user_group_id  })
              })
              .catch(console.log)
              .finally(() => setContextData({...contextData, loading : false}))        

  },[])


  const handleForm = async (data, e) => {
        setContextData({...contextData, loading : true});
        axios({
                url: "user/users/" + id,
                method: 'PUT',
                data : data
            })
            .then((res) => {
                 const {status, data } = res.data;
                 if(status === 'success'){
                      toast("User Edited Successfully");
                      navigate(routes.users.home);
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
                    <Select {...register('group')} value={group} fullWidth label="User Group">
                        <MenuItem value="1">Super Admin</MenuItem>
                        <MenuItem value="2">User Mtayleb</MenuItem>
                        <MenuItem value="3">User Zikrit</MenuItem>
                        <MenuItem value="4">Dormant User</MenuItem>
                    </Select>
                    <FormHelperText>{errors.group?.message}</FormHelperText>
            </FormControl>


             <div class="form-group col-span-3 flex justify-end">
                 <button type="submit" class="btn bg-green-500 text-white p-3">Edit</button>
             </div>

         </form>

      </div>


            </section>
    </Layout>
  );
}


export default Edit;
