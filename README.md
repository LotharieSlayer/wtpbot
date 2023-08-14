# WhatThePhoqueBOT

<br/>

<h3 align="center"><img src="https://user-images.githubusercontent.com/49253492/139536561-5eaf9aad-64dd-4bc4-a33a-913a28ccb620.png" width="600px"></h3>

<br/>

### **Bienvenue sur la documentation de WhatThePhoqueBOT !**

WTPBot est un bot utile à FRANCE MEMES, il permet d'automatiser des tâches répetitives aux modérateurs, créer des évènements et gérer le support. Le bot a été design pour marcher sur 2 serveurs, le serveur de production et le serveur staff.

Ce bot n'est pas un "Bot Discord public", nous n'avons pas l'infrastructure pour et nous gardons le process à usage privé sur FRANCE MEMES pour le moment.

Document concernant la mise à jour vers la version 2.2.0 de WTPBot : https://docs.google.com/document/d/1zoPg5Qn9ekLlfRBoHV0a8ynJmao0QODnw4AdbL5DAz0/edit?usp=sharing

---

# Prérequis
- [Node.js 18.x](https://nodejs.org/en/)
- [MongoDB 6](https://www.mongodb.com/docs/manual/installation/)

# Installation

### Cloner le projet
`git clone https://github.com/LotharieSlayer/wtpbot/`

### Passer MongoDB en mode Replica Set (facultatif)
[Documentation MongoDB - Replica Set](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/)
<details>
<summary>Ouvrir le tuto</summary>

**Pour Linux :**
- Aller dans `/etc/mongod.conf`
- Décommenter les lignes suivantes et donner un nom à votre replica
```conf
replication:
   replSetName: "rs0"
```
- Redémarrer MongoDB
- `mongosh -> rs.initiate()`

**Pour Windows :**
- Lancer un terminal
- `mongod --port 27017 --dbpath "C:\ce que vous voulez tant que c'est vide" --replSet rs1 --bind_ip 127.0.0.1`
- `mongosh -> rs.initiate()`
- Laisser le terminal ouvert

</details>

### Entrer le token .env
- Dans la racine du projet (`wtpbot/`, `.`), créez un fichier `.env` contenant le token de votre bot donné par Discord. Un exemple est montré dans le fichier `.env.dist`.
- Mettez votre token de la manière suivante : `TOKEN="votre token"`

Si vous n'avez aucune idée de ce qu'est un token Discord, vous aurez plus d'infos sur la [documentation officielle](https://discord.com/developers/docs) ou en tapant simplement sur Google/Youtube ("Comment avoir le token de mon bot sur Discord")

Une fois tout ça fait, il faut générer un URL pour inviter votre bot, vous pouvez le faire depuis le dashboard Discord, mais voilà quelques informations.

### Mettre votre bot sur votre serveur Discord

#### Permissions (facultatif)

Si vous êtes familier avec les permissions vous savez sûrement que vous devez les énumérer dans l'URL que vous allez générer pour inviter le bot dans votre serveur. La permission 8 est nécessaire pour **TOUTES** les commandes. Si vous n'avez pas l'utilité de ce code 8 (qui veut dire admin), cherchez simplement le repository du plugin et regardez selon le README de ce dernier. Dans le doute, si vous ne connaissez pas les permissions nécessaires au bon fonctionnement de votre bot, **laissez le code 8** dans l'URL plus bas.

#### Client ID (obligatoire)

Enfin, vous n'avez plus qu'à chercher le Client ID de votre bot sur le dashboard de Discord et le remplacer dans l'URL au niveau de `VOTRE_CLIENT_ID`.

`https://discord.com/api/oauth2/authorize?client_id=VOTRE_CLIENT_ID&permissions=8&scope=bot%20applications.commands`

Copiez-coller ce lien dans un navigateur et tadaaa !

# Démarrage

- `npm run start` ou `node main.js` depuis `src/` : Lancer le bot (production)
- `npm run dev` : Lancer le bot (développement)

### Gestion des plugins (Linux & macOS seulement)
- `npm run update` : Installer/Supprimer/Mettre à jour des plugins depuis le fichier plugins.list avec des repositories provenant de GitHub. (cf. [src/files/plugins.list](https://github.com/LotharieSlayer/wtpbot/blob/dev/src/files/plugins.list))
- `npm run list` : Afficher tous les plugins téléchargés et actifs

# License (CC BY-NC-ND 4.0)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.
