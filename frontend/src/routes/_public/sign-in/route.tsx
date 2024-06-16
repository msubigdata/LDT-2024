/* eslint-disable @typescript-eslint/only-throw-error -- ignore throw  */
import { createFileRoute, redirect, useRouter, useRouterState } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Icons } from "@/components/modules/icons";
import { useAuthContext } from "@/components/providers/auth";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { appConfig } from "@/constants/app-config";
import { credentialsSchema } from "@/types/auth";
import { cn } from "@/utils/cn";
import { customZodResolver } from "@/utils/zod";

import type { UserAuth } from "@/types/auth";

const fallback = "/view";

export const Route = createFileRoute("/_public/sign-in")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.authenticated) {
      throw redirect({ to: search.redirect ?? fallback });
    }
  },
  component: () => <SignInComponent />,
});

function SignInComponent() {
  const router = useRouter();
  const routeLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();

  const search = Route.useSearch();

  const {
    loginMutation: { isPending: loginLoading, error },
    login,
  } = useAuthContext();

  const form = useForm<UserAuth>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: customZodResolver(credentialsSchema),
  });

  const onSubmit = async (values: z.infer<typeof credentialsSchema>) => {
    await login(values);

    await router.invalidate();
    await navigate({ to: search.redirect ?? fallback });
  };

  const isLoading = routeLoading || loginLoading;

  const formHasErrors = Boolean(Object.keys(form.formState.errors).length);
  const errorStatus = isAxiosError(error) ? error.response?.status : undefined;

  return (
    <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Войдите в систему</h1>
            <p className="text-sm text-muted-foreground">Введите ваши учетные данные</p>
          </div>
          <div className={cn("grid gap-6")}>
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

                <Button type="submit" className="mt-3" disabled={formHasErrors || isLoading}>
                  {isLoading ? <Icons.Spinner className="mr-2 size-4 animate-spin" /> : null}
                  Войти
                </Button>

                {error ? (
                  <Form.Message className="text-center">
                    {errorStatus === 401
                      ? "Неверный логин или пароль"
                      : "Не удалось проверить данные"}
                  </Form.Message>
                ) : undefined}
              </form>
            </Form>
          </div>
          <div className="px-8 text-center text-sm text-muted-foreground">
            <span>Не удается войти в аккаунт?</span>
            <br />
            <a href="mailto:amalkurbanbaev@yandex.ru" className="hover:underline">
              Напишите нам
            </a>
          </div>
        </div>
      </div>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-muted-foreground dark:border-r lg:flex">
        <div className="absolute inset-0 bg-muted" />
        <div className="relative z-20 flex select-none items-center gap-4 text-lg font-semibold text-primary">
          <Icons.Logo />
          {appConfig.name}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="max-w-xl text-lg">
              Система мониторинга воздушного пространства&nbsp;аэропортов
              и&nbsp;детекции&nbsp;воздушных&nbsp;объектов
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
