import { createFileRoute } from "@tanstack/react-router";

import { Icons } from "@/components/modules/icons";
import { UserAuthForm } from "@/components/templates/public/user-auth-form";
import { appConfig } from "@/constants/app-config";

export const Route = createFileRoute("/_public/sign-in/")({
  component: () => <SignInComponent />,
});

function SignInComponent() {
  return (
    <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Войдите в систему</h1>
            <p className="text-sm text-muted-foreground">Введите ваши учетные данные</p>
          </div>
          <UserAuthForm />
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
              Сервис для мониторинга воздушного пространства&nbsp;аэропортов
              и&nbsp;детекции&nbsp;воздушных&nbsp;объектов
            </p>
            <footer className="text-sm">ООО &ldquo;БигДата&rdquo;</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
