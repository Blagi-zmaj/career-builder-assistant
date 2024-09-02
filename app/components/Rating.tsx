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
    color: "silver",
  },
}));

const iconSizes = { mobile: "2rem", tablet: "3rem", desktop: "2.5rem" };

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: (
      <SentimentVeryDissatisfiedIcon
        sx={{
          color: "red",
          fontSize: {
            xs: iconSizes.mobile,
            sm: iconSizes.tablet,
            md: iconSizes.desktop,
          },
        }}
      />
    ),
    label: "Very Dissatisfied",
  },
  2: {
    icon: (
      <SentimentDissatisfiedIcon
        sx={{
          color: "red",
          fontSize: {
            xs: iconSizes.mobile,
            sm: iconSizes.tablet,
            md: iconSizes.desktop,
          },
        }}
      />
    ),
    label: "Dissatisfied",
  },
  3: {
    icon: (
      <SentimentSatisfiedIcon
        sx={{
          color: "gold",
          fontSize: {
            xs: iconSizes.mobile,
            sm: iconSizes.tablet,
            md: iconSizes.desktop,
          },
        }}
      />
    ),
    label: "Neutral",
  },
  4: {
    icon: (
      <SentimentSatisfiedAltIcon
        sx={{
          color: "green",
          fontSize: {
            xs: iconSizes.mobile,
            sm: iconSizes.tablet,
            md: iconSizes.desktop,
          },
        }}
      />
    ),
    label: "Satisfied",
  },
  5: {
    icon: (
      <SentimentVerySatisfiedIcon
        sx={{
          color: "green",
          fontSize: {
            xs: iconSizes.mobile,
            sm: iconSizes.tablet,
            md: iconSizes.desktop,
          },
        }}
      />
    ),
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
