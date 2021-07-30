"""
Script to test smartSelect + execute interactively.

- Execute line by line. Hitting Ctrl+Enter should bring you to the end of the
  script.
- Also try Ctrl+Shift+A, then Ctrl+Enter. This should run the complete script.
"""

import time
from contextlib import contextmanager

from decorator import decorator

try:
    print("Yay")
except Exception:
    print("Oh no!")
finally:
    print("finally")

if False:
    print("if")
elif True:
    print("else if")
else:
    print("Else")


@contextmanager
def my_context():
    yield 1


with my_context() as x:
    print(x)


@decorator
def timer(func, *args, **kw):
    time_start = time.time()
    res = func(*args, **kw)
    print(round(time.time() - time_start), "s elapsed")
    return res


@timer
def some_function(x):

    time.sleep(2)
    for i in range(0, 10):

        # asd
        print(i)
    return x


some_function(1)


class test:
    """Docstring

    multi line
    """

    def method():

        breakpoint()
        pass


# - open/close paranthesis multi-line
# - multi line doc strings


import matplotlib.pyplot as plt

plt.plot([1, 2, 3, 4])
plt.ylabel("some numbers")
plt.show()
