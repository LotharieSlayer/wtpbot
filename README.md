# WhatThePhoqueBOT

<br/>

<h3 align="center"><img src="https://user-images.githubusercontent.com/49253492/139536561-5eaf9aad-64dd-4bc4-a33a-913a28ccb620.png" width="600px"></h3>

<br/>

### **Bienvenue sur la documentation de WhatThephoqueBOT !**

WTPBot est un bot utile à FRANCE MEMES, il permet d'automatiser des tâches répetitives aux modérateurs, créer des évênements et gérer le support. Le bot a été design pour marcher sur 2 serveurs, le serveur de production et le serveur staff.

Ce bot n'est pas un "Bot Discord public", nous n'avons pas l'infrastructure pour et nous gardons le process à usage privé sur FRANCE MEMES pour le moment.

<br/>

---

<br/>

# Installation : 

Ouvre ton terminal favori depuis le dossier `wtpbot/` et fait un simple `npm i`.
If the command doesn't work and you don't have npm installed on your computer, just install Node LTS : https://nodejs.org/.

Once `npm i` finished, just start the bot by a simple `node main.js` from the `src/` folder.

**Ajouter le bot au serveur de production :**
https://discord.com/developers/docs

### **Permissions requises :**

Ces permissions sont nécessaires pour **TOUTES** les commandes. Si vous n'avez pas l'utilité de certaines commandes, chercher simplement dans le code source quel commande est associé à tel code, et enlever la permission souhaitée.

**Code : 1494917572806**
![image](https://user-images.githubusercontent.com/49253492/182611293-0617a171-20ef-4935-9797-c5d8aa0c43b4.png)

**Attention :** VOTRE_CLIENT_ID dans le lien ci-dessous est le Client ID of **votre bot**.

`https://discord.com/api/oauth2/authorize?client_id=VOTRE_CLIENT_ID&permissions=1494917572806&scope=bot%20applications.commands`
