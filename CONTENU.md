# Meow Thé – contenu du site (à valider)

Tous les textes du site en français et en anglais, puis la carte. Les textes viennent de `locales/fr.json` et `locales/en.json`, la carte de `data/carte.json` : corrigez ici, on reporte. Fichier régénéré par `npm run contenu`.

**À valider en priorité :** les prix (relevés sur Uber Eats le 5 novembre 2026, peut-être différents en boutique), les prix « à remplir », le vouvoiement, la mention de Nono le chat, et l'acceptation des précommandes WhatsApp.

## 1. Textes du site


### meta

| Clé | Français | English |
|---|---|---|
| homeTitle | Bubble tea à Amiens centre / Meow Thé, 1 rue de Beauvais | Bubble tea in central Amiens / Meow Thé, 1 rue de Beauvais |
| homeDesc | Bubble tea, matcha, thés aux fruits frais et puddings au 1 rue de Beauvais, Amiens. Sucre et glaçons à votre goût. Sur place, à emporter ou en livraison. 4,8/5 sur Google. | Bubble tea, matcha, fresh fruit teas and puddings at 1 rue de Beauvais, Amiens. Sugar and ice the way you like. Eat in, take away or delivery. Rated 4.8/5 on Google. |
| carteTitle | La carte et les prix / Meow Thé, bubble tea à Amiens | Menu and prices / Meow Thé, bubble tea in Amiens |
| carteDesc | Toute la carte de Meow Thé à Amiens : thés au lait, crème brûlée, matcha, thés aux fruits frais, frappés, lattés et desserts, avec les prix. | The full Meow Thé menu in Amiens: milk teas, crème brûlée, matcha, fresh fruit teas, frappés, lattes and desserts, with prices. |
| legalTitle | Mentions légales / Meow Thé Amiens | Legal notice / Meow Thé Amiens |
| legalDesc | Mentions légales et données personnelles du site de Meow Thé, bubble tea à Amiens. | Legal notice and privacy for the Meow Thé website, bubble tea in Amiens. |
| ogAlt | Trois bubble teas Meow Thé : thé aux fruits frais, thé au lait aux perles et fraise | Three Meow Thé bubble teas: fresh fruit tea, pearl milk tea and strawberry |

### nav

| Clé | Français | English |
|---|---|---|
| carte | La carte | Menu |
| nouveautes | Nouveautés | What's new |
| compose | Compose ton bubble | Build your bubble |
| groupe | Commande groupée | Group orders |
| infos | Infos | Visit |
| instagram | Instagram | Instagram |

### order

| Clé | Français | English |
|---|---|---|
| cta | Commander | Order |
| title | Comment voulez-vous commander ? | How would you like to order? |
| delivery | Livraison | Delivery |
| deliveryText | Chez vous avec Uber Eats. | To your door with Uber Eats. |
| takeaway | À emporter | Take away |
| takeawayText | Composez, envoyez sur WhatsApp, passez prendre. | Build it, send it on WhatsApp, pick it up. |
| group | Commande groupée | Group order |
| groupText | Anniversaire, bureau, goûter : à partir de 6 boissons. | Birthday, office, afternoon treat: from 6 drinks. |
| call | Appeler | Call |
| callText | 06 67 10 75 30 | +33 6 67 10 75 30 |

### intro

| Clé | Français | English |
|---|---|---|
| skip | Passer | Skip |

### infobar

| Clé | Français | English |
|---|---|---|
| close | Fermer le bandeau | Close the banner |
| more | Voir | See |

### status

| Clé | Français | English |
|---|---|---|
| open | Ouvert maintenant | Open now |
| until | jusqu'à {time} | until {time} |
| closed | Fermé | Closed |
| opens | ouvre {when} à {time} | opens {when} at {time} |
| today | aujourd'hui | today |
| tomorrow | demain | tomorrow |
| days[1] | dimanche | Sunday |
| days[2] | lundi | Monday |
| days[3] | mardi | Tuesday |
| days[4] | mercredi | Wednesday |
| days[5] | jeudi | Thursday |
| days[6] | vendredi | Friday |
| days[7] | samedi | Saturday |

### rating

| Clé | Français | English |
|---|---|---|
| label | {value}/5 sur Google | {value}/5 on Google |
| count | {count} avis | {count} reviews |
| aria | Note Google {value} sur 5, {count} avis (voir les avis) | Google rating {value} out of 5, {count} reviews (see reviews) |

### hero

| Clé | Français | English |
|---|---|---|
| eyebrow | Bubble tea · Amiens centre | Bubble tea · Central Amiens |
| title | Le bubble tea comme vous l'aimez | Bubble tea, just the way you like it |
| text | Des perles moelleuses, des fruits frais, du matcha préparé à la commande. Le sucre et les glaçons, c'est vous qui choisissez. | Chewy pearls, fresh fruit, matcha made to order. You pick the sugar and the ice. |
| ctaMenu | Voir la carte | See the menu |
| alt | Brown sugar boba milk Meow Thé sur un sous-verre en bois, perles noires au fond | Meow Thé brown sugar boba milk on a wooden coaster, black pearls at the bottom |

### tiles

| Clé | Français | English |
|---|---|---|
| title | Par quoi on commence ? | Where shall we start? |
| see | Voir | See |

### services

| Clé | Français | English |
|---|---|---|
| title | Comme ça vous arrange | However suits you |
| items[1].id | place | place |
| items[1].title | Sur place | Eat in |
| items[1].text | Une pause au comptoir, en plein centre. | A break at the counter, right in town. |
| items[2].id | takeaway | takeaway |
| items[2].title | À emporter | Take away |
| items[2].text | Commandez sur WhatsApp, passez prendre. | Order on WhatsApp, pick it up. |
| items[3].id | delivery | delivery |
| items[3].title | Livraison | Delivery |
| items[3].text | Sans contact, avec Uber Eats. | Contactless, with Uber Eats. |
| items[4].id | phone | phone |
| items[4].title | Téléphone | Phone |
| items[4].text | 06 67 10 75 30 | +33 6 67 10 75 30 |

### news

| Clé | Français | English |
|---|---|---|
| kicker | En ce moment | Right now |
| title | Nouveautés du moment | What's new |
| until | Jusqu'au {date} | Until {date} |
| always | Tant qu'il y en a | While it lasts |
| priceShop | Prix en boutique | Price in store |
| order | Je veux goûter | I want one |
| orderMsg | Bonjour Meow Thé ! Je voudrais commander : {name}. | Hello Meow Thé! I'd like to order: {name}. |

### favorites

| Clé | Français | English |
|---|---|---|
| title | Les préférées d'Amiens | Amiens' favourites |
| text | Les boissons les plus commandées. Le reste est sur la carte. | The drinks people order most. Everything else is on the menu. |
| cta | Toute la carte | Full menu |

### blocks

| Clé | Français | English |
|---|---|---|
| custom.title | Votre sucre. Vos glaçons. Vos perles. | Your sugar. Your ice. Your pearls. |
| custom.text | De 0 % à 100 % de sucre, chaud ou glacé, avec ou sans perles. Chaque gobelet se règle à votre goût. | From 0% to 100% sugar, hot or iced, with or without pearls. Every cup is set the way you like it. |
| custom.cta | Composer le mien | Build mine |
| custom.alt | Lait versé sur des perles au sucre brun dans un gobelet Meow Thé | Milk poured over brown sugar pearls in a Meow Thé cup |
| fruits.title | Des fruits frais. Du vrai thé. | Fresh fruit. Real tea. |
| fruits.text | Passion, orange, citron vert, pêche : de vrais fruits et du thé infusé, sans sirop qui masque tout. Le goûter qui désaltère. | Passion fruit, orange, lime, peach: real fruit and brewed tea, no syrup drowning it all. The afternoon break that actually refreshes. |
| fruits.cta | Les thés aux fruits | Fruit teas |
| fruits.alt | Thé aux fruits frais, thé au lait aux perles et boisson à la fraise sur un plateau en bois | Fresh fruit tea, pearl milk tea and a strawberry drink on a wooden tray |

### compose

| Clé | Français | English |
|---|---|---|
| kicker | Compose ton bubble tea | Build your bubble tea |
| title | Votre gobelet, en quatre choix | Your cup, in four choices |
| text | Choisissez, puis montrez l'écran au comptoir ou envoyez-le sur WhatsApp pour le prendre à emporter. | Pick, then show the screen at the counter or send it on WhatsApp to take it away. |
| steps[1] | Base | Base |
| steps[2] | Sucre | Sugar |
| steps[3] | Glace | Ice |
| steps[4] | Toppings | Toppings |
| stepLabel | Étape {n} sur 4 | Step {n} of 4 |
| bases.noir | Thé noir au lait | Black milk tea |
| bases.vert | Thé vert au lait | Green milk tea |
| bases.jasmin | Jasmin au lait | Jasmine milk tea |
| bases.oolong | Oolong | Oolong |
| bases.matcha | Matcha au lait | Matcha latte |
| bases.lait | Lait, sans thé | Milk, no tea |
| ice.chaud | Chaud | Hot |
| ice.sans | Sans glaçons | No ice |
| ice.peu | Peu de glaçons | Less ice |
| ice.normal | Glaçons normal | Regular ice |
| sugarHint | 100 % = la recette maison | 100% = the house recipe |
| toppingsHint | Plusieurs choix possibles | Pick as many as you like |
| none | Sans topping | No topping |
| prev | Retour | Back |
| next | Suivant | Next |
| done | Voir mon récap | See my order |
| recap | Mon bubble tea | My bubble tea |
| sugar | Sucre | Sugar |
| iceLabel | Glace | Ice |
| toppingsLabel | Toppings | Toppings |
| send | Envoyer sur WhatsApp | Send on WhatsApp |
| show | Montrer au comptoir | Show at the counter |
| restart | Recommencer | Start again |
| nameLabel | Prénom | First name |
| timeLabel | Je passe vers | Pick-up around |
| timeHint | Heure de retrait, facultatif | Pick-up time, optional |
| counterClose | Fermer | Close |
| counterHint | À montrer au comptoir | Show this at the counter |
| note | Le prix dépend de la recette : on vous le confirme en réponse. | The price depends on the recipe: we'll confirm it in our reply. |
| msgTitle | Commande à emporter | Take-away order |
| msgIntro | Bonjour Meow Thé ! Je voudrais : | Hello Meow Thé! I'd like: |
| msgName | Prénom | Name |
| msgTime | Retrait vers | Pick-up around |
| msgEnd | Merci ! | Thank you! |
| cupAlt | Aperçu du gobelet composé | Preview of your cup |

### group

| Clé | Français | English |
|---|---|---|
| kicker | Commande groupée | Group orders |
| title | Un goûter pour toute la bande | A treat for the whole crew |
| text | Anniversaire, pot de départ, réunion, après-match : dites-nous combien vous êtes, on prépare tout. | Birthday, leaving do, meeting, after the match: tell us how many you are and we'll get it all ready. |
| points[1] | À partir de 6 boissons | From 6 drinks |
| points[2] | Retrait en boutique ou livraison | Pick-up or delivery |
| points[3] | Réponse sur WhatsApp | Reply on WhatsApp |
| fields.date | Date | Date |
| fields.time | Heure | Time |
| fields.count | Nombre de boissons | Number of drinks |
| fields.mode | Retrait ou livraison | Pick-up or delivery |
| fields.pickup | Retrait en boutique | Pick-up in store |
| fields.delivery | Livraison | Delivery |
| fields.address | Adresse de livraison | Delivery address |
| fields.types | Boissons souhaitées | Drinks you'd like |
| fields.typeOptions.lait | Thés au lait | Milk teas |
| fields.typeOptions.fruits | Thés aux fruits | Fruit teas |
| fields.typeOptions.matcha | Matcha | Matcha |
| fields.typeOptions.frappes | Frappés | Frappés |
| fields.typeOptions.mix | Un peu de tout | A bit of everything |
| fields.sugar | Sucre | Sugar |
| fields.sugarOptions.maison | Recette maison (100 %) | House recipe (100%) |
| fields.sugarOptions.moins | Moins sucré (50 %) | Less sweet (50%) |
| fields.sugarOptions.mix | Selon chacun | Up to each person |
| fields.name | Nom | Name |
| fields.phone | Téléphone | Phone |
| fields.message | Message | Message |
| fields.messagePh | Allergies, occasion, ce qu'il faut savoir… | Allergies, occasion, anything we should know… |
| fields.optional | facultatif | optional |
| errors.required | À remplir | Required |
| errors.phone | Numéro incomplet | Incomplete number |
| errors.count | 6 boissons minimum | 6 drinks minimum |
| errors.date | Choisissez une date à venir | Pick a future date |
| submit | Envoyer la demande sur WhatsApp | Send the request on WhatsApp |
| after | WhatsApp s'ouvre avec votre récap. Il ne reste qu'à l'envoyer. | WhatsApp opens with your summary. Just hit send. |
| msgTitle | Demande de commande groupée | Group order request |
| msgIntro | Bonjour Meow Thé ! Voici ma demande : | Hello Meow Thé! Here's my request: |

### spirit

| Clé | Français | English |
|---|---|---|
| kicker | L'esprit Meow | The Meow spirit |
| title | Un seul objectif : faire le meilleur bubble tea. | One goal: making the best bubble tea. |
| text | C'est écrit dans notre bio, et on s'y tient chaque jour. Du thé de qualité, des fruits frais, des perles préparées avec soin, et Nono, le chat de la maison, qui surveille tout ça depuis le comptoir. | It's in our bio and we stick to it every day. Quality tea, fresh fruit, pearls made with care, and Nono, the shop cat, keeping an eye on everything from the counter. |
| more | Notre histoire arrive bientôt ici. | Our story is coming here soon. |
| cta | Nous suivre | Follow us |
| alt | Nono, le chat gris de Meow Thé, sous l'enseigne lumineuse de la boutique | Nono, Meow Thé's grey cat, under the shop's neon sign |

### gallery

| Clé | Français | English |
|---|---|---|
| title | Sur Instagram | On Instagram |
| follow | Suivre sur Instagram | Follow on Instagram |
| alts.the-au-lait-chat | Thé au lait aux perles avec un chat dessiné sur le gobelet | Pearl milk tea with a cat drawn on the cup |
| alts.creme-brulee-serie | Quatre bubble teas crème brûlée : chocolat, thé au lait, matcha et brown sugar | Four crème brûlée bubble teas: chocolate, milk tea, matcha and brown sugar |
| alts.matcha-fraise | Matcha fraise devant le comptoir et les écrans du menu | Strawberry matcha in front of the counter and menu screens |
| alts.mochis-soda | Mochis glacés et soda aux fruits sur une assiette bleue | Ice cream mochi and a fruit soda on a blue plate |
| alts.oreo-cheese | Frappé Oreo à la crème cheese | Oreo frappé with cream cheese foam |
| alts.trio-plateau | Thé aux fruits, thé au lait et fraise sur un plateau de Noël | Fruit tea, milk tea and strawberry on a Christmas tray |
| alts.nono-enseigne | Nono le chat sous l'enseigne Meow Thé | Nono the cat under the Meow Thé sign |
| alts.trio-fruits-lait | Trois boissons Meow Thé et des petits sapins | Three Meow Thé drinks and small Christmas trees |
| alts.nuage-oreo-jasmin | Nuage Oreo au jasmin à côté de chats en bois | Jasmine Oreo Cloud next to wooden cats |

### infos

| Clé | Français | English |
|---|---|---|
| title | Venir chez Meow Thé | Visit Meow Thé |
| address | Adresse | Address |
| hours | Horaires | Opening hours |
| closed | Fermé | Closed |
| access | Accès | Getting here |
| accessText | En centre-ville d'Amiens, rue de Beauvais. Bus Ametis et parkings du centre à proximité. | In central Amiens, on rue de Beauvais. Ametis buses and town-centre car parks nearby. |
| directions | Itinéraire | Directions |
| contact | Contact | Contact |
| call | Appeler | Call |
| whatsapp | WhatsApp | WhatsApp |
| mapTitle | Carte : Meow Thé, 1 rue de Beauvais, Amiens | Map: Meow Thé, 1 rue de Beauvais, Amiens |
| mapLoad | Afficher la carte | Show the map |
| photosSoon | Photo de la façade à venir | Shopfront photo coming soon |

### faq

| Clé | Français | English |
|---|---|---|
| title | Questions fréquentes | FAQ |
| items[1].q | Quels allergènes dans vos boissons ? | Which allergens are in your drinks? |
| items[1].a | Nos boissons peuvent contenir du lait et du gluten (Oreo, par exemple) selon les recettes. Dites-nous vos allergies au comptoir : on vous indique ce qui est possible. Une liste détaillée par boisson arrive bientôt. | Depending on the recipe, our drinks may contain milk and gluten (Oreo, for example). Tell us about any allergy at the counter and we'll tell you what works. A detailed list per drink is coming soon. |
| items[2].q | Avez-vous des boissons sans lait ? | Do you have dairy-free drinks? |
| items[2].a | Oui. Les thés aux fruits frais et les oolong se boivent sans lait. Pour les frappés, demandez les versions au lait de coco (mangue, fraise, coco). | Yes. Fresh fruit teas and oolongs come without milk. For frappés, ask for the coconut milk versions (mango, strawberry, coconut). |
| items[3].q | Comment choisir le taux de sucre ? | How do I pick the sugar level? |
| items[3].a | Vous choisissez entre 0 %, 30 %, 50 %, 70 % et 100 %. 100 % correspond à la recette maison. Si vous hésitez, 50 % plaît à presque tout le monde. | Choose 0%, 30%, 50%, 70% or 100%. 100% is the house recipe. If you're unsure, 50% suits almost everyone. |
| items[4].q | Combien de temps d'attente ? | How long is the wait? |
| items[4].a | Chaque boisson est préparée à la commande. À l'heure du goûter ou le week-end il peut y avoir un peu de monde : envoyez votre commande sur WhatsApp avant de venir pour gagner du temps. | Every drink is made to order. Around snack time and at weekends it can get busy: send your order on WhatsApp before you come to save time. |
| items[5].q | Livrez-vous ? | Do you deliver? |
| items[5].a | Oui, en livraison sans contact avec Uber Eats, aux horaires d'ouverture. Pour une commande groupée, écrivez-nous : on s'organise ensemble. | Yes, contactless delivery with Uber Eats during opening hours. For a group order, message us and we'll sort it out together. |

### carte

| Clé | Français | English |
|---|---|---|
| kicker | La carte | Menu |
| title | Toute la carte, avec les prix | The full menu, with prices |
| text | Taille medium sauf mention. Sucre, température et glaçons au choix pour presque tout. | Medium size unless stated. Sugar, temperature and ice to your taste for almost everything. |
| tabsLabel | Familles de boissons | Drink families |
| popular | Préférée | Favourite |
| seasonal | De saison | Seasonal |
| priceShop | Prix en boutique | Price in store |
| toppings | Toppings | Toppings |
| toppingsText | À ajouter ou à changer dans la plupart des boissons. Le prix vous est donné au comptoir. | Add or swap them in most drinks. Ask at the counter for the price. |
| source | Prix relevés en novembre 2026, pouvant varier en boutique. | Prices as of November 2026, may vary in store. |
| order | Commander | Order |
| compose | Composer le mien | Build mine |
| back | Accueil | Home |

### float

| Clé | Français | English |
|---|---|---|
| whatsapp | Écrire sur WhatsApp | Message us on WhatsApp |
| msg | Bonjour Meow Thé ! | Hello Meow Thé! |

### footer

| Clé | Français | English |
|---|---|---|
| tagline | Bubble tea, matcha et petites douceurs, en plein centre d'Amiens. | Bubble tea, matcha and little treats, right in the centre of Amiens. |
| hours | Horaires | Opening hours |
| contact | Contact | Contact |
| follow | Suivre | Follow |
| legal | Mentions légales | Legal notice |
| rights | Tous droits réservés. | All rights reserved. |
| ratingNote | Note Google relevée le {date}. | Google rating checked on {date}. |

### legal

| Clé | Français | English |
|---|---|---|
| title | Mentions légales | Legal notice |
| sections[1].h | Éditeur | Publisher |
| sections[1].p | Meow Thé, 1 rue de Beauvais, 80000 Amiens. Téléphone : 06 67 10 75 30. SIRET : en cours d'ajout. | Meow Thé, 1 rue de Beauvais, 80000 Amiens, France. Phone: +33 6 67 10 75 30. SIRET: being added. |
| sections[2].h | Hébergement | Hosting |
| sections[2].p | Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. | Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. |
| sections[3].h | Données personnelles | Personal data |
| sections[3].p | Le site ne dépose aucun cookie publicitaire et ne collecte aucune donnée. Les formulaires préparent un message WhatsApp : rien n'est envoyé tant que vous ne l'envoyez pas vous-même depuis WhatsApp. | This site sets no advertising cookies and collects no data. The forms prepare a WhatsApp message: nothing is sent until you send it yourself from WhatsApp. |
| sections[4].h | Photos | Photos |
| sections[4].p | Photos : Meow Thé. Toute reproduction sans accord est interdite. | Photos: Meow Thé. No reproduction without permission. |

### days

| Clé | Français | English |
|---|---|---|
| [1] | Dimanche | Sunday |
| [2] | Lundi | Monday |
| [3] | Mardi | Tuesday |
| [4] | Mercredi | Wednesday |
| [5] | Jeudi | Thursday |
| [6] | Vendredi | Friday |
| [7] | Samedi | Saturday |

## 2. Bandeau d'infos (data/annonces.json)

| Clé | Français | English |
|---|---|---|
| fermeture-noel-2026 (2026-12-15 → 2027-01-02) | Fermeture de fin d'année : dates à confirmer. On vous les donne ici et sur Instagram. | Year-end closure: dates to be confirmed. We'll post them here and on Instagram. |
| serie-marron-2026 (… → …) | La série Marron est de retour : chaude ou froide, avec chantilly et perles. | The Chestnut series is back: hot or iced, with whipped cream and pearls. |

## 3. Nouveautés du moment (data/nouveautes.json)

| Boisson | Prix | Jusqu'au | Français | English |
|---|---|---|---|---|
| Série Marron chantilly / Chestnut series with whipped cream | 7,30 € | — | Crème de marron, chantilly et perles de tapioca. Au lait, au thé vert au lait ou au thé noir au lait. Chaud ou froid. | Chestnut cream, whipped cream and tapioca pearls. With milk, green milk tea or black milk tea. Hot or iced. |
| Nuage Oreo au jasmin / Jasmine Oreo Cloud | 7,50 € | — | Un thé au lait crémeux au jasmin, avec de l'Oreo dessus et dedans. | Creamy jasmine milk tea with Oreo on top and all the way down. |
| Pudding Sakura / Sakura pudding | à remplir | — | Un pudding rose tout doux, crème et fraises fraîches. | A soft pink pudding with cream and fresh strawberries. |
| Pudding Matcha / Matcha pudding | à remplir | — | Pudding au matcha, crème, haricots rouges et une pluie de matcha. | Matcha pudding with cream, red beans and a dusting of matcha. |

## 4. Horaires (data/horaires.json)

- Lundi : fermé
- Mardi : 12:00 – 19:45
- Mercredi : 12:00 – 19:45
- Jeudi : 12:00 – 19:45
- Vendredi : 12:00 – 19:45
- Samedi : 12:00 – 19:45
- Dimanche : 13:00 – 18:45

## 5. La carte (data/carte.json)

Source : Uber Eats, 2026-11-05. Prix « à remplir » = prix inconnu, affiché « Prix en boutique » sur le site.

### Thés au lait / Milk teas

Le grand classique, avec ses perles. — Sucre, température et glaçons au choix.

| Boisson | Prix | Description FR | Description EN |
|---|---|---|---|
| Brown sugar boba milk ★ | 7,00 € | Lait frais, sirop de sucre brun caramélisé et perles de tapioca. | Fresh milk, caramelised brown sugar syrup and tapioca pearls. |
| Thé noir au lait, perles de tapioca / Black milk tea with tapioca pearls ★ | 6,50 € | Le bubble tea tel qu'on l'aime : thé noir, lait, perles. | Bubble tea the way we love it: black tea, milk, pearls. |
| Thé vert au lait, perles de tapioca / Green milk tea with tapioca pearls | 6,50 € | Plus léger, plus floral. | Lighter and more floral. |
| Nuage Oreo au jasmin / Jasmine Oreo Cloud | 7,50 € | Thé au lait crémeux au jasmin et Oreo. | Creamy jasmine milk tea with Oreo. |
| Crème cheese au thé noir au lait / Cream cheese black milk tea | 7,00 € | Une mousse de crème cheese sur un thé noir au lait. Perles comprises. | Cream cheese foam over black milk tea. Pearls included. |
| Thé noir au lait, taro / Black milk tea with taro | 6,50 € | Perles de tapioca en supplément. | Tapioca pearls as an extra. |
| Thé noir au lait, haricot rouge / Black milk tea with red bean | 6,50 € | Perles de tapioca en supplément. | Tapioca pearls as an extra. |
| Thé noir au lait, perles, taro et haricot rouge / Black milk tea, pearls, taro and red bean | 7,00 € | Les trois toppings dans le même gobelet. | All three toppings in one cup. |
| Lait au taro / Taro milk | 6,50 € | Sans thé. Perles de tapioca en supplément. | No tea. Tapioca pearls as an extra. |
| Lait au haricot rouge / Red bean milk | 6,50 € | Sans thé. Perles de tapioca en supplément. | No tea. Tapioca pearls as an extra. |
| Lait, haricot rouge, taro et perles / Milk with red bean, taro and pearls | 7,00 € | Sans thé, avec tous les toppings. | No tea, all the toppings. |
| Chocolat au lait, perles de tapioca / Chocolate milk with tapioca pearls | 6,50 € | Pour ceux qui ne boivent pas de thé. | For the non-tea drinkers. |

### Crème brûlée / Crème brûlée

Le dessus caramélisé, le dessous en perles. — Sucre, température et glaçons au choix.

| Boisson | Prix | Description FR | Description EN |
|---|---|---|---|
| Crème brûlée brown sugar / Brown sugar crème brûlée ★ | 7,30 € | Brown sugar boba milk sous une crème brûlée. Perles comprises. | Brown sugar boba milk under a torched custard top. Pearls included. |
| Crème brûlée thé au lait, perles / Crème brûlée milk tea with pearls | 7,30 € | Le thé au lait, version dessert. | Milk tea, dessert style. |
| Crème brûlée matcha au lait, perles / Crème brûlée matcha latte with pearls | 7,30 € | Matcha au lait et sa croûte caramélisée. | Matcha latte with a caramelised crust. |
| Crème brûlée matcha au lait, haricot rouge / Crème brûlée matcha latte with red bean | 7,30 € | Perles de tapioca en supplément. | Tapioca pearls as an extra. |
| Crème brûlée chocolat au lait, perles / Crème brûlée chocolate milk with pearls | 7,30 € | Chocolat au lait sous la crème. | Chocolate milk under the custard. |

### Matcha / Matcha

Préparé à la commande. — Sucre, température et glaçons au choix.

| Boisson | Prix | Description FR | Description EN |
|---|---|---|---|
| Matcha au lait, perles de tapioca / Matcha latte with tapioca pearls ★ | 6,50 € | Matcha et lait, perles au fond. | Matcha and milk, pearls at the bottom. |
| Matcha au lait, haricot rouge / Matcha latte with red bean | 6,50 € | Le duo japonais. Perles en supplément. | The Japanese pairing. Pearls as an extra. |
| Matcha fraise / Strawberry matcha | à remplir | Fraises écrasées au fond, matcha au lait dessus. | Crushed strawberries at the bottom, matcha latte on top. |

### Thés aux fruits / Fruit teas

Fruits frais et thé infusé. — Sucre et glaçons au choix. Taille large pour les thés aux fruits, medium pour les oolong.

| Boisson | Prix | Description FR | Description EN |
|---|---|---|---|
| Thé vert à la passion / Passion fruit green tea ★ | 6,50 € | Fruit de la passion et thé vert, bien frais. | Passion fruit and green tea, ice cold. |
| Thé vert aux fruits frais mix / Mixed fresh fruit green tea | 6,50 € | Des morceaux de fruits frais dans un thé vert. | Chunks of fresh fruit in green tea. |
| Thé noir au citron vert / Lime black tea | 6,50 € | Acidulé, désaltérant. | Tangy and thirst-quenching. |
| Thé vert au citron vert / Lime green tea | 6,50 € | La version plus légère. | The lighter take. |
| Thé vert à l'orange / Orange green tea | 6,50 € | Orange fraîche et thé vert. | Fresh orange and green tea. |
| Thé oolong à la pêche / Peach oolong | 6,00 € | Un topping au choix. | One topping of your choice. |
| Thé oolong au raisin / Grape oolong | 6,00 € | Un topping au choix. | One topping of your choice. |
| Thé oolong à la rose / Rose oolong | 6,00 € | Un topping au choix. | One topping of your choice. |
| Thé oolong au sakura / Sakura oolong | 6,00 € | Un topping au choix. | One topping of your choice. |

### Frappés & sodas / Frappés & sodas

Glacés, mixés, gourmands. — Frappés en medium (500 ml) ou large selon la recette.

| Boisson | Prix | Description FR | Description EN |
|---|---|---|---|
| Frappé Oreo, crème cheese / Oreo frappé with cream cheese ★ | 7,30 € | Oreo mixé et mousse de crème cheese. | Blended Oreo topped with cream cheese foam. |
| Frappé fraise, crème cheese / Strawberry frappé with cream cheese | 7,50 € | Fraise mixée sous une crème cheese. Taille large. | Blended strawberry under cream cheese foam. Large. |
| Frappé mangue, crème cheese / Mango frappé with cream cheese | 7,50 € | Mangue mixée sous une crème cheese. Taille large. | Blended mango under cream cheese foam. Large. |
| Frappé mangue au lait de coco / Mango coconut milk frappé | 7,50 € | Mangue mixée au lait de coco. | Mango blended with coconut milk. |
| Frappé fraise au lait de coco / Strawberry coconut milk frappé | 7,50 € | Fraise et coco. | Strawberry and coconut. |
| Frappé noix de coco / Coconut frappé | 6,50 € | Coco, coco, coco. | Coconut, through and through. |
| Thé à la pastèque / Watermelon tea | 7,50 € | Édition limitée de l'été, avec perles de gelée. | Summer limited edition, with jelly pearls. |
| Passion soda / Passion fruit soda | à remplir | Soda pétillant au fruit de la passion et perles de gelée. | Sparkling passion fruit soda with jelly pearls. |

### Lattés / Lattes

Café, coco, fraise ou rose. — Un topping au choix.

| Boisson | Prix | Description FR | Description EN |
|---|---|---|---|
| Raw coconut latté / Raw coconut latte | 7,30 € | Café et lait de coco. Sucre au choix. | Coffee and coconut milk. Sugar to taste. |
| Fraise latté / Strawberry latte | 7,00 € | Fraise et lait, tout en rose. | Strawberry and milk, all pink. |
| Rose latté / Rose latte | 7,00 € | Un latté parfumé à la rose. | A rose-scented latte. |

### Desserts / Desserts

Puddings et mochis glacés. — Selon les arrivages : demandez au comptoir.

| Boisson | Prix | Description FR | Description EN |
|---|---|---|---|
| Pudding Matcha / Matcha pudding | à remplir | Crème, haricots rouges, matcha. | Cream, red beans, matcha. |
| Pudding Sakura / Sakura pudding | à remplir | Crème et fraises fraîches. | Cream and fresh strawberries. |
| Mochis glacés / Ice cream mochi | à remplir | Plusieurs parfums, à l'unité. | Several flavours, sold by the piece. |

### Toppings

- Perles de tapioca / Tapioca pearls : à remplir
- Perles de gelée / Jelly pearls : à remplir
- Haricot rouge / Red bean : à remplir
- Taro / Taro : à remplir
- Crème cheese / Cream cheese foam : à remplir
- Éclats d'Oreo / Oreo crumble : à remplir

★ = mis en avant dans « Les préférées d'Amiens » (les plus commandées sur Uber Eats).
