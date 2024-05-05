import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  console.info(`You clicked a breadcrumb: ${event.target}`);
}

export default function CustomBreadcrumbs({ pathName }: { pathName: string }) {
  return (
    <Stack spacing={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Breadcrumbs separator="|" aria-label="breadcrumb" color="white">
        <Link
          underline="hover"
          key="1"
          color="white"
          href="/"
          onClick={handleClick}
        >
          {`CARRER BUILDER`}
        </Link>
        {pathName !== "/" ? (
          <Link
            underline="hover"
            key="1"
            color="white"
            href={pathName}
            onClick={handleClick}
          >
            {pathName.substring(1).replace("_", " ").toUpperCase()}
          </Link>
        ) : null}
      </Breadcrumbs>
    </Stack>
  );
}
