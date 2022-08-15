import React from 'react';
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import { yup, yupResolver, useWatch, useForm, Swal, Cookie, axios, routes } from "../config/services";
import { useInventoryContext } from "../ContextApi";

const Login = () => {

    const schema = yup.object().shape({
          password : yup.string().required(),
          email : yup.string().required().email(),
     })

     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
      });

     const navigate = useNavigate();
     const { contextData, setContextData } = useInventoryContext();


     const handleForm = async (data, e) => {

        setContextData({...contextData, loading : true});
        axios({
                url: "http://testapp2.studyhub.ng/api/user/auth/login",
                method: 'POST',
                data : data
            })
            .then((res) => {

                 const {status, data } = res.data;

                 if(status === 'success')
                      Cookie.set('token', data.token);

                navigate(routes.inventory.home)
                setContextData({...contextData, loading : false});

            })
            .catch((e) => {

                    Swal.fire({
                      title: 'Opps!',
                      text : 'Invalid Login Details',
                      icon: 'error',
                      confirmLoadingButtonText: 'Cancel'
                    })
                    
                    setContextData({...contextData, loading : false});
            });

    }


	return (
		<div className="page-wrapper flex items-center justify-center">
    <form className="shadow-2xl p-5 flex flex-col items-center md:w-1/3 space-y-5 border" onSubmit={handleSubmit(handleForm)}>

         <div className="form-group flex justify-center">
            <div className="rounded-full bg-black p-3">
                  <img src="logo.svg"  className="h-[70px] w-[70px]" alt="" />
            </div>
        </div>

         <div className="form-group text-center font-bold text-2xl">
            <h1>Login</h1>
        </div>
        
        {/*<div className="form-group">
            <input type="text" className="form-control" placeholder="Email*" />
        </div>

        <div className="form-group">
            <input type="password" className="form-control" placeholder="Password*" />
        </div>*/}

        <TextField 
                            error={errors.email} 
                            {...register('email')}
                            label="Email Address"
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
                            type="password"
                            helperText={errors.password?.message} 
                            fullWidth  
                        />


        <div className="form-group">
            <button type="submit" className="btn bg-green-500 hover:bg-green-600 w-full btn-sm">SIGN IN</button>
        </div>

    </form>
    
</div>

	)
}

export default Login;