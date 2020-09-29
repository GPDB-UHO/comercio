import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    TextField,
    Grid,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

import {deleteProduct, useData} from "helpers";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "200px",
    },
}));

export default function DeleteProduct(props) {
    const [errors, setErrors] = useData({});

    const classes = useStyles();

    function handleSubmit() {
        deleteProduct(props.instance.id)
            .then(() => {
                props.onClose();
                props.onSubmit();
            })
            .catch((error) => {
                setErrors(error.response.data);
            });
    }

    return (
        <Dialog
            onClose={props.onClose}
            open={props.open}
            maxWidth="sm"
            fullWidth
            disableBackdropClick
        >
            <DialogTitle>
                Eliminar producto
            </DialogTitle>
            <DialogContent classes={{root: classes.root}}>
                Al eliminar el
                producto <u><i>{props.instance.nombre}{!!props.instance.notas && ` - ${props.instance.notas}`}</i></u>
                <b> se eliminarán todos los datos asociados. </b>
                <br/>
                <br/>
                <b>Esta acción no puede deshacerse.</b>
                <br/>
                <br/>
                Está seguro de que desea eliminarlo?
            </DialogContent>
            <DialogActions>
                <Button color="inherit" onClick={() => handleSubmit()}>
                    Eliminar
                </Button>
                <Button color="secondary" onClick={props.onClose}>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
