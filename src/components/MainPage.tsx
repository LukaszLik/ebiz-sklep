import React from "react";
import "./MainPageStyles.css"
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

export const MainPage: React.FC = props => {

    return (
        <div className="home">
            <div>
                <div className='text'>Witaj w naszym sklepie.</div>
                <p className='text'>Aby rozpocząć zakupy wybierz jedną z poniższych opcji:</p>
            </div>

                <div className="button-container">
                        <Button component={Link} to="/cart" variant="contained">KOSZYK</Button>
                        <Button component={Link} to="/products" variant="contained">LISTA PRODUKTÓW</Button>
                        <Button component={Link} to="/login" variant="contained">ZALOGUJ SIĘ</Button>
                </div>
        </div>
    )
}