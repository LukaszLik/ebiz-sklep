import React, { useState } from "react";
import { Card, Typography, Box, Button } from "@material-ui/core";
import "../images/placeholder.jpeg";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "../styles/ProductPage.css";

type ProductPageParams = {
  id: string;
};

type ProductPageProps = RouteComponentProps<ProductPageParams>;

interface State {
  isLoading: boolean;
  title: string;
  price: number;
  description: string;
}

const description: string = `TEST`;

const ProductPage: React.FC<ProductPageProps> = ({}) => {
  const [state, setState] = useState<State>({
    isLoading: true,
    title: "Test",
    price: 66.99,
    description: description,
  });

  return (
    <Box className={"main-container"}>
      <Card
        style={{
          minWidth: "90vw",
          minHeight: "90vh",
          padding: "2vh 2vw 2vh 2vw",
        }}
      >
        <Box style={{ display: "flex" }}>
          <img src={"placeholder.jpeg"} alt="placeholder" />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              minWidth: "50%",
              justifyContent: "flex-end",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant={"h1"}>{state.title}</Typography>
              <Typography variant={"h1"}>{state.price}zł</Typography>
              <Button variant={"contained"}> Dodaj do koszyka</Button>
            </Box>
          </Box>
        </Box>
        <div style={{ whiteSpace: "pre-line", textAlign: "left" }}>
          {state.description}
        </div>
      </Card>
    </Box>
  );
};

export default withRouter(ProductPage);
