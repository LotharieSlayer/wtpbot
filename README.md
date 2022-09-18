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

Grants needed to let **ALL** commands work. If you don't need some commands just browse the code source and check what command he's linked to, then disable whatever grant.

**Code : 1494917572806**
![image](https://user-images.githubusercontent.com/49253492/182611293-0617a171-20ef-4935-9797-c5d8aa0c43b4.png)

**Warning :** YOUR_CLIENT_ID in the link below is the Client ID of **your bot**.

`https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=1494917572806&scope=bot%20applications.commands`

### DISCLAIMER about the actual and the next 2.2 version : 
(Because the bot doesn't really work, even if you follow all the instructions correctly ((you need some extra files)))
- This bot need a tree structure clean refresh. In order to do this, some files are not present in this repo like welcomeMessages.js and memes.js. They are in the `data/` folder that you don't have access (It is also where the Enmap DB is stored), theses files will be transferred into the `files/` folder.
- The `modules/` folder in the `utils/` folder will be moved to the `src/` root folder

**So be ready for v2.2 !**
