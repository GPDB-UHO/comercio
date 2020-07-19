import React from "react";
import { useAsync } from "react-async";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";

import { fetchNbhd } from "helpers";

const Nbhd = () => {
  const { data } = useAsync({ promiseFn: fetchNbhd });

  return (
    <>
      <Card>
        <CardContent style={{ padding: 0 }}>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id del Reparto</TableCell>
                  <TableCell>Nombre</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data?.results || []).map((product) => (
                  <TableRow hover key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.nombre}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </>
  );
};

export default Nbhd;
