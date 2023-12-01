
from datetime import date as very_long_name_which_needs_a_linebreak_after_at_least_100_chars_t

import datetime
from typing import Optional, List

def this_is_a_long_line(with_a_lot_of_symbols: int, to_make_sure_black_is_actually_running_and_breaks_lines_at_100_chars: int) -> Optional[List]:
    # datetime.date()
    # very_long_name_which_needs_a_linebreak_after_at_least_100_chars_as_long_as_you_are_still_sane
    return with_a_lot_of_symbols + to_make_sure_black_is_actually_running_and_breaks_lines_at_100_chars


import pandas as pd

pd.DataFrame([1, 2, 3]).isnull()
