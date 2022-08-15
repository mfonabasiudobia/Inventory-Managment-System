import React, { useEffect } from 'react'
import { yup, yupResolver, useForm, toast, axios } from "../../../config/services";
import { useInventoryContext } from "../../../ContextApi";
import { TextField } from '@mui/material';

const Edit = ({ status, toggleEditModal, toggleRefresh }) => {

	const schema = yup.object().shape({
          number : yup.string().required(),
          name : yup.string().required(),
     })

     const { register, handleSubmit, setError, reset, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
      });

     const { contextData, setContextData } = useInventoryContext();


     useEffect(() => {

     	const data = contextData.data;
     	reset({ number : data.number, name : data.name });

     },[status])

	const handleForm = async (data, e) => {

        setContextData({...contextData, loading : true});
        axios({
                url: "user/suppliers/" + contextData.data.id,
                method: 'PUT',
                data : data
            })
            .then((res) => {
                 const {status, data } = res.data;

                 if(status === 'success')
                 		 toast("Supplier Edited Successfully");

                 toggleEditModal();
                 toggleRefresh();
                 reset();
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
		<div class={`modal-wrapper ${!status ? 'hidden' : ''}`}>
		<section class="modal-inner-wrapper">
		        <form class="modal-body rounded-lg shadow w-full md:w-1/4 z-[1005] space-y-4 p-5" onSubmit={handleSubmit(handleForm)}>

		        <div class="form-group font-bold">
		            <h2>Edit Supplier</h2>
		        </div>


		        <TextField 
                            error={errors.number} 
                            {...register('number')}
                            label="Number"
                            variant="outlined" 
                            helperText={errors.number?.message}
                            type="text" 
                            fullWidth  
                        />

                 <TextField 
                            error={errors.name} 
                            {...register('name')}
                            label="Name"
                            variant="outlined" 
                            helperText={errors.name?.message}
                            type="text" 
                            fullWidth  
                        />

		        <div class="form-group flex items-center justify-end">
		            <button type="submit" class="btn bg-green-500 hover:bg-green-600 btn-sm">SAVE</button>

		            <button type="button" class="btn text-black btn-sm" onClick={() => toggleEditModal()}>CANCEL</button>
		        </div>

		        </form>
		</section>

		</div>

	)
}

export default Edit;