import { PropsWithChildren } from "react";

import { useIsMounted } from "~hooks/useIsMount";

function NoSSR({ children }: PropsWithChildren<{}>) {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return <>{children}</>;
}

export default NoSSR;
