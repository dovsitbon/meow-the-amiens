# Meow Thé – infos à lui demander

Ce qui manque au site, par ordre d'importance. Tout le reste se règle dans `data/*.json` sans toucher au code.

## À demander

1. **La carte complète et les prix en boutique.** La carte actuelle vient de sa page Uber Eats (relevée le 5 novembre 2026). Il manque :
   - les prix sur place, s'ils sont différents d'Uber Eats ;
   - le prix des puddings (Matcha, Sakura), des mochis glacés, du Passion soda, du Matcha fraise ;
   - les prix des toppings et des tailles (medium / large) ;
   - la photo de sa story « MENU » ou de ses écrans menu, en bonne qualité.
2. **Le lien de livraison.** Le site pointe vers sa page Uber Eats (trouvée en ligne) : <https://www.ubereats.com/fr/store/meow-the/AkFNYyC9WXuPvvbJ8Tm6wA>. Lui demander si c'est bien celle-là, et si elle est aussi sur Deliveroo.
3. **Les précommandes WhatsApp.** Accepte-t-elle les commandes à emporter par WhatsApp (bouton « Envoyer sur WhatsApp » du configurateur) ? Sinon on garde seulement « Montrer au comptoir ». Les commandes groupées : minimum de 6 boissons à confirmer, délai de prévenance, livraison possible ou non.
4. **Les allergènes** par boisson et par topping (lait, gluten, soja, fruits à coque…), et les options sans lactose (lait végétal ?).
5. **Son histoire** pour « L'esprit Meow » : qui elle est, depuis quand la boutique existe, pourquoi le bubble tea. Et confirmer le nom du chat, **Nono** (vu dans une vidéo d'un compte partenaire).
6. **Les photos de la boutique** : façade (emplacement prévu dans « Venir chez Meow Thé »), comptoir, intérieur, si possible en lumière du jour. On les prendra sur place.
7. **Le logo en fichier** (SVG, AI ou PDF). Le site utilise un redessin fidèle de son logo (chat dans un gobelet), à remplacer si elle a l'original.
8. **SIRET** et nom de la société pour les mentions légales.

## À vérifier avec elle

- Le ton : vouvoiement léger sur le site (tutoiement seulement dans « Compose ton bubble »). Lui convient-il ?
- Les dates de fermeture de fin d'année (bandeau prévu du 15 décembre au 2 janvier, dates à confirmer dans `data/annonces.json`).
- La série Marron : jusqu'à quelle date ? (`until` dans `data/nouveautes.json`).
- Les accès précis : arrêt de bus Ametis et parking le plus proches (à ajouter dans `locales/*.json`, clé `infos.accessText`). Amiens n'a pas de tram.
- Le numéro fixe +33 3 22 46 70 94 trouvé sur un annuaire : est-il toujours le sien ? Le site n'affiche que le 06 67 10 75 30.
- Les jeux concours : quand en relancer un (`data/concours.json`).
