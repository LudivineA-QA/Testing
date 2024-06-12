import pytest

cestquandmes60 = lambda age : 60 - age

def test_test1():
    assert 1 == 2

def test_cestquandmes60():
    age = 29
    assert cestquandmes60(age) == 31

def test_test2():
    assert 1 == 1