#!/bin/bash

# Archivos
PASSWORDS="dictionary.txt"
SALTS="salts.txt"

# Validación
if [[ ! -f "$PASSWORDS" || ! -f "$SALTS" ]]; then
  echo " Faltan archivos dictionary.txt o salts.txt"
  exit 1
fi

# Pedir hash al usuario
read -p " Ingresá el hash a buscar: " TARGET_HASH

echo " Buscando coincidencia..."

# Recorremos diccionario de claves
while IFS= read -r password; do
  while IFS= read -r salt; do

    # Estrategias de salting mal aplicadas
    h1=$(echo -n "$password" | md5sum | awk '{print $1}')$salt
    h2=$(echo -n "${salt}${password}" | md5sum | awk '{print $1}')
    h3=$(echo -n "${password}${salt}" | md5sum | awk '{print $1}')
    h4=$(echo -n "${salt}${password}${salt}" | md5sum | awk '{print $1}')

    if [[ "$h1" == "$TARGET_HASH" ]]; then
      echo " Coincidencia: '$password' + '$salt' usando md5(pwd) + salt"
      exit 0
    elif [[ "$h2" == "$TARGET_HASH" ]]; then
      echo " Coincidencia: '$password' + '$salt' usando md5(salt + pwd)"
      exit 0
    elif [[ "$h3" == "$TARGET_HASH" ]]; then
      echo " Coincidencia: '$password' + '$salt' usando md5(pwd + salt)"
      exit 0
    elif [[ "$h4" == "$TARGET_HASH" ]]; then
      echo " Coincidencia: '$password' + '$salt' usando md5(salt + pwd + salt)"
      exit 0
    fi

  done < "$SALTS"
done < "$PASSWORDS"

echo "❌ No se encontró ninguna coincidencia."
