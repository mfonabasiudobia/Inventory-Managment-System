import React from 'react'
import { yup, yupResolver, useForm, toast, axios, dateConfig } from "../../../config/services";
import { useInventoryContext } from "../../../ContextApi";
import { TextField } from '@mui/material';
import Flatpickr from "react-flatpickr";

const Add = ({ status, toggleAddModal, toggleRefresh }) => {

	const schema = yup.object().shape({
          barcode : yup.string().required(),
          description : yup.string().required(),
          expiry_date : yup.string().required(),
          quantity_pcs : yup.string().required(),
          quantity_box : yup.string().required(),
     })

     const { register, handleSubmit, setError, setValue, reset, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
      });
     const { contextData, setContextData } = useInventoryContext();

	const handleForm = async (data, e) => {

        setContextData({...contextData, loading : true});
        axios.post('user/notifications', data)
            .then((res) => {
                
                 const {status, data } = res.data;
                 if(status === 'success')
                 		 toast("Notification Added Successfully");

                 toggleAddModal();
                 toggleRefresh();
                 reset();
            })
            .catch((e) => {
            	const { data } = e.response.data;
                for (const key in data) {
                    setError(key, {type : 'custom', message : data[key] });
                }
            })
            .finally(() => setContextData({...contextData, loading : false}));

    }


	return (
		<div class={`modal-wrapper ${!status ? 'hidden' : ''}`}>
		<section class="modal-inner-wrapper">
		        <form class="modal-body rounded-lg shadow w-full md:w-1/2 z-[1005] space-y-4 p-5 grid grid-cols-2 gap-x-5 p-5" onSubmit={handleSubmit(handleForm)}>

		        <div class="form-group font-bold col-span-2">
		            <h2>Add Notification</h2>
		        </div>


                 <TextField 
                            error={errors.barcode} 
                            {...register('barcode')}
                            label="Barcode"
                            variant="outlined" 
                            helperText={errors.barcode?.message}
                            type="text" 
                            fullWidth  
                        />

		        <TextField 
                            error={errors.description} 
                            {...register('description')}
                            label="Description"
                            variant="outlined" 
                            helperText={errors.description?.message}
                            type="text" 
                            fullWidth  
                        />


                <div>
                    <Flatpickr
                        data-input
                        placeholder="Expiry Date"
                        options={{...dateConfig, dateFormat : 'm-y', altFormat : 'j-y' }}
                        onChange={(dates, dateStr, instance) => setValue('expiry_date', dateStr)}
                    />
                    {errors.expiry_date && <span className='error'>{errors.expiry_date?.message}</span>}
                </div>

                 <TextField 
                            error={errors.quantity_pcs} 
                            {...register('quantity_pcs')}
                            label="Minimum Qty(Pcs)"
                            variant="outlined" 
                            helperText={errors.quantity_pcs?.message}
                            type="text" 
                            fullWidth  
                        />

                <TextField 
                            error={errors.quantity_box} 
                            {...register('quantity_box')}
                            label="Minimum Qty(Box)"
                            variant="outlined" 
                            helperText={errors.quantity_box?.message}
                            type="text" 
                            fullWidth  
                        />

		        <div class="form-group flex items-center justify-end col-span-2">
		            <button type="submit" class="btn bg-green-500 hover:bg-green-600 btn-sm">SAVE</button>

		            <button type="button" class="btn text-black btn-sm" onClick={() => toggleAddModal()}>CANCEL</button>
		        </div>

		        </form>
		</section>

		</div>

	)
}

export default Add;