import { useEffect, useState } from "react";

import { FileImage, FileVideo } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToggle } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { useCams } from "@/hooks/camera";
import { useLocations } from "@/hooks/location";
import { createFileSchema } from "@/types/upload";
import { cn } from "@/utils/cn";
import { customZodResolver } from "@/utils/zod";

import type { CreateFileInput } from "@/types/upload";

import { fileRequests } from "../../api/file";
import { FileDropzone } from "../modules/drop-zone";
import { Dialog } from "../ui/dialog";
import { Form } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export function UploadDialog({ open, onClose }: UploadDialogProps) {
  const [isLoading, toggleLoading] = useToggle(false);
  const handleClose = () => {
    onClose();
  };

  const form = useForm<CreateFileInput>({
    defaultValues: { camera: "", location: "" },
    resolver: customZodResolver(createFileSchema),
  });

  const watchedLocation = form.watch("location");
  const watchedCamera = form.watch("camera");

  const submitHandler = () => {
    toggleLoading();

    void fileRequests.uploadFile
      .fn(file, watchedCamera)
      .then(() => {
        handleClose();
      })
      .finally(() => {
        toggleLoading();
      });
  };

  const formHasErrors = Boolean(Object.keys(form.formState.errors).length);

  const { locationList, isFetching: locationsFetching } = useLocations();
  const { camsList, isFetching: camsFetching } = useCams();

  const camsOptions = camsList?.filter((el) => el.location.toString() === watchedLocation);

  useEffect(() => {
    form.reset();
  }, [form]);

  const [file, setFile] = useState<File>();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <Dialog.Content className="sm:max-w-[625px]">
        <Dialog.Header>
          <Dialog.Title>Добавление материала</Dialog.Title>
          <Dialog.Description>
            Загруженный файл будет автоматически обработан искусственным интеллектом
          </Dialog.Description>
        </Dialog.Header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className={cn(
              "w-full space-y-6",
              isLoading ? "pointer-events-none opacity-50" : "pointer-events-auto opacity-100",
            )}
          >
            <Form.Field
              control={form.control}
              name="location"
              disabled={locationsFetching}
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Локация</Form.Label>
                  <Select
                    onValueChange={(e) => {
                      if (watchedCamera) {
                        form.setValue("camera", "");
                      }

                      field.onChange(e);
                    }}
                    defaultValue={field.value}
                  >
                    <Form.Control>
                      <SelectTrigger>
                        <SelectValue placeholder="--" />
                      </SelectTrigger>
                    </Form.Control>
                    <SelectContent>
                      {locationList?.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id.toString()}>
                          {loc.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Form.Description>Выберите локацию из имеющихся</Form.Description>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <Form.Field
              control={form.control}
              name="camera"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Камера</Form.Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <Form.Control>
                      <SelectTrigger
                        disabled={!watchedLocation || camsFetching || locationsFetching}
                      >
                        <SelectValue placeholder="--" />
                      </SelectTrigger>
                    </Form.Control>
                    <SelectContent>
                      {camsOptions?.map((cam) => (
                        <SelectItem key={cam.id} value={cam.id.toString()}>
                          {cam.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Form.Description>Выберите камеру в выбранной локации</Form.Description>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <FileDropzone
              description="Загрузите фото или видео"
              accept={{
                "image/*": [],
                "video/*": [],
              }}
              multiple={false}
              maxSize={10 * 1024 * 1024 * 1024}
              onDrop={(files) => {
                files.forEach((f) => {
                  setFile(f);
                });
              }}
            />

            {file ? (
              <div className="flex items-center gap-2 text-sm">
                {file.name.includes(".mp4") ? (
                  <FileVideo className="size-4" />
                ) : (
                  <FileImage className="size-4" />
                )}
                {file.name}
              </div>
            ) : undefined}

            <Dialog.Footer>
              <Button onClick={handleClose} variant="outline">
                Отмена
              </Button>
              <Button type="submit" disabled={formHasErrors || isLoading}>
                Загрузить
              </Button>
            </Dialog.Footer>
          </form>
        </Form>
      </Dialog.Content>
    </Dialog>
  );
}
