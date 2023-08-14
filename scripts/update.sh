#!/bin/bash

cd src/plugins

while IFS= read -r plugin; do
  plugin_name=$(echo "$plugin" | cut -d'/' -f2)
  if [ -d "../plugins/$plugin_name" ]; then
    echo -e "\033[32m Le plugin $plugin_name est déjà téléchargé !  \033[0m"
  else
    git clone "https://github.com/$plugin"
    echo -e "\033[32m Le plugin $plugin a été ajouté avec succès ! \033[0m \n"
  fi
done < ../files/plugins.list

echo -e "\n\033[32m Téléchargement des mises à jour... Veuillez patienter... \033[0m \n"

for folder in $(ls -l | grep ^d | awk '{print $9}'); do
  cd "$folder"
  git pull -q
  cd ..
  if [ "$folder" = "init" ]; then
    continue
  fi
  if ! grep -oq "$folder$" ../files/plugins.list; then
    rm -r "$folder"
    echo -e "\033[32m Le plugin $folder a été supprimé avec succès ! \033[0m\n"
  fi
done

cd ../..
echo -e "\033[32m Les plugins de files/plugins.list ont été ajoutés/supprimés/mis à jour avec succès ! \033[0m \n"