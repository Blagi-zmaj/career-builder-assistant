import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard({
  src,
  title,
  content,
}: {
  src: string;
  title: string;
  content: string;
}) {
  return (
    <Card sx={{ maxWidth: 350, minHeight: 400 }}>
      <CardActionArea>
        <CardMedia component="img" height="200" src={src} alt="green iguana" />
        <CardContent sx={{ minHeight: 150 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Check now
        </Button>
      </CardActions>
    </Card>
  );
}
