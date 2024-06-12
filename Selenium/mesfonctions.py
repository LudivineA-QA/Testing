cestquandmes60 = lambda age : 60 - age

def direaurevoir(prenom,nom):
    print(f"Bon et bien au revoir {prenom} {nom}")

def verifierage(prenom,nom,age):
    if age > 35:
        delairestant = cestquandmes60(age)
        donnees = [prenom, nom, delairestant]
        return donnees
    elif age == 35:
        delairestant = cestquandmes60(age)
        donnees = [prenom, nom, delairestant]
        return donnees
    else:
        delairestant = cestquandmes60(age)
        donnees = [prenom, nom, delairestant]
        return donnees
    
def continuer(rep):
    while rep:
        saisie = input("Continuer ? (y/n)")
        if saisie == "y":
            continue
        elif saisie == "n":
            rep = False
        else:
            print("Je ne comprends pas. Continuer ? (y/n)")