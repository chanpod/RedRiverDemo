import React, { useState } from 'react';
import {Dialog, Button } from '@material-ui/core';

export default ({ onClose, selectedValue, open, student }) => {

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">
                    {student.firstName} {student.lastName}
                </DialogTitle>
            </Dialog>
        </div>
    )
}