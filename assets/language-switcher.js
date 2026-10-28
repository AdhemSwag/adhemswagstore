/* AdhemSwag site language switcher: EN default, FR, AR. UI-only; no reward/auth logic. */
(function () {
  'use strict';
  const KEY = 'adhemswag-language';
  const translations = {
    fr: {
      'Home':'Accueil','Dashboard':'Tableau de bord','Profile':'Profil','My Profile':'Mon profil','Settings':'Paramètres',
      'Store':'Boutique','Leaderboard':'Classement','Missions':'Missions','Bonuses':'Bonus','Giveaway':'Concours',
      'Donate':'Faire un don','Faceit':'FACEIT','FAQ':'FAQ','Admin':'Administration','Login':'Connexion','Logout':'Déconnexion',
      'Sign in':'Se connecter','Sign in with Twitch':'Se connecter avec Twitch','Connect Twitch':'Connecter Twitch',
      'Connect with Twitch':'Se connecter avec Twitch','Back':'Retour','Back to AdhemSwag':'Retour à AdhemSwag',
      'Save':'Enregistrer','Cancel':'Annuler','Close':'Fermer','Search':'Rechercher','Search...':'Rechercher…',
      'Loading...':'Chargement…','Loading':'Chargement','Refresh':'Actualiser','Submit':'Envoyer','Confirm':'Confirmer',
      'Yes':'Oui','No':'Non','Name':'Nom','Email':'E-mail','Password':'Mot de passe','Username':'Nom d’utilisateur',
      'Level':'Niveau','Rank':'Rang','Points':'Points','XP':'XP','FNC Points':'Points FNC','All-time FNC Earned':'Total FNC gagnés',
      'Profile Requirements':'Conditions du profil','Required Details':'Informations requises','Live Code':'Code live',
      'FNC Progression':'Progression FNC','Watching Now':'En train de regarder','Watch • Earn • Redeem':'Regarder • Gagner • Échanger',
      'Watch Live':'Regarder le live','Redeem':'Échanger','Rewards':'Récompenses','History':'Historique','Status':'Statut',
      'Available':'Disponible','Unavailable':'Indisponible','Ready to redeem':'Prêt à échanger','Promotion':'Promotion',
      'Active':'Actif','Inactive':'Inactif','Online':'En ligne','Offline':'Hors ligne','Required':'Requis','Optional':'Facultatif',
      'Profile Active':'Profil actif','Climb the ranks':'Grimpez dans le classement','Global Ranking':'Classement mondial',
      'Player Profile':'Profil du joueur','Trade URL':'URL d’échange','Steam Profile URL':'URL du profil Steam',
      'Discord':'Discord','Twitch':'Twitch','Steam':'Steam','Language':'Langue','English':'Anglais','French':'Français','Arabic':'Arabe',
      'Browser alerts enabled':'Alertes du navigateur activées','Notifications enabled':'Notifications activées',
      'There are no items to display.':'Aucun élément à afficher.','No results found':'Aucun résultat trouvé',
      'Copied!':'Copié !','Copy':'Copier','Watch time':'Temps de visionnage','Daily streak':'Série quotidienne',
      'Store unlocks at 10 min':'La boutique se débloque après 10 min','Points Earned':'Points gagnés',
      'All rights reserved.':'Tous droits réservés.','Contact':'Contact','Community':'Communauté',
      'Watch AdhemSwag live, earn points every minute, and redeem exclusive rewards directly — CS2 skins, gear, shoutouts, perks, and more, made for the community.':'Regardez AdhemSwag en direct, gagnez des points chaque minute et échangez-les contre des récompenses exclusives : skins CS2, équipements, dédicaces, avantages et plus encore, pour la communauté.',
      'Redeem private winner codes to receive FNC Points. Enter the code given to you after winning an AdhemSwag giveaway.':'Échangez les codes gagnants privés pour recevoir des points FNC. Saisissez le code reçu après avoir gagné un concours AdhemSwag.',
      'Only during live':'Uniquement pendant le live','Choose a reward from the Store and track your FNC progress. Your existing FNC earning rules stay unchanged.':'Choisissez une récompense dans la boutique et suivez votre progression FNC. Les règles actuelles de gain FNC restent inchangées.',
      'Keep watching on Twitch for at least 10 active minutes per day to build your streak. A missed day resets the streak. FNC Points and XP rules are unchanged.':'Continuez à regarder Twitch pendant au moins 10 minutes actives par jour pour prolonger votre série. Un jour manqué réinitialise la série. Les règles FNC et XP restent inchangées.',
      'Visible only to the authenticated AdhemSwag owner/admin. Never shown on public viewer profiles.':'Visible uniquement pour le propriétaire/admin authentifié d’AdhemSwag. Jamais affiché sur les profils publics des spectateurs.',
      'Use your FNC Points to redeem available AdhemSwag rewards. Every redemption is checked securely on the server before FNC or stock is changed.':'Utilisez vos points FNC pour échanger les récompenses disponibles d’AdhemSwag. Chaque échange est vérifié de façon sécurisée sur le serveur avant toute modification des points FNC ou du stock.',
      'Keep your profile complete. Skin rewards may require your Steam Trade Link so the admin can process delivery. Your FNC is only deducted after the server accepts the redemption.':'Gardez votre profil complet. Les récompenses en skins peuvent nécessiter votre lien d’échange Steam afin que l’admin puisse effectuer la livraison. Vos points FNC ne sont déduits qu’après validation de l’échange par le serveur.',
      'Enter your Steam Trade Link for this reward. It is saved with the redemption for delivery.':'Saisissez votre lien d’échange Steam pour cette récompense. Il sera enregistré avec la demande d’échange pour la livraison.',
      'Everything I use in CS2 is listed here. Video, crosshair, viewmodel, radar, mouse settings, gear and PC specs.':'Tout ce que j’utilise dans CS2 est répertorié ici : vidéo, viseur, modèle de vue, radar, réglages de souris, équipement et caractéristiques du PC.',
      'Twitch subscriber giveaways are being prepared. The official giveaway schedule, entry conditions, prize details and winner system will be announced here at launch.':'Les concours réservés aux abonnés Twitch sont en préparation. Le calendrier officiel, les conditions de participation, les détails des prix et le système de sélection des gagnants seront annoncés ici au lancement.',
      'Everything you need to know about FNC Points, XP, missions, earning and redeeming rewards.':'Tout ce qu’il faut savoir sur les points FNC, l’XP, les missions, les gains et l’échange de récompenses.',
      '⚠ TWITCH ONLY — FNC Points are earned from eligible activity on the live Twitch stream. Kick does not earn FNC Points.':'⚠ TWITCH UNIQUEMENT — Les points FNC sont gagnés grâce aux activités éligibles sur le live Twitch. Kick ne permet pas de gagner des points FNC.',
      'Base rate: 1 FNC every 1 minute. Tier 1 ×2, Tier 2 ×3 and Tier 3 ×4 are active.':'Taux de base : 1 FNC par minute. Multiplicateurs actifs : Tier 1 ×2, Tier 2 ×3 et Tier 3 ×4.',
      'Cheering: 100 FNC per 100 Bits':'Bits : 100 FNC pour 100 Bits','Subscribing: 500 FNC instantly when you subscribe':'Abonnement : 500 FNC immédiatement lors de l’abonnement',
      'Tipping: 100 FNC per $1 tipped (non-anonymous tips only)':'Pourboire : 100 FNC par dollar donné (dons non anonymes uniquement)','Raiding: 100 FNC for every raider':'Raid : 100 FNC pour chaque participant au raid',
      'Base rate: 1 XP. Tier 1 ×2, Tier 2 ×3 and Tier 3 ×4 are active.':'Taux de base : 1 XP. Multiplicateurs actifs : Tier 1 ×2, Tier 2 ×3 et Tier 3 ×4.',
      'Quick Check-in — 15 verified minutes: 5 XP + 1 FNC':'Vérification rapide — 15 minutes vérifiées : 5 XP + 1 FNC',
      'Daily Twitch Watch — 30 verified minutes: 10 XP + 1 FNC':'Visionnage Twitch quotidien — 30 minutes vérifiées : 10 XP + 1 FNC',
      'Daily Watch Streak — 60 verified minutes: 20 XP + 2 FNC':'Série de visionnage quotidienne — 60 minutes vérifiées : 20 XP + 2 FNC',
      'Weekly Warm-up — 120 verified minutes: 25 XP + 3 FNC':'Échauffement hebdomadaire — 120 minutes vérifiées : 25 XP + 3 FNC',
      'Weekly Twitch Watch — 180 verified minutes: 50 XP + 5 FNC':'Visionnage Twitch hebdomadaire — 180 minutes vérifiées : 50 XP + 5 FNC',
      'Weekly Watch Streak — 300 verified minutes: 75 XP + 8 FNC':'Série de visionnage hebdomadaire — 300 minutes vérifiées : 75 XP + 8 FNC'
,
      'Google Analytics':'Google Analytics','Rewards / Store':'Récompenses / Boutique','Sponsors':'Sponsors','Giveaways':'Concours',
      'LIVE Codes':'Codes LIVE','Admin Logs':'Journaux admin','Redemptions':'Échanges','Viewers':'Spectateurs','Transactions':'Transactions',
      'System':'Système','FNC Points':'Points FNC','Users / Member Management':'Gestion des utilisateurs / membres','Media':'Médias',
      'Admin Access':'Accès admin','Reward Analytics':'Analyse des récompenses','FNC Economy':'Économie FNC','Security & Audit':'Sécurité et audit',
      'Operations':'Opérations','Stream Chat Integration':'Intégration du chat du live','ADMIN PANEL':'PANNEAU ADMIN',
      'Manage FNC rewards, viewers, redemptions and system controls from one place.':'Gérez les récompenses FNC, les spectateurs, les échanges et les commandes système depuis un seul endroit.',
      'LOGIN WITH TWITCH':'SE CONNECTER AVEC TWITCH','Mission ENROLLMENT':'INSCRIPTION AUX MISSIONS','REFRESH MISSION STATS':'ACTUALISER LES STATS DES MISSIONS',
      'Admin workflow':'Flux de travail admin','Member ANALYTICS':'ANALYSE DES MEMBRES','Live community overview from members and redemption data. Read-only.':'Vue de la communauté en direct à partir des membres et des échanges. Lecture seule.',
      'Reward ANALYTICS':'ANALYSE DES RÉCOMPENSES','Store performance from real redemption records. Read-only — no reward, stock or FNC changes.':'Performances de la boutique à partir des échanges enregistrés. Lecture seule — aucune modification des récompenses, stocks ou FNC.',
      'REFRESH ANALYTICS':'ACTUALISER LES ANALYSES','Reward PERFORMANCE':'PERFORMANCES DES RÉCOMPENSES','Redemption count, FNC spent, current stock and processing status for every reward.':'Nombre d’échanges, FNC dépensés, stock actuel et statut de traitement pour chaque récompense.',
      'Reward':'Récompense','Cost':'Coût','Stock':'Stock','Redeems':'Échanges','FNC Spent':'FNC dépensés','Pending':'En attente','Sent':'Envoyé','Rejected':'Rejeté','Not loaded.':'Non chargé.',
      'FNC ECONOMY':'ÉCONOMIE FNC','Read-only overview of FNC inflow, spending and refunds from recorded transactions.':'Aperçu en lecture seule des entrées, dépenses et remboursements FNC issus des transactions enregistrées.',
      'REFRESH FNC ANALYTICS':'ACTUALISER L’ANALYSE FNC','FNC FLOW':'FLUX FNC','Type':'Type','Source':'Source','Platform':'Plateforme','Total FNC':'Total FNC',
      'Twitch WATCH MONITOR':'MONITEUR DE SUIVI TWITCH','REFRESH WATCH MONITOR':'ACTUALISER LE MONITEUR','Active VIEWERS':'SPECTATEURS ACTIFS',
      'Viewer':'Spectateur','Joined':'A rejoint','Last Seen':'Vu pour la dernière fois','Last Activity':'Dernière activité','Minutes':'Minutes','Tier':'Niveau',
      'System OPERATIONS':'OPÉRATIONS SYSTÈME','REFRESH OPERATIONS':'ACTUALISER LES OPÉRATIONS','Automation STATUS':'ÉTAT DE L’AUTOMATISATION',
      'Job':'Tâche','Schedule':'Planning','Last Run':'Dernière exécution','Message':'Message','Security AUDIT':'AUDIT DE SÉCURITÉ',
      'Read-only operational view of admin activity.':'Vue opérationnelle de l’activité admin en lecture seule.','REFRESH AUDIT':'ACTUALISER L’AUDIT','Recent ACTIVITY':'ACTIVITÉ RÉCENTE','Date':'Date',
      'Partner Bonuses':'Bonus partenaires','Use code AdhemSwag':'Utilisez le code AdhemSwag','Get NoPing':'Obtenir NoPing','Join ESEA':'Rejoindre ESEA',
      'CS2 Config':'Configuration CS2','Support AdhemSwag':'Soutenir AdhemSwag','// choose your region or send skins directly':'// choisissez votre région ou envoyez directement des skins',
      'Donate — EU via Streamlabs':'Faire un don — UE via Streamlabs','Donate — DZ via Da3amni':'Faire un don — DZ via Da3amni',
      'Send Skins — CS2 via Steam Trade Offer':'Envoyer des skins — CS2 via une offre d’échange Steam',
      'Join my Faceit Club':'Rejoignez mon club FACEIT','// play CS2 with AdhemSwag and the community':'// jouez à CS2 avec AdhemSwag et la communauté',
      'Join the Club ElNahs CLUB (N7s) on Faceit':'Rejoindre le club ElNahs CLUB (N7s) sur FACEIT',
      'AdhemSwag Organizer Page on Faceit':'Page organisateur AdhemSwag sur FACEIT','Join the Discord find teammates & matches':'Rejoignez Discord pour trouver des coéquipiers et des matchs',
      'GIVEAWAY COMING SOON':'CONCOURS BIENTÔT DISPONIBLE','The official AdhemSwag Giveaway is coming soon.':'Le concours officiel AdhemSwag arrive bientôt.',
      'Back to Settings':'Retour aux paramètres','Viewer ⌄':'Spectateur ⌄','PROFILE':'PROFIL','SETTINGS':'PARAMÈTRES','DISCONNECT':'DÉCONNEXION',
      'SHOW OWNER DETAILS':'AFFICHER LES DÉTAILS DU PROPRIÉTAIRE','SIGN IN WITH TWITCH':'SE CONNECTER AVEC TWITCH'
,
      'Config':'Configuration','Menu':'Menu','My Profile':'Mon profil','MY PROFILE':'MON PROFIL','MISSIONS':'MISSIONS','STORE':'BOUTIQUE',
      'FACEIT':'FACEIT','Leader board':'Classement','FNC STORE':'BOUTIQUE FNC','FNC POINTS · CURRENT BALANCE':'POINTS FNC · SOLDE ACTUEL',
      'FNC available to spend in the store right now. Spending FNC lowers this balance.':'FNC disponibles à dépenser dans la boutique. Les dépenses réduisent ce solde.',
      'Top watchers':'Meilleurs spectateurs','TODAY':'AUJOURD’HUI','WEEK':'SEMAINE','MONTH':'MOIS','ALL TIME':'TOUTE LA PÉRIODE',
      'Turn watch time into real rewards':'Transformez votre temps de visionnage en vraies récompenses','▶ Watch Live':'▶ Regarder le live',
      '? VIEW FULL FAQ':'? VOIR LA FAQ COMPLÈTE','JOIN MISSIONS ↗':'REJOINDRE LES MISSIONS ↗','OFFLINE':'HORS LIGNE',
      'Follow Twitch':'Suivre sur Twitch','Subscribe Twitch':'S’abonner sur Twitch','Follow Kick':'Suivre sur Kick','Subscribe Kick':'S’abonner sur Kick',
      'LIVE CODES':'CODES LIVE','REDEEM CODE':'UTILISER LE CODE','CODE DROP':'DROP DE CODE','Choose your dream skin':'Choisissez votre skin idéal',
      'CHANGE SKIN / CODE':'CHANGER DE SKIN / CODE','CONNECT WITH TWITCH TO SAVE YOUR GOAL':'CONNECTEZ TWITCH POUR ENREGISTRER VOTRE OBJECTIF',
      'Choose a Store reward':'Choisissez une récompense de la boutique','CLOSE ✕':'FERMER ✕','Rewarding our community’s loyalty every day.':'Récompenser chaque jour la fidélité de notre communauté.',
      'Thousands of hours turned into real rewards.':'Des milliers d’heures transformées en vraies récompenses.','Partner Bonuses':'Bonus partenaires',
      'Join us on Discord':'Rejoignez-nous sur Discord','Go to page':'Accéder à la page','SHOW OWNER DETAILS':'AFFICHER LES DÉTAILS DU PROPRIÉTAIRE',
      'Your Twitch identity, progression and reward status — all in one place.':'Votre identité Twitch, votre progression et vos récompenses au même endroit.',
      'CHECKING':'VÉRIFICATION','PROFILE STATUS':'STATUT DU PROFIL','EDIT PROFILE':'MODIFIER LE PROFIL','Your profile status updates automatically.':'Le statut de votre profil se met à jour automatiquement.',
      'COMPLETE PROFILE':'COMPLÉTER LE PROFIL','FNC REWARDS':'RÉCOMPENSES FNC','FNC POINTS 0':'POINTS FNC 0','PROFILE REQUIREMENTS':'CONDITIONS DU PROFIL',
      'Connected / Optional':'Connecté / Facultatif','OWNER VERIFICATION — PRIVATE DETAILS':'VÉRIFICATION PROPRIÉTAIRE — DÉTAILS PRIVÉS',
      'Loading…':'Chargement…','Redeem a private winner code to receive FNC Points. Each winner code can be used once.':'Utilisez un code gagnant privé pour recevoir des points FNC. Chaque code ne peut être utilisé qu’une fois.',
      'MY ACCESS CODES':'MES CODES D’ACCÈS','Codes from your Store purchases appear here automatically. No email is required.':'Les codes de vos achats dans la boutique apparaissent ici automatiquement. Aucun e-mail requis.',
      'MY MISSIONS':'MES MISSIONS','CHECKING MISSION STATUS…':'VÉRIFICATION DES MISSIONS…','OPEN MISSIONS →':'OUVRIR LES MISSIONS →',
      'The viewer’s chosen Store reward.':'La récompense choisie par le spectateur dans la boutique.','HISTORY':'HISTORIQUE','BADGE COLLECTION':'COLLECTION DE BADGES',
      'SUBSCRIBE ON TWITCH':'S’ABONNER SUR TWITCH','COPY':'COPIER','ACCOUNT SETTINGS':'PARAMÈTRES DU COMPTE','ACCOUNT STATUS':'ÉTAT DU COMPTE',
      'Account':'Compte','Email REQUIRED':'E-mail REQUIS','Steam Profile URL REQUIRED':'URL DU PROFIL STEAM REQUISE',
      'Steam Trade URL REQUIRED Where to get Trade URL?':'URL D’ÉCHANGE STEAM REQUISE Où trouver l’URL d’échange ?','Discord ID REQUIRED':'ID DISCORD REQUIS',
      'SAVE CHANGES':'ENREGISTRER LES MODIFICATIONS','Before you redeem':'Avant d’échanger','Check My Settings':'Vérifier mes paramètres',
      'Steam Trade Link':'Lien d’échange Steam','CANCEL':'ANNULER','REDEEM REWARD':'ÉCHANGER LA RÉCOMPENSE','REDEEM':'ÉCHANGER',
      'EXITLAG CODE — 7 DAYS':'CODE EXITLAG — 7 JOURS','Get your 7-day access code with automatic delivery after a successful redemption.':'Obtenez un code d’accès de 7 jours livré automatiquement après validation de l’échange.',
      'CLAIM PROMOTION ↗':'PROFITER DE L’OFFRE ↗','REWARDS SYSTEM: STOPPED':'SYSTÈME DE RÉCOMPENSES : ARRÊTÉ',
      'TYPE ALL PRODUCTS SKINS / ITEMS DIGITAL CODES TWITCH SUB ONLY':'TYPE : TOUS LES PRODUITS, SKINS / OBJETS, CODES NUMÉRIQUES, ABONNEMENTS TWITCH',
      'SORT BY FEATURED NEWEST PRICE: LOW TO HIGH PRICE: HIGH TO LOW':'TRIER : EN VEDETTE, PLUS RÉCENTS, PRIX CROISSANT, PRIX DÉCROISSANT',
      'How do viewers earn points? +':'Comment les spectateurs gagnent-ils des points ? +','Do subscribers earn more? +':'Les abonnés gagnent-ils davantage ? +',
      'How much do Bits and Subs give me? +':'Combien rapportent les Bits et les abonnements ? +','Do tips and raids give points too? +':'Les dons et raids rapportent-ils aussi des points ? +',
      'Do I earn points if the stream is offline? +':'Est-ce que je gagne des points si le live est hors ligne ? +','How do viewers earn XP? +':'Comment les spectateurs gagnent-ils de l’XP ? +',
      'What are Daily and Weekly Missions? +':'Que sont les missions quotidiennes et hebdomadaires ? +','How do I start a mission? +':'Comment commencer une mission ? +',
      'Where can I check my FNC balance and rewards? +':'Où consulter mon solde FNC et mes récompenses ? +','Where do I redeem my points? +':'Où échanger mes points ? +',
      'PLAY YOUR PART. CLAIM YOUR PROGRESS.':'PARTICIPEZ. FAITES PROGRESSER VOTRE COMPTE.','YOUR ACTIVE MISSIONS':'VOS MISSIONS ACTIVES',
      'Daily: join every day • Weekly: join once each week':'Quotidien : rejoignez chaque jour • Hebdomadaire : rejoignez une fois par semaine',
      '01 / DAILY JOIN':'01 / PARTICIPATION QUOTIDIENNE','02 / WEEKLY JOIN':'02 / PARTICIPATION HEBDOMADAIRE','03 / TWITCH ONLY':'03 / TWITCH UNIQUEMENT',
      'CONNECT WITH TWITCH':'CONNECTER TWITCH','JOIN DAILY MISSIONS':'REJOINDRE LES MISSIONS QUOTIDIENNES','JOIN WEEKLY MISSIONS':'REJOINDRE LES MISSIONS HEBDOMADAIRES',
      'JOINED FOR TODAY':'REJOINT AUJOURD’HUI','JOIN REQUIRED TODAY':'PARTICIPATION REQUISE AUJOURD’HUI','JOINED THIS WEEK':'REJOINT CETTE SEMAINE',
      'JOIN REQUIRED THIS WEEK':'PARTICIPATION REQUISE CETTE SEMAINE',
      "// KNOWLEDGE BASE": "// BASE DE CONNAISSANCES",
      "FNC POINTS, XP & MISSIONS": "POINTS FNC, XP ET MISSIONS",
      "FNC Points are": "Les points FNC sont",
      "Twitch only": "Twitch uniquement",
      "Eligible watch rewards count only while watching": "Les récompenses de visionnage ne comptent que lorsque vous regardez",
      "AdhemSwag’s live Twitch stream": "le live Twitch d’AdhemSwag",
      "1 FNC per eligible minute": "1 FNC par minute éligible",
      "for a non-subscriber. Kick and other Twitch channels do not generate watch FNC.": "pour les non-abonnés. Kick et les autres chaînes Twitch ne génèrent pas de FNC de visionnage.",
      "Yes. Twitch subscribers earn a multiplier based on their subscription tier while watching live:": "Oui. Les abonnés Twitch bénéficient d’un multiplicateur selon leur niveau d’abonnement pendant le live :",
      "SUB": "ABONNÉ",
      "FNC / MIN": "FNC / MIN",
      "Non-sub": "Non-abonné",
      "1 FNC": "1 FNC",
      "Tier 1": "Niveau 1",
      "Tier 2": "Niveau 2",
      "Tier 3": "Niveau 3",
      "Cheering:": "Bits :",
      "Subscribing:": "Abonnement :",
      "Tipping:": "Pourboires :",
      "Raiding:": "Raid :",
      "No. FNC Points only accumulate while you're actively watching a": "Non. Les points FNC s’accumulent uniquement lorsque vous regardez activement un",
      "live Twitch": "live Twitch",
      "stream.": "en direct.",
      "XP System": "Système XP",
      "XP is earned from eligible watch activity on": "L’XP est gagnée grâce au visionnage éligible sur",
      ". A normal viewer receives the base": ". Un spectateur normal reçoit le taux de base",
      "1× XP": "1× XP",
      "rate, and subscriber multipliers match the FNC tiers. Kick and other Twitch channels do not generate watch XP.": "et les multiplicateurs des abonnés correspondent aux niveaux FNC. Kick et les autres chaînes Twitch ne génèrent pas d’XP de visionnage.",
      "XP RATE": "TAUX XP",
      "2× XP": "2× XP",
      "3× XP": "3× XP",
      "4× XP": "4× XP",
      "Does Kick give XP?": "Kick donne-t-il de l’XP ?",
      "No.": "Non.",
      "XP watch progression is Twitch-based. Watching on Kick does not generate XP.": "La progression XP du visionnage repose sur Twitch. Regarder sur Kick ne génère pas d’XP.",
      "How does the XP system work?": "Comment fonctionne le système XP ?",
      "Your XP is calculated from eligible Twitch watch activity and your verified Twitch subscription tier. The system applies the correct multiplier automatically:": "Votre XP est calculée selon votre activité de visionnage Twitch éligible et votre niveau d’abonnement Twitch vérifié. Le système applique automatiquement le bon multiplicateur :",
      "1× normal, 2× Tier 1, 3× Tier 2, 4× Tier 3": "1× normal, 2× niveau 1, 3× niveau 2, 4× niveau 3",
      ". XP is used for progression and is separate from your FNC balance.": ". L’XP sert à votre progression et est distincte de votre solde FNC.",
      "Daily & Weekly Missions": "Missions quotidiennes et hebdomadaires",
      "What are Daily and Weekly Missions?": "Que sont les missions quotidiennes et hebdomadaires ?",
      "// ADHEMSWAG REWARDS": "// RÉCOMPENSES ADHEMSWAG",
      "ADHEMSWAG PROMOTIONS": "PROMOTIONS ADHEMSWAG",
      "LIMITED DEAL • GAMING PERFORMANCE": "OFFRE LIMITÉE • PERFORMANCE GAMING",
      "FNC Points & XP are not being awarded or spent yet.": "Les points FNC et l’XP ne sont pas encore attribués ni dépensés.",
      "YOUR BALANCE:": "VOTRE SOLDE :",
      "VIEWER STATUS:": "STATUT DU SPECTATEUR :",
      "TYPE": "TYPE",
      "ALL PRODUCTS": "TOUS LES PRODUITS",
      "SKINS / ITEMS": "SKINS / OBJETS",
      "DIGITAL CODES": "CODES NUMÉRIQUES",
      "TWITCH SUB ONLY": "ABONNEMENT TWITCH UNIQUEMENT",
      "SORT BY": "TRIER PAR",
      "FEATURED": "À LA UNE",
      "NEWEST": "PLUS RÉCENTS",
      "PRICE: LOW TO HIGH": "PRIX CROISSANT",
      "PRICE: HIGH TO LOW": "PRIX DÉCROISSANT",
      "LOADING REWARDS…": "CHARGEMENT DES RÉCOMPENSES…",
      "Support": "Soutenir",
      "via Streamlabs": "via Streamlabs",
      "via Da3amni": "via Da3amni",
      "via Steam Trade Offer": "via une offre d’échange Steam",
      "Join my": "Rejoindre mon",
      "Faceit Club": "club FACEIT",
      "How to join": "Comment rejoindre",
      "Log in (or create your free account) on Faceit.": "Connectez-vous (ou créez un compte gratuit) sur FACEIT.",
      "Click": "Cliquez",
      "above to open ElNahs CLUB (N7s).": "ci-dessus pour ouvrir ElNahs CLUB (N7s).",
      "Hit the join button on the club page, then hop in our Discord to queue up together.": "Cliquez sur le bouton Rejoindre sur la page du club, puis rejoignez notre Discord pour jouer ensemble.",
      "Updated Today": "Mis à jour aujourd’hui",
      "Current settings used on stream": "Réglages actuellement utilisés en live",
      "Mouse": "Souris",
      "Zoom Sens Multiplier": "Multiplicateur de sensibilité du zoom",
      "Polling Rate": "Fréquence d’interrogation",
      "Aspect Ratio": "Format d’image",
      "Scaling Mode": "Mode de mise à l’échelle",
      "Display Mode": "Mode d’affichage",
      "Fullscreen Windowed": "Plein écran fenêtré",
      "Advanced Video": "Vidéo avancée",
      "V-Sync": "Synchronisation verticale",
      "Global Shadow Quality": "Qualité globale des ombres",
      "Model/Texture Detail": "Détail des modèles/textures",
      "Shader Detail": "Détail des shaders",
      "Particle Detail": "Détail des particules",
      "Anti-Aliasing": "Anticrénelage",
      "NVIDIA Reflex": "NVIDIA Reflex",
      "Enabled": "Activé",
      "Disabled": "Désactivé",
      "Low": "Faible",
      "Quality": "Qualité",
      "HUD / Radar": "HUD / Radar",
      "Key Binds": "Raccourcis clavier",
      "Forward / Back": "Avancer / Reculer",
      "Left / Right": "Gauche / Droite",
      "Walk": "Marcher",
      "Duck": "S’accroupir",
      "Jump": "Sauter",
      "Use": "Utiliser",
      "Reload": "Recharger",
      "Drop Weapon": "Jeter l’arme",
      "ADMIN PREVIEW • PUBLIC VIEW • VIEWER PROFILE": "APERÇU ADMIN • VUE PUBLIQUE • PROFIL SPECTATEUR",
      "OWNER MODE": "MODE PROPRIÉTAIRE",
      "// Viewer Account": "// Compte spectateur",
      "STATUS": "STATUT",
      "PROGRESSION": "PROGRESSION",
      "ROOKIE": "DÉBUTANT",
      "LEVEL": "NIVEAU",
      "WATCH TIME": "TEMPS DE VISIONNAGE",
      "STREAK": "SÉRIE",
      "DAYS": "JOURS",
      "Email verified": "E-mail vérifié",
      "Steam ID": "ID Steam",
      "Verifying admin access…": "Vérification de l’accès admin…",
      "FNC Rewards are active for eligible viewers.": "Les récompenses FNC sont actives pour les spectateurs éligibles.",
      "No access codes yet.": "Aucun code d’accès pour le moment.",
      "No activity yet. Your FNC earnings, XP activity, redemptions and refunds will appear here.": "Aucune activité pour le moment. Vos gains FNC, votre activité XP, vos échanges et remboursements apparaîtront ici.",
      "PROFILE BADGES": "BADGES DU PROFIL",
      "UNLOCKED": "DÉBLOQUÉ",
      "MY REWARDS": "MES RÉCOMPENSES",
      "ACCOUNT": "COMPTE",
      "Secure profile": "Profil sécurisé",
      "Live": "En direct",
      "POINTS ACTIVE / STORE OFF": "POINTS ACTIFS / BOUTIQUE DÉSACTIVÉE",
      "Profile completion": "Complétion du profil",
      "Editable fields": "Champs modifiables",
      "Connect Twitch first.": "Connectez d’abord Twitch.",
      "ADHEMSWAG GIVEAWAY": "CONCOURS ADHEMSWAG",
      "GIVEAWAY": "CONCOURS",
      "COMING SOON": "BIENTÔT DISPONIBLE",
      "Twitch Only": "Twitch uniquement",
      "Verified Winner": "Gagnant vérifié",
      "// tracking watch time": "// suivi du temps de visionnage",
      "· earning rewards": "· gagnez des récompenses",
      "Turn watch time": "Transformez le temps de visionnage",
      "into": "en",
      "// TWITCH MISSIONS": "// MISSIONS TWITCH",
      "Join missions. Earn XP + FNC.": "Rejoignez les missions. Gagnez de l’XP + des FNC.",
      "Complete daily and weekly Twitch watch goals. Click to join before you start watching.": "Complétez les objectifs de visionnage Twitch quotidiens et hebdomadaires. Cliquez pour rejoindre avant de commencer à regarder.",
      "FNC / 1 min — viewers": "FNC / minute — spectateurs",
      "Twitch Sub — T1 · T2 · T3": "Abonnés Twitch — N1 · N2 · N3",
      "// LIVE CODES": "// CODES LIVE",
      "LIVE": "EN DIRECT",
      "CODES": "CODES",
      "// SKIN GOAL": "// OBJECTIF SKIN",
      "YOUR CURRENT GOAL": "VOTRE OBJECTIF ACTUEL",
      "CHOOSE A SKIN OR CODE": "CHOISIR UN SKIN OU UN CODE",
      "Click to browse Store rewards": "Cliquez pour parcourir les récompenses de la boutique",
      "Skins Delivered": "Skins livrés",
      "The competition continues!": "La compétition continue !",
      "For more information, join our Discord": "Pour plus d’informations, rejoignez notre Discord",
      "// FNC • XP • WATCH": "// FNC • XP • VISIONNAGE",
      "Leader": "Classement",
      "board": "des joueurs",
      "The competitive ranking for AdhemSwag viewers. Compare XP, available FNC and total FNC earned over time.": "Le classement compétitif des spectateurs d’AdhemSwag. Comparez l’XP, les FNC disponibles et le total de FNC gagnés.",
      "Loading top players…": "Chargement des meilleurs joueurs…",
      "Loading leaderboard…": "Chargement du classement…",
      "// WATCHERS": "// SPECTATEURS",
      "Top": "Meilleurs",
      "watchers": "spectateurs",
      "Only completed, non-blocked viewer profiles are shown. XP and FNC balances are server-protected.": "Seuls les profils de spectateurs complets et non bloqués sont affichés. Les soldes XP et FNC sont protégés côté serveur.",
      "TWITCH ACCOUNT ACCESS": "ACCÈS AU COMPTE TWITCH",
      "Connect your Twitch account to access your AdhemSwag profile, watch rewards, XP and community features.": "Connectez votre compte Twitch pour accéder à votre profil AdhemSwag, aux récompenses de visionnage, à l’XP et aux fonctions communautaires.",
      "← Back to AdhemSwag": "← Retour à AdhemSwag",
      "INITIALIZING ADMIN PANEL…": "INITIALISATION DU PANNEAU ADMIN…",
      "SECURE • TWITCH ADMIN • SUPABASE": "SÉCURISÉ • ADMIN TWITCH • SUPABASE",
      "// PRIVATE ADMIN AREA": "// ESPACE ADMIN PRIVÉ",
      "checking Twitch admin access…": "vérification de l’accès administrateur Twitch…",
      "Total Users": "Utilisateurs au total",
      "Active Rewards": "Récompenses actives",
      "Pending Redemptions": "Échanges en attente",
      "Stats load after secure Admin access is verified.": "Les statistiques se chargent après vérification sécurisée de l’accès admin.",
      "Current database structure already contains rewards, redemptions, users and transactions. FNC/XP remain disabled until the complete system is tested.": "La base de données contient déjà les récompenses, échanges, utilisateurs et transactions. FNC/XP restent désactivés jusqu’à ce que le système complet soit testé.",
      "AdhemSwag - The Home of your favorite streamer": "AdhemSwag - La maison de votre streamer préféré",
      "AdhemSwag — Sign in with Twitch": "AdhemSwag — Connexion avec Twitch",
      "AdhemSwag — Missions": "AdhemSwag — Missions",
    },
    ar: {
      'Home':'الرئيسية','Dashboard':'لوحة التحكم','Profile':'الملف الشخصي','My Profile':'ملفي الشخصي','Settings':'الإعدادات',
      'Store':'المتجر','Leaderboard':'لوحة المتصدرين','Missions':'المهام','Bonuses':'المكافآت الإضافية','Giveaway':'مسابقة',
      'Donate':'تبرع','Faceit':'FACEIT','FAQ':'الأسئلة الشائعة','Admin':'الإدارة','Login':'تسجيل الدخول','Logout':'تسجيل الخروج',
      'Sign in':'تسجيل الدخول','Sign in with Twitch':'تسجيل الدخول عبر Twitch','Connect Twitch':'ربط Twitch',
      'Connect with Twitch':'الاتصال عبر Twitch','Back':'رجوع','Back to AdhemSwag':'العودة إلى AdhemSwag',
      'Save':'حفظ','Cancel':'إلغاء','Close':'إغلاق','Search':'بحث','Search...':'بحث…','Loading...':'جارٍ التحميل…',
      'Loading':'جارٍ التحميل','Refresh':'تحديث','Submit':'إرسال','Confirm':'تأكيد','Yes':'نعم','No':'لا','Name':'الاسم',
      'Email':'البريد الإلكتروني','Password':'كلمة المرور','Username':'اسم المستخدم','Level':'المستوى','Rank':'الرتبة',
      'Points':'النقاط','XP':'XP','FNC Points':'نقاط FNC','All-time FNC Earned':'إجمالي نقاط FNC المكتسبة',
      'Profile Requirements':'متطلبات الملف الشخصي','Required Details':'البيانات المطلوبة','Live Code':'رمز البث',
      'FNC Progression':'تقدم FNC','Watching Now':'يشاهد الآن','Watch • Earn • Redeem':'شاهد • اكسب • استبدل',
      'Watch Live':'شاهد البث المباشر','Redeem':'استبدال','Rewards':'المكافآت','History':'السجل','Status':'الحالة',
      'Available':'متاح','Unavailable':'غير متاح','Ready to redeem':'جاهز للاستبدال','Promotion':'عرض ترويجي',
      'Active':'نشط','Inactive':'غير نشط','Online':'متصل','Offline':'غير متصل','Required':'مطلوب','Optional':'اختياري',
      'Profile Active':'الملف الشخصي نشط','Climb the ranks':'تقدم في التصنيف','Global Ranking':'التصنيف العالمي',
      'Player Profile':'ملف اللاعب','Trade URL':'رابط التبادل','Steam Profile URL':'رابط ملف Steam',
      'Discord':'Discord','Twitch':'Twitch','Steam':'Steam','Language':'اللغة','English':'الإنجليزية','French':'الفرنسية','Arabic':'العربية',
      'Browser alerts enabled':'تم تفعيل تنبيهات المتصفح','Notifications enabled':'تم تفعيل الإشعارات',
      'There are no items to display.':'لا توجد عناصر لعرضها.','No results found':'لم يتم العثور على نتائج',
      'Copied!':'تم النسخ!','Copy':'نسخ','Watch time':'وقت المشاهدة','Daily streak':'السلسلة اليومية',
      'Store unlocks at 10 min':'يُفتح المتجر بعد 10 دقائق','Points Earned':'النقاط المكتسبة',
      'All rights reserved.':'جميع الحقوق محفوظة.','Contact':'اتصل بنا','Community':'المجتمع',
      'Watch AdhemSwag live, earn points every minute, and redeem exclusive rewards directly — CS2 skins, gear, shoutouts, perks, and more, made for the community.':'شاهد بث AdhemSwag المباشر واكسب النقاط كل دقيقة واستبدلها بمكافآت حصرية مثل مظاهر CS2 والمعدات والإهداءات والمزايا والمزيد للمجتمع.',
      'Redeem private winner codes to receive FNC Points. Enter the code given to you after winning an AdhemSwag giveaway.':'استبدل رموز الفوز الخاصة للحصول على نقاط FNC. أدخل الرمز الذي تحصل عليه بعد الفوز في مسابقة AdhemSwag.',
      'Only during live':'أثناء البث المباشر فقط','Choose a reward from the Store and track your FNC progress. Your existing FNC earning rules stay unchanged.':'اختر مكافأة من المتجر وتابع تقدم نقاط FNC. ستبقى قواعد كسب FNC الحالية دون تغيير.',
      'Keep watching on Twitch for at least 10 active minutes per day to build your streak. A missed day resets the streak. FNC Points and XP rules are unchanged.':'واصل المشاهدة على Twitch لمدة 10 دقائق نشطة على الأقل يوميًا لبناء سلسلة المشاهدة. يؤدي تفويت يوم إلى إعادة ضبط السلسلة. قواعد FNC وXP لا تتغير.',
      'Visible only to the authenticated AdhemSwag owner/admin. Never shown on public viewer profiles.':'مرئي فقط لمالك أو مسؤول AdhemSwag الذي تم التحقق من هويته. لا يظهر أبدًا في ملفات المشاهدين العامة.',
      'Use your FNC Points to redeem available AdhemSwag rewards. Every redemption is checked securely on the server before FNC or stock is changed.':'استخدم نقاط FNC لاستبدال مكافآت AdhemSwag المتاحة. يتم التحقق من كل عملية استبدال بأمان على الخادم قبل تغيير النقاط أو المخزون.',
      'Keep your profile complete. Skin rewards may require your Steam Trade Link so the admin can process delivery. Your FNC is only deducted after the server accepts the redemption.':'أكمل ملفك الشخصي. قد تتطلب مكافآت المظاهر رابط تبادل Steam حتى يتمكن المسؤول من تسليمها. لا يتم خصم نقاط FNC إلا بعد قبول الخادم لعملية الاستبدال.',
      'Enter your Steam Trade Link for this reward. It is saved with the redemption for delivery.':'أدخل رابط تبادل Steam لهذه المكافأة. سيتم حفظه مع طلب الاستبدال لإتمام التسليم.',
      'Everything I use in CS2 is listed here. Video, crosshair, viewmodel, radar, mouse settings, gear and PC specs.':'كل ما أستخدمه في CS2 موجود هنا: إعدادات الفيديو والتصويب ونموذج العرض والرادار والماوس والمعدات ومواصفات الكمبيوتر.',
      'Twitch subscriber giveaways are being prepared. The official giveaway schedule, entry conditions, prize details and winner system will be announced here at launch.':'يجري إعداد مسابقات مشتركي Twitch. سيتم الإعلان هنا عند الإطلاق عن الجدول الرسمي وشروط المشاركة وتفاصيل الجوائز ونظام اختيار الفائزين.',
      'Everything you need to know about FNC Points, XP, missions, earning and redeeming rewards.':'كل ما تحتاج إلى معرفته عن نقاط FNC وXP والمهام وكسب المكافآت واستبدالها.',
      '⚠ TWITCH ONLY — FNC Points are earned from eligible activity on the live Twitch stream. Kick does not earn FNC Points.':'⚠ Twitch فقط — يتم كسب نقاط FNC من النشاط المؤهل أثناء بث Twitch المباشر. لا يمنح Kick نقاط FNC.',
      'Base rate: 1 FNC every 1 minute. Tier 1 ×2, Tier 2 ×3 and Tier 3 ×4 are active.':'المعدل الأساسي: نقطة FNC واحدة كل دقيقة. المضاعفات الفعالة: Tier 1 ×2 وTier 2 ×3 وTier 3 ×4.',
      'Cheering: 100 FNC per 100 Bits':'Bits: ‏100 FNC لكل 100 Bits','Subscribing: 500 FNC instantly when you subscribe':'الاشتراك: ‏500 FNC فور الاشتراك',
      'Tipping: 100 FNC per $1 tipped (non-anonymous tips only)':'الإكرامية: ‏100 FNC لكل دولار يتم التبرع به (التبرعات غير المجهولة فقط)','Raiding: 100 FNC for every raider':'الغارة: ‏100 FNC لكل مشارك في الغارة',
      'Base rate: 1 XP. Tier 1 ×2, Tier 2 ×3 and Tier 3 ×4 are active.':'المعدل الأساسي: 1 XP. المضاعفات الفعالة: Tier 1 ×2 وTier 2 ×3 وTier 3 ×4.',
      'Quick Check-in — 15 verified minutes: 5 XP + 1 FNC':'تسجيل سريع — 15 دقيقة موثقة: ‏5 XP + 1 FNC',
      'Daily Twitch Watch — 30 verified minutes: 10 XP + 1 FNC':'مشاهدة Twitch يوميًا — 30 دقيقة موثقة: ‏10 XP + 1 FNC',
      'Daily Watch Streak — 60 verified minutes: 20 XP + 2 FNC':'سلسلة مشاهدة يومية — 60 دقيقة موثقة: ‏20 XP + 2 FNC',
      'Weekly Warm-up — 120 verified minutes: 25 XP + 3 FNC':'إحماء أسبوعي — 120 دقيقة موثقة: ‏25 XP + 3 FNC',
      'Weekly Twitch Watch — 180 verified minutes: 50 XP + 5 FNC':'مشاهدة Twitch أسبوعيًا — 180 دقيقة موثقة: ‏50 XP + 5 FNC',
      'Weekly Watch Streak — 300 verified minutes: 75 XP + 8 FNC':'سلسلة مشاهدة أسبوعية — 300 دقيقة موثقة: ‏75 XP + 8 FNC'
,
      'Google Analytics':'Google Analytics','Rewards / Store':'المكافآت / المتجر','Sponsors':'الرعاة','Giveaways':'المسابقات',
      'LIVE Codes':'رموز البث','Admin Logs':'سجلات الإدارة','Redemptions':'عمليات الاستبدال','Viewers':'المشاهدون','Transactions':'المعاملات',
      'System':'النظام','Users / Member Management':'إدارة المستخدمين والأعضاء','Media':'الوسائط',
      'Admin Access':'صلاحيات الإدارة','Reward Analytics':'تحليلات المكافآت','FNC Economy':'اقتصاد FNC','Security & Audit':'الأمان والتدقيق',
      'Operations':'العمليات','Stream Chat Integration':'تكامل دردشة البث','ADMIN PANEL':'لوحة الإدارة',
      'Manage FNC rewards, viewers, redemptions and system controls from one place.':'إدارة مكافآت FNC والمشاهدين والاستبدالات وعناصر التحكم بالنظام من مكان واحد.',
      'LOGIN WITH TWITCH':'تسجيل الدخول عبر Twitch','Mission ENROLLMENT':'التسجيل في المهام','REFRESH MISSION STATS':'تحديث إحصاءات المهام',
      'Admin workflow':'سير عمل الإدارة','Member ANALYTICS':'تحليلات الأعضاء','Live community overview from members and redemption data. Read-only.':'نظرة عامة على المجتمع وبيانات الاستبدال. للقراءة فقط.',
      'Reward ANALYTICS':'تحليلات المكافآت','Store performance from real redemption records. Read-only — no reward, stock or FNC changes.':'أداء المتجر من سجلات الاستبدال الفعلية. للقراءة فقط — دون تغيير المكافآت أو المخزون أو FNC.',
      'REFRESH ANALYTICS':'تحديث التحليلات','Reward PERFORMANCE':'أداء المكافآت','Redemption count, FNC spent, current stock and processing status for every reward.':'عدد الاستبدالات ونقاط FNC المصروفة والمخزون الحالي وحالة المعالجة لكل مكافأة.',
      'Reward':'المكافأة','Cost':'التكلفة','Stock':'المخزون','Redeems':'الاستبدالات','FNC Spent':'نقاط FNC المصروفة','Pending':'قيد الانتظار','Sent':'تم الإرسال','Rejected':'مرفوض','Not loaded.':'لم يتم التحميل.',
      'FNC ECONOMY':'اقتصاد FNC','Read-only overview of FNC inflow, spending and refunds from recorded transactions.':'عرض للقراءة فقط لتدفق نقاط FNC وإنفاقها واستردادها وفق المعاملات المسجلة.',
      'REFRESH FNC ANALYTICS':'تحديث تحليلات FNC','FNC FLOW':'تدفق FNC','Type':'النوع','Source':'المصدر','Platform':'المنصة','Total FNC':'إجمالي FNC',
      'Twitch WATCH MONITOR':'مراقبة مشاهدة Twitch','REFRESH WATCH MONITOR':'تحديث مراقبة المشاهدة','Active VIEWERS':'المشاهدون النشطون',
      'Viewer':'المشاهد','Joined':'انضم','Last Seen':'آخر ظهور','Last Activity':'آخر نشاط','Minutes':'الدقائق','Tier':'الفئة',
      'System OPERATIONS':'عمليات النظام','REFRESH OPERATIONS':'تحديث العمليات','Automation STATUS':'حالة الأتمتة',
      'Job':'المهمة','Schedule':'الجدول','Last Run':'آخر تشغيل','Message':'الرسالة','Security AUDIT':'تدقيق الأمان',
      'Read-only operational view of admin activity.':'عرض نشاط الإدارة للقراءة فقط.','REFRESH AUDIT':'تحديث التدقيق','Recent ACTIVITY':'النشاط الأخير','Date':'التاريخ',
      'Use code AdhemSwag':'استخدم الرمز AdhemSwag','Get NoPing':'احصل على NoPing','Join ESEA':'انضم إلى ESEA',
      'CS2 Config':'إعدادات CS2','Support AdhemSwag':'ادعم AdhemSwag','// choose your region or send skins directly':'// اختر منطقتك أو أرسل المظاهر مباشرة',
      'Donate — EU via Streamlabs':'تبرع — أوروبا عبر Streamlabs','Donate — DZ via Da3amni':'تبرع — الجزائر عبر Da3amni',
      'Send Skins — CS2 via Steam Trade Offer':'إرسال مظاهر — CS2 عبر عرض تبادل Steam',
      'Join my Faceit Club':'انضم إلى نادي FACEIT الخاص بي','// play CS2 with AdhemSwag and the community':'// العب CS2 مع AdhemSwag والمجتمع',
      'Join the Club ElNahs CLUB (N7s) on Faceit':'انضم إلى نادي ElNahs CLUB (N7s) على FACEIT',
      'AdhemSwag Organizer Page on Faceit':'صفحة منظم AdhemSwag على FACEIT','Join the Discord find teammates & matches':'انضم إلى Discord للعثور على زملاء فريق ومباريات',
      'GIVEAWAY COMING SOON':'المسابقة قريبًا','The official AdhemSwag Giveaway is coming soon.':'المسابقة الرسمية من AdhemSwag ستبدأ قريبًا.',
      'Back to Settings':'العودة إلى الإعدادات','Viewer ⌄':'مشاهد ⌄','PROFILE':'الملف الشخصي','SETTINGS':'الإعدادات','DISCONNECT':'قطع الاتصال',
      'SHOW OWNER DETAILS':'إظهار تفاصيل المالك','SIGN IN WITH TWITCH':'تسجيل الدخول عبر Twitch'
,
      'Config':'الإعدادات','Menu':'القائمة','MY PROFILE':'ملفي الشخصي','MISSIONS':'المهام','STORE':'المتجر','FACEIT':'FACEIT',
      'Leader board':'لوحة المتصدرين','FNC STORE':'متجر FNC','FNC POINTS · CURRENT BALANCE':'نقاط FNC · الرصيد الحالي',
      'FNC available to spend in the store right now. Spending FNC lowers this balance.':'نقاط FNC المتاحة للإنفاق في المتجر. استخدام النقاط يقلل هذا الرصيد.',
      'Top watchers':'أفضل المشاهدين','TODAY':'اليوم','WEEK':'الأسبوع','MONTH':'الشهر','ALL TIME':'كل الوقت',
      'Turn watch time into real rewards':'حوّل وقت المشاهدة إلى مكافآت حقيقية','▶ Watch Live':'▶ شاهد البث المباشر',
      '? VIEW FULL FAQ':'? عرض الأسئلة الشائعة','JOIN MISSIONS ↗':'انضم إلى المهام ↗','OFFLINE':'غير متصل',
      'Follow Twitch':'تابع على Twitch','Subscribe Twitch':'اشترك في Twitch','Follow Kick':'تابع على Kick','Subscribe Kick':'اشترك في Kick',
      'LIVE CODES':'رموز البث','REDEEM CODE':'استبدال الرمز','CODE DROP':'رمز جديد','Choose your dream skin':'اختر المظهر الذي تحلم به',
      'CHANGE SKIN / CODE':'تغيير المظهر / الرمز','CONNECT WITH TWITCH TO SAVE YOUR GOAL':'اربط Twitch لحفظ هدفك',
      'Choose a Store reward':'اختر مكافأة من المتجر','CLOSE ✕':'إغلاق ✕','Partner Bonuses':'مكافآت الشركاء',
      'Join us on Discord':'انضم إلينا على Discord','Go to page':'الانتقال إلى الصفحة','SHOW OWNER DETAILS':'إظهار تفاصيل المالك',
      'Your Twitch identity, progression and reward status — all in one place.':'هوية Twitch والتقدم وحالة المكافآت في مكان واحد.',
      'CHECKING':'جارٍ التحقق','PROFILE STATUS':'حالة الملف الشخصي','EDIT PROFILE':'تعديل الملف الشخصي','Your profile status updates automatically.':'يتم تحديث حالة ملفك الشخصي تلقائيًا.',
      'COMPLETE PROFILE':'إكمال الملف الشخصي','FNC REWARDS':'مكافآت FNC','FNC POINTS 0':'نقاط FNC 0','PROFILE REQUIREMENTS':'متطلبات الملف الشخصي',
      'Connected / Optional':'متصل / اختياري','OWNER VERIFICATION — PRIVATE DETAILS':'تحقق المالك — تفاصيل خاصة',
      'Loading…':'جارٍ التحميل…','Redeem a private winner code to receive FNC Points. Each winner code can be used once.':'استبدل رمز فائز خاص للحصول على نقاط FNC. يمكن استخدام كل رمز مرة واحدة.',
      'MY ACCESS CODES':'رموز الوصول الخاصة بي','Codes from your Store purchases appear here automatically. No email is required.':'ستظهر رموز مشتريات المتجر هنا تلقائيًا. لا حاجة إلى البريد الإلكتروني.',
      'MY MISSIONS':'مهامي','CHECKING MISSION STATUS…':'جارٍ التحقق من حالة المهام…','OPEN MISSIONS →':'فتح المهام →',
      'The viewer’s chosen Store reward.':'مكافأة المتجر التي اختارها المشاهد.','HISTORY':'السجل','BADGE COLLECTION':'مجموعة الشارات',
      'SUBSCRIBE ON TWITCH':'اشترك على TWITCH','COPY':'نسخ','ACCOUNT SETTINGS':'إعدادات الحساب','ACCOUNT STATUS':'حالة الحساب',
      'Account':'الحساب','Email REQUIRED':'البريد الإلكتروني مطلوب','Steam Profile URL REQUIRED':'رابط ملف Steam مطلوب',
      'Steam Trade URL REQUIRED Where to get Trade URL?':'رابط تبادل Steam مطلوب. أين تجد رابط التبادل؟','Discord ID REQUIRED':'معرّف Discord مطلوب',
      'SAVE CHANGES':'حفظ التغييرات','Before you redeem':'قبل الاستبدال','Check My Settings':'تحقق من إعداداتي',
      'Steam Trade Link':'رابط تبادل Steam','CANCEL':'إلغاء','REDEEM REWARD':'استبدال المكافأة','REDEEM':'استبدال',
      'EXITLAG CODE — 7 DAYS':'رمز EXITLAG — 7 أيام','Get your 7-day access code with automatic delivery after a successful redemption.':'احصل على رمز وصول لمدة 7 أيام مع تسليم تلقائي بعد نجاح الاستبدال.',
      'CLAIM PROMOTION ↗':'استفد من العرض ↗','REWARDS SYSTEM: STOPPED':'نظام المكافآت: متوقف',
      'TYPE ALL PRODUCTS SKINS / ITEMS DIGITAL CODES TWITCH SUB ONLY':'النوع: جميع المنتجات، المظاهر / العناصر، الرموز الرقمية، اشتراكات Twitch فقط',
      'SORT BY FEATURED NEWEST PRICE: LOW TO HIGH PRICE: HIGH TO LOW':'الترتيب: مميز، الأحدث، السعر من الأقل إلى الأعلى، السعر من الأعلى إلى الأقل',
      'How do viewers earn points? +':'كيف يحصل المشاهدون على النقاط؟ +','Do subscribers earn more? +':'هل يحصل المشتركون على المزيد؟ +',
      'How much do Bits and Subs give me? +':'كم تمنحني Bits والاشتراكات؟ +','Do tips and raids give points too? +':'هل تمنح التبرعات والغارات نقاطًا أيضًا؟ +',
      'Do I earn points if the stream is offline? +':'هل أحصل على نقاط إذا كان البث غير متصل؟ +','How do viewers earn XP? +':'كيف يحصل المشاهدون على XP؟ +',
      'What are Daily and Weekly Missions? +':'ما المهام اليومية والأسبوعية؟ +','How do I start a mission? +':'كيف أبدأ مهمة؟ +',
      'Where can I check my FNC balance and rewards? +':'أين أتحقق من رصيد FNC والمكافآت؟ +','Where do I redeem my points? +':'أين أستبدل نقاطي؟ +',
      'PLAY YOUR PART. CLAIM YOUR PROGRESS.':'شارك وحقق تقدمك.','YOUR ACTIVE MISSIONS':'مهامك النشطة',
      'Daily: join every day • Weekly: join once each week':'يوميًا: انضم كل يوم • أسبوعيًا: انضم مرة كل أسبوع',
      '01 / DAILY JOIN':'01 / انضمام يومي','02 / WEEKLY JOIN':'02 / انضمام أسبوعي','03 / TWITCH ONLY':'03 / Twitch فقط',
      'CONNECT WITH TWITCH':'ربط Twitch','JOIN DAILY MISSIONS':'انضم إلى المهام اليومية','JOIN WEEKLY MISSIONS':'انضم إلى المهام الأسبوعية',
      'JOINED FOR TODAY':'تم الانضمام اليوم','JOIN REQUIRED TODAY':'يلزم الانضمام اليوم','JOINED THIS WEEK':'تم الانضمام هذا الأسبوع',
      'JOIN REQUIRED THIS WEEK':'يلزم الانضمام هذا الأسبوع',

      "// KNOWLEDGE BASE": "// قاعدة المعرفة",
      "FNC POINTS, XP & MISSIONS": "نقاط FNC وXP والمهام",
      "FNC Points are": "نقاط FNC هي",
      "Twitch only": "على Twitch فقط",
      "Eligible watch rewards count only while watching": "تُحتسب مكافآت المشاهدة فقط أثناء مشاهدة",
      "AdhemSwag’s live Twitch stream": "بث AdhemSwag المباشر على Twitch",
      "1 FNC per eligible minute": "نقطة FNC واحدة لكل دقيقة مؤهلة",
      "for a non-subscriber. Kick and other Twitch channels do not generate watch FNC.": "لغير المشتركين. لا يمنح Kick أو بثوث Twitch الأخرى نقاط FNC للمشاهدة.",
      "Yes. Twitch subscribers earn a multiplier based on their subscription tier while watching live:": "نعم. يحصل مشتركو Twitch على مضاعف حسب فئة الاشتراك أثناء مشاهدة البث:",
      "SUB": "مشترك",
      "FNC / MIN": "FNC / دقيقة",
      "Non-sub": "غير مشترك",
      "1 FNC": "1 FNC",
      "Tier 1": "الفئة 1",
      "Tier 2": "الفئة 2",
      "Tier 3": "الفئة 3",
      "Cheering:": "التشجيع:",
      "Subscribing:": "الاشتراك:",
      "Tipping:": "الإكراميات:",
      "Raiding:": "الغارات:",
      "No. FNC Points only accumulate while you're actively watching a": "لا. تتراكم نقاط FNC فقط عند مشاهدة",
      "live Twitch": "بث Twitch مباشر",
      "stream.": "بنشاط.",
      "XP System": "نظام XP",
      "XP is earned from eligible watch activity on": "يتم كسب XP من نشاط المشاهدة المؤهل على",
      ". A normal viewer receives the base": ". يحصل المشاهد العادي على المعدل الأساسي",
      "1× XP": "1× XP",
      "rate, and subscriber multipliers match the FNC tiers. Kick and other Twitch channels do not generate watch XP.": "وتتطابق مضاعفات المشتركين مع فئات FNC. لا يمنح Kick أو بثوث Twitch الأخرى XP للمشاهدة.",
      "XP RATE": "معدل XP",
      "2× XP": "2× XP",
      "3× XP": "3× XP",
      "4× XP": "4× XP",
      "Does Kick give XP?": "هل يمنح Kick نقاط XP؟",
      "No.": "لا.",
      "XP watch progression is Twitch-based. Watching on Kick does not generate XP.": "يعتمد تقدم XP للمشاهدة على Twitch. المشاهدة على Kick لا تمنح XP.",
      "How does the XP system work?": "كيف يعمل نظام XP؟",
      "Your XP is calculated from eligible Twitch watch activity and your verified Twitch subscription tier. The system applies the correct multiplier automatically:": "يتم حساب XP وفق نشاط المشاهدة المؤهل على Twitch وفئة اشتراكك المؤكدة. يطبق النظام المضاعف الصحيح تلقائيًا:",
      "1× normal, 2× Tier 1, 3× Tier 2, 4× Tier 3": "1× عادي، 2× الفئة 1، 3× الفئة 2، 4× الفئة 3",
      ". XP is used for progression and is separate from your FNC balance.": ". تُستخدم XP للتقدم وهي منفصلة عن رصيد FNC.",
      "Daily & Weekly Missions": "المهام اليومية والأسبوعية",
      "What are Daily and Weekly Missions?": "ما المهام اليومية والأسبوعية؟",
      "// ADHEMSWAG REWARDS": "// مكافآت ADHEMSWAG",
      "ADHEMSWAG PROMOTIONS": "عروض ADHEMSWAG",
      "LIMITED DEAL • GAMING PERFORMANCE": "عرض محدود • أداء الألعاب",
      "FNC Points & XP are not being awarded or spent yet.": "لم يبدأ منح أو إنفاق نقاط FNC وXP بعد.",
      "YOUR BALANCE:": "رصيدك:",
      "VIEWER STATUS:": "حالة المشاهد:",
      "TYPE": "النوع",
      "ALL PRODUCTS": "كل المنتجات",
      "SKINS / ITEMS": "مظاهر / عناصر",
      "DIGITAL CODES": "رموز رقمية",
      "TWITCH SUB ONLY": "اشتراك Twitch فقط",
      "SORT BY": "ترتيب حسب",
      "FEATURED": "مميز",
      "NEWEST": "الأحدث",
      "PRICE: LOW TO HIGH": "السعر: من الأقل إلى الأعلى",
      "PRICE: HIGH TO LOW": "السعر: من الأعلى إلى الأقل",
      "LOADING REWARDS…": "جارٍ تحميل المكافآت…",
      "Support": "الدعم",
      "via Streamlabs": "عبر Streamlabs",
      "via Da3amni": "عبر Da3amni",
      "via Steam Trade Offer": "عبر عرض تبادل Steam",
      "Join my": "انضم إلى",
      "Faceit Club": "نادي FACEIT",
      "How to join": "كيفية الانضمام",
      "Log in (or create your free account) on Faceit.": "سجّل الدخول (أو أنشئ حسابًا مجانيًا) على FACEIT.",
      "Click": "اضغط",
      "above to open ElNahs CLUB (N7s).": "أعلاه لفتح نادي ElNahs CLUB (N7s).",
      "Hit the join button on the club page, then hop in our Discord to queue up together.": "اضغط زر الانضمام في صفحة النادي، ثم انضم إلى Discord للعب معًا.",
      "Updated Today": "تم التحديث اليوم",
      "Current settings used on stream": "الإعدادات المستخدمة حاليًا في البث",
      "Mouse": "الماوس",
      "Zoom Sens Multiplier": "مضاعف حساسية التكبير",
      "Polling Rate": "معدل الاستجابة",
      "Aspect Ratio": "نسبة العرض إلى الارتفاع",
      "Scaling Mode": "وضع التحجيم",
      "Display Mode": "وضع العرض",
      "Fullscreen Windowed": "نافذة بملء الشاشة",
      "Advanced Video": "إعدادات الفيديو المتقدمة",
      "V-Sync": "المزامنة الرأسية",
      "Global Shadow Quality": "جودة الظلال العامة",
      "Model/Texture Detail": "تفاصيل النماذج/الخامات",
      "Shader Detail": "تفاصيل التظليل",
      "Particle Detail": "تفاصيل الجسيمات",
      "Anti-Aliasing": "مكافحة التعرج",
      "NVIDIA Reflex": "NVIDIA Reflex",
      "Enabled": "مفعّل",
      "Disabled": "معطّل",
      "Low": "منخفض",
      "Quality": "الجودة",
      "HUD / Radar": "واجهة العرض / الرادار",
      "Key Binds": "تعيين المفاتيح",
      "Forward / Back": "تقدم / تراجع",
      "Left / Right": "يسار / يمين",
      "Walk": "المشي",
      "Duck": "انحناء",
      "Jump": "القفز",
      "Use": "استخدام",
      "Reload": "إعادة التلقيم",
      "Drop Weapon": "إسقاط السلاح",
      "ADMIN PREVIEW • PUBLIC VIEW • VIEWER PROFILE": "معاينة الإدارة • العرض العام • ملف المشاهد",
      "OWNER MODE": "وضع المالك",
      "// Viewer Account": "// حساب المشاهد",
      "STATUS": "الحالة",
      "PROGRESSION": "التقدم",
      "ROOKIE": "مبتدئ",
      "LEVEL": "المستوى",
      "WATCH TIME": "وقت المشاهدة",
      "STREAK": "السلسلة",
      "DAYS": "أيام",
      "Email verified": "تم التحقق من البريد الإلكتروني",
      "Steam ID": "معرّف Steam",
      "Verifying admin access…": "جارٍ التحقق من صلاحية الإدارة…",
      "FNC Rewards are active for eligible viewers.": "مكافآت FNC متاحة للمشاهدين المؤهلين.",
      "No access codes yet.": "لا توجد رموز وصول حتى الآن.",
      "No activity yet. Your FNC earnings, XP activity, redemptions and refunds will appear here.": "لا يوجد نشاط حتى الآن. ستظهر هنا نقاط FNC المكتسبة ونشاط XP وعمليات الاستبدال والاسترداد.",
      "PROFILE BADGES": "شارات الملف الشخصي",
      "UNLOCKED": "تم الفتح",
      "MY REWARDS": "مكافآتي",
      "ACCOUNT": "الحساب",
      "Secure profile": "ملف آمن",
      "Live": "مباشر",
      "POINTS ACTIVE / STORE OFF": "النقاط مفعلة / المتجر متوقف",
      "Profile completion": "اكتمال الملف الشخصي",
      "Editable fields": "الحقول القابلة للتعديل",
      "Connect Twitch first.": "اربط Twitch أولًا.",
      "ADHEMSWAG GIVEAWAY": "مسابقة ADHEMSWAG",
      "GIVEAWAY": "مسابقة",
      "COMING SOON": "قريبًا",
      "Twitch Only": "Twitch فقط",
      "Verified Winner": "فائز مؤكد",
      "// tracking watch time": "// تتبع وقت المشاهدة",
      "· earning rewards": "· كسب المكافآت",
      "Turn watch time": "حوّل وقت المشاهدة",
      "into": "إلى",
      "// TWITCH MISSIONS": "// مهام Twitch",
      "Join missions. Earn XP + FNC.": "انضم إلى المهام واكسب XP وFNC.",
      "Complete daily and weekly Twitch watch goals. Click to join before you start watching.": "أكمل أهداف مشاهدة Twitch اليومية والأسبوعية. اضغط للانضمام قبل بدء المشاهدة.",
      "FNC / 1 min — viewers": "FNC / دقيقة — المشاهدون",
      "Twitch Sub — T1 · T2 · T3": "مشتركو Twitch — الفئة 1 · 2 · 3",
      "// LIVE CODES": "// رموز البث المباشر",
      "LIVE": "مباشر",
      "CODES": "الرموز",
      "// SKIN GOAL": "// هدف المظهر",
      "YOUR CURRENT GOAL": "هدفك الحالي",
      "CHOOSE A SKIN OR CODE": "اختر مظهرًا أو رمزًا",
      "Click to browse Store rewards": "اضغط لتصفح مكافآت المتجر",
      "Skins Delivered": "مظاهر تم تسليمها",
      "The competition continues!": "المنافسة مستمرة!",
      "For more information, join our Discord": "لمزيد من المعلومات، انضم إلى Discord",
      "// FNC • XP • WATCH": "// FNC • XP • المشاهدة",
      "Leader": "المتصدرون",
      "board": "لوحة",
      "The competitive ranking for AdhemSwag viewers. Compare XP, available FNC and total FNC earned over time.": "تصنيف تنافسي لمشاهدي AdhemSwag. قارن XP ونقاط FNC المتاحة وإجمالي النقاط المكتسبة.",
      "Loading top players…": "جارٍ تحميل أفضل اللاعبين…",
      "Loading leaderboard…": "جارٍ تحميل لوحة المتصدرين…",
      "// WATCHERS": "// المشاهدون",
      "Top": "أفضل",
      "watchers": "المشاهدين",
      "Only completed, non-blocked viewer profiles are shown. XP and FNC balances are server-protected.": "تظهر فقط ملفات المشاهدين المكتملة وغير المحظورة. أرصدة XP وFNC محمية على الخادم.",
      "TWITCH ACCOUNT ACCESS": "الوصول إلى حساب TWITCH",
      "Connect your Twitch account to access your AdhemSwag profile, watch rewards, XP and community features.": "اربط حساب Twitch للوصول إلى ملف AdhemSwag ومكافآت المشاهدة وXP وميزات المجتمع.",
      "← Back to AdhemSwag": "← العودة إلى AdhemSwag",
      "INITIALIZING ADMIN PANEL…": "جارٍ تهيئة لوحة الإدارة…",
      "SECURE • TWITCH ADMIN • SUPABASE": "آمن • إدارة Twitch • Supabase",
      "// PRIVATE ADMIN AREA": "// منطقة الإدارة الخاصة",
      "checking Twitch admin access…": "جارٍ التحقق من صلاحية إدارة Twitch…",
      "Total Users": "إجمالي المستخدمين",
      "Active Rewards": "المكافآت النشطة",
      "Pending Redemptions": "عمليات الاستبدال المعلقة",
      "Stats load after secure Admin access is verified.": "تُحمّل الإحصاءات بعد التحقق الآمن من صلاحية الإدارة.",
      "Current database structure already contains rewards, redemptions, users and transactions. FNC/XP remain disabled until the complete system is tested.": "تحتوي قاعدة البيانات الحالية على المكافآت وعمليات الاستبدال والمستخدمين والمعاملات. تظل FNC/XP معطلة حتى اختبار النظام بالكامل.",
      "AdhemSwag - The Home of your favorite streamer": "AdhemSwag - موطن صانع البث المفضل لديك",
      "AdhemSwag — Sign in with Twitch": "AdhemSwag — تسجيل الدخول عبر Twitch",
      "AdhemSwag — Missions": "AdhemSwag — المهام",
    }
  };
  const labels = { en: 'EN', fr: 'FR', ar: 'AR' };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function getLang() {
    try { const v = localStorage.getItem(KEY); return ['en','fr','ar'].includes(v) ? v : 'en'; }
    catch (_) { return 'en'; }
  }
  function translateTextNode(node, lang) {
    if (!node || !node.parentElement || node.parentElement.closest('script,style,textarea,select,option,[data-no-translate],#adhemswag-language-switcher')) return;
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed) return;
    node.__adhemOriginal = node.__adhemOriginal || raw;
    const original = node.__adhemOriginal.trim();
    const translated = lang === 'en' ? original : ((translations[lang] || {})[original] || original);
    if (translated !== trimmed) {
      const lead = raw.match(/^\s*/)?.[0] || '';
      const tail = raw.match(/\s*$/)?.[0] || '';
      node.nodeValue = lead + translated + tail;
    } else if (lang === 'en' && node.nodeValue !== node.__adhemOriginal) node.nodeValue = node.__adhemOriginal;
  }
  function translateAttributes(root, lang) {
    const attrs = ['placeholder','title','aria-label','value'];
    const els = [root, ...(root.querySelectorAll ? root.querySelectorAll('*') : [])].filter(Boolean);
    for (const el of els) {
      if (el.id === 'adhemswag-language-switcher' || el.closest?.('#adhemswag-language-switcher')) continue;
      for (const attr of attrs) {
        if (!el.hasAttribute?.(attr)) continue;
        const key = 'adhemOrig' + attr.replace(/[^a-z0-9]/gi, '');
        if (!el.dataset[key]) el.dataset[key] = el.getAttribute(attr);
        const orig = el.dataset[key];
        const translated = lang === 'en' ? orig : ((translations[lang] || {})[orig] || orig);
        if (el.getAttribute(attr) !== translated) el.setAttribute(attr, translated);
      }
    }
  }
  function apply(lang) {
    if (!['en','fr','ar'].includes(lang)) lang = 'en';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('adhem-lang-ar', lang === 'ar');
    document.body?.classList.toggle('adhem-lang-ar', lang === 'ar');
    const titleEl = document.querySelector('title');
    if (titleEl) {
      if (!titleEl.dataset.adhemOrigTitle) titleEl.dataset.adhemOrigTitle = titleEl.textContent;
      const originalTitle = titleEl.dataset.adhemOrigTitle;
      titleEl.textContent = lang === 'en' ? originalTitle : ((translations[lang] || {})[originalTitle] || originalTitle);
    }
    applySidebarDirection(lang);
    applyAdDirection(lang);
    const walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node, lang);
    translateAttributes(document.body || document.documentElement, lang);
    const select = document.querySelector('#adhemswag-language-switcher select');
    if (select) select.value = lang;
    try { localStorage.setItem(KEY, lang); } catch (_) {}
  }
  function applySidebarDirection(lang) {
    const rtl = lang === 'ar';
    const mobile = window.matchMedia && window.matchMedia('(max-width:700px)').matches;
    document.querySelectorAll('.sidebar, .admin-nav, .mobile-fallback-drawer').forEach(el => {
      el.style.setProperty('left', rtl ? 'auto' : '0', 'important');
      el.style.setProperty('right', rtl ? '0' : 'auto', 'important');
      el.style.setProperty('border-right', rtl ? '0' : '1px solid rgba(17,217,247,.32)', 'important');
      el.style.setProperty('border-left', rtl ? '1px solid rgba(17,217,247,.32)' : '0', 'important');
      if (mobile) {
        const open = el.classList.contains('mobile-open');
        el.style.setProperty('transform', open ? 'translate3d(0,0,0)' : (rtl ? 'translate3d(110%,0,0)' : 'translate3d(-110%,0,0)'), 'important');
      } else {
        el.style.removeProperty('transform');
      }
    });
    document.querySelectorAll('.mobile-drawer-close').forEach(el => {
      if (rtl) { el.style.setProperty('right', 'auto', 'important'); el.style.setProperty('left', '13px', 'important'); }
      else { el.style.removeProperty('left'); el.style.removeProperty('right'); }
    });

    // Arabic layout: keep the fixed sidebar on the right without covering the page.
    const pageSelectors = 'body > main, body > .main, body > .page-content, body > .content, body > .dashboard-content, body > .settings-main, body > .faq-page, body > .store-page, body > .admin-main';
    document.querySelectorAll(pageSelectors).forEach(el => {
      if (rtl && !mobile) {
        el.style.setProperty('margin-left', '0', 'important');
        el.style.setProperty('margin-right', '285px', 'important');
        el.style.setProperty('width', 'calc(100% - 285px)', 'important');
        el.style.setProperty('max-width', 'calc(100% - 285px)', 'important');
        el.style.setProperty('box-sizing', 'border-box', 'important');
      } else {
        ['margin-left', 'margin-right', 'width', 'max-width', 'box-sizing'].forEach(p => el.style.removeProperty(p));
      }
    });
  }
  function applyAdDirection(lang) {
    const rtl = lang === 'ar';
    const selectors = '.ad-container, .ad-slot, .advertisement, .advertisement-container, .adsbygoogle, [data-ad-slot], [data-ad-client], [id^="google_ads"], [id*="ad-container"], [class*="ad-container"], [id*="advertisement"], [class*="advertisement"], iframe[id*="google_ads"], iframe[src*="doubleclick"], iframe[src*="googlesyndication"]';
    document.querySelectorAll(selectors).forEach(el => {
      const targets = [el, el.parentElement, el.parentElement?.parentElement].filter(Boolean);
      targets.forEach((target, index) => {
        if (rtl) {
          target.style.setProperty('direction', 'ltr', 'important');
          target.style.setProperty('margin-left', '0', 'important');
          target.style.setProperty('margin-right', 'auto', 'important');
          target.style.setProperty('justify-self', 'start', 'important');
          target.style.setProperty('align-self', 'flex-start', 'important');
          target.style.setProperty('float', 'left', 'important');
          target.style.setProperty('box-sizing', 'border-box', 'important');
          if (index > 0) {
            target.style.setProperty('text-align', 'left', 'important');
            target.style.setProperty('place-self', 'start', 'important');
            target.style.setProperty('inset-inline-start', '0', 'important');
            target.style.setProperty('inset-inline-end', 'auto', 'important');
            if (getComputedStyle(target).display.includes('flex')) target.style.setProperty('align-items', 'flex-start', 'important');
          } else {
            target.style.setProperty('max-width', '100%', 'important');
          }
        } else {
          ['direction', 'margin-left', 'margin-right', 'justify-self', 'align-self', 'float', 'max-width', 'box-sizing', 'text-align', 'place-self', 'inset-inline-start', 'inset-inline-end', 'align-items'].forEach(p => target.style.removeProperty(p));
        }
      });
    });
  }
  function addSelector() {
    if (document.getElementById('adhemswag-language-switcher')) return;
    const wrap = document.createElement('div');
    wrap.id = 'adhemswag-language-switcher';
    wrap.setAttribute('data-no-translate','');
    wrap.innerHTML = '<label for="adhem-language-select" class="adhem-language-label">LANG</label><select id="adhem-language-select" aria-label="Choose language"><option value="en">EN</option><option value="fr">FR</option><option value="ar">AR</option></select>';
    const style = document.createElement('style');
    style.textContent = '#adhemswag-language-switcher{position:fixed;top:12px;right:14px;z-index:2147483005;display:flex;align-items:center;gap:5px;padding:5px 7px;background:rgba(5,10,14,.94);border:1px solid rgba(17,217,247,.42);border-radius:9px;box-shadow:0 4px 18px rgba(0,0,0,.35);font:700 10px/1.2 Inter,Arial,sans-serif;color:#11d9f7;backdrop-filter:blur(12px)}#adhemswag-language-switcher .adhem-language-label{font:700 9px/1 JetBrains Mono,monospace;letter-spacing:.08em;color:#8ca4ac}#adhemswag-language-switcher select{appearance:auto;min-width:47px;padding:5px 4px;background:#0b151b;color:#e9fbff;border:1px solid rgba(17,217,247,.25);border-radius:5px;font:700 11px Inter,Arial,sans-serif;cursor:pointer;outline:none}#adhemswag-language-switcher select:focus{border-color:#11d9f7;box-shadow:0 0 0 2px rgba(17,217,247,.15)}html.adhem-lang-ar body{direction:rtl}html.adhem-lang-ar .ad-container,html.adhem-lang-ar .ad-slot,html.adhem-lang-ar .advertisement,html.adhem-lang-ar .advertisement-container,html.adhem-lang-ar .adsbygoogle,html.adhem-lang-ar [data-ad-slot],html.adhem-lang-ar [data-ad-client],html.adhem-lang-ar [id^="google_ads"],html.adhem-lang-ar [id*="ad-container"],html.adhem-lang-ar [class*="ad-container"],html.adhem-lang-ar [id*="advertisement"],html.adhem-lang-ar [class*="advertisement"]{direction:ltr!important;margin-left:0!important;margin-right:auto!important;justify-self:start!important}html.adhem-lang-ar #adhemswag-language-switcher{right:auto;left:14px;direction:ltr}html.adhem-lang-ar #adhemswag-language-switcher .adhem-language-label{direction:ltr}#adhemswag-language-switcher.adhem-language-in-topbar{position:relative!important;top:auto!important;right:auto!important;left:auto!important;margin-left:auto!important;margin-right:8px!important;flex:none!important;box-shadow:none!important;backdrop-filter:none!important}#adhemswag-language-switcher.adhem-language-in-topbar .adhem-language-label{display:inline!important}#adhemswag-language-switcher.adhem-language-in-topbar + .adhem-account{margin-left:8px!important}@media(max-width:700px){#adhemswag-language-switcher{top:10px;right:10px;padding:4px 5px;gap:3px}#adhemswag-language-switcher select{min-width:42px;padding:4px 3px}#adhemswag-language-switcher.adhem-language-in-topbar{margin-right:6px!important;padding:4px!important}#adhemswag-language-switcher.adhem-language-in-topbar .adhem-language-label{display:none!important}html.adhem-lang-ar #adhemswag-language-switcher{left:10px;right:auto}}';
    document.head.appendChild(style);
    const rtlLayoutStyle = document.createElement('style');
    rtlLayoutStyle.id = 'adhemswag-arabic-layout-fixes';
    rtlLayoutStyle.textContent = `
      html.adhem-lang-ar body { direction: rtl; }
      html.adhem-lang-ar .adhem-topbar { direction: rtl !important; flex-direction: row-reverse !important; text-align: right !important; }
      html.adhem-lang-ar .adhem-topbar-left { direction: rtl !important; text-align: right !important; }
      html.adhem-lang-ar .adhem-topbar .adhem-account { margin-left: 0 !important; margin-right: 8px !important; }
      html.adhem-lang-ar header:not(.adhem-topbar), html.adhem-lang-ar .site-header, html.adhem-lang-ar .main-header, html.adhem-lang-ar .missions-site-header { direction: rtl !important; text-align: right !important; }
      html.adhem-lang-ar footer { direction: rtl !important; text-align: right !important; }
      html.adhem-lang-ar footer .footer-inner { direction: rtl !important; flex-direction: row-reverse !important; text-align: right !important; }
      html.adhem-lang-ar footer .footer-socials { direction: ltr !important; }
      html.adhem-lang-ar footer .footer-inner > * { min-width: 0; }
      @media (max-width:700px) {
        html.adhem-lang-ar footer .footer-inner { flex-direction: column !important; align-items: flex-start !important; text-align: right !important; }
        html.adhem-lang-ar .adhem-topbar { flex-wrap: wrap !important; gap: 8px !important; }
      }
    `;
    document.head.appendChild(rtlLayoutStyle);
    document.body.appendChild(wrap);
    const topbar = document.querySelector('.adhem-topbar');
    const account = topbar?.querySelector('.adhem-account');
    if (topbar && account) {
      topbar.insertBefore(wrap, account);
      wrap.classList.add('adhem-language-in-topbar');
    }
    const select = wrap.querySelector('select');
    select.addEventListener('change', () => apply(select.value));
    select.value = getLang();
  }
  function init() {
    addSelector();
    apply(getLang());
    let queued = false;
    const observer = new MutationObserver(records => {
      if (queued) return;
      queued = true;
      queueMicrotask(() => {
        queued = false;
        const lang = getLang();
        for (const rec of records) {
          if (rec.type === 'characterData') translateTextNode(rec.target, lang);
          for (const n of rec.addedNodes || []) {
            if (n.nodeType === Node.TEXT_NODE) translateTextNode(n, lang);
            else if (n.nodeType === Node.ELEMENT_NODE && !n.closest?.('#adhemswag-language-switcher')) {
              const w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT);
              let t; while ((t = w.nextNode())) translateTextNode(t, lang);
              translateAttributes(n, lang);
            }
          }
        }
      });
    });
    observer.observe(document.body, {subtree:true, childList:true, characterData:true});
    const sidebarObserver = new MutationObserver(records => {
      if (records.some(r => r.attributeName === 'class')) applySidebarDirection(getLang());
    });
    document.querySelectorAll('.sidebar, .admin-nav, .mobile-fallback-drawer').forEach(el => sidebarObserver.observe(el, {attributes:true, attributeFilter:['class']}));
    window.addEventListener('resize', () => applySidebarDirection(getLang()));
    document.addEventListener('change', e => {
      if (e.target?.id === 'adhem-language-select') return;
      if (getLang() !== 'en') translateAttributes(e.target, getLang());
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();

/* Shared CS2 Skins navigation entry — intentionally isolated from language logic. */
(function(){
  function loadAdhemSkinsNav(){
    if(document.querySelector('script[data-adhem-skins-nav-loader]')) return;
    var script=document.createElement('script');
    script.src='/assets/skins-nav.js?v=1';
    script.defer=true;
    script.setAttribute('data-adhem-skins-nav-loader','1');
    document.head.appendChild(script);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadAdhemSkinsNav,{once:true});
  else loadAdhemSkinsNav();
})();
