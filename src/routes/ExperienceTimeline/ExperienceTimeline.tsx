import React from "react";
import { ExperienceImage, ScrollableImage } from "./styles";

type Props = {};

const ExperienceTimeline: React.FC<Props> = () => {
  return (
    <div>
      <ScrollableImage>
        <ExperienceImage src="https://i.imgur.com/sXrAjDK.png" />
      </ScrollableImage>
    </div>
  );
};

export default ExperienceTimeline;
