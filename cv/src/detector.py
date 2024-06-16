import os
import numpy as np
from ultralytics import YOLO
from config import DetectorConfig

PROJECT_PATH = os.path.abspath(os.path.join(os.path.dirname(os.path.realpath(__file__)), '..'))


class Detector:
    def __init__(self, config):
        self.config = config
        self.model = YOLO(self.config.model_path)

    def predict(self, image_path):
        predictions = self.model.predict(image_path,
                                         iou=self.config.iou, conf=config.confidence)[0].boxes  #.xyxyn.numpy().tolist()
        cls = predictions.cls.numpy().reshape((1, len(predictions.cls)))
        bboxes = predictions.xywhn.numpy()
        result = np.concatenate((cls.T, bboxes), axis=1).tolist()
        return result


if __name__ == '__main__':
    config_file = 'configs/detector_cfg.yaml'
    config = DetectorConfig.from_yaml(config_file)
    detector = Detector(config)
    folder_path = 'assets/debug_samples'

    for file in os.listdir(folder_path):
        image_path = os.path.join(PROJECT_PATH, folder_path, file)
        bboxes = detector.predict(image_path)
        print(bboxes)