from omegaconf import OmegaConf
from pydantic import BaseModel


class DetectorConfig(BaseModel):
    model_path: str
    confidence: float
    iou: float

    @classmethod
    def from_yaml(cls, path: str) -> 'DetectorConfig':
        cfg = OmegaConf.to_container(OmegaConf.load(path), resolve=True)
        return cls(**cfg)
