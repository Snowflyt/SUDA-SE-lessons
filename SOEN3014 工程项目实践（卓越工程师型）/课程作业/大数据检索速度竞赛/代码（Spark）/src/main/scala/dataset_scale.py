"""A module that holds the scale of the dataset.
"""

from dataclasses import dataclass
from enum import Enum


class DatasetScale(Enum):
    """An enum that holds the scale of the dataset.
    """

    @dataclass
    class DatasetScale:
        """A dataclass that holds the scale of the dataset.
        """
        account_num: int
        file_num: int
        data_folder_a: int
        data_folder_b: int

    BIG = DatasetScale(
        5000 * 10000 * 10,
        200,
        'data/account_db_big_a',
        'data/account_db_big_b'
    )

    SMALL = DatasetScale(
        5000 * 10000,
        20,
        'data/account_db_small_a',
        'data/account_db_small_b'
    )

    TINY = DatasetScale(
        5000 * 1000,
        2,
        'data/account_db_tiny_a',
        'data/account_db_tiny_b'
    )
