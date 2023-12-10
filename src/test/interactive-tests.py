
from datetime import date as very_long_name_which_needs_a_linebreak_after_at_least_100_chars_t

import datetime
from typing import Optional, List

def this_is_a_long_line(with_a_lot_of_symbols: int, to_make_sure_black_is_actually_running_and_breaks_lines_at_100_chars: int) -> Optional[List]:
    # datetime.date()
    # very_long_name_which_needs_a_linebreak_after_at_least_100_chars_as_long_as_you_are_still_sane
    return with_a_lot_of_symbols + to_make_sure_black_is_actually_running_and_breaks_lines_at_100_chars


def _fun_without_type(x: int):
    return x


def some_fun() -> str:
    return _fun_without_type(2)


import pandas as pd

df: list[int] = pd.DataFrame([1, 2, 3]).isnull()

def my_complect_function():
    my_list = []
    for i in range(100):
        if i > 1:
            my_list.append(i)
            if i < 20:
                print("%d" % "asd")
                pass

    return my_list

pwd = "askjahsd 918231 3hf0913 kjlkjf sdf,.-"
secret = "secret_user"


class Test():

    def __init__(self):
        pass

    def method(self):
        pass
