import { Icons } from "@/components/modules/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const isLoading = false;
  const onSubmit = () => {};

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Имя пользователя</Label>
            <Input
              id="username"
              placeholder="Ваше имя пользователя"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />

            <Label htmlFor="email">Пароль</Label>
            <Input
              id="password"
              placeholder="Ваш пароль"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? <Icons.Spinner className="mr-2 size-4 animate-spin" /> : null}
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
}
