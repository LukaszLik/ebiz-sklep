import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Product.css';

  export default function Product(props: any) {

    return (
      <Card className="card" variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" className="title">
            {props.product.name}
          </Typography>
          <Typography className="pos" color="textSecondary">
            {props.product.price} zł
          </Typography>
          <Typography variant="body2" component="p" className="description">
          {props.product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small">Do koszyka</Button>
        </CardActions>
      </Card>
    );
  }