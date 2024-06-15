import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Icons } from "@/components/modules/icons";
import { useAuthContext } from "@/components/providers/auth";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { credentialsSchema } from "@/types/auth";
import { cn } from "@/utils/cn";
import { customZodResolver } from "@/utils/zod";

import type { UserAuth } from "@/types/auth";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useAuthContext();

  const form = useForm<UserAuth>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: customZodResolver(credentialsSchema),
  });

  const isLoading = false;

  function onSubmit(values: z.infer<typeof credentialsSchema>) {
    void login(values);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Form.Field
            control={form.control}
            name="username"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control>
                  <Input
                    placeholder="Ваше имя пользователя"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="password"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Пароль</Form.Label>
                <Form.Control>
                  <Input
                    placeholder="Ваш пароль"
                    type="password"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Button type="submit" className="mt-3">
            {isLoading ? <Icons.Spinner className="mr-2 size-4 animate-spin" /> : null}
            Войти
          </Button>
        </form>
      </Form>
    </div>
  );
}
