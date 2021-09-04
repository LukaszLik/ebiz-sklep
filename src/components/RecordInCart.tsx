import React from "react";
import { IconButton } from "@material-ui/core";
import { Add, Remove, Delete } from "@material-ui/icons";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ProductService from "../services/ProductService";
import { useHistory } from "react-router-dom";

export default function RecordInCart(props: any) {
  const [product, setProduct] = React.useState(props.quantity);
  let history = useHistory();

  const handleAdd = () => {
    ProductService.getProducts().then((products) => {
      setProduct(product + 1);

      for (let prod of products) {
        if (prod.id === props.id) {
          document.cookie = `${props.id}=${props.name}, ${product + 1}, ${
            props.price
          }; path=/`;
        }
      }
    });
  };

  const handleSubtract = () => {
    ProductService.getProducts().then((products) => {
      if (product > 1) {
        setProduct(product - 1);

        for (let prod of products) {
          if (prod.id === props.id) {
            document.cookie = `${props.id}=${props.name}, ${product - 1}, ${
              props.price
            }; path=/`;
          }
        }
      }
    });
  };

  const handleDelete = () => {
    ProductService.getProducts().then((products) => {
      for (let prod of products) {
        if (prod.id === props.id) {
          console.log("deleted " + props.name);
          document.cookie =
            `${props.id}=${props.name}, ${product}, ${props.price}; path=/` +
            ";expires=" +
            new Date(0).toUTCString();

          history.go(0);
        }
      }
    });
  };

  let price = (props.price * product).toFixed(2);
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>{product}</TableCell>
      <TableCell>{price} zł</TableCell>
      <TableCell>
        <IconButton
          onClick={handleAdd}
          color="primary"
          aria-label="add to shopping cart"
        >
          <Add />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton
          onClick={handleSubtract}
          color="primary"
          aria-label="add to shopping cart"
        >
          <Remove />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton
          onClick={handleDelete}
          color="primary"
          aria-label="add to shopping cart"
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>

    // <div>
    //     <Box display="flex"
    //          justifyContent="space-evenly">
    //         <h3>{props.name}</h3>
    //         <h3>{product}</h3>
    //         <h3>{props.price}</h3>
    //
    //         <IconButton onClick={handleAdd} color="primary" aria-label="add to shopping cart">
    //             <Add/>
    //         </IconButton>
    //         <IconButton onClick={handleSubtract} aria-label="remove shopping cart" color="secondary">
    //             <Remove/>
    //         </IconButton>
    //         <IconButton aria-label="delete" color="secondary">
    //             <Delete/>
    //         </IconButton>
    //     </Box>
    //
    // </div>
  );
}
