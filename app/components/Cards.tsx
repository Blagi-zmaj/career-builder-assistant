import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import styled from "styled-components";

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
    <Card sx={{ maxWidth: 400, minHeight: 400, backgroundColor: "#183BF0" }}>
      {" "}
      {/* or #D4F7EC */}
      <CardActionArea>
        <CardMedia component="img" height="200" src={src} alt="green iguana" />
        <CardContent sx={{ minHeight: 200 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="whitesmoke"
          >
            {title}
          </Typography>
          <Typography variant="body2" color="whitesmoke" sx={{ fontSize: 20 }}>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" sx={{ color: "#90caf9" }}>
          Check now!
        </Button>
      </CardActions>
    </Card>
  );
}
