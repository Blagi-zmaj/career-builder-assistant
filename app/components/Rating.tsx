import * as React from "react";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon sx={{ color: "red" }} />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon sx={{ color: "red" }} />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon sx={{ color: "gold" }} />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon sx={{ color: "green" }} />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon sx={{ color: "green" }} />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function RadioGroupRating({
  rate,
  handleChangeRatingListItem,
  categoryList,
  index,
}) {
  const [rating, setRating] = React.useState(rate);

  return (
    <StyledRating
      sx={{
        // border: 1,
        display: "flex",
        alignItems: "center",
        justifySelf: "end",
      }}
      max={5}
      name="highlight-selected-only"
      value={rate}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].label}
      highlightSelectedOnly
      onChange={(event, num) => {
        console.log(typeof event.target.value, event.target.value);
        setRating(event.target.value);
        handleChangeRatingListItem(
          Number(event.target.value),
          categoryList,
          index
        );
      }}
    />
  );
}
