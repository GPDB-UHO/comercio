import React, { useState } from "react";
import { useAsync } from "react-async";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { fetchDistributions, useToggleState } from "helpers";
import AddDistributionModal from "./AddDistributionModal";

const Distributions = (props) => {
  const { data, reload } = useAsync({ promiseFn: fetchDistributions });
  const [open, openModal, closeModal] = useToggleState();

  return (
    <div>
      {open && (
        <AddDistributionModal
          open
          onClose={closeModal}
          onAddDistribution={() => reload()}
        />
      )}

      <Card>
        <CardHeader
          action={
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={openModal}
            >
              Agregar distribución
            </Button>
          }
          title="Distribuciones"
        />
        <Divider />
        <CardContent style={{ padding: 0 }}>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Repartido</TableCell>
                  <TableCell>Sobrante</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell>Bodegas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data?.results || []).map((dist) => (
                  <TableRow hover key={dist.id}>
                    <TableCell>{dist.id}</TableCell>
                    <TableCell>{dist.cantidad}</TableCell>
                    <TableCell>{dist.repartido}</TableCell>
                    <TableCell>{dist.sobrante}</TableCell>
                    <TableCell>{dist.fecha}</TableCell>
                    <TableCell>{dist.producto_detalles.nombre}</TableCell>
                    <TableCell>
                      {dist.bodegas_detalles
                        .map((item) => item.nombre)
                        .join(", ")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </div>
  );
};

export default Distributions;
