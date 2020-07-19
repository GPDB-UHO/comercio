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
                  <TableCell>Id del Producto</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Notas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data?.results || []).map((product) => (
                  <TableRow hover key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell>{product.notas}</TableCell>
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
