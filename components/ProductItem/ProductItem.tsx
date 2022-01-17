import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export interface ProductItemProps {
  image: string;
  tag?: string;
  title: string;
  price: string;
  onClick: () => void;
  disabled?: boolean;
}

export function ProductItem({
  image,
  tag,
  title,
  price,
  onClick,
  disabled
}: ProductItemProps) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="320"
          image={image}
          alt="product image"
        />
        <CardContent>
          {tag && (
            <Typography variant="caption" color="text.secondary">
              {tag}
            </Typography>
          )}
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick} disabled={disabled}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
