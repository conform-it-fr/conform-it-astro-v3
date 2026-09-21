---
title: "Comment utiliser la visionneuse de résultats ?"
description: "Vous avez reçu le résultat de votre analyse par mail. Si vous avez demandé les éléments techniques lors de votre demande de tests, le mail contiendra un lien pour accéder à un…"
pubDate: 2026-01-21
featured: false
category: "Service en ligne"
image: "/images/articles/visionneuse-resultats.webp"
imageAlt: "Ecran de l'outil de visualisation RGAA"
---

Vous avez reçu le résultat de votre analyse par mail. Si vous avez demandé les éléments techniques lors de votre demande de tests, le mail contiendra un lien pour accéder à un outil développé spécifiquement pour aller plus loin que le simple constat des chiffres : la visionneuse.

![Illustration du bouton d'accès à la visionneuse](/images/articles/visionneuse-resultats-bouton-visionneuse.webp)

D'un simple clic sur le bouton, vous accédez aux résultats détaillés du test d'accessibilité de la page internet.

Pas de panique, l'interface est simple à comprendre et à utiliser.

## La structure de la page ?

La structure de la page peut être schématisée comme ci-dessous :

![Vision schématique de l'interface de la visionneuse](/images/articles/visionneuse-resultats-interface-visionneuse-02.webp)

D'abord le **BANDEAU HAUT** vous permet de visualiser des informations générales sur l'interface et sur le résultat des tests :

- Le titre de l'interface,
- Un accès vers la documentation liée à cette interface (icône "Point d'interrogation",
- la fourchette du score du test d'accessibilité obtenue
- la version actuelle de l'interface.

![Bandeau haut de la visionneuse : titre de l’interface, icône d’accès à la documentation, fourchette de score du test d’accessibilité et numéro de version](/images/articles/visionneuse-resultats-visionneuse-01-2.webp)

La fourchette de scores est composée :

- d'un score minimal correspond à la "réussite" des tests réalisés de manière automatisée pour l'ensemble des 106 indicateurs du référentiel.
- d'un score maximal correspond à la "réussite potentiel" des tests réalisés de manière automatisée mais une validation manuelle est nécessaire pour confirmer le résultat des tests.

Le **BANDEAU GAUCHE** vous permet de visualiser la structure complète du référentiel RGAA avec ces 13 thématiques, développées en 106 indicateurs, eux-mêmes regroupant les 255 tests. Enfin, chaque test est composé de différents lignes représentant la réalisation du test sur un élément de la page.

En partie haute de ce bandeau, vous avez la possibilité de filtrer la liste aux seuls éléments tests en erreur. Puis la légende utilisée pour codifier les résultats obtenus sur ces différents niveaux.

|  |  |
| --- | --- |
| ![Illustration de l'arborescence du référentiel](/images/articles/visionneuse-resultats-structure-referentiel.webp) | Les icônes en forme de triangle permettent de développer le niveau.  La bulle colorée présente le statut du niveau par rapport à sa conformité. |

Vous pouvez ainsi développer chaque niveau jusqu'à obtenir le détail de la ligne de test sur un élément de la page.

Si vous cliquez sur un niveau représentant un test x.x.x alors une fenêtre d'information va s'afficher en bas à droite de l'écran afin de vous donner les informations complète sur ce que fais ce test. Cette fenêtre reste afficher afin de pouvoir comprendre les éléments techniques affichés par la suite.

![Illustration sur une fenêtre d'information d'un test](/images/articles/visionneuse-resultats-info-test.webp)

Par exemple, ci-dessous, vous pouvez voir le résultat du test 1.4.1 sur un élément p (paragraphe). Les éléments techniques sont détaillés dans un autre article spécifique.

La bulle rouge indique que ce test est en erreur.

|  |  |
| --- | --- |
| ![Illustration du détail pour une ligne de test](/images/articles/visionneuse-resultats-detail-ligne.webp) | ![Illustration de la fenêtre d'information pour le test 1.4.1](/images/articles/visionneuse-resultats-info-test-141.webp) |

Lorsque vous allez cliquer sur un niveau d'une ligne test, alors la position de ce test dans la page de code va s'afficher.

![Illustration du positionnement de la ligne de test dans la page de code](/images/articles/visionneuse-resultats-position-test.webp)

Vous pouvez ainsi identifier rapidement les éléments de cette balise qu'il convient de modifier (en cas d'erreur).
