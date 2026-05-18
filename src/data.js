export const NIVEAUX = [
  { val: 1, label: "Non acquis, je ne sais pas encore le faire", color: "n1" },
  { val: 2, label: "Vu en cours, je l'ai fait avec de l'aide", color: "n2" },
  { val: 3, label: "Pratiqué seul, mais pas encore fluide", color: "n3" },
  {
    val: 4,
    label: "Fluide seul, dans un contexte que je connais",
    color: "n4",
  },
  {
    val: 5,
    label: "Fluide dans tout contexte, je pourrais l'enseigner",
    color: "n5",
  },
];

// Chaque item est un objet { texte, aide }
// aide peut être :
//   - une URL (string commençant par "http") -> affichée comme lien cliquable
//   - un texte court (string) -> affiché directement
//   - null -> pas de bouton aide affiché

export const MATIERES = [
  {
    id: "js_dynamique",
    titre: "Applications web dynamiques et interactives",
    items: [
      {
        texte:
          "Je sais déclarer et utiliser des variables, des constantes et des types de données simples en JavaScript.",
        aide: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Grammar_and_types",
      },
      {
        texte: "Je sais écrire une fonction et l'appeler avec des paramètres.",
        aide: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions",
      },
      {
        texte:
          "Je sais sélectionner un élément HTML depuis JavaScript et modifier son contenu ou son style.",
        aide: "https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector",
      },
      {
        texte:
          "Je sais déclencher une action en réponse à un événement utilisateur (clic, saisie, survol).",
        aide: "https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener",
      },
      {
        texte:
          "Je sais écrire un script JavaScript qui réagit à un clic et modifie ce que l'utilisateur voit à l'écran.",
        aide: "La manipulation du DOM consiste à cibler un élément avec querySelector, écouter un événement avec addEventListener, puis modifier ses propriétés (innerHTML, style, classList). C'est la base de toute interactivité côté client.",
      },
      {
        texte:
          "Je sais créer un formulaire interactif qui valide les données saisies avant de les envoyer.",
        aide: "https://developer.mozilla.org/fr/docs/Learn/Forms/Form_validation",
      },
      {
        texte:
          "Je comprends les particularités de JavaScript : gestion des types, arrondis flottants, closures et comportement de this.",
        aide: "JavaScript est un langage à typage dynamique : une variable peut changer de type. Les flottants suivent IEEE 754, d'où 0.1 + 0.2 !== 0.3. Une closure est une fonction qui mémorise son contexte de création. this dépend du contexte d'appel, ce qui diffère selon les fonctions classiques et les fonctions fléchées.",
      },
      {
        texte:
          "Je comprends pourquoi TypeScript existe et je sais ajouter un type simple à une variable ou une fonction.",
        aide: "https://www.typescriptlang.org/docs/handbook/2/basic-types.html",
      },
      {
        texte:
          "Je sais charger des données depuis un serveur et les afficher sans recharger la page entière.",
        aide: "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch",
      },
      {
        texte:
          "Je sais informer l'utilisateur quand une requête échoue, sans que la page plante.",
        aide: "Un appel fetch peut échouer pour deux raisons : une erreur réseau (rejet de la promesse) ou un statut HTTP d'erreur (4xx, 5xx). Il faut gérer les deux avec try/catch et vérifier response.ok avant de lire le corps de la réponse.",
      },
    ],
  },
  {
    id: "front_end",
    titre: "Développement d'interfaces front-end",
    items: [
      {
        texte:
          "Je sais structurer une page web avec un HTML sémantique conforme aux standards du W3C (balises, hiérarchie, attributs).",
        aide: "https://developer.mozilla.org/fr/docs/Glossary/Semantics#s%C3%A9mantique_en_html",
      },
      {
        texte:
          "Je sais utiliser les abréviations Emmet pour écrire du HTML plus rapidement dans mon éditeur.",
        aide: "https://docs.emmet.io/abbreviations/syntax/",
      },
      {
        texte:
          "Je sais construire une mise en page avec Flexbox (alignement, direction, wrap).",
        aide: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      },
      {
        texte:
          "Je sais construire une mise en page avec CSS Grid (colonnes, lignes, zones nommées).",
        aide: "https://css-tricks.com/snippets/css/complete-guide-grid/",
      },
      {
        texte:
          "Je comprends la différence entre Flexbox et Grid et je sais choisir lequel utiliser selon la situation.",
        aide: "Flexbox est unidimensionnel : il aligne des éléments sur un axe (ligne ou colonne). Grid est bidimensionnel : il structure l'espace en lignes ET colonnes simultanément. En pratique, Grid pour les grandes structures de page, Flexbox pour les composants internes.",
      },
      {
        texte:
          "Je sais écrire des règles CSS responsive avec les @media queries (breakpoints, mobile first).",
        aide: "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_media_queries/Using_media_queries",
      },
      {
        texte:
          "Je sais choisir le bon format d'image et optimiser son chargement sur une page web.",
        aide: "JPEG pour les photos, PNG pour la transparence, WebP pour un meilleur ratio qualité/poids, SVG pour les icônes et illustrations vectorielles. L'attribut loading=\"lazy\" diffère le chargement des images hors écran. Les balises srcset et sizes permettent de servir la bonne résolution selon l'appareil.",
      },
      {
        texte:
          "Je comprends ce qu'est un framework CSS et je sais en mettre un en place sur un projet.",
        aide: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
      },
      {
        texte:
          "Je prends en compte l'accessibilité lors de la création d'une interface (contrastes, balises, structure).",
        aide: "https://developer.mozilla.org/fr/docs/Learn/Accessibility/HTML",
      },
      {
        texte:
          "Je sais créer une page web complète qui s'adapte correctement à toutes les tailles d'écran, du mobile au desktop.",
        aide: "L'approche mobile-first consiste à écrire le CSS de base pour petit écran, puis à ajouter des @media queries avec min-width pour enrichir progressivement la mise en page à mesure que l'écran s'agrandit. C'est l'inverse de l'approche desktop-first.",
      },
      {
        texte:
          "Je suis capable d'intégrer une maquette graphique en HTML/CSS en respectant fidèlement les choix visuels (typographie, espacement, couleurs).",
        aide: "L'intégration fidèle d'une maquette passe par l'utilisation de variables CSS pour les couleurs et typographies, la mesure précise des espacements (padding, margin, gap), et le respect de la hiérarchie visuelle. Les outils comme Figma permettent d'inspecter les valeurs exactes directement dans la maquette.",
      },
    ],
  },
  {
    id: "ux_ui",
    titre: "Ergonomie, UI et accessibilité",
    items: [
      {
        texte:
          "Je comprends la différence entre UX et UI et je sais expliquer le rôle de chacun dans la conception d'une interface.",
        aide: "L'UX (User Experience) s'intéresse au ressenti global de l'utilisateur : est-ce que le produit est utile, utilisable et agréable ? L'UI (User Interface) se concentre sur l'aspect visuel : couleurs, typographie, composants. Un bon produit nécessite les deux : une belle interface inutilisable échoue autant qu'une interface fonctionnelle mais repoussante.",
      },
      {
        texte:
          "Je sais créer un persona pour représenter un utilisateur type et justifier les choix de conception qui en découlent.",
        aide: "Un persona est un profil fictif mais ancré dans des données réelles (interviews, analytics). Il décrit un utilisateur type avec ses objectifs, ses frustrations et ses comportements. Il permet de prendre des décisions de conception en se demandant : est-ce que cela répond au besoin de ce persona ?",
      },
      {
        texte:
          "Je connais les heuristiques de Nielsen et les critères de Bastien et Scapin et je sais les utiliser pour identifier des problèmes d'ergonomie dans une interface existante.",
        aide: "https://www.nngroup.com/articles/ten-usability-heuristics/",
      },
      {
        texte:
          "Je maîtrise les principes de base du design UI : contraste, alignement, cohérence visuelle et hiérarchie typographique.",
        aide: "https://www.refactoringui.com/",
      },
      {
        texte:
          "Je sais utiliser Figma pour concevoir une maquette d'interface (organisation des écrans, composants, couleurs, typographie).",
        aide: "https://help.figma.com/hc/fr/articles/360038511533-Guide-de-démarrage-avec-Figma",
      },
      {
        texte:
          "Je sais créer un prototype simple sur Figma et le faire naviguer entre plusieurs écrans.",
        aide: "Dans Figma, le mode Prototype permet de relier des éléments (boutons, liens) à d'autres frames pour simuler la navigation. On définit l'interaction (clic), la transition (slide, dissolve) et la destination. Le prototype peut ensuite être partagé via un lien de présentation.",
      },
      {
        texte:
          "Je connais les niveaux de conformité WCAG (A, AA, AAA) et je comprends ce qu'ils impliquent concrètement.",
        aide: "https://www.w3.org/WAI/WCAG22/Understanding/",
      },
      {
        texte:
          "Je suis capable de réaliser un audit d'accessibilité sur une page web avec un outil dédié (Lighthouse, Wave ou équivalent).",
        aide: "https://wave.webaim.org/",
      },
      {
        texte:
          "Je suis capable d'analyser une interface existante, d'identifier ses problèmes d'ergonomie et d'accessibilité et de proposer des améliorations concrètes et justifiées.",
        aide: "Un audit d'interface combine plusieurs méthodes : évaluation heuristique (Nielsen), test utilisateur, audit d'accessibilité automatique (Lighthouse/WAVE), et vérification manuelle du parcours clavier. Chaque problème identifié doit être associé à un principe violé et à une proposition de correction concrète.",
      },
    ],
  },
  {
    id: "securite_cloud",
    titre: "Architectures sécurisées — Cloud et réseaux",
    items: [
      {
        texte:
          "Je comprends la différence entre une architecture Cloud, On-premise et hybride et je sais identifier les avantages et les contraintes de chacune.",
        aide: "Le Cloud offre agilité et scalabilité quasi-infinie avec un modèle de coûts opérationnels (OpEx), mais impose une dépendance réseau et une perte de contrôle sur la souveraineté des données. L'On-premise garantit une maîtrise totale de la sécurité et des performances locales via un investissement initial lourd (CapEx), au prix d'une rigidité matérielle. L'hybride cherche le meilleur des deux, mais introduit une complexité technique majeure en matière d'intégration, de latence et de gouvernance multi-plateforme.",
      },
      {
        texte:
          "Je sais identifier les menaces fréquentes sur un réseau ou une infrastructure Cloud (DDoS, phishing, vol de données, ransomware).",
        aide: "https://www.ssi.gouv.fr/entreprise/principales-menaces/",
      },
      {
        texte:
          "Je connais les principaux standards et normes de sécurité (ISO 27001, NIST, ANSSI) et je comprends leur rôle dans la sécurisation d'un système d'information.",
        aide: "ISO 27001 est un standard international pour les systèmes de management de la sécurité de l'information (SMSI). Le NIST Cybersecurity Framework propose un cadre de gestion des risques en 5 fonctions (Identifier, Protéger, Détecter, Répondre, Récupérer). L'ANSSI est l'autorité nationale française qui publie des guides de bonnes pratiques applicables aux projets publics et critiques.",
      },
      {
        texte:
          "Je comprends ce qu'est le chiffrement et je sais différencier chiffrement symétrique, asymétrique et hybride.",
        aide: "Le chiffrement symétrique (AES) utilise la même clé pour chiffrer et déchiffrer : rapide mais pose le problème du partage de clé. L'asymétrique (RSA) utilise une paire clé publique/privée : plus sûr pour l'échange, mais plus lent. Le chiffrement hybride combine les deux : on chiffre les données avec AES et on chiffre la clé AES avec RSA. C'est ce que fait HTTPS.",
      },
      {
        texte:
          "Je comprends le principe de la sécurité by design et je sais l'appliquer lors de la conception d'un projet numérique.",
        aide: "La sécurité by design signifie intégrer les exigences de sécurité dès la conception, et non les ajouter après coup. Concrètement : modéliser les menaces (STRIDE), valider les entrées utilisateur, appliquer le principe de moindre privilège, chiffrer les données sensibles au repos et en transit, et prévoir la journalisation des événements critiques.",
      },
      {
        texte:
          "Je connais les vulnérabilités courantes des applications web (XSS, injection SQL, brute force) et je sais comment les prévenir.",
        aide: "https://owasp.org/www-project-top-ten/",
      },
      {
        texte:
          "Je sais sécuriser une API avec une clé ou un token d'authentification.",
        aide: "https://jwt.io/introduction",
      },
      {
        texte:
          "Je sais observer et analyser le trafic réseau avec un outil dédié (Wireshark, netstat) pour identifier des comportements suspects.",
        aide: "https://www.wireshark.org/docs/wsug_html_chunked/ChapterIntroduction.html",
      },
      {
        texte:
          "Je connais les obligations légales liées à la protection des données (RGPD, CNIL) et je sais ce qu'elles impliquent concrètement pour un développeur.",
        aide: "https://www.cnil.fr/fr/les-bases-legales/le-rgpd-et-les-developpeurs",
      },
    ],
  },
  {
    id: "hebergement",
    titre: "Administration d'hébergement web",
    items: [
      {
        texte:
          "Je connais les différents types d'hébergement web (mutualisé, dédié, cloud) et je sais identifier lequel correspond à un besoin donné.",
        aide: "L'hébergement mutualisé partage les ressources d'un serveur entre plusieurs clients : économique mais limité. Le serveur dédié offre des ressources exclusives : performant mais coûteux. Le cloud (VPS, PaaS) combine flexibilité et scalabilité à la demande. Pour un projet à fort trafic ou à contraintes de sécurité, le dédié ou le cloud s'imposent.",
      },
      {
        texte:
          "Je sais me connecter à un serveur distant via SSH et transférer des fichiers via FTP.",
        aide: "https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server",
      },
      {
        texte:
          "Je sais installer et configurer un serveur web local (Apache ou Nginx) et y déployer une page HTML.",
        aide: "https://nginx.org/en/docs/beginners_guide.html",
      },
      {
        texte:
          "Je sais gérer les utilisateurs et les permissions sur un serveur web.",
        aide: "Sur un serveur Linux, chaque fichier appartient à un utilisateur et un groupe. Les permissions (lecture, écriture, exécution) se gèrent avec chmod et chown. Les fichiers du serveur web doivent appartenir à l'utilisateur du processus (www-data pour Apache/Nginx) et ne jamais être accessibles en écriture publique.",
      },
      {
        texte:
          "Je comprends ce qu'est un certificat SSL, je sais pourquoi il est indispensable et je sais comment en activer un.",
        aide: "https://letsencrypt.org/fr/getting-started/",
      },
      {
        texte:
          "Je sais installer WordPress sur un serveur, configurer ses paramètres de base et y associer une base de données.",
        aide: "https://developer.wordpress.org/advanced-administration/before-install/howto-install/",
      },
      {
        texte:
          "Je sais administrer un site WordPress au quotidien : gestion des utilisateurs, des extensions, des thèmes et des mises à jour.",
        aide: "L'administration WordPress passe par le tableau de bord (/wp-admin). Les mises à jour (core, thèmes, extensions) doivent être appliquées régulièrement car elles corrigent des failles de sécurité. Il est recommandé de tester les mises à jour sur un environnement de staging avant de les appliquer en production.",
      },
      {
        texte:
          "Je sais sauvegarder un site web complet (fichiers et base de données) et le restaurer en cas de problème.",
        aide: "Une sauvegarde complète d'un site web comprend deux parties : les fichiers (répertoire du site, uploads, thèmes, extensions) et la base de données (export SQL via mysqldump ou phpMyAdmin). La restauration consiste à remettre les fichiers en place et à réimporter la base. Tester la restauration est aussi important que la sauvegarde elle-même.",
      },
      {
        texte:
          "Je comprends ce qu'est un reverse proxy et je sais à quoi il sert dans une architecture web.",
        aide: "Un reverse proxy (Nginx, Traefik, HAProxy) se place devant les serveurs applicatifs pour centraliser le trafic entrant. Il permet de router les requêtes vers le bon service, de gérer le SSL, d'appliquer du rate limiting, de mettre en cache les réponses et de masquer l'architecture interne. C'est un composant central dans toute architecture microservices.",
      },
      {
        texte:
          "Je sais mettre en place une architecture multi-conteneurs avec Docker (exemple : WordPress + MySQL + Nginx).",
        aide: "https://docs.docker.com/compose/gettingstarted/",
      },
      {
        texte:
          "Je suis capable de déployer et d'administrer un site web complet sur un serveur, de l'installation du serveur à la mise en ligne, en passant par la sécurisation et les sauvegardes.",
        aide: "Un déploiement complet comprend : provisionner un serveur (VPS ou dédié), configurer le serveur web (Nginx/Apache), sécuriser l'accès SSH (désactiver root, clé publique), activer HTTPS (Let's Encrypt), déployer l'application, mettre en place les sauvegardes automatiques et configurer un système de monitoring basique.",
      },
    ],
  },
  {
    id: "linux",
    titre: "Administration Linux",
    items: [
      {
        texte:
          "Je comprends ce qu'est Linux, je connais les principales distributions et je sais expliquer les différences entre les environnements de bureau (GNOME, KDE, XFCE...) et leurs usages.",
        aide: "Linux est un noyau open source sur lequel reposent de nombreuses distributions : Ubuntu et Debian pour le grand public et les serveurs, Arch pour les utilisateurs avancés, Alpine pour les conteneurs (ultra-léger). Les environnements de bureau (GNOME, KDE, XFCE) sont indépendants du noyau et déterminent l'interface graphique et la consommation de ressources.",
      },
      {
        texte:
          "Je suis à l'aise avec les commandes de base du terminal Linux : navigation dans l'arborescence, création et suppression de fichiers et de répertoires.",
        aide: "https://doc.ubuntu-fr.org/tutoriel/console_commandes_de_base",
      },
      {
        texte:
          "Je sais gérer les utilisateurs et les groupes sous Linux (création, suppression, attribution de droits).",
        aide: "Les commandes clés : useradd / adduser pour créer un utilisateur, usermod pour le modifier, userdel pour le supprimer, groupadd pour créer un groupe. La commande sudo permet d'exécuter une commande en tant que superutilisateur. Le fichier /etc/sudoers contrôle qui peut utiliser sudo.",
      },
      {
        texte:
          "Je sais gérer les permissions sur les fichiers et les répertoires avec chmod et chown.",
        aide: "https://doc.ubuntu-fr.org/permissions",
      },
      {
        texte:
          "Je sais configurer le réseau sous Linux : adresse IP fixe, DHCP, vérification de la connectivité.",
        aide: "Sous Ubuntu 18+, la configuration réseau passe par Netplan (fichiers YAML dans /etc/netplan/). Pour une IP fixe, on définit addresses, gateway4 et nameservers. ip a affiche les interfaces, ping teste la connectivité, ip route affiche la table de routage.",
      },
      {
        texte:
          "Je sais lancer, arrêter, redémarrer et vérifier l'état d'un service sous Linux.",
        aide: "Avec systemd (système d'init standard sur les distributions modernes) : systemctl start, stop, restart, status suivi du nom du service. systemctl enable / disable contrôle le démarrage automatique au boot. journalctl -u nom-service affiche les logs du service.",
      },
      {
        texte:
          "Je sais surveiller les ressources système avec les outils dédiés (top, htop, df, free) et interpréter les informations affichées.",
        aide: "top et htop affichent les processus en cours avec leur consommation CPU et mémoire. df -h montre l'utilisation des disques. free -h affiche la RAM disponible et utilisée. Ces outils permettent de détecter une surcharge CPU, un manque de mémoire ou un disque plein avant qu'ils ne causent un incident.",
      },
      {
        texte:
          "Je sais lire et exploiter les fichiers de logs système (/var/log) pour diagnostiquer un problème.",
        aide: "Les logs système se trouvent dans /var/log. Les principaux : syslog (événements système généraux), auth.log (connexions et authentifications), nginx/access.log et error.log (trafic web). Les commandes tail -f (suivi en temps réel), grep (filtrage) et journalctl sont les outils essentiels pour exploiter ces fichiers.",
      },
      {
        texte:
          "Je sais écrire un script Bash structuré : variables, conditions, boucles, gestion des erreurs et commentaires.",
        aide: "https://www.shellscript.sh/",
      },
    ],
  },
  {
    id: "bdd",
    titre: "Bases de données SQL et NoSQL",
    items: [
      {
        texte:
          "Je sais concevoir un modèle logique de base de données relationnelle (tables, clés primaires, clés étrangères, relations et cardinalités).",
        aide: "https://www.lucidchart.com/pages/fr/modele-de-base-de-donnees",
      },
      {
        texte:
          "Je maîtrise les requêtes SQL fondamentales (SELECT, INSERT, UPDATE, DELETE) avec des agrégations et des conditions.",
        aide: "https://sqlzoo.net/wiki/SQL_Tutorial",
      },
      {
        texte:
          "Je sais écrire des requêtes SQL impliquant plusieurs tables avec des jointures (INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN) et je comprends les différences entre elles.",
        aide: "INNER JOIN retourne uniquement les lignes qui ont une correspondance dans les deux tables. LEFT JOIN retourne toutes les lignes de la table gauche et les correspondances de la droite (NULL si aucune). RIGHT JOIN fait l'inverse. FULL JOIN retourne tout, avec NULL là où il n'y a pas de correspondance.",
      },
      {
        texte:
          "Je sais écrire des requêtes SQL avancées : fonctions de fenêtre, CTE (Common Table Expressions) et sous-requêtes.",
        aide: "Les CTE (WITH ... AS) permettent de nommer une sous-requête pour la réutiliser lisiblement. Les fonctions de fenêtre (ROW_NUMBER, RANK, SUM OVER) calculent des agrégats sans regrouper les lignes. Les sous-requêtes imbriquées dans SELECT, FROM ou WHERE permettent des calculs complexes en une seule requête.",
      },
      {
        texte:
          "Je sais créer et utiliser des vues, des index et des triggers dans une base de données relationnelle.",
        aide: "Une vue est une requête nommée et réutilisable qui simplifie les accès complexes. Un index accélère les recherches sur une colonne au prix d'un espace disque supplémentaire. Un trigger est une procédure déclenchée automatiquement par un événement (INSERT, UPDATE, DELETE) et permet d'automatiser des contrôles ou des mises à jour.",
      },
      {
        texte:
          "Je comprends les transactions et les propriétés ACID et je sais les mettre en oeuvre pour sécuriser des opérations critiques.",
        aide: "ACID signifie Atomicité (tout ou rien), Cohérence (la base reste dans un état valide), Isolation (les transactions concurrentes ne s'interfèrent pas) et Durabilité (les données persistées survivent à un crash). En SQL : BEGIN, COMMIT et ROLLBACK délimitent une transaction.",
      },
      {
        texte:
          "Je sais gérer les utilisateurs et les droits dans MySQL (GRANT, REVOKE, RBAC) et sécuriser les connexions.",
        aide: "Dans MySQL, CREATE USER crée un compte, GRANT attribue des droits sur une base ou une table, REVOKE les retire. Le principe de moindre privilège s'applique : un utilisateur applicatif ne devrait avoir que SELECT, INSERT, UPDATE, DELETE — jamais DROP ou GRANT. Les connexions distantes doivent utiliser SSL.",
      },
      {
        texte:
          "Je connais les différentes stratégies de sauvegarde d'une base de données (complète, incrémentielle, différentielle, logique, physique) et je sais choisir la plus adaptée selon le contexte.",
        aide: "La sauvegarde logique (mysqldump) exporte les données en SQL : portable mais lente sur de gros volumes. La sauvegarde physique (copie des fichiers de données) est plus rapide mais dépend du moteur. La stratégie complète + incrémentielle est le standard pour minimiser l'espace de stockage tout en limitant le RPO.",
      },
      {
        texte:
          "Je connais les quatre familles de bases NoSQL (clé-valeur, documents, colonnes, graphes) et je sais identifier le cas d'usage de chacune.",
        aide: "Clé-valeur (Redis) : sessions, cache, files de messages — accès ultra-rapide. Documents (MongoDB) : données semi-structurées, APIs JSON. Colonnes larges (Cassandra) : séries temporelles, IoT, volumes massifs en écriture. Graphes (Neo4j) : réseaux sociaux, recommandations, toute donnée fortement relationnelle. Le choix dépend du modèle de données et des patterns d'accès.",
      },
      {
        texte:
          "Je sais écrire des requêtes MongoDB de base (filtres, projections, tris, agrégations) sur une collection de documents.",
        aide: "https://www.mongodb.com/docs/manual/tutorial/query-documents/",
      },
      {
        texte:
          "Je suis capable de concevoir et de réaliser une base de données complète pour un besoin métier donné : modélisation, création des tables, contraintes d'intégrité, requêtes, triggers et gestion des droits.",
        aide: "Une base de données bien conçue commence par un MCD (Modèle Conceptuel de Données) puis un MLD (Modèle Logique). Les contraintes d'intégrité (NOT NULL, UNIQUE, FOREIGN KEY, CHECK) garantissent la cohérence des données. Les triggers automatisent les règles métier complexes. Les droits d'accès sécurisent les données selon le principe de moindre privilège.",
      },
    ],
  },
  {
    id: "api",
    titre: "Conception d'API Web",
    items: [
      {
        texte:
          "Je comprends ce qu'est une API, je sais différencier une API publique, privée et hybride et je connais les principaux codes HTTP et leur signification.",
        aide: "https://developer.mozilla.org/fr/docs/Web/HTTP/Status",
      },
      {
        texte:
          "Je comprends les différences entre une API REST et une API SOAP et je sais expliquer pourquoi REST est aujourd'hui le standard dominant.",
        aide: "SOAP est un protocole strict basé sur XML avec un contrat WSDL : puissant pour les environnements d'entreprise mais verbeux et complexe. REST est un style architectural basé sur HTTP et JSON : léger, sans état, facile à consommer depuis n'importe quel client. La simplicité de REST et l'adoption universelle de JSON en ont fait le standard du web moderne.",
      },
      {
        texte:
          "Je sais manipuler une API publique existante : authentification, envoi de requêtes, lecture et exploitation des réponses.",
        aide: "https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/",
      },
      {
        texte:
          "Je sais concevoir les routes d'une API REST pour un besoin donné en respectant les conventions de nommage et la logique des méthodes HTTP (GET, POST, PUT, DELETE).",
        aide: "Les routes REST sont centrées sur les ressources (noms au pluriel) : GET /users liste, GET /users/:id détaille, POST /users crée, PUT /users/:id remplace, PATCH /users/:id modifie partiellement, DELETE /users/:id supprime. On n'utilise jamais de verbes dans les URLs (/getUsers est une mauvaise pratique).",
      },
      {
        texte:
          "Je sais créer une API simple avec un framework backend (Express.js, Fastify, NestJS ou équivalent).",
        aide: "https://expressjs.com/fr/starter/hello-world.html",
      },
      {
        texte:
          "Je sais améliorer une API avec des fonctionnalités avancées : pagination, filtres et mise en cache des réponses.",
        aide: "La pagination évite de renvoyer des milliers de résultats : on utilise les paramètres page et limit (offset) ou un cursor pour les grands datasets. Les filtres passent par les query params (?status=active). La mise en cache (en-têtes Cache-Control, Redis côté serveur) réduit la charge et accélère les réponses pour les données peu changeantes.",
      },
      {
        texte:
          "Je sais documenter une API avec Swagger de façon claire et exploitable par un autre développeur.",
        aide: "https://swagger.io/docs/specification/v3_0/about/",
      },
      {
        texte:
          "Je sais sécuriser une API : gestion des CORS, authentification par token et gestion propre des erreurs HTTP.",
        aide: "CORS (Cross-Origin Resource Sharing) contrôle quels domaines peuvent appeler l'API : configurer une whitelist d'origines autorisées. L'authentification par JWT vérifie l'identité à chaque requête sans état serveur. Les erreurs doivent retourner des codes HTTP appropriés (400 pour données invalides, 401 non authentifié, 403 interdit, 404 non trouvé, 500 erreur serveur) avec un message explicite.",
      },
      {
        texte:
          "Je suis capable de travailler en binôme sur un projet d'API en utilisant Git pour coordonner les contributions et éviter les conflits.",
        aide: "Le workflow en binôme sur une API repose sur des branches dédiées par fonctionnalité, des Pull Requests relues par l'autre développeur avant merge, et des conventions de nommage partagées (routes, codes d'erreur, format JSON). Un fichier OpenAPI/Swagger partagé sert de contrat commun entre les deux développeurs.",
      },
      {
        texte:
          "Je suis capable de concevoir, développer, sécuriser et documenter une API REST complète répondant à un besoin métier donné.",
        aide: "Une API REST complète et production-ready couvre : la modélisation des ressources et des routes, l'authentification (JWT ou OAuth2), la validation des entrées, la gestion centralisée des erreurs, la pagination et les filtres, la documentation Swagger, les tests (unitaires et d'intégration) et le déploiement avec variables d'environnement.",
      },
    ],
  },
  {
    id: "framework_front",
    titre: "Frameworks et bibliothèques front-end",
    items: [
      {
        texte:
          "Je comprends ce qu'est un composant dans React (ou un autre framework) et je sais en créer un, lui passer des données et le réutiliser.",
        aide: "https://react.dev/learn/your-first-component",
      },
      {
        texte:
          "Je comprends le cycle de vie d'un composant et je sais à quel moment déclencher un appel API ou mettre à jour l'affichage.",
        aide: "https://react.dev/reference/react/useEffect",
      },
      {
        texte:
          "Je comprends le concept de routage dans une application React (ou un autre framework) et je sais naviguer entre plusieurs pages sans rechargement.",
        aide: "https://reactrouter.com/start/library/routing",
      },
      {
        texte:
          "Je sais ce qu'est le state dans une application et je sais l'utiliser pour afficher et mettre à jour des données dynamiquement.",
        aide: "https://react.dev/learn/state-a-components-memory",
      },
      {
        texte:
          "Je suis capable de récupérer des données depuis une API et de les afficher dans mon application en gérant les états de chargement, de succès et d'erreur.",
        aide: "Une bonne gestion des états d'une requête distingue trois phases : chargement (afficher un spinner ou skeleton), succès (afficher les données) et erreur (afficher un message explicite avec possibilité de réessayer). En React, ces trois états se modélisent avec useState et useEffect, ou avec des librairies comme React Query.",
      },
      {
        texte:
          "Je sais gérer les tokens d'authentification dans une application front-end et sécuriser les appels à une API (CORS, headers).",
        aide: "Le token JWT doit être stocké de façon sécurisée : httpOnly cookie de préférence (inaccessible au JS) plutôt que localStorage (vulnérable au XSS). Chaque requête authentifiée inclut le header Authorization: Bearer <token>. Un intercepteur (axios ou fetch wrapper) centralise l'ajout du token et la gestion des 401.",
      },
      {
        texte:
          "Je sais mettre en place des techniques d'optimisation de base dans une application front-end (lazy loading, mise en cache, réduction des re-rendus inutiles).",
        aide: "Le lazy loading (React.lazy + Suspense) charge les composants à la demande, réduisant le bundle initial. React.memo et useCallback évitent les re-rendus inutiles sur les composants enfants. La mise en cache des appels API (React Query, SWR) évite les requêtes redondantes et améliore la réactivité perçue.",
      },
      {
        texte:
          "Je comprends le processus de build d'une application React (ou un autre framework) et je sais ce qu'il produit concrètement.",
        aide: "Un build React (npm run build) transforme le code source JSX/TypeScript en JavaScript vanilla optimisé, regroupe les modules en bundles, minifie le code, hash les noms de fichiers pour le cache navigateur et produit un dossier dist/ ou build/ contenant uniquement des fichiers statiques (HTML, CSS, JS) prêts à être servis par n'importe quel serveur web.",
      },
      {
        texte:
          "Je sais déployer une application front-end en production en respectant les bonnes pratiques de sécurité et de performance.",
        aide: "Le déploiement d'un front-end en production passe par : build optimisé, configuration des headers HTTP (Content-Security-Policy, X-Frame-Options), activation de la compression gzip/brotli, mise en place d'un CDN pour les assets statiques, configuration du HTTPS et gestion des routes côté serveur pour les SPA (fallback sur index.html).",
      },
      {
        texte:
          "Je suis capable de construire une application front-end complète connectée à une API : routage, gestion de l'état, appels sécurisés, gestion des erreurs et déploiement.",
        aide: "Une application front-end complète et production-ready intègre : un routeur (React Router), une gestion d'état globale (Context, Zustand ou Redux selon la complexité), des appels API centralisés avec gestion des erreurs et du token, un système de notifications utilisateur (toasts), un build optimisé et un déploiement automatisé (CI/CD).",
      },
    ],
  },
  {
    id: "sauvegarde_versioning",
    titre: "Initiation à la sauvegarde et au versioning",
    items: [
      {
        texte:
          "Je connais les différents types de sauvegardes (complète, incrémentielle, différentielle) et je sais expliquer les avantages et les inconvénients de chacun.",
        aide: "La sauvegarde complète copie tout : simple à restaurer mais longue et volumineuse. L'incrémentielle ne sauvegarde que ce qui a changé depuis la dernière sauvegarde (quelle qu'elle soit) : rapide et économe, mais la restauration nécessite toute la chaîne. La différentielle sauvegarde ce qui a changé depuis la dernière complète : compromis entre les deux.",
      },
      {
        texte:
          "Je comprends la différence entre une sauvegarde locale et une sauvegarde cloud et je sais choisir la plus adaptée selon le contexte.",
        aide: "La règle 3-2-1 est le standard de référence : 3 copies des données, sur 2 supports différents, dont 1 hors site (cloud ou autre localisation physique). Le local offre une restauration rapide mais est vulnérable aux sinistres physiques (incendie, vol). Le cloud protège contre ces risques mais dépend de la connectivité et implique des coûts de transfert.",
      },
      {
        texte:
          "Je connais les bonnes pratiques de sécurité des sauvegardes : chiffrement, test de restauration régulier et fréquence adaptée au besoin.",
        aide: "Une sauvegarde non testée est une fausse sauvegarde. Les bonnes pratiques incluent : chiffrer les sauvegardes (surtout les offsite), tester la restauration régulièrement en conditions réelles, adapter la fréquence au RTO/RPO du projet, et journaliser les opérations de sauvegarde pour détecter les échecs silencieux.",
      },
      {
        texte:
          "Je comprends ce que sont le RPO (point de reprise maximal acceptable) et le RTO (durée maximale d'interruption acceptable) et je sais pourquoi ils structurent toute politique de sauvegarde.",
        aide: "Le RPO (Recovery Point Objective) définit la perte de données maximale acceptable : un RPO de 1 heure signifie qu'on sauvegarde au moins toutes les heures. Le RTO (Recovery Time Objective) définit la durée maximale d'interruption : un RTO de 4 heures signifie que le service doit être rétabli en moins de 4 heures. Ces deux métriques pilotent le choix de la stratégie et des outils de sauvegarde.",
      },
      {
        texte:
          "Je sais comment réagir face à un incident critique (crash de base de données, perte de données) : diagnostic, restauration et communication.",
        aide: "Face à un incident, la séquence est : stopper l'hémorragie (isoler le système affecté), diagnostiquer (logs, monitoring), évaluer l'impact (données perdues, utilisateurs affectés), restaurer depuis la sauvegarde la plus récente validée, vérifier l'intégrité des données restaurées, communiquer sur l'incident (statut, ETA, cause) et rédiger un post-mortem.",
      },
      {
        texte:
          "Je comprends ce qu'est le versioning, pourquoi il est indispensable dans un projet de développement et ce que Git apporte concrètement.",
        aide: "Le versioning permet de conserver l'historique de chaque modification du code, de revenir à un état antérieur, de travailler en parallèle sur plusieurs fonctionnalités et de collaborer sans écraser le travail des autres. Git est un système de versioning distribué : chaque développeur a une copie complète du dépôt, ce qui permet de travailler hors ligne et de fusionner les contributions de façon contrôlée.",
      },
      {
        texte:
          "Je maîtrise les commandes Git de base via le terminal (init, add, commit, push, pull) et je sais les utiliser depuis mon IDE.",
        aide: "https://git-scm.com/docs/gittutorial",
      },
      {
        texte:
          "Je comprends la différence entre un dépôt local et un dépôt distant (GitHub, GitLab) et je sais synchroniser les deux.",
        aide: "Le dépôt local est la copie sur votre machine, avec son historique complet. Le dépôt distant (GitHub, GitLab) est la référence partagée par l'équipe. git push envoie vos commits locaux vers le distant. git pull récupère les commits distants et les fusionne dans votre branche locale. git fetch récupère sans fusionner, pour inspecter avant d'intégrer.",
      },
      {
        texte:
          "Je suis capable de travailler sur un projet partagé avec Git en coordonnant mes contributions avec celles des autres membres de l'équipe sans écraser leur travail.",
        aide: "La coordination en équipe avec Git repose sur des branches dédiées par fonctionnalité (feature branches), des Pull Requests revues avant merge, des conventions de commit claires et une communication sur les zones de code travaillées en parallèle. git pull --rebase avant de pousser évite les commits de merge inutiles.",
      },
    ],
  },
  {
    id: "git_avance",
    titre: "Versioning avec Git — niveau avancé",
    items: [
      {
        texte:
          "Je comprends les différentes méthodes de collaboration avec Git (fork, clone) et je sais choisir la plus adaptée selon le contexte du projet.",
        aide: "Le clone copie directement un dépôt auquel on a accès en écriture : adapté aux projets d'équipe internes. Le fork crée une copie personnelle d'un dépôt tiers sur lequel on n'a pas accès en écriture directe : adapté à la contribution open source. On travaille sur le fork et on soumet une Pull Request vers le dépôt original.",
      },
      {
        texte:
          "Je sais créer et gérer des branches Git pour travailler sur une fonctionnalité en parallèle sans impacter la branche principale.",
        aide: "https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Les-branches-en-bref",
      },
      {
        texte:
          "Je comprends le fonctionnement d'un workflow Git (feature branch, main/develop, GitFlow) et je sais l'appliquer sur un projet d'équipe.",
        aide: "Le workflow feature branch est le plus courant : une branche par fonctionnalité, mergée dans main via Pull Request. GitFlow ajoute une branche develop, des branches release et hotfix : adapté aux projets avec des cycles de release formels. Le trunk-based development (tout sur main, branches très courtes) est adopté par les équipes pratiquant l'intégration continue.",
      },
      {
        texte:
          "Je sais rédiger des messages de commit clairs, descriptifs et conformes aux bonnes pratiques (conventional commits, séparation sujet/corps, temps verbal).",
        aide: "https://www.conventionalcommits.org/fr/v1.0.0/",
      },
      {
        texte:
          "Je suis capable de créer une Pull Request (ou Merge Request), de la documenter correctement et de la fusionner proprement.",
        aide: "Une bonne Pull Request a un titre clair (type: description courte), une description expliquant le pourquoi (pas le comment, le code s'en charge), des captures d'écran si l'UI change, et une checklist de vérification. Elle doit être de taille raisonnable (200-400 lignes max) pour faciliter la revue. On la fusionne seulement après approbation et CI verte.",
      },
      {
        texte:
          "Je sais résoudre un conflit de fusion dans Git et je comprends pourquoi il se produit.",
        aide: "Un conflit survient quand deux branches modifient la même zone d'un fichier. Git marque les zones en conflit avec des marqueurs (<<<<<<<, =======, >>>>>>>). La résolution consiste à éditer manuellement le fichier pour choisir ou combiner les deux versions, puis git add le fichier résolu et finaliser le merge. Les conflits fréquents signalent un manque de coordination ou des branches trop longues.",
      },
      {
        texte:
          "Je comprends la différence entre Git Fetch et Git Pull et je sais quand utiliser l'un plutôt que l'autre.",
        aide: "git fetch télécharge les modifications distantes sans les intégrer à la branche locale : permet d'inspecter ce qui a changé avant de décider quoi faire. git pull fait un fetch suivi d'un merge (ou rebase avec --rebase) automatiquement. Utiliser fetch + rebase manuel donne plus de contrôle et produit un historique plus propre.",
      },
      {
        texte:
          "Je sais annuler une modification avec Git selon la situation : revert, reset ou stash.",
        aide: "git revert crée un nouveau commit qui annule un commit précédent : sûr car préserve l'historique, à utiliser sur des branches partagées. git reset déplace le pointeur de branche : --soft conserve les modifications en staged, --mixed les laisse non staged, --hard les efface — dangereux sur branches partagées. git stash met de côté les modifications non commitées pour y revenir plus tard.",
      },
      {
        texte:
          "Je sais utiliser Git Stash pour mettre de côté des modifications en cours sans les perdre.",
        aide: "git stash sauvegarde les modifications non commitées (tracked et staged) dans une pile temporaire et restaure le working directory propre. git stash list liste les stashes. git stash pop réapplique le dernier stash et le supprime de la pile. git stash apply réapplique sans le supprimer. Utile pour basculer rapidement sur une autre branche sans commiter un travail inachevé.",
      },
      {
        texte:
          "Je sais utiliser les tags Git pour marquer une version stable d'un projet et je comprends leur rôle dans un cycle de release.",
        aide: "Un tag Git est un pointeur permanent vers un commit, utilisé pour marquer des versions (v1.0.0, v2.3.1). Les tags annotés (git tag -a v1.0 -m 'Release 1.0') stockent aussi un message, une date et un auteur. Les tags sont poussés séparément avec git push origin --tags. Ils s'intègrent dans les pipelines CI/CD pour déclencher automatiquement un déploiement.",
      },
      {
        texte:
          "Je comprends ce qu'est un webhook et je sais expliquer comment il peut déclencher une action automatique à partir d'un événement Git.",
        aide: "Un webhook est une URL que GitHub/GitLab appelle automatiquement (HTTP POST) quand un événement survient : push, merge, création de tag, ouverture de PR. Le serveur cible reçoit un payload JSON décrivant l'événement et peut déclencher une action : rebuild, déploiement, notification Slack. C'est la base de l'intégration continue.",
      },
      {
        texte:
          "Je suis capable de rédiger une procédure formelle de contribution à un projet basée sur les Pull Requests, de l'ouverture de la branche jusqu'à la fusion et la clôture.",
        aide: "Une procédure de contribution formelle décrit : comment nommer les branches (feat/, fix/, chore/), comment rédiger les commits (Conventional Commits), les étapes de création d'une PR (titre, description, labels, reviewers), les critères d'acceptation (CI verte, approbation, pas de conflits), la stratégie de merge (squash, rebase ou merge commit) et la clôture de la branche après merge.",
      },
    ],
  },
  {
    id: "moa",
    titre: "Initiation à l'étude d'un projet numérique (MOA)",
    items: [
      {
        texte:
          "Je comprends la différence entre la MOA (Maîtrise d'Ouvrage) et la MOE (Maîtrise d'Oeuvre) et je sais expliquer le rôle de chacune dans un projet numérique.",
        aide: "La MOA (Maîtrise d'Ouvrage) représente le commanditaire du projet : elle exprime le besoin, définit les objectifs, valide les livrables et porte la responsabilité du budget. La MOE (Maîtrise d'Oeuvre) est le réalisateur technique : elle conçoit et développe la solution en réponse au besoin exprimé. En pratique, le dialogue continu entre MOA et MOE est la condition sine qua non d'un projet réussi.",
      },
      {
        texte:
          "Je suis capable de recueillir et de formaliser le besoin d'un client ou d'un utilisateur de façon structurée.",
        aide: "Le recueil du besoin passe par des entretiens, des ateliers et des questionnaires. Il aboutit à un document structuré qui distingue les besoins fonctionnels (ce que le système doit faire), non fonctionnels (performance, sécurité, accessibilité), les contraintes (budget, délais, stack technique) et les critères d'acceptation. Les user stories (En tant que... je veux... afin de...) sont un format efficace.",
      },
      {
        texte:
          "Je comprends ce qu'est la faisabilité technique d'un projet et je sais identifier les principales contraintes qui peuvent la limiter (techniques, budgétaires, délais).",
        aide: "L'étude de faisabilité évalue si un projet peut être réalisé dans les contraintes données. Techniquement : les compétences disponibles, les intégrations nécessaires, les contraintes de performance. Budgétairement : le coût de développement, d'infrastructure et de maintenance. En termes de délais : la complexité réelle versus le temps disponible. Le résultat est une recommandation : go, no-go ou go avec ajustements.",
      },
      {
        texte:
          "Je sais identifier et qualifier les risques techniques d'un projet et proposer des mesures pour les réduire.",
        aide: "Un risque se caractérise par sa probabilité (faible/moyenne/élevée) et son impact (mineur/majeur/critique). Un registre des risques liste chaque risque, son score (probabilité × impact), son propriétaire et le plan de mitigation. Les risques techniques fréquents : dépendance à une API tierce instable, complexité d'intégration sous-estimée, dette technique dans le code existant.",
      },
      {
        texte:
          "Je sais rédiger un cahier des charges simplifié, compréhensible par un public non technique, en couvrant les fonctionnalités attendues et les contraintes du projet.",
        aide: "Un cahier des charges simplifié couvre : le contexte et les objectifs du projet, les utilisateurs cibles et leurs besoins, les fonctionnalités attendues (classées par priorité MoSCoW : Must, Should, Could, Won't), les contraintes (techniques, légales, budgétaires), les critères de succès mesurables et le calendrier prévisionnel. Le langage doit être accessible à un interlocuteur non technique.",
      },
      {
        texte:
          "Je suis capable d'adapter mon langage et mes livrables selon que je m'adresse à un public technique ou non technique.",
        aide: "Face à un public non technique, on remplace le jargon par des analogies concrètes, on illustre avec des maquettes visuelles plutôt que des diagrammes techniques, et on centre le discours sur les bénéfices utilisateur plutôt que sur les choix d'implémentation. Face à un public technique, on peut aller dans le détail des architectures, des APIs et des contraintes de performance.",
      },
      {
        texte:
          "Je suis capable de schématiser une architecture technique simple (client, serveur, base de données, API) et de justifier les choix effectués.",
        aide: "Un schéma d'architecture simple représente les composants principaux (navigateur/app mobile, serveur web, serveur applicatif, base de données, services tiers) et les flux de communication entre eux (HTTP, WebSocket, SQL, etc.). Chaque choix technique (framework, base de données, hébergement) doit être justifié par les contraintes du projet : volume, équipe, budget, maintenabilité.",
      },
    ],
  },
  {
    id: "agile",
    titre: "Méthodes agiles",
    items: [
      {
        texte:
          "Je comprends la différence entre une méthode agile et une méthode traditionnelle (cycle en V) et je sais expliquer dans quel contexte chacune est plus adaptée.",
        aide: "Le cycle en V est séquentiel et documentaire : chaque phase (spécification, conception, développement, test, recette) se succède sans retour arrière facile. Il convient aux projets aux exigences stables et réglementées (aérospatial, défense). L'agile est itératif et adaptatif : on livre de la valeur en cycles courts et on ajuste en fonction des retours. Il convient aux projets dont les besoins évoluent.",
      },
      {
        texte:
          "Je connais les 4 valeurs et les 12 principes du Manifeste Agile et je suis capable de les illustrer avec des exemples concrets.",
        aide: "https://agilemanifesto.org/iso/fr/manifesto.html",
      },
      {
        texte:
          "Je comprends les rôles dans Scrum (Product Owner, Scrum Master, équipe) et je sais décrire le déroulement d'un sprint et ses cérémonies (Planning, Daily, Review, Retrospective).",
        aide: "https://www.scrumguides.org/scrum-guide.html",
      },
      {
        texte:
          "Je sais rédiger des User Stories et construire un backlog structuré et priorisé pour un projet donné.",
        aide: "Une User Story suit le format : 'En tant que [persona], je veux [action] afin de [bénéfice]'. Elle est accompagnée de critères d'acceptation testables. Le backlog est une liste ordonnée par valeur métier : les items en haut sont les plus prioritaires et suffisamment détaillés pour être développés dans le prochain sprint.",
      },
      {
        texte:
          "Je sais mettre en place un tableau Kanban sur un outil numérique (Trello, Miro ou équivalent), y répartir des tâches et appliquer la notion de limite des tâches en cours (WIP).",
        aide: "Un tableau Kanban visualise le flux de travail avec des colonnes (À faire, En cours, En revue, Terminé). La limite WIP (Work In Progress) plafonne le nombre de tâches simultanées dans chaque colonne : elle force à finir avant de commencer et révèle les goulots d'étranglement. Réduire le WIP augmente le débit et réduit le temps de cycle.",
      },
      {
        texte:
          "Je comprends ce qu'est le pair programming, le TDD et le refactoring et je sais expliquer ce que chacune de ces pratiques apporte concrètement à la qualité du code.",
        aide: "Le pair programming (deux développeurs sur un poste) réduit les bugs, diffuse les connaissances et améliore la conception par la discussion continue. Le TDD (Test-Driven Development) impose d'écrire le test avant le code : cela force à clarifier le comportement attendu et produit un code naturellement testable. Le refactoring améliore la structure interne du code sans changer son comportement, pour réduire la dette technique.",
      },
      {
        texte:
          "Je suis capable d'organiser le travail d'une petite équipe sur un projet en choisissant et en adaptant les outils et les pratiques agiles les plus pertinents selon le contexte.",
        aide: "Pour une petite équipe (2-5 personnes), un Kanban simple suffit souvent plutôt que Scrum complet. L'essentiel : définir des critères d'acceptation clairs, limiter le WIP, tenir des points réguliers courts (daily ou bi-quotidien), rétrospective en fin de cycle et backlog priorisé par le porteur du projet. Les outils (Trello, Notion, Linear, Jira) doivent servir l'équipe, pas la contraindre.",
      },
    ],
  },
];
