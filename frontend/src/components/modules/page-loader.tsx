import { Spinner } from "./spinner";

interface PageLoaderProps {
  children?: React.ReactNode;
}

export function PageLoader({ children }: PageLoaderProps) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <div className="text-2xl text-primary">
          <Spinner />
        </div>
        <p className="text-foreground">{children ?? "Загрузка данных"}</p>
      </div>
    </div>
  );
}
