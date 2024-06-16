import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import { useCams } from "@/hooks/camera";
import { useLocations } from "@/hooks/location";
import { createFileSchema } from "@/types/upload";
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
  isLoading: boolean;
  onSubmit: (values: CreateFileInput) => void;
}

export function UploadDialog({ open, onClose, isLoading, onSubmit }: UploadDialogProps) {
  const form = useForm<CreateFileInput>({
    defaultValues: { camera: "", location: "" },
    resolver: customZodResolver(createFileSchema),
  });

  const submitHandler = (values: z.infer<typeof createFileSchema>) => {
    onSubmit(values);

    // await router.invalidate();
  };

  const formHasErrors = Boolean(Object.keys(form.formState.errors).length);

  const handleClose = () => {
    onClose();
  };

  const { locationList, isFetching: locationsFetching } = useLocations();
  const { camsList, isFetching: camsFetching } = useCams();

  const watchedLocation = form.watch("location");

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
            Загруженное видео будет автоматически обработано искусственным интеллектом
          </Dialog.Description>
        </Dialog.Header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="w-full space-y-6">
            <Form.Field
              control={form.control}
              name="location"
              disabled={locationsFetching}
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Локация</Form.Label>
                  <Select
                    onValueChange={(e) => {
                      if (form.watch("camera")) {
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

            {file?.name}

            <Button
              onClick={() => {
                void fileRequests.uploadFile.fn(file);
              }}
            >
              Upload
            </Button>

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
