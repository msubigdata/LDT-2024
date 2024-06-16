import { useContext } from "react";

import { ThemeProviderContext } from "./provider";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  return context;
};
