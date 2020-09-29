import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

import {
    deleteDistribution,
    useData,
} from "helpers";


const useStyles = makeStyles(() => ({
    root: {
        minHeight: "35vh",
    },
}));

export default function DeleteDistribution(props) {
    const [errors, setErrors] = useData({});

    const classes = useStyles();

    function handleSubmit() {
        deleteDistribution(props.instance.id)
            .then((response) => {
                props.onClose();
                props.onAddDistribution();
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
            <DialogTitle>Eliminar distribución</DialogTitle>
            <DialogContent classes={{root: classes.root}}>
                Al eliminar la distribución{" "}
                <u><i>[{props.instance.fecha}] {props.instance.producto_detalles.nombre},
                    a {props.instance.bodegas_detalles
                        .map((item) => item.nombre)
                        .join(", ")}</i></u>
                <b> se eliminarán todos los datos asociados. </b>
                <br/>
                <br/>
                <b>Esta acción no puede deshacerse.</b>
                <br/>
                <br/>
                Está seguro de que desea eliminarla?
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => handleSubmit()}>
                    Eliminar
                </Button>
                <Button color="error" onClick={() => props.onClose()}>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
