import cv2
import numpy as np
import ultralytics
from celery import shared_task
from cv.src.config import DetectorConfig
from cv.src.detector import Detector

from location.models import File

COLORS = {
    0: (253, 18, 18),
    1: (50, 226, 115),
    2: (50, 226, 179),
    3: (50, 162, 226),
    4: (212, 24, 24),
}


@shared_task
def video_processing(file_id):
    file_obj = File.objects.get(pk=file_id)

    file = file_obj.chunked_upload.file
    file_path = file.file.name

    processing(file_path)


def processing(video_path):
    cap = cv2.VideoCapture(video_path)

    # Получаем информацию о видео (размер кадра, FPS и т. д.)
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    fps = int(cap.get(5))

    # Создаем объект VideoWriter для сохранения видео
    fourcc = cv2.VideoWriter_fourcc(*"XVID")  # Выберите нужный кодек (например, XVID)
    output_path = "video_result.avi"
    out = cv2.VideoWriter(output_path, fourcc, fps, (frame_width, frame_height))

    config_file = (
        "/home/alex/Project/python/at_work/LDT-2024/cv/configs/detector_cfg.yaml"
    )
    config = DetectorConfig.from_yaml(config_file)
    detector = Detector(config)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        height, width, channel = frame.shape

        bboxes = detector.predict(frame)
        for box in bboxes:
            class_id, x, y, w, h = get_params(box, height, width)
            cv2.rectangle(
                frame, (int(x), int(y)), (int(w), int(h)), COLORS[class_id], 2
            )

        out.write(frame)

        # Отображаем кадр
        cv2.imshow("Frame", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    out.release()
    cv2.destroyAllWindows()

    print(f"Видео сохранено в {output_path}")


def get_params(box, height, width):
    class_id = int(float(box[0]))
    (
        bb_width_norm,
        bb_height_norm,
        bb_width_real,
        bb_height_real,
        area_real,
    ) = calculate_area_of_bbox(box, height, width)
    coord_x_norm, coord_y_norm, coord_x_real, coord_y_real = calculate_coordinates(
        box, height, width
    )
    xywhn = np.array([coord_x_norm, coord_y_norm, bb_width_norm, bb_height_norm])
    xyxy = ultralytics.utils.ops.xywhn2xyxy(xywhn, width, height)

    x = xyxy[0]
    y = xyxy[1]
    w = xyxy[2]
    h = xyxy[3]
    return int(class_id), int(x), int(y), int(w), int(h)


def calculate_coordinates(label_data, img_height, img_width):
    coord_x_norm = float(label_data[1])
    coord_y_norm = float(label_data[2])
    coord_x_real = int(coord_x_norm * img_width)
    coord_y_real = int(coord_y_norm * img_height)
    return coord_x_norm, coord_y_norm, coord_x_real, coord_y_real


def calculate_area_of_bbox(label_data, img_height, img_width):
    """
    :param: data from reading label file (list[str]),
    size of 1 side of a square image which YOLO uses (by default: 640)
    :return: bb_width_yolo, bb_height_yolo, bb_width_real, bb_height_real, area_real, area_norm_640
    """
    bb_width_yolo = float(label_data[3])
    bb_height_yolo = float(label_data[4])
    bb_width_real = int(bb_width_yolo * img_width)
    bb_height_real = int(bb_height_yolo * img_height)
    area_real = bb_width_real * bb_height_real
    return bb_width_yolo, bb_height_yolo, bb_width_real, bb_height_real, area_real
