*** Settings ***

Library    SeleniumLibrary    run_on_failure=None

*** Variables ***

# ----- MAIL -----
${mail}    qamha.automatisation@gmail.com

# ----- PASSWORD -----
${password}    Aa123456!

# ----- NAME -----
${name}    MHA

# ----- URL -----
${url_cdiscount}    https://www.cdiscount.com/
${url_search_books}    https://www.cdiscount.com/search/10/livre%20de%20poche.html#_his_
${url_search_blu_ray}    https://www.cdiscount.com/search/10/blu%20ray.html#_his_

# ----- PRODUITS -----
${produit1}    switch oled
${produit2}    Livre de poche
# ${cat2}    Litterature francaise
${cat2}    Policier
${produit3}    Blu-ray
${cat3}    Blu ray dune
${product_list}    2
${product_list2}    4

# ----- Quantity -----
${quantity1}    3

# ----- Reviews -----
${useful}    Les plus utiles



