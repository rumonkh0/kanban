import { RotatingLines } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <RotatingLines
        visible={true}
        height={
          window.innerWidth < 640
            ? "48"
            : window.innerWidth < 1024
            ? "72"
            : "96"
        }
        width={
          window.innerWidth < 640
            ? "48"
            : window.innerWidth < 1024
            ? "72"
            : "96"
        }
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}

export default Loading;
