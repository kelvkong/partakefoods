import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

export interface ProductTableCellProps {
  image: string;
  title: string;
}

export function ProductTableCell({ image, title }: ProductTableCellProps) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={image}
          alt="product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
