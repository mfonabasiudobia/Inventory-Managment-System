import React from 'react';
import { useGridApiContext } from '@mui/x-data-grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { dateConfig, moment } from "../../config/services";

export const InputValidateEditComponent = (props : GridRenderEditCellParams) => {

      const { id, value, field } = props;
      const refs = useGridApiContext();

      const handleValueChange = (e) => {
            let formattedValue = e.target.value;
        if(field == 'barcode'){
            formattedValue = e.target.value.replace(/[^0-9-]/g, '').replace(/(\..*)\./g, '$1');
        }else if(field == 'unit_per_case'){
            formattedValue = e.target.value.replace(/[^0-9-]/g, '').replace(/(\..*)\./g, '$1');
        }else if(field == 'quantity_pcs'){
            formattedValue = e.target.value.replace(/^0/, '').replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        }else if(field == 'quantity_box'){
            formattedValue = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        }

        refs.current.setEditCellValue({ id, field, value: formattedValue });
      };


    return <input className="h-full h-full" type='text' value={value} onChange={handleValueChange} />
}


export const RenderExpiryDateAvailableColumn = (props : GridRenderEditCellParams) => {

      const { id, value, field } = props;
      const refs = useGridApiContext();
      
      const handleValueChange = (newDate) => {
            let formattedValue = moment(newDate).format('YYYY-MM-DD');
            refs.current.setEditCellValue({ id, field, value: formattedValue });
      };

    return (<LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            onChange={handleValueChange}
                            value={value}
                            views={["year", "month"]}
                            inputFormat="MM-yy"
                            renderInput={(params) => <TextField {...params} />}
                          />
        </LocalizationProvider>)

                       
}
