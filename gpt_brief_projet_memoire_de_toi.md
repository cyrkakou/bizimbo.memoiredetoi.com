# Brief projet Memoire de toi

## Objet du document

Ce document présente le brief fonctionnel, éditorial et visuel du projet Memoire de toi. Il est destiné à un autre agent ou une autre équipe chargée de poursuivre la conception et le développement du prototype, puis de préparer une version commercialisable.

Le projet doit être traité comme un produit mémoriel sensible : la qualité de l’expérience, la dignité du contenu, la stabilité technique et la maîtrise des données personnelles sont prioritaires.

## 1. Vision du produit

Memoire de toi est un service SaaS permettant de créer un mémorial numérique public dédié à une personne décédée. Chaque personne dispose d’une adresse mémorielle personnalisée, par exemple :

`bizimbo.memoiredetoi.com`

Le site doit offrir aux proches et aux visiteurs un lieu virtuel pour se recueillir, consulter une histoire de vie, regarder des photos, laisser un hommage et participer à la mémoire collective.

La différence principale par rapport à un site commémoratif classique est l’expérience de lecture : le mémorial doit ressembler à un livre que l’on ouvre et que l’on feuillette, et non à un site web traditionnel composé de sections empilées.

## 2. Prototype de référence

Le premier prototype est consacré au père du porteur de projet.

### Informations connues

- Nom civil : KAKOU DJIDJI
- Nom affiché dans le mémorial : BIZIMBO
- Origine : Akalékro, Côte d’Ivoire
- Date de naissance utilisée dans le prototype : 1er janvier 1946
- Date de décès utilisée dans le prototype : 25 septembre 2025
- Origines familiales : père Ahizi, mère Sénoufo
- Langue du prototype : français

La date du 1er janvier doit être présentée avec prudence si elle correspond à une date administrative ou approximative. Le produit devra prévoir, à terme, un champ permettant d’indiquer « date exacte inconnue » ou « né en 1946 ».

La biographie actuelle du prototype peut être fictive et détaillée afin de servir de modèle rédactionnel. Elle doit être clairement considérée comme un contenu de démonstration à remplacer par la biographie réelle avant publication.

## 3. Expérience utilisateur principale

### Page de couverture

La page d’accueil constitue la couverture complète du livre.

Elle doit occuper toute la fenêtre et présenter immédiatement :

- le portrait principal de la personne ;
- le nom mémoriel BIZIMBO ;
- le nom civil Kakou Djidji, si pertinent ;
- les années de vie ;
- le lieu d’origine ;
- un bouton « Ouvrir le livre » ;
- une identité discrète de Memoire de toi ;
- un accès à l’espace familial privé.

La couverture ne doit pas être un petit rectangle centré dans une page vide. Toute la page doit être pensée comme une couverture éditoriale immersive.

### Ouverture et feuilletage

Le livre utilise une seule page visible à la fois, jamais une double page.

Le passage d’une page à l’autre doit reproduire le comportement d’un vrai livre :

- point de reliure situé sur le bord gauche de la page ;
- transformation autour de ce bord, jamais autour du centre de l’écran ;
- effet de page qui se soulève et se replie ;
- déformation progressive lorsque le curseur approche du bord supérieur ou inférieur ;
- ombrage et dégradés uniquement s’ils font partie du moteur de page et restent discrets ;
- animation stable, sans déplacement du contenu ni dégradation après plusieurs changements de page ;
- navigation par clic, flèches clavier, glissement tactile et glissement souris lorsque possible.

Le moteur de référence est Turn.js ou une implémentation équivalente réellement vérifiée. Il ne faut pas simuler le feuilletage par une simple rotation CSS générique.

### Navigation

La navigation doit rester intégrée à la métaphore du livre.

- Aucun bouton « retour » sur la couverture.
- Les contrôles de navigation ne doivent apparaître que lorsqu’une page précédente ou suivante existe.
- Sur desktop, les contrôles de page sont centrés verticalement et placés sur les bords de la page, sans chevaucher le cadre.
- Sur mobile, les contrôles peuvent être positionnés en bas.
- Sur les pages intérieures, une sidebar permet d’accéder directement aux chapitres.
- La sidebar ne doit pas flotter au-dessus du contenu.
- L’annonce du chapitre doit appartenir à la même colonne que la sidebar et se trouver juste au-dessus d’elle.
- Le contenu principal doit commencer après la colonne réservée à la sidebar.
- Sur mobile, la sidebar peut devenir une barre horizontale sous l’annonce du chapitre.

## 4. Pages du livre du prototype

### Page 1 Les origines

Cette page présente l’enfance, le lieu de naissance, les origines Ahizi et Sénoufo, ainsi que les premières influences de BIZIMBO.

Composition recommandée :

- colonne latérale : titre du chapitre et navigation ;
- colonne principale gauche : texte biographique avec lettrine ;
- colonne principale droite : portrait ou photographie de contexte ;
- alignement vertical propre entre le bloc texte et l’image.

### Page 2 Les traces

Cette page présente ce que BIZIMBO laisse à sa famille et à son entourage.

Fonctions prévues :

- allumer une bougie virtuelle ;
- déposer une fleur virtuelle ;
- consulter les compteurs de participation ;
- accéder au livre d’or.

### Page 3 Les voix

Cette page rassemble des témoignages et des anecdotes.

Les messages doivent être lisibles, chaleureux et présentés comme des fragments de mémoire. Les données de démonstration doivent pouvoir être remplacées par de vrais témoignages.

### Page 4 Pour les proches

Cette page explique l’espace familial privé et permet d’y accéder avec une invitation.

L’espace familial doit être accessible par un lien d’invitation sans mot de passe classique. Les proches autorisés peuvent y gérer les contenus, la biographie, les photos, la modération et les paramètres du mémorial.

## 5. Livre d’or et modération

Le mémorial est public, mais les messages du livre d’or sont modérés.

Flux attendu :

1. Le visiteur écrit son prénom et son message.
2. Le message est enregistré avec le statut « en attente ».
3. Un proche ou un administrateur le valide, le refuse ou le supprime.
4. Seuls les messages validés apparaissent publiquement.

Prévoir également :

- protection anti-spam ;
- limitation du nombre de soumissions ;
- signalement d’un message ;
- journal minimal des actions de modération ;
- possibilité de fermer temporairement le livre d’or.

## 6. Espace familial privé

L’espace privé est accessible uniquement par un lien d’invitation sécurisé, sans mot de passe permanent.

Fonctions à prévoir :

- inviter un proche par email ;
- retirer une invitation ;
- modifier la biographie ;
- importer, organiser et supprimer des photos ;
- gérer les messages du livre d’or ;
- modifier les textes de présentation ;
- gérer les bougies et les fleurs ;
- choisir ce qui est public ou réservé aux proches ;
- désactiver temporairement le mémorial ;
- exporter les contenus du mémorial.

Les fichiers importés et les informations personnelles doivent être protégés. Les liens d’invitation doivent expirer ou pouvoir être révoqués.

## 7. Direction artistique

Le site doit être sobre, chaleureux, familial, élégant et premium.

Direction recommandée : édition mémorielle contemporaine, inspirée d’un livre d’art ou d’un album familial soigneusement composé.

### Règles visuelles impératives

- Flat design sans ombres portées décoratives.
- Pas de cartes flottantes ni de petits rectangles inutiles.
- Pas de filigrane sur les photographies.
- Ne pas éclaircir, blanchir ou décolorer une photo sans demande explicite.
- Ne pas ajouter de fleurs, de textures ou d’ornements sur une photo existante sans validation.
- Utiliser de grands espaces, une hiérarchie typographique claire et des cadres fins.
- Les éléments décoratifs doivent rester secondaires par rapport au visage et au récit.
- Aucun texte ne doit chevaucher un cadre ou être collé contre une bordure.
- Les textes fonctionnels doivent rester lisibles sur desktop et mobile.

### Palette indicative

- Encre profonde : `#2E302F`
- Papier clair : `#F7F4ED`
- Vert sauge : `#CDDBCF`
- Vert profond : `#567461`
- Pêche douce : `#ECC4B3`
- Corail discret : `#BD786D`
- Ligne fine : `rgba(46, 48, 47, 0.20)`

La palette doit rester apaisante et lumineuse sans tomber dans un beige générique. La photo de BIZIMBO doit conserver son contraste et ses couleurs naturelles.

### Typographie

- Serif éditoriale pour les titres, noms et citations.
- Sans serif lisible pour les textes de navigation, les boutons et les paragraphes.
- Éviter les textes en capitales longues.
- Ne pas utiliser de texte fonctionnel inférieur à 11 px.
- Les titres de chapitre peuvent utiliser une petite capitale espacée, mais doivent rester lisibles et ne pas être traités comme de simples étiquettes décoratives.

## 8. Contraintes techniques

- Frontend responsive desktop, tablette et mobile.
- Pages indépendantes gérées par un moteur de livre, pas par une simple liste verticale.
- Turn.js ou moteur équivalent compatible avec une seule page visible.
- Point d’origine du flip sur le bord gauche.
- Gestion robuste des tailles de fenêtre et du zoom navigateur.
- Pas de dégradation après plusieurs changements de page.
- Les éléments fixes doivent être indépendants des transformations de page.
- Les contrôles doivent être accessibles au clavier et disposer d’un état désactivé pertinent.
- Les images doivent avoir des textes alternatifs.
- Les contenus privés ne doivent jamais être chargés publiquement par défaut.
- Les données des formulaires doivent être validées côté client et côté serveur dans la version SaaS.

## 9. Critères d’acceptation visuelle

Le prototype est considéré comme acceptable uniquement si :

- la couverture occupe toute la page ;
- la couverture ne présente pas de bouton retour ;
- le flip part du bord gauche ;
- la page se plie près du bord haut ou bas comme un livre réel ;
- le flip reste stable après cinq changements de page consécutifs ;
- la sidebar n’apparaît pas sur la couverture ;
- la sidebar apparaît uniquement sur les pages intérieures ;
- le titre du chapitre se trouve au-dessus de la sidebar ;
- la sidebar et le titre occupent une colonne distincte ;
- le texte et les images commencent après cette colonne ;
- aucun texte ne chevauche une bordure ;
- aucun élément ajouté ne modifie la photo sans validation ;
- aucun filigrane ou effet de voile n’est présent sur la photo ;
- la navigation mobile ne recouvre pas le contenu ;
- les interactions restent compréhensibles sans texte d’aide permanent.

## 10. Modèle SaaS et commercialisation

### Offre gratuite ou découverte

- création d’un mémorial simple ;
- URL personnalisée ;
- couverture, biographie courte et quelques photos ;
- livre d’or modéré avec quota ;
- bougies et fleurs virtuelles.

### Offre hommage

- davantage de photos et de pages ;
- biographie longue ;
- personnalisation des couleurs et de la typographie ;
- plusieurs administrateurs familiaux ;
- modération avancée ;
- export PDF ou archive numérique ;
- suppression de la marque Memoire de toi selon la formule choisie.

### Offre famille

- espace privé plus complet ;
- stockage étendu ;
- albums et chronologie ;
- invitations multiples ;
- sauvegarde et export ;
- assistance à la rédaction de la biographie ;
- domaine personnalisé éventuel.

### Modèle économique recommandé

Le sujet étant sensible, éviter une publicité intrusive. Les modèles les plus cohérents sont :

- paiement unique pour une durée définie ;
- abonnement annuel familial ;
- option de conservation longue durée ;
- partenariat avec pompes funèbres, maisons de cérémonie, associations et services d’accompagnement du deuil ;
- offres de création assistée pour les familles qui ne souhaitent pas rédiger elles-mêmes le mémorial.

La promesse commerciale doit porter sur la qualité, la dignité, la conservation des souvenirs et la simplicité de transmission, pas sur la gamification des hommages.

## 11. Priorités de réalisation

### Phase 1 Prototype solide

- couverture immersive ;
- moteur de feuilletage fiable ;
- quatre pages du prototype BIZIMBO ;
- sidebar intérieure ;
- livre d’or avec modération simulée ;
- bougies et fleurs ;
- responsive mobile ;
- validation du rendu sur plusieurs tailles d’écran.

### Phase 2 MVP SaaS

- création de compte ;
- création d’un mémorial ;
- choix d’un sous-domaine ;
- espace familial passwordless ;
- stockage d’images ;
- modération persistante ;
- gestion des droits ;
- paiement et facturation ;
- suppression et export des données.

### Phase 3 Produit commercial

- personnalisation guidée ;
- modèles éditoriaux supplémentaires ;
- domaine personnalisé ;
- analytics respectueux de la vie privée ;
- partenariats professionnels ;
- procédures de support et de conservation à long terme ;
- documentation juridique et politique de confidentialité adaptées aux pays ciblés.

## 12. Consigne de travail pour l’agent suivant

Commencer par inspecter l’état existant du prototype et établir une base propre avant toute nouvelle modification. Ne pas empiler des règles CSS contradictoires et ne pas modifier plusieurs sujets à la fois.

Pour chaque changement :

1. identifier le fichier et la règle responsable ;
2. modifier uniquement le périmètre demandé ;
3. vérifier le rendu dans une fenêtre desktop et une fenêtre mobile ;
4. vérifier la couverture et au moins une page intérieure ;
5. conserver la photo intacte ;
6. ne pas déclarer le travail terminé sans capture ou vérification visuelle réelle.

Toute décision de design non explicitement décrite ici doit être proposée avant d’être appliquée lorsqu’elle modifie la composition, la photo, la palette ou la navigation.

