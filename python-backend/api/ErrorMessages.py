from dataclasses import dataclass


@dataclass(frozen=True)
class GenericErrorsClass:
    idErr: str = "Записи с таким ID не существует"
