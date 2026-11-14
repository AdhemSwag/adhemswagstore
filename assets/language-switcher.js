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
      'Watch at least 10 verified active minutes during each consecutive AdhemSwag Twitch broadcast. Earn +25 XP at 3 lives, +50 XP at 5, +100 XP at 10, +250 XP at 20 and +500 XP at 30. Each milestone pays once; badges remain unlocked permanently if your streak resets. Missing a broadcast resets your current streak.':'Regardez au moins 10 minutes actives vérifiées pendant chaque live Twitch consécutif d’AdhemSwag. Gagnez +25 XP après 3 lives, +50 XP après 5, +100 XP après 10, +250 XP après 20 et +500 XP après 30. Chaque palier est récompensé une seule fois ; les badges gagnés restent acquis même si votre série est réinitialisée. Manquer un live réinitialise votre série actuelle.',
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
      'Daily Watch Check-in — 30 verified minutes: 50 XP + 50 FNC':'Visionnage quotidien — 30 minutes vérifiées : 50 XP + 50 FNC',
      'Daily Watch Streak — 60 verified minutes: 75 XP + 75 FNC':'Série de visionnage quotidienne — 60 minutes vérifiées : 75 XP + 75 FNC',
      'Chat Regular — 5 qualifying chat messages: 50 XP + 50 FNC':'Habitué du chat — 5 messages valides : 50 XP + 50 FNC',
      'Weekly Regular — watch on 3 different days: 150 XP + 150 FNC':'Habitué hebdomadaire — regarder 3 jours différents : 150 XP + 150 FNC',
      'Weekly Watch Goal — 300 verified minutes (5 hours): 200 XP + 200 FNC':'Objectif hebdomadaire — 300 minutes vérifiées (5 heures) : 200 XP + 200 FNC',
      'Community Voice — 30 qualifying chat messages: 150 XP + 150 FNC':'Voix de la communauté — 30 messages valides : 150 XP + 150 FNC',
      'Daily Watch Check-in':'Visionnage quotidien',
      'Daily Watch Streak':'Série de visionnage quotidienne',
      'Chat Regular':'Habitué du chat',
      'Weekly Regular':'Habitué hebdomadaire',
      'Weekly Watch Goal':'Objectif de visionnage hebdomadaire',
      'Community Voice':'Voix de la communauté',
      'WATCH + CHAT':'VISIONNAGE + CHAT',
      'Complete daily and weekly Twitch watch goals. Click to join before you start watching.':'Accomplissez les objectifs quotidiens et hebdomadaires de visionnage et de chat sur Twitch. Rejoignez les missions avant de commencer.',
      'What counts as a valid chat message?':'Qu’est-ce qu’un message valide dans le chat ?',
      'Does watching or chatting on Kick count?':'Le visionnage ou le chat sur Kick comptent-ils ?',
      'Where can I check my mission progress?':'Où puis-je consulter ma progression dans les missions ?'
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
      'Partner Bonuses':'Bonus partenaires','ADHEMSWAG EXCLUSIVE':'EXCLUSIVITÉ ADHEMSWAG',
      '50% OFF':'50 % DE RÉDUCTION','+ 3 months free with code':' + 3 mois gratuits avec le code','Use code AdhemSwag':'Utilisez le code AdhemSwag',
      'Lower your':'Réduisez votre','and boost':'et augmentez vos','instantly':'instantanément',
      'Use promo code':'Utilisez le code promo','on Tradeit.gg.':'sur Tradeit.gg.','PROMO CODE:':'CODE PROMO :',
      'Visit Tradeit.gg':'Visiter Tradeit.gg','Capture and share your best':'Capturez et partagez vos meilleurs','with Allstar.':'avec Allstar.',
      'ADHEMSWAG AFFILIATE LINK':'LIEN D’AFFILIATION ADHEMSWAG','Join Allstar':'Rejoindre Allstar',
      'Save':'Économisez','instantly + up to':'immédiatement et jusqu’à','40% OFF':'40 % DE RÉDUCTION','for new subscribers':'pour les nouveaux abonnés',
      'Get NoPing':'Obtenir NoPing','Join ESEA':'Rejoindre ESEA'
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
      "TWITCH WATCH STREAK": "SÉRIE DE LIVES TWITCH",
      "STREAMS": "LIVES",
      "DAYS": "JOURS",
      "Email verified": "E-mail vérifié",
      "Steam ID": "ID Steam",
      "Verifying admin access…": "Vérification de l’accès admin…",
      "FNC Rewards are active for eligible viewers.": "Les récompenses FNC sont actives pour les spectateurs éligibles.",
      "No access codes yet.": "Aucun code d’accès pour le moment.",
      "No activity yet. Your FNC earnings, XP activity, redemptions and refunds will appear here.": "Aucune activité pour le moment. Vos gains FNC, votre activité XP, vos échanges et remboursements apparaîtront ici.",
      "PROFILE BADGES": "BADGES DU PROFIL",
      "Badges unlock from verified account events. Twitch Watch Streak badges are earned at 3, 5, 10, 20 and 30 consecutive AdhemSwag Twitch broadcasts with at least 10 active minutes watched per live. XP rewards are granted once per milestone, and earned badges stay unlocked permanently even if your streak resets. Twitch Subscriber, FNC Supporter and FNC VIP rules remain unchanged.":"Les badges se débloquent grâce à des événements de compte vérifiés. Les badges Twitch Watch Streak s’obtiennent après 3, 5, 10, 20 et 30 lives Twitch consécutifs d’AdhemSwag, avec au moins 10 minutes actives regardées par live. Les récompenses XP sont attribuées une seule fois par palier et les badges gagnés restent acquis même si la série est réinitialisée. Les règles Twitch Subscriber, FNC Supporter et FNC VIP restent inchangées.",
      "STREAK STARTER":"DÉBUTANT DE SÉRIE","STREAK BRONZE":"SÉRIE BRONZE","STREAK SILVER":"SÉRIE ARGENT","STREAK GOLD":"SÉRIE OR","STREAK LEGEND":"LÉGENDE DE SÉRIE",
      "EARNED · +25 XP":"OBTENU · +25 XP","EARNED · +50 XP":"OBTENU · +50 XP","EARNED · +100 XP":"OBTENU · +100 XP","EARNED · +250 XP":"OBTENU · +250 XP","EARNED · +500 XP":"OBTENU · +500 XP",
      "REACH 3 CONSECUTIVE LIVES":"ATTEINDRE 3 LIVES CONSÉCUTIFS","REACH 5 CONSECUTIVE LIVES":"ATTEINDRE 5 LIVES CONSÉCUTIFS","REACH 10 CONSECUTIVE LIVES":"ATTEINDRE 10 LIVES CONSÉCUTIFS","REACH 20 CONSECUTIVE LIVES":"ATTEINDRE 20 LIVES CONSÉCUTIFS","REACH 30 CONSECUTIVE LIVES":"ATTEINDRE 30 LIVES CONSÉCUTIFS",
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
      'Watch at least 10 verified active minutes during each consecutive AdhemSwag Twitch broadcast. Earn +25 XP at 3 lives, +50 XP at 5, +100 XP at 10, +250 XP at 20 and +500 XP at 30. Each milestone pays once; badges remain unlocked permanently if your streak resets. Missing a broadcast resets your current streak.':'شاهد 10 دقائق نشطة موثقة على الأقل خلال كل بث متتالٍ لـ AdhemSwag على Twitch. اكسب +25 XP بعد 3 بثوث، و+50 XP بعد 5، و+100 XP بعد 10، و+250 XP بعد 20، و+500 XP بعد 30. تُمنح مكافأة كل مرحلة مرة واحدة، وتبقى الشارات التي حصلت عليها مفتوحة دائمًا حتى إذا انقطعت سلسلتك. تفويت بث يعيد سلسلتك الحالية إلى الصفر.',
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
      'ADHEMSWAG EXCLUSIVE':'عروض حصرية من ADHEMSWAG',
      '50% OFF':'خصم 50%','+ 3 months free with code':' + 3 أشهر مجانًا باستخدام الرمز','Use code AdhemSwag':'استخدم الرمز AdhemSwag',
      'Lower your':'اخفض','and boost':'وعزّز','instantly':'فورًا',
      'Use promo code':'استخدم رمز العرض','on Tradeit.gg.':'على Tradeit.gg.','PROMO CODE:':'رمز العرض:',
      'Visit Tradeit.gg':'زيارة Tradeit.gg','Capture and share your best':'سجّل وشارك أفضل','with Allstar.':'مع Allstar.',
      'ADHEMSWAG AFFILIATE LINK':'رابط الإحالة ADHEMSWAG','Join Allstar':'انضم إلى Allstar',
      'Save':'وفّر','instantly + up to':'فورًا وحتى','40% OFF':'خصم 40%','for new subscribers':'للمشتركين الجدد',
      'Get NoPing':'احصل على NoPing','Join ESEA':'انضم إلى ESEA',
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
      "TWITCH WATCH STREAK": "سلسلة بثوث Twitch",
      "STREAMS": "بثوث",
      "DAYS": "أيام",
      "Email verified": "تم التحقق من البريد الإلكتروني",
      "Steam ID": "معرّف Steam",
      "Verifying admin access…": "جارٍ التحقق من صلاحية الإدارة…",
      "FNC Rewards are active for eligible viewers.": "مكافآت FNC متاحة للمشاهدين المؤهلين.",
      "No access codes yet.": "لا توجد رموز وصول حتى الآن.",
      "No activity yet. Your FNC earnings, XP activity, redemptions and refunds will appear here.": "لا يوجد نشاط حتى الآن. ستظهر هنا نقاط FNC المكتسبة ونشاط XP وعمليات الاستبدال والاسترداد.",
      "PROFILE BADGES": "شارات الملف الشخصي",
      "Badges unlock from verified account events. Twitch Watch Streak badges are earned at 3, 5, 10, 20 and 30 consecutive AdhemSwag Twitch broadcasts with at least 10 active minutes watched per live. XP rewards are granted once per milestone, and earned badges stay unlocked permanently even if your streak resets. Twitch Subscriber, FNC Supporter and FNC VIP rules remain unchanged.":"تُفتح الشارات من خلال أحداث حساب موثقة. تُكتسب شارات سلسلة Twitch Watch Streak بعد 3 و5 و10 و20 و30 بثًا متتاليًا لـ AdhemSwag، مع مشاهدة 10 دقائق نشطة على الأقل في كل بث. تُمنح مكافآت XP مرة واحدة لكل مرحلة، وتبقى الشارات المكتسبة مفتوحة دائمًا حتى إذا انقطعت السلسلة. تبقى قواعد Twitch Subscriber وFNC Supporter وFNC VIP دون تغيير.",
      "STREAK STARTER":"بداية السلسلة","STREAK BRONZE":"سلسلة برونزية","STREAK SILVER":"سلسلة فضية","STREAK GOLD":"سلسلة ذهبية","STREAK LEGEND":"أسطورة السلسلة",
      "EARNED · +25 XP":"تم الحصول عليها · +25 XP","EARNED · +50 XP":"تم الحصول عليها · +50 XP","EARNED · +100 XP":"تم الحصول عليها · +100 XP","EARNED · +250 XP":"تم الحصول عليها · +250 XP","EARNED · +500 XP":"تم الحصول عليها · +500 XP",
      "REACH 3 CONSECUTIVE LIVES":"الوصول إلى 3 بثوث متتالية","REACH 5 CONSECUTIVE LIVES":"الوصول إلى 5 بثوث متتالية","REACH 10 CONSECUTIVE LIVES":"الوصول إلى 10 بثوث متتالية","REACH 20 CONSECUTIVE LIVES":"الوصول إلى 20 بثًا متتاليًا","REACH 30 CONSECUTIVE LIVES":"الوصول إلى 30 بثًا متتاليًا",
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

  // FAQ page copy: exact text-node translations for French and Arabic.
  Object.assign(translations.fr, {
    "// KNOWLEDGE BASE":"// BASE DE CONNAISSANCES",
    "FNC POINTS, XP & MISSIONS":"POINTS FNC, XP ET MISSIONS",
    "Everything you need to know about FNC Points, XP, missions, earning and redeeming rewards.":"Tout ce qu’il faut savoir sur les points FNC, l’XP, les missions, les gains et l’échange de récompenses.",
    "⚠ TWITCH ONLY — FNC Points are earned from eligible activity on the live Twitch stream. Kick does not earn FNC Points.":"⚠ TWITCH UNIQUEMENT — Les points FNC sont gagnés grâce aux activités éligibles sur le live Twitch. Kick ne rapporte aucun point FNC.",
    "Earning FNC Points":"Gagner des points FNC",
    "How do viewers earn points?":"Comment les spectateurs gagnent-ils des points ?",
    "FNC Points are":"Les points FNC sont",
    "Twitch only":"Réservés à Twitch",
    ". Eligible watch rewards count only while watching":". Les points de visionnage sont comptabilisés uniquement lorsque vous regardez",
    "AdhemSwag’s live Twitch stream":"le live Twitch d’AdhemSwag",
    "1 FNC per eligible minute":"1 FNC par minute éligible",
    "for a non-subscriber. Kick and other Twitch channels do not generate watch FNC.":"pour les non-abonnés. Kick et les autres chaînes Twitch ne génèrent pas de points FNC de visionnage.",
    "Do subscribers earn more?":"Les abonnés gagnent-ils davantage ?",
    "Yes. Twitch subscribers earn a multiplier based on their subscription tier while watching live:":"Oui. Les abonnés Twitch bénéficient d’un multiplicateur selon leur niveau d’abonnement pendant le live :",
    "FNC / MIN":"FNC / MIN",
    "Non-sub":"Non-abonné",
    "Base rate: 1 FNC every 1 minute. Tier 1 ×2, Tier 2 ×3 and Tier 3 ×4 are active.":"Taux de base : 1 FNC par minute. Les multiplicateurs actifs sont Tier 1 ×2, Tier 2 ×3 et Tier 3 ×4.",
    "Do I earn points if the stream is offline?":"Est-ce que je gagne des points si le live est hors ligne ?",
    "No. FNC Points only accumulate while you're actively watching a":"Non. Les points FNC sont cumulés uniquement lorsque vous regardez activement un",
    "live Twitch":"live Twitch",
    "stream.":"en direct.",
    "XP System":"Système XP",
    "How do viewers earn XP?":"Comment les spectateurs gagnent-ils de l’XP ?",
    "XP is earned from eligible watch activity on":"L’XP est gagnée grâce au visionnage éligible sur",
    ". A normal viewer receives the base":". Un spectateur normal reçoit le taux de base",
    "1× XP":"1× XP",
    "rate, and subscriber multipliers match the FNC tiers. Kick and other Twitch channels do not generate watch XP.":"et les multiplicateurs des abonnés correspondent aux niveaux FNC. Kick et les autres chaînes Twitch ne génèrent pas d’XP de visionnage.",
    "What are the XP subscriber multipliers?":"Quels sont les multiplicateurs XP des abonnés ?",
    "XP RATE":"TAUX XP",
    "Base rate: 1 XP. Tier 1 ×2, Tier 2 ×3 and Tier 3 ×4 are active.":"Taux de base : 1 XP. Les multiplicateurs actifs sont Tier 1 ×2, Tier 2 ×3 et Tier 3 ×4.",
    "Does Kick give XP?":"Kick rapporte-t-il de l’XP ?",
    "XP watch progression is Twitch-based. Watching on Kick does not generate XP.":"La progression XP du visionnage repose sur Twitch. Regarder sur Kick ne rapporte pas d’XP.",
    "How does the XP system work?":"Comment fonctionne le système XP ?",
    "Your XP is calculated from eligible Twitch watch activity and your verified Twitch subscription tier. The system applies the correct multiplier automatically:":"Votre XP est calculée selon votre activité de visionnage éligible sur Twitch et votre niveau d’abonnement Twitch vérifié. Le système applique automatiquement le bon multiplicateur :",
    "1× normal, 2× Tier 1, 3× Tier 2, 4× Tier 3":"1× normal, 2× Tier 1, 3× Tier 2, 4× Tier 3",
    ". XP is used for progression and is separate from your FNC balance.":". L’XP sert à votre progression et reste distincte de votre solde FNC.",
    "Daily & Weekly Missions":"Missions quotidiennes et hebdomadaires",
    "What are Daily and Weekly Missions?":"Que sont les missions quotidiennes et hebdomadaires ?",
    "Missions combine two types of activity on AdhemSwag’s live Twitch stream: verified watch time and qualifying chat participation. Daily missions reset at midnight and weekly missions reset every Monday, using Algeria time. You must join each period before its activity can count.":"Les missions combinent deux activités sur le live Twitch d’AdhemSwag : le temps de visionnage vérifié et la participation admissible au chat. Les missions quotidiennes sont réinitialisées à minuit et les missions hebdomadaires chaque lundi, selon l’heure algérienne. Vous devez rejoindre chaque période pour que votre activité soit comptabilisée.",
    "How do I start a mission?":"Comment commencer une mission ?",
    "Connect Twitch and complete your viewer profile. On the":"Connectez Twitch et complétez votre profil de spectateur. Sur la page",
    "Missions page":"Missions",
    ", press":", appuyez sur",
    "JOIN DAILY MISSIONS":"REJOINDRE LES MISSIONS QUOTIDIENNES",
    "each day and":"chaque jour et",
    "JOIN WEEKLY MISSIONS":"REJOINDRE LES MISSIONS HEBDOMADAIRES",
    "once each week. Only verified watch time and eligible chat activity after joining count; earlier activity is not added retroactively.":"une fois par semaine. Seuls le temps de visionnage vérifié et l’activité admissible dans le chat après l’inscription sont comptabilisés ; l’activité antérieure n’est pas ajoutée rétroactivement.",
    "What counts as a valid chat message?":"Qu’est-ce qu’un message valide dans le chat ?",
    "A message counts only when Twitch verifies it from an eligible, active viewer with a complete profile. Empty messages, known bots, duplicate messages and messages blocked by the existing anti-spam cooldown do not count. The mission uses the same accepted chat activity as the existing chat XP system; it does not award normal chat XP a second time.":"Un message est comptabilisé uniquement lorsque Twitch le valide pour un spectateur actif admissible ayant un profil complet. Les messages vides, les bots connus, les doublons et les messages bloqués par le délai anti-spam ne comptent pas. La mission utilise la même activité de chat que le système XP existant et ne crédite pas une deuxième fois l’XP normale du chat.",
    "Does watching or chatting on Kick count?":"Le visionnage ou le chat sur Kick sont-ils comptabilisés ?",
    "These missions are Twitch-only. Kick activity and simply visiting the website do not count.":"Ces missions sont réservées à Twitch. L’activité sur Kick et la simple visite du site ne comptent pas.",
    "How do mission rewards work?":"Comment fonctionnent les récompenses des missions ?",
    "Each mission shows its own objective and XP/FNC reward. Rewards are credited automatically once per mission and period. Normal watch XP/FNC and normal chat XP remain separate; mission bonuses do not change their rates. Existing global XP/FNC switches and the configured daily FNC cap still apply.":"Chaque mission affiche son objectif et sa récompense XP/FNC. Les récompenses sont créditées automatiquement une seule fois par mission et par période. Les gains normaux de visionnage XP/FNC et l’XP du chat restent séparés ; les bonus de mission ne modifient pas leurs taux. Les commandes globales XP/FNC et le plafond FNC quotidien configuré restent applicables.",
    "What are the current mission goals and rewards?":"Quels sont les objectifs et récompenses actuels des missions ?",
    "Daily missions":"Missions quotidiennes",
    "Daily Watch Check-in — 30 verified minutes:":"Présence quotidienne — 30 minutes vérifiées :",
    "Daily Watch Streak — 60 verified minutes:":"Série quotidienne de visionnage — 60 minutes vérifiées :",
    "Chat Regular — 5 qualifying chat messages:":"Habitué du chat — 5 messages admissibles :",
    "Weekly missions":"Missions hebdomadaires",
    "Weekly Regular — watch on 3 different days:":"Habitué hebdomadaire — regarder pendant 3 jours différents :",
    "Weekly Watch Goal — 300 verified minutes (5 hours):":"Objectif hebdomadaire — 300 minutes vérifiées (5 heures) :",
    "Community Voice — 30 qualifying chat messages:":"Voix de la communauté — 30 messages admissibles :",
    "Chat objectives use only Twitch chat activity accepted by the existing anti-spam and active-viewer checks. Check the":"Les objectifs de chat utilisent uniquement l’activité Twitch acceptée par les contrôles anti-spam et de spectateur actif. Consultez la page",
    "for your live progress.":"pour suivre votre progression en direct.",
    "Where can I check my mission progress?":"Où consulter ma progression dans les missions ?",
    "Open the":"Ouvrez la page",
    "or view the Missions Progress section on your viewer profile. Public viewer profiles show current progress without exposing private account information.":"ou consultez la section Progression des missions de votre profil. Les profils publics affichent la progression sans révéler d’informations privées.",
    "Do missions change the normal FNC and XP rates?":"Les missions modifient-elles les taux normaux de FNC et d’XP ?",
    "No. Normal watch rewards, chat XP and subscriber multipliers stay separate. Mission bonuses are additional rewards and do not change the standard earning rates.":"Non. Les récompenses normales de visionnage, l’XP du chat et les multiplicateurs des abonnés restent séparés. Les bonus de mission sont supplémentaires et ne modifient pas les taux de gain habituels.",
    "Where can I check my FNC balance and rewards?":"Où consulter mon solde FNC et mes récompenses ?",
    "Your FNC balance is shown in your profile. Visit the":"Votre solde FNC apparaît dans votre profil. Consultez la page",
    "Store":"Boutique",
    "to browse available rewards and their current costs.":"pour voir les récompenses disponibles et leur coût actuel.",
    "Redemption Rules":"Règles d’échange",
    "Can I use multiple accounts?":"Puis-je utiliser plusieurs comptes ?",
    "No, multi-accounting to farm extra points is":"Non, l’utilisation de plusieurs comptes pour accumuler des points supplémentaires est",
    "not allowed":"interdite",
    "and may result in disqualification.":"et peut entraîner une disqualification.",
    "Do I need to be active in chat?":"Dois-je être actif dans le chat ?",
    "Yes — you need to actually":"Oui — vous devez réellement",
    "type in chat":"écrire dans le chat",
    "during the stream, not just have the tab open. Passive viewing, muted tabs, or bots don't count toward points.":"pendant le live, et pas seulement laisser l’onglet ouvert. Le visionnage passif, les onglets muets ou les bots ne comptent pas pour les points.",
    "Can I transfer or sell my points?":"Puis-je transférer ou vendre mes points ?",
    "No, FNC Points are":"Non, les points FNC sont",
    "non-transferable":"non transférables",
    "between accounts and have no cash value.":"entre les comptes et n’ont aucune valeur monétaire.",
    "How long does delivery take?":"Combien de temps prend la livraison ?",
    "Redeemed rewards are delivered within":"Les récompenses échangées sont livrées sous",
    "1 week":"1 semaine",
    "of your order.":"après votre commande.",
    "My reward hasn't arrived after a week — what do I do?":"Ma récompense n’est pas arrivée après une semaine : que faire ?",
    "Reach out on Discord with your order details and it'll be sorted out as soon as possible.":"Contactez-nous sur Discord avec les détails de votre commande ; le problème sera réglé dès que possible.",
    "What should I check before redeeming a skin?":"Que dois-je vérifier avant d’échanger un skin ?",
    "Keep your viewer profile complete and, if the skin requires Steam delivery, provide a valid":"Gardez votre profil de spectateur complet et, si le skin nécessite une livraison Steam, fournissez un",
    "Steam Trade Link":"lien d’échange Steam",
    "in the Store form. Not every reward needs one. The":"dans le formulaire de la boutique. Toutes les récompenses n’en ont pas besoin. La page",
    "explains any required information before you redeem.":"explique les informations requises avant l’échange.",
    "Are my FNC deducted if a redemption is rejected?":"Mes FNC sont-ils déduits si un échange est refusé ?",
    "Your FNC are deducted only after the server accepts the redemption. If an order looks wrong, refresh your balance and contact":"Vos FNC sont déduits uniquement après acceptation de l’échange par le serveur. Si une commande semble incorrecte, actualisez votre solde et contactez",
    "Discord support":"l’assistance Discord",
    "with the order details.":"avec les détails de la commande.",
    "Head to the SWAG STORE linked on the site to browse and redeem rewards with your FNC Points balance.":"Rendez-vous dans la SWAG STORE depuis le site pour consulter les récompenses et les échanger avec votre solde de points FNC.",
    "Still need help? Join the":"Besoin d’aide ? Rejoignez le",
    "Discord":"Discord",
    "© 2026 AdhemSwag.com — All Rights Reserved":"© 2026 AdhemSwag.com — Tous droits réservés",
    "Collaboration:":"Contact :"
  });
  Object.assign(translations.ar, {
    "// KNOWLEDGE BASE":"// مركز المعلومات",
    "FNC POINTS, XP & MISSIONS":"نقاط FNC وXP والمهام",
    "Everything you need to know about FNC Points, XP, missions, earning and redeeming rewards.":"كل ما تحتاج معرفته عن نقاط FNC وXP والمهام وكسب المكافآت واستبدالها.",
    "⚠ TWITCH ONLY — FNC Points are earned from eligible activity on the live Twitch stream. Kick does not earn FNC Points.":"⚠ TWITCH فقط — تُكتسب نقاط FNC من النشاط المؤهل أثناء البث المباشر على Twitch. لا يمنح Kick نقاط FNC.",
    "Earning FNC Points":"كسب نقاط FNC",
    "How do viewers earn points?":"كيف يكسب المشاهدون النقاط؟",
    "FNC Points are":"نقاط FNC",
    "Twitch only":"على Twitch فقط",
    ". Eligible watch rewards count only while watching":". تُحتسب مكافآت المشاهدة المؤهلة فقط أثناء مشاهدة",
    "AdhemSwag’s live Twitch stream":"بث AdhemSwag المباشر على Twitch",
    "1 FNC per eligible minute":"نقطة FNC واحدة لكل دقيقة مؤهلة",
    "for a non-subscriber. Kick and other Twitch channels do not generate watch FNC.":"لغير المشتركين. لا يمنح Kick أو أي قناة Twitch أخرى نقاط مشاهدة FNC.",
    "Do subscribers earn more?":"هل يكسب المشتركون نقاطاً أكثر؟",
    "Yes. Twitch subscribers earn a multiplier based on their subscription tier while watching live:":"نعم. يحصل مشتركو Twitch على مضاعف حسب مستوى الاشتراك أثناء مشاهدة البث:",
    "FNC / MIN":"FNC / دقيقة",
    "Non-sub":"غير مشترك",
    "Base rate: 1 FNC every 1 minute. Tier 1 ×2, Tier 2 ×3 and Tier 3 ×4 are active.":"المعدل الأساسي: نقطة FNC واحدة كل دقيقة. المضاعفات الفعالة: المستوى 1 ×2 والمستوى 2 ×3 والمستوى 3 ×4.",
    "Do I earn points if the stream is offline?":"هل أكسب نقاطاً عندما يكون البث غير متصل؟",
    "No. FNC Points only accumulate while you're actively watching a":"لا. تتراكم نقاط FNC فقط أثناء مشاهدة",
    "live Twitch":"بث Twitch مباشر",
    "stream.":"بنشاط.",
    "XP System":"نظام XP",
    "How do viewers earn XP?":"كيف يكسب المشاهدون XP؟",
    "XP is earned from eligible watch activity on":"يتم كسب XP من نشاط المشاهدة المؤهل على",
    ". A normal viewer receives the base":". يحصل المشاهد العادي على المعدل الأساسي",
    "1× XP":"XP بمعدل 1×",
    "rate, and subscriber multipliers match the FNC tiers. Kick and other Twitch channels do not generate watch XP.":"وتطابق مضاعفات المشتركين مستويات FNC. لا يمنح Kick أو قنوات Twitch الأخرى XP للمشاهدة.",
    "What are the XP subscriber multipliers?":"ما مضاعفات XP للمشتركين؟",
    "XP RATE":"معدل XP",
    "Base rate: 1 XP. Tier 1 ×2, Tier 2 ×3 and Tier 3 ×4 are active.":"المعدل الأساسي: 1 XP. المضاعفات الفعالة: المستوى 1 ×2 والمستوى 2 ×3 والمستوى 3 ×4.",
    "Does Kick give XP?":"هل يمنح Kick نقاط XP؟",
    "XP watch progression is Twitch-based. Watching on Kick does not generate XP.":"يعتمد تقدم XP للمشاهدة على Twitch. المشاهدة على Kick لا تمنح XP.",
    "How does the XP system work?":"كيف يعمل نظام XP؟",
    "Your XP is calculated from eligible Twitch watch activity and your verified Twitch subscription tier. The system applies the correct multiplier automatically:":"يتم احتساب XP من نشاط المشاهدة المؤهل على Twitch ومستوى اشتراكك المؤكد. يطبق النظام المضاعف الصحيح تلقائياً:",
    "1× normal, 2× Tier 1, 3× Tier 2, 4× Tier 3":"1× عادي، 2× للمستوى 1، 3× للمستوى 2، 4× للمستوى 3",
    ". XP is used for progression and is separate from your FNC balance.":". تُستخدم XP للتقدم وهي منفصلة عن رصيد FNC.",
    "Daily & Weekly Missions":"المهام اليومية والأسبوعية",
    "What are Daily and Weekly Missions?":"ما المهام اليومية والأسبوعية؟",
    "Missions combine two types of activity on AdhemSwag’s live Twitch stream: verified watch time and qualifying chat participation. Daily missions reset at midnight and weekly missions reset every Monday, using Algeria time. You must join each period before its activity can count.":"تجمع المهام بين نشاطين على بث AdhemSwag المباشر على Twitch: وقت مشاهدة موثّق والمشاركة المؤهلة في الدردشة. تُعاد المهام اليومية عند منتصف الليل والأسبوعية كل يوم اثنين حسب توقيت الجزائر. يجب الانضمام إلى كل فترة قبل احتساب النشاط.",
    "How do I start a mission?":"كيف أبدأ مهمة؟",
    "Connect Twitch and complete your viewer profile. On the":"اربط حساب Twitch وأكمل ملف المشاهد. في صفحة",
    "Missions page":"المهام",
    ", press":"، اضغط على",
    "JOIN DAILY MISSIONS":"الانضمام إلى المهام اليومية",
    "each day and":"كل يوم و",
    "JOIN WEEKLY MISSIONS":"الانضمام إلى المهام الأسبوعية",
    "once each week. Only verified watch time and eligible chat activity after joining count; earlier activity is not added retroactively.":"مرة كل أسبوع. يُحتسب وقت المشاهدة الموثق ونشاط الدردشة المؤهل بعد الانضمام فقط؛ ولا يُضاف النشاط السابق بأثر رجعي.",
    "What counts as a valid chat message?":"ما الرسالة التي تُعد صالحة في الدردشة؟",
    "A message counts only when Twitch verifies it from an eligible, active viewer with a complete profile. Empty messages, known bots, duplicate messages and messages blocked by the existing anti-spam cooldown do not count. The mission uses the same accepted chat activity as the existing chat XP system; it does not award normal chat XP a second time.":"تُحتسب الرسالة فقط عندما يتحقق Twitch من أنها صادرة عن مشاهد نشط ومؤهل وملفه مكتمل. لا تُحتسب الرسائل الفارغة أو الروبوتات المعروفة أو الرسائل المكررة أو الرسائل التي يمنعها تأخير مكافحة الإزعاج. تستخدم المهمة نشاط الدردشة المقبول نفسه في نظام XP الحالي ولا تمنح XP الدردشة العادي مرة ثانية.",
    "Does watching or chatting on Kick count?":"هل تُحتسب المشاهدة أو الدردشة على Kick؟",
    "These missions are Twitch-only. Kick activity and simply visiting the website do not count.":"هذه المهام مخصصة لـTwitch فقط. لا يُحتسب نشاط Kick أو مجرد زيارة الموقع.",
    "How do mission rewards work?":"كيف تعمل مكافآت المهام؟",
    "Each mission shows its own objective and XP/FNC reward. Rewards are credited automatically once per mission and period. Normal watch XP/FNC and normal chat XP remain separate; mission bonuses do not change their rates. Existing global XP/FNC switches and the configured daily FNC cap still apply.":"تعرض كل مهمة هدفها ومكافأة XP/FNC الخاصة بها. تُضاف المكافآت تلقائياً مرة واحدة لكل مهمة وفترة. تبقى مكافآت المشاهدة العادية XP/FNC وXP الدردشة منفصلة؛ ولا تغيّر مكافآت المهام معدلاتها. وتظل مفاتيح XP/FNC العامة والحد اليومي المحدد لـFNC سارية.",
    "What are the current mission goals and rewards?":"ما أهداف ومكافآت المهام الحالية؟",
    "Daily missions":"المهام اليومية",
    "Daily Watch Check-in — 30 verified minutes:":"تسجيل المشاهدة اليومي — 30 دقيقة موثقة:",
    "Daily Watch Streak — 60 verified minutes:":"سلسلة المشاهدة اليومية — 60 دقيقة موثقة:",
    "Chat Regular — 5 qualifying chat messages:":"مشارك الدردشة — 5 رسائل مؤهلة:",
    "Weekly missions":"المهام الأسبوعية",
    "Weekly Regular — watch on 3 different days:":"المشاهد الأسبوعي — المشاهدة في 3 أيام مختلفة:",
    "Weekly Watch Goal — 300 verified minutes (5 hours):":"هدف المشاهدة الأسبوعي — 300 دقيقة موثقة (5 ساعات):",
    "Community Voice — 30 qualifying chat messages:":"صوت المجتمع — 30 رسالة دردشة مؤهلة:",
    "Chat objectives use only Twitch chat activity accepted by the existing anti-spam and active-viewer checks. Check the":"تستخدم أهداف الدردشة نشاط Twitch المقبول وفق فحوصات مكافحة الإزعاج والمشاهد النشط. تحقق من صفحة",
    "for your live progress.":"لمتابعة تقدمك المباشر.",
    "Where can I check my mission progress?":"أين يمكنني متابعة تقدمي في المهام؟",
    "Open the":"افتح صفحة",
    "or view the Missions Progress section on your viewer profile. Public viewer profiles show current progress without exposing private account information.":"أو اعرض قسم تقدم المهام في ملف المشاهد. تعرض الملفات العامة التقدم الحالي دون كشف المعلومات الخاصة.",
    "Do missions change the normal FNC and XP rates?":"هل تغيّر المهام معدلات FNC وXP العادية؟",
    "No. Normal watch rewards, chat XP and subscriber multipliers stay separate. Mission bonuses are additional rewards and do not change the standard earning rates.":"لا. تبقى مكافآت المشاهدة العادية وXP الدردشة ومضاعفات المشتركين منفصلة. مكافآت المهام إضافية ولا تغيّر معدلات الكسب الأساسية.",
    "Where can I check my FNC balance and rewards?":"أين أتحقق من رصيد FNC والمكافآت؟",
    "Your FNC balance is shown in your profile. Visit the":"يظهر رصيد FNC في ملفك الشخصي. تفضل بزيارة",
    "Store":"المتجر",
    "to browse available rewards and their current costs.":"لاستعراض المكافآت المتاحة وتكلفتها الحالية.",
    "Redemption Rules":"قواعد الاستبدال",
    "Can I use multiple accounts?":"هل يمكنني استخدام عدة حسابات؟",
    "No, multi-accounting to farm extra points is":"لا، استخدام عدة حسابات لجمع نقاط إضافية أمر",
    "not allowed":"غير مسموح",
    "and may result in disqualification.":"وقد يؤدي إلى الاستبعاد.",
    "Do I need to be active in chat?":"هل يجب أن أكون نشطاً في الدردشة؟",
    "Yes — you need to actually":"نعم — يجب عليك فعلياً",
    "type in chat":"الكتابة في الدردشة",
    "during the stream, not just have the tab open. Passive viewing, muted tabs, or bots don't count toward points.":"أثناء البث، وليس مجرد إبقاء علامة التبويب مفتوحة. لا تُحتسب المشاهدة السلبية أو علامات التبويب الصامتة أو الروبوتات ضمن النقاط.",
    "Can I transfer or sell my points?":"هل يمكنني تحويل نقاطي أو بيعها؟",
    "No, FNC Points are":"لا، نقاط FNC",
    "non-transferable":"غير قابلة للتحويل",
    "between accounts and have no cash value.":"بين الحسابات وليس لها قيمة نقدية.",
    "How long does delivery take?":"كم يستغرق التسليم؟",
    "Redeemed rewards are delivered within":"يتم تسليم المكافآت المستبدلة خلال",
    "1 week":"أسبوع واحد",
    "of your order.":"من طلبك.",
    "My reward hasn't arrived after a week — what do I do?":"لم تصل مكافأتي بعد أسبوع، ماذا أفعل؟",
    "Reach out on Discord with your order details and it'll be sorted out as soon as possible.":"تواصل عبر Discord مع تفاصيل طلبك وسيتم حل المشكلة في أقرب وقت.",
    "What should I check before redeeming a skin?":"ما الذي يجب التحقق منه قبل استبدال سكن؟",
    "Keep your viewer profile complete and, if the skin requires Steam delivery, provide a valid":"أكمل ملف المشاهد، وإذا كان السكن يتطلب تسليماً عبر Steam، فقدم رابطاً صالحاً لـ",
    "Steam Trade Link":"رابط تبادل Steam",
    "in the Store form. Not every reward needs one. The":"في نموذج المتجر. ليست كل المكافآت بحاجة إليه. توضح صفحة",
    "explains any required information before you redeem.":"المتطلبات قبل الاستبدال.",
    "Are my FNC deducted if a redemption is rejected?":"هل تُخصم نقاط FNC إذا رُفض طلب الاستبدال؟",
    "Your FNC are deducted only after the server accepts the redemption. If an order looks wrong, refresh your balance and contact":"لا تُخصم نقاط FNC إلا بعد قبول الخادم لطلب الاستبدال. إذا بدا الطلب غير صحيح، حدّث رصيدك وتواصل مع",
    "Discord support":"دعم Discord",
    "with the order details.":"مع تفاصيل الطلب.",
    "Head to the SWAG STORE linked on the site to browse and redeem rewards with your FNC Points balance.":"انتقل إلى SWAG STORE عبر الموقع لاستعراض المكافآت واستبدالها باستخدام رصيد نقاط FNC.",
    "Still need help? Join the":"هل ما زلت بحاجة إلى مساعدة؟ انضم إلى",
    "Discord":"Discord",
    "© 2026 AdhemSwag.com — All Rights Reserved":"© 2026 AdhemSwag.com — جميع الحقوق محفوظة",
    "Collaboration:":"للتواصل:"
  });

  // Additional page labels found during the site-wide EN/FR/AR audit.
  Object.assign(translations.fr, {
    'WATCH TIME · ALL TIME':'TEMPS DE VISIONNAGE · TOTAL',
    'DAILY & WEEKLY':'QUOTIDIEN & HEBDOMADAIRE',
    'COUNTER-STRIKE 2 · SKIN EXPLORER':'COUNTER-STRIKE 2 · EXPLORATEUR DE SKINS',
    'All categories':'Toutes les catégories',
    'All weapons':'Toutes les armes',
    'Pistols':'Pistolets',
    'Rifles':'Fusils',
    'SMGs':'Mitraillettes',
    'Shotguns':'Fusils à pompe',
    'Machine guns':'Mitrailleuses',
    'Knives':'Couteaux',
    'Gloves':'Gants',
    'Agents':'Agents',
    'Stickers':'Autocollants',
    'Collections':'Collections',
    'Cases':'Caisses',
    'All rarities':'Toutes les raretés',
    'StatTrak only':'StatTrak uniquement',
    'Non-StatTrak':'Sans StatTrak',
    'Daily rotation':'Rotation quotidienne',
    'Name A → Z':'Nom A → Z',
    'Name Z → A':'Nom Z → A',
    'Loading catalogue…':'Chargement du catalogue…',
    'Loading CS2 skins…':'Chargement des skins CS2…',
    'Checking your Twitch-linked profile…':'Vérification de votre profil Twitch…',
    'Join daily missions after the midnight reset. Only activity after joining counts.':'Rejoignez les missions quotidiennes après la réinitialisation de minuit. Seule l’activité effectuée après votre inscription est comptabilisée.',
    'Join weekly missions once per week. Progress resets every Monday, using Algeria time.':'Rejoignez les missions hebdomadaires une fois par semaine. La progression est réinitialisée chaque lundi, selon l’heure algérienne.',
    'Read the Missions FAQ →':'Lire la FAQ des missions →',
    'Where do I redeem my points?':'Où puis-je échanger mes points ?',
    'Steam Trade URL':'Lien d’échange Steam',
    'Where to get Trade URL?':'Où trouver le lien d’échange ?',
    'Discord ID':'Identifiant Discord',
    'Choose recharge amount':'Choisissez le montant de recharge',
    'Choose mobile operator':'Choisissez votre opérateur mobile',
    'Select operator':'Sélectionner un opérateur',
    'Mobile phone number':'Numéro de téléphone mobile',
    'Enter the 10-digit Algerian number. The prefix must match the selected operator.':'Saisissez le numéro algérien à 10 chiffres. Le préfixe doit correspondre à l’opérateur sélectionné.'
  });
  Object.assign(translations.ar, {
    'WATCH TIME · ALL TIME':'إجمالي وقت المشاهدة',
    'DAILY & WEEKLY':'يومي وأسبوعي',
    'COUNTER-STRIKE 2 · SKIN EXPLORER':'COUNTER-STRIKE 2 · مستكشف السكنات',
    'All categories':'كل الفئات',
    'All weapons':'كل الأسلحة',
    'Pistols':'المسدسات',
    'Rifles':'البنادق',
    'SMGs':'الرشاشات الخفيفة',
    'Shotguns':'البنادق الخرطوشية',
    'Machine guns':'الرشاشات',
    'Knives':'السكاكين',
    'Gloves':'القفازات',
    'Agents':'الشخصيات',
    'Stickers':'الملصقات',
    'Collections':'المجموعات',
    'Cases':'الصناديق',
    'All rarities':'كل درجات الندرة',
    'StatTrak only':'StatTrak فقط',
    'Non-StatTrak':'بدون StatTrak',
    'Daily rotation':'التدوير اليومي',
    'Name A → Z':'الاسم A → Z',
    'Name Z → A':'الاسم Z → A',
    'Loading catalogue…':'جارٍ تحميل الكتالوج…',
    'Loading CS2 skins…':'جارٍ تحميل سكنات CS2…',
    'Checking your Twitch-linked profile…':'جارٍ التحقق من ملفك المرتبط بـ Twitch…',
    'Join daily missions after the midnight reset. Only activity after joining counts.':'انضم إلى المهام اليومية بعد إعادة التعيين عند منتصف الليل. يُحتسب النشاط بعد الانضمام فقط.',
    'Join weekly missions once per week. Progress resets every Monday, using Algeria time.':'انضم إلى المهام الأسبوعية مرة واحدة كل أسبوع. يُعاد ضبط التقدم كل يوم اثنين حسب توقيت الجزائر.',
    'Read the Missions FAQ →':'اقرأ الأسئلة الشائعة حول المهام →',
    'Where do I redeem my points?':'أين يمكنني استبدال نقاطي؟',
    'Steam Trade URL':'رابط تبادل Steam',
    'Where to get Trade URL?':'أين أجد رابط التبادل؟',
    'Discord ID':'معرّف Discord',
    'Choose recharge amount':'اختر مبلغ التعبئة',
    'Choose mobile operator':'اختر مشغل الهاتف',
    'Select operator':'اختر المشغل',
    'Mobile phone number':'رقم الهاتف المحمول',
    'Enter the 10-digit Algerian number. The prefix must match the selected operator.':'أدخل رقم الهاتف الجزائري المكوّن من 10 أرقام. يجب أن تتطابق البداية مع المشغل المحدد.'
  });

  const labels = { en: 'EN', fr: 'FR', ar: 'AR' };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function getLang() {
    try { const v = localStorage.getItem(KEY); return ['en','fr','ar'].includes(v) ? v : 'en'; }
    catch (_) { return 'en'; }
  }
  const textNodeState = new WeakMap();
  function translateTextNode(node, lang) {
    if (!node || !node.parentElement || node.parentElement.closest('script,style,textarea,select,option,[data-no-translate],#adhemswag-language-switcher')) return;
    const raw = node.nodeValue;
    if (!raw.trim()) return;
    const previous = textNodeState.get(node);
    const originalRaw = !previous || raw !== previous.rendered ? raw : previous.original;
    const original = originalRaw.trim();
    const translated = lang === 'en' ? original : ((translations[lang] || {})[original] || original);
    const lead = originalRaw.match(/^\\s*/)?.[0] || '';
    const tail = originalRaw.match(/\\s*$/)?.[0] || '';
    const rendered = lead + translated + tail;
    textNodeState.set(node, { original: originalRaw, rendered });
    if (raw !== rendered) node.nodeValue = rendered;
  }
  function translateAttributes(root, lang) {
    const attrs = ['placeholder','title','aria-label','value'];
    const els = [root, ...(root.querySelectorAll ? root.querySelectorAll('*') : [])].filter(Boolean);
    for (const el of els) {
      if (el.id === 'adhemswag-language-switcher' || el.closest?.('#adhemswag-language-switcher')) continue;
      for (const attr of attrs) {
        if (!el.hasAttribute?.(attr)) continue;
        const suffix = attr.replace(/[^a-z0-9]/gi, '');
        const key = 'adhemOrig' + suffix;
        const renderedKey = 'adhemRendered' + suffix;
        const current = el.getAttribute(attr);
        if (!(key in el.dataset) || current !== el.dataset[renderedKey]) el.dataset[key] = current;
        const orig = el.dataset[key];
        const translated = lang === 'en' ? orig : ((translations[lang] || {})[orig] || orig);
        if (current !== translated) el.setAttribute(attr, translated);
        el.dataset[renderedKey] = translated;
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
    script.src='/assets/skins-nav.js?v=2';
    script.defer=true;
    script.setAttribute('data-adhem-skins-nav-loader','1');
    document.head.appendChild(script);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadAdhemSkinsNav,{once:true});
  else loadAdhemSkinsNav();
})();

/* Load the site-wide sponsor rotation on pages using the shared language script. */
(function(){if(document.querySelector('script[data-adhem-sponsor-rotation]'))return;var s=document.createElement('script');s.src='/assets/sponsor-rotation.js?v=1';s.defer=true;s.setAttribute('data-adhem-sponsor-rotation','1');document.head.appendChild(s);})();
