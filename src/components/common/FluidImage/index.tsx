import { FluidImageProps } from "../../../types";

const FluidImage = (props: FluidImageProps) => {
  return (
    <img
      src={props.src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
      alt="weekday"
    />
  );
};

export default FluidImage;
