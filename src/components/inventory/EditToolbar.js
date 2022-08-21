import React, { useState, useEffect } from 'react';
import { GridToolbar, useGridApiContext  } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const EditToolbar = (props) => {
    const apiRef = useGridApiContext();
    const [isClicked, setIsClicked] = useState(false)
    const handleAddNewRowClick = () => {
        const id = 'new-column';
        
        apiRef.current.updateRows([{ id, isNew: true }]);
        apiRef.current.setRowMode(id, 'edit');
            // Wait for the grid to render with the new row
            setTimeout(() => {
                setIsClicked(true)
                apiRef.current.scrollToIndexes({
                    rowIndex: apiRef.current.getRowsCount() - 1,
                });
                // apiRef.current.setCellFocus(id, field);
            }, 500);
        
    }

    useEffect(() => {
        let _ids = apiRef?.current.state.rows.ids;

        if (!_ids.includes('new-column') && _ids.length > 0) {
            handleAddNewRowClick();
        }
    }, [apiRef?.current.state.rows.ids])

    return <GridToolbar showQuickFilter={true} quickFilterProps={{ debounceMs: 500 }} />;

}

EditToolbar.propTypes = {
    apiRef: PropTypes.shape({
        current: PropTypes.object.isRequired,
    }).isRequired,
};

export default EditToolbar;




