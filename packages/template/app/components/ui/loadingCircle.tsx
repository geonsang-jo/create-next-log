import Spinner from "~components/icon/spinner";
import { Button } from "./button";

const LoadingCircle = () => {
  return (
    <Button
      className="loading-circle w-9 shrink-0 px-0 cursor-wait"
      variant="ghost"
    >
      <Spinner className="animate-spin" />
    </Button>
  );
};

export default LoadingCircle;
