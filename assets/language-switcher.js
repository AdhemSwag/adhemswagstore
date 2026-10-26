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
      'All rights reserved.':'Tous droits réservés.','Contact':'Contact','Community':'Communauté'
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
      'All rights reserved.':'جميع الحقوق محفوظة.','Contact':'اتصل بنا','Community':'المجتمع'
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
    const walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node, lang);
    translateAttributes(document.body || document.documentElement, lang);
    const select = document.querySelector('#adhemswag-language-switcher select');
    if (select) select.value = lang;
    try { localStorage.setItem(KEY, lang); } catch (_) {}
  }
  function addSelector() {
    if (document.getElementById('adhemswag-language-switcher')) return;
    const wrap = document.createElement('div');
    wrap.id = 'adhemswag-language-switcher';
    wrap.setAttribute('data-no-translate','');
    wrap.innerHTML = '<label for="adhem-language-select" class="adhem-language-label">LANG</label><select id="adhem-language-select" aria-label="Choose language"><option value="en">EN</option><option value="fr">FR</option><option value="ar">AR</option></select>';
    const style = document.createElement('style');
    style.textContent = '#adhemswag-language-switcher{position:fixed;top:12px;right:14px;z-index:2147483005;display:flex;align-items:center;gap:5px;padding:5px 7px;background:rgba(5,10,14,.94);border:1px solid rgba(17,217,247,.42);border-radius:9px;box-shadow:0 4px 18px rgba(0,0,0,.35);font:700 10px/1.2 Inter,Arial,sans-serif;color:#11d9f7;backdrop-filter:blur(12px)}#adhemswag-language-switcher .adhem-language-label{font:700 9px/1 JetBrains Mono,monospace;letter-spacing:.08em;color:#8ca4ac}#adhemswag-language-switcher select{appearance:auto;min-width:47px;padding:5px 4px;background:#0b151b;color:#e9fbff;border:1px solid rgba(17,217,247,.25);border-radius:5px;font:700 11px Inter,Arial,sans-serif;cursor:pointer;outline:none}#adhemswag-language-switcher select:focus{border-color:#11d9f7;box-shadow:0 0 0 2px rgba(17,217,247,.15)}html.adhem-lang-ar body{direction:rtl}html.adhem-lang-ar #adhemswag-language-switcher{right:auto;left:14px;direction:ltr}html.adhem-lang-ar #adhemswag-language-switcher .adhem-language-label{direction:ltr}@media(max-width:700px){#adhemswag-language-switcher{top:10px;right:10px;padding:4px 5px;gap:3px}#adhemswag-language-switcher select{min-width:42px;padding:4px 3px}html.adhem-lang-ar #adhemswag-language-switcher{left:10px;right:auto}}';
    document.head.appendChild(style);
    document.body.appendChild(wrap);
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
    document.addEventListener('change', e => {
      if (e.target?.id === 'adhem-language-select') return;
      if (getLang() !== 'en') translateAttributes(e.target, getLang());
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();