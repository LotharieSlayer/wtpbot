# WhatThePhoqueBOT

<br/>

<h3 align="center"><img src="https://user-images.githubusercontent.com/49253492/139536561-5eaf9aad-64dd-4bc4-a33a-913a28ccb620.png" width="600px"></h3>

<br/>

### **Bienvenue sur la documentation de WhatThePhoqueBOT !**

WTPBot est un bot utile à FRANCE MEMES, il permet d'automatiser des tâches répetitives aux modérateurs, créer des évènements et gérer le support. Le bot a été design pour marcher sur 2 serveurs, le serveur de production et le serveur staff.

Ce bot n'est pas un "Bot Discord public", nous n'avons pas l'infrastructure pour et nous gardons le process à usage privé sur FRANCE MEMES pour le moment.

<br/>

---

<br/>

# Requis :
- Node 18.x
- MongoDB 6

# Installation : 

### Cloner le projet
`git clone https://github.com/LotharieSlayer/wtpbot/`

### Passer MongoDB en mode Replica Set
[Documentation MongoDB - Replica Set](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/)
- Aller dans `/etc/mongod.conf`
- Décommenter les lignes suivantes et donner un nom à votre replica
```conf
replication:
   replSetName: "rs0"
```
- Redémarrer MongoDB

### Entrer le token .env
- Dans `src/`, créer un fichier .env contenant le token de votre bot donné par Discord.
- Mettez votre token de la manière suivante : `TOKEN="votre token"`

Si vous n'avez aucune idée de ce qu'est un token Discord, vous aurez plus d'infos sur la [documentation officielle](https://discord.com/developers/docs) ou en tapant simplement sur Google/Youtube ("Comment avoir le token de mon bot sur Discord")

Une fois tout ça fait, il faut générer un URL pour inviter votre bot, vous pouvez le faire depuis le dashboard Discord, mais voilà quelques informations.

### Mettre votre bot sur votre serveur Discord

#### Permissions (facultatif)

Si vous êtes familier avec les permissions vous savez surement que vous devez les énumérer dans l'URL que vous allez géénrer pour inviter le bot dans votre serveur. La permission 8 est nécessaire pour **TOUTES** les commandes. Si vous n'avez pas l'utilité de ce code 8 (qui veut dire admin), cherchez simplement le repository du plugin et regardez selon le README de ce dernier. Dans le doute, si vous ne connaissez pas les permissions nécessaires au bon fonctionnement de votre bot, laissez le code 8.

#### Client ID (obligatoire)

Enfin, vous n'avez plus qu'à chercher le Client ID de votre bot sur le dashboard de Discord.

`https://discord.com/api/oauth2/authorize?client_id=VOTRE_CLIENT_ID&permissions=8&scope=bot%20applications.commands`
Copiez-coller ce lien dans un navigateur et tadaaa ! Vous n'avez plus qu'à faire `node main.js` dans un terminal depuis le dossier `src/` pour démarrer votre bot !

**Attention :** VOTRE_CLIENT_ID dans le lien ci-dessous est le Client ID of **votre bot**.
