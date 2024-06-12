from mesfonctions import *
import pytest

def test_verifier_age():
    prenom = "John"
    nom = "Doe"

    # Test pour âge > 35
    age = 40
    assert verifierage(prenom, nom, age) == [prenom, nom, cestquandmes60(age)]

    # Test pour âge == 35
    age = 35
    assert verifierage(prenom, nom, age) == [prenom, nom, cestquandmes60(age)]

    # Test pour âge < 35
    age = 1
    assert verifierage(prenom, nom, age) == [prenom, nom, cestquandmes60(age)]