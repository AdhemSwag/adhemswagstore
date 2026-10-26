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
      'JOIN REQUIRED THIS WEEK':'PARTICIPATION REQUISE CETTE SEMAINE'

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
      'JOIN REQUIRED THIS WEEK':'يلزم الانضمام هذا الأسبوع'

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
  }
  function applyAdDirection(lang) {
    const rtl = lang === 'ar';
    const selectors = '.ad-container, .ad-slot, .advertisement, .advertisement-container, .adsbygoogle, [data-ad-slot], [data-ad-client], [id^="google_ads"], [id*="ad-container"], [class*="ad-container"], [id*="advertisement"], [class*="advertisement"]';
    document.querySelectorAll(selectors).forEach(el => {
      if (rtl) {
        el.style.setProperty('direction', 'ltr', 'important');
        el.style.setProperty('margin-left', '0', 'important');
        el.style.setProperty('margin-right', 'auto', 'important');
        el.style.setProperty('justify-self', 'start', 'important');
      } else {
        ['direction', 'margin-left', 'margin-right', 'justify-self'].forEach(p => el.style.removeProperty(p));
      }
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