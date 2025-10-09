import { RotatingLines } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <RotatingLines
        visible={true}
        height="48"
        width="48"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}

export default Loading;
