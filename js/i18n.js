/* ---------------------------------------------------------------------------
 * i18n.js  — translation strings for the BSN / DigiD asylum prototype
 *
 * Languages: Tigrinya (ti) and Arabic (ar) are the two dominant languages among
 * Eritrean asylum seekers; English (en) and Dutch (nl) are included for staff,
 * helpdesk fallback, and gradual familiarisation with the host-country language.
 *
 * Tigrinya and Arabic render right-to-left (Tigrinya uses the Ge'ez script which
 * is LTR, but we keep Arabic RTL). We mark each language with a `dir` so the
 * layout flips automatically.
 * ------------------------------------------------------------------------- */

const LANGS = {
  ti: { name: "ትግርኛ",      english: "Tigrinya", dir: "ltr", flag: "TIG" },
  ar: { name: "العربية",   english: "Arabic",   dir: "rtl", flag: "ARA" },
  en: { name: "English",   english: "English",  dir: "ltr", flag: "ENG" },
  nl: { name: "Nederlands",english: "Dutch",    dir: "ltr", flag: "NLD" }
};

const I18N = {
  /* ---- generic / chrome ---- */
  app_name:        { ti: "ናይ መንግስቲ ሓገዝ",        ar: "مساعدة حكومية",          en: "Government Help",        nl: "Overheidshulp" },
  app_subtitle:    { ti: "BSN ን ባንክን",            ar: "BSN والبنك",             en: "BSN & Banking",          nl: "BSN & Bankzaken" },
  next:            { ti: "ቀጻሊ",                   ar: "التالي",                 en: "Next",                   nl: "Volgende" },
  back:            { ti: "ድሕሪት",                  ar: "رجوع",                   en: "Back",                   nl: "Terug" },
  start:           { ti: "ጀምር",                   ar: "ابدأ",                   en: "Start",                  nl: "Beginnen" },
  skip:            { ti: "ኣሕልፍ",                  ar: "تخطّي",                  en: "Skip",                   nl: "Overslaan" },
  done:            { ti: "ተወዲኡ",                  ar: "تم",                     en: "Done",                   nl: "Klaar" },
  save_resume:     { ti: "ኣቐምጥን ደጊም ቀጽልን",        ar: "احفظ وأكمل لاحقًا",        en: "Save & continue later",  nl: "Opslaan & later verder" },
  saved_msg:       { ti: "ተቐሚጡ ኣሎ ✓",             ar: "تم الحفظ ✓",             en: "Saved ✓",                en2:"", nl: "Opgeslagen ✓" },
  continue_saved:  { ti: "ዝተቐመጠ ቀጽል",             ar: "متابعة المحفوظ",          en: "Resume saved form",     nl: "Opgeslagen formulier hervatten" },
  offline_badge:   { ti: "ኦፍላይን ይሰርሕ",            ar: "يعمل دون إنترنت",         en: "Works offline",          nl: "Werkt offline" },
  low_data:        { ti: "ትሑት ዳታ",               ar: "بيانات منخفضة",           en: "Low data",               nl: "Laag dataverbruik" },
  help_button:     { ti: "ሰብ ኣዘራርብ",             ar: "تحدّث إلى شخص",           en: "Talk to a person",       nl: "Praat met iemand" },
  required:        { ti: "ኣገዳሲ",                  ar: "مطلوب",                  en: "Required",               nl: "Verplicht" },

  /* ---- privacy popup ---- */
  privacy_title:   { ti: "ዳታኹም ንምንታይ ይውዕል",       ar: "كيف نستخدم بياناتك",      en: "How we use your data",   nl: "Hoe wij uw gegevens gebruiken" },
  privacy_body:    {
    ti: "እዚ ዝህብኩሞ ሓበሬታ ንመንግስቲ ኔዘርላንድ ጥራይ ይውዕል — BSN ንምሃብን ባንክ ንምኽፋትን። ንዝኾነ ካልእ ኣይሽየጥን ኣይውሃብን።",
    ar: "تُستخدم المعلومات التي تقدّمها من قِبَل الحكومة الهولندية فقط — لإصدار BSN وفتح حساب بنكي. لا تُباع ولا تُشارك مع أي جهة أخرى.",
    en: "The information you give is used only by the Dutch government — to issue your BSN and open a bank account. It is never sold or shared with anyone else.",
    nl: "De informatie die u geeft wordt alleen gebruikt door de Nederlandse overheid — om uw BSN uit te geven en een bankrekening te openen. Het wordt nooit verkocht of gedeeld."
  },
  privacy_agree:   { ti: "ተረዲኡኒ፣ ቀጽል",            ar: "فهمت، تابع",             en: "I understand, continue", nl: "Ik begrijp het, ga verder" },

  /* ---- onboarding walkthrough ---- */
  ob1_title:       { ti: "እንቋዕ ብደሓን መጻእኩም",        ar: "أهلاً بك",               en: "Welcome",               nl: "Welkom" },
  ob1_body:        { ti: "እዚ ኣፕ ኣብ ኔዘርላንድ ናጻ ህይወት ንምጅማር ይሕግዘኩም።", ar: "يساعدك هذا التطبيق على بدء حياة مستقلة في هولندا.", en: "This app helps you start an independent life in the Netherlands.", nl: "Deze app helpt u een zelfstandig leven in Nederland te beginnen." },
  ob2_title:       { ti: "ሰለስተ ስጉምትታት",            ar: "ثلاث خطوات",             en: "Three steps",           nl: "Drie stappen" },
  ob2_body:        { ti: "ዕቚባ ሕተት → BSN ቁጽሪ ርከብ → ባንክ ሕሳብ ክፈት።", ar: "اطلب اللجوء ← احصل على رقم BSN ← افتح حسابًا بنكيًا.", en: "Apply for asylum → get a BSN number → open a bank account.", nl: "Asiel aanvragen → BSN-nummer krijgen → bankrekening openen." },
  ob3_title:       { ti: "ኩሉ ግዜ ሓገዝ ኣሎ",           ar: "المساعدة متوفرة دائمًا",   en: "Help is always there",  nl: "Hulp is er altijd" },
  ob3_body:        { ti: "ኣብ ዝኾነ እዋን “ሰብ ኣዘራርብ” ጠውቑ ምስ COA ወይ VluchtelingenWerk ክትራኸቡ።", ar: "اضغط «تحدّث إلى شخص» في أي وقت للتواصل مع COA أو VluchtelingenWerk.", en: "Tap “Talk to a person” anytime to reach COA or VluchtelingenWerk.", nl: "Tik op elk moment op “Praat met iemand” om COA of VluchtelingenWerk te bereiken." },

  /* ---- home / task hub ---- */
  home_heading:    { ti: "እንታይ ክትገብሩ ትደልዩ?",       ar: "ماذا تريد أن تفعل؟",       en: "What do you want to do?", nl: "Wat wilt u doen?" },
  task_asylum:     { ti: "ዕቚባ ሕተት",               ar: "طلب اللجوء",             en: "Apply for asylum",       nl: "Asiel aanvragen" },
  task_asylum_sub: { ti: "ናይ ቀዳማይ ስጉምቲ",          ar: "الخطوة الأولى",          en: "The first step",         nl: "De eerste stap" },
  task_bsn:        { ti: "ግዝያዊ BSN ሕተት",          ar: "اطلب BSN مؤقت",          en: "Apply for temporary BSN", nl: "Tijdelijk BSN aanvragen" },
  task_bsn_sub:    { ti: "ናይ መንነት ቁጽሪ",            ar: "رقم هويتك",              en: "Your identity number",   nl: "Uw identiteitsnummer" },
  task_bank:       { ti: "ባንክ ሕሳብ ክፈት",           ar: "افتح حسابًا بنكيًا",       en: "Open a bank account",    nl: "Bankrekening openen" },
  task_bank_sub:   { ti: "ገንዘብ ንምቕባል",            ar: "لاستلام الأموال",         en: "To receive money",       nl: "Om geld te ontvangen" },
  status_todo:     { ti: "ገና ኣይተገብረን",            ar: "لم يبدأ",                en: "Not started",            nl: "Nog niet gedaan" },
  status_progress: { ti: "ይካየድ ኣሎ",               ar: "قيد التنفيذ",            en: "In progress",            nl: "Bezig" },
  status_done:     { ti: "ተወዲኡ ✓",                ar: "مكتمل ✓",                en: "Completed ✓",            nl: "Voltooid ✓" },
  locked:          { ti: "ቅድሚኡ ዘሎ ስጉምቲ ወድኡ",      ar: "أكمل الخطوة السابقة أولاً", en: "Finish the step before", nl: "Rond de vorige stap af" },

  /* ---- asylum task ---- */
  asylum_title:    { ti: "ዕቚባ ምሕታት",             ar: "طلب اللجوء",             en: "Apply for asylum",       nl: "Asiel aanvragen" },
  asylum_intro:    { ti: "ዕቚባ ምሕታት ኣብ ኔዘርላንድ ብIND ይካየድ። ኣብዚ ዘድሊ ኣዳሉ።", ar: "تتم معالجة طلبات اللجوء في هولندا عبر IND. جهّز ما يلزم هنا.", en: "Asylum in the Netherlands is handled by the IND. Prepare what you need here.", nl: "Asiel in Nederland wordt behandeld door de IND. Bereid hier voor wat u nodig heeft." },
  asylum_check:    { ti: "ዘድሊ ሰነዳት",              ar: "المستندات المطلوبة",      en: "Documents you need",     nl: "Documenten die u nodig heeft" },
  asylum_doc1:     { ti: "መንነት ዘረጋግጽ (ፓስፖርት እንተሃልዩ)", ar: "إثبات الهوية (جواز السفر إن وُجد)", en: "Proof of identity (passport if you have one)", nl: "Identiteitsbewijs (paspoort indien aanwezig)" },
  asylum_doc2:     { ti: "ካብ ሃገርኩም ናይ ምህዳም ምኽንያት", ar: "سبب الفرار من بلدك",       en: "Reason you fled your country", nl: "Reden waarom u uw land ontvluchtte" },
  asylum_doc3:     { ti: "ናይ COA መቐበሊ ቦታ ሓበሬታ",    ar: "معلومات مركز استقبال COA", en: "COA reception location info", nl: "COA-opvanglocatie informatie" },
  asylum_redirect: { ti: "ናብ ወግዓዊ IND መርበብ ኪድ",   ar: "اذهب إلى موقع IND الرسمي", en: "Go to the official IND website", nl: "Ga naar de officiële IND-website" },
  asylum_redirect_note: { ti: "ናብ ደገ መርበብ ይወስደኩም — ዳታኹም ኣብዚ ተቐሚጡ ኣሎ።", ar: "سينقلك إلى موقع خارجي — بياناتك محفوظة هنا.", en: "This opens an outside website — your progress here is saved.", nl: "Dit opent een externe website — uw voortgang hier is opgeslagen." },
  asylum_confirm:  { ti: "ዕቚባ ሓቲተ ኣለኹ",           ar: "لقد قدّمت طلب اللجوء",     en: "I have applied for asylum", nl: "Ik heb asiel aangevraagd" },

  /* ---- BSN form ---- */
  bsn_title:       { ti: "ግዝያዊ BSN ምሕታት",        ar: "طلب BSN مؤقت",           en: "Apply for a temporary BSN", nl: "Tijdelijk BSN aanvragen" },
  bsn_intro:       { ti: "BSN ናይ 9 ኣሃዝ ቁጽሪ ኢዩ። ንባንክ፣ ሕክምናን ስራሕን የድሊ።", ar: "BSN هو رقم من 9 أرقام. تحتاجه للبنك والرعاية الصحية والعمل.", en: "A BSN is a 9-digit number. You need it for banking, healthcare and work.", nl: "Een BSN is een nummer van 9 cijfers. U heeft het nodig voor bank, zorg en werk." },
  f_given:         { ti: "ናይ መጀመርታ ስም",          ar: "الاسم الأول",            en: "First name",             nl: "Voornaam" },
  f_family:        { ti: "ናይ ስድራ ስም",            ar: "اسم العائلة",            en: "Family name",            nl: "Achternaam" },
  f_dob:           { ti: "ዕለተ ልደት",               ar: "تاريخ الميلاد",          en: "Date of birth",          nl: "Geboortedatum" },
  f_country:       { ti: "ዝተወለድኩምሉ ሃገር",          ar: "بلد الميلاد",            en: "Country of birth",       nl: "Geboorteland" },
  f_gender:        { ti: "ጾታ",                    ar: "الجنس",                  en: "Gender",                 nl: "Geslacht" },
  g_male:          { ti: "ተባዕታይ",                ar: "ذكر",                    en: "Male",                   nl: "Man" },
  g_female:        { ti: "ኣንስታይ",                ar: "أنثى",                   en: "Female",                 nl: "Vrouw" },
  g_other:         { ti: "ካልእ",                   ar: "آخر",                    en: "Other",                  nl: "Anders" },
  f_coa:           { ti: "ናይ COA መቐበሊ ቦታ",        ar: "مركز استقبال COA",       en: "COA reception location", nl: "COA-opvanglocatie" },
  f_doc_upload:    { ti: "ፓስፖርት ወይ መንነት ስቐል",     ar: "صورة جواز السفر أو الهوية", en: "Photo of passport or ID", nl: "Foto van paspoort of ID" },
  f_doc_hint:      { ti: "እንተዘይብልኩም፣ ኣብ COA ሓግዝ ይርከብ።", ar: "إن لم يكن لديك، تتوفر مساعدة في COA.", en: "If you don't have one, help is available at COA.", nl: "Als u die niet heeft, is er hulp bij COA." },
  take_photo:      { ti: "ስእሊ ኣልዕል",              ar: "التقط صورة",             en: "Take photo",             nl: "Foto maken" },
  bsn_submit:      { ti: "ሕቶ ኣእቱ",                ar: "إرسال الطلب",            en: "Submit application",     nl: "Aanvraag indienen" },
  bsn_issued:      { ti: "ግዝያዊ BSN ተዋሂቡኩም!",      ar: "تم إصدار BSN المؤقت!",    en: "Your temporary BSN is issued!", nl: "Uw tijdelijke BSN is uitgegeven!" },
  bsn_valid:       { ti: "ክሳብ",                   ar: "صالح حتى",               en: "Valid until",            nl: "Geldig tot" },
  bsn_what_now:    { ti: "ሕጂ ባንክ ሕሳብ ክትከፍቱ ትኽእሉ።", ar: "يمكنك الآن فتح حساب بنكي.", en: "You can now open a bank account.", nl: "U kunt nu een bankrekening openen." },
  c_holder:        { ti: "ስም",                     ar: "الاسم",                  en: "Name",                   nl: "Naam" },
  c_bank:          { ti: "ባንክ",                    ar: "البنك",                  en: "Bank",                   nl: "Bank" },

  /* ---- bank task ---- */
  bank_title:      { ti: "ባንክ ሕሳብ ምኽፋት",          ar: "فتح حساب بنكي",          en: "Open a bank account",    nl: "Bankrekening openen" },
  bank_intro:      { ti: "ብBSN ቁጽርኹም ሕሳብ ክፈቱ። ገንዘብ ክትቅበሉን ክትከፍሉን ትኽእሉ።", ar: "افتح حسابًا باستخدام رقم BSN الخاص بك. يمكنك استلام الأموال ودفعها.", en: "Open an account with your BSN number. You can receive and pay money.", nl: "Open een rekening met uw BSN-nummer. U kunt geld ontvangen en betalen." },
  bank_choose:     { ti: "ባንክ ምረጹ",               ar: "اختر بنكًا",             en: "Choose a bank",          nl: "Kies een bank" },
  bank_basic:      { ti: "መሰረታዊ ሕሳብ — ነጻ",        ar: "حساب أساسي — مجاني",      en: "Basic account — free",   nl: "Basisrekening — gratis" },
  bank_prefill:    { ti: "BSN ካብ ቅድሚኡ ተመሊኡ ኣሎ",   ar: "تم ملء BSN مسبقًا",       en: "BSN already filled in for you", nl: "BSN is al voor u ingevuld" },
  bank_submit:     { ti: "ሕሳብ ክፈት",               ar: "افتح الحساب",            en: "Open account",           nl: "Rekening openen" },
  bank_done:       { ti: "ባንክ ሕሳብኩም ተኸፊቱ!",       ar: "تم فتح حسابك البنكي!",    en: "Your bank account is open!", nl: "Uw bankrekening is geopend!" },
  bank_iban:       { ti: "ናይ ሕሳብ ቁጽሪ (IBAN)",     ar: "رقم الحساب (IBAN)",       en: "Account number (IBAN)",  nl: "Rekeningnummer (IBAN)" },
  all_done:        { ti: "ኩሉ ወዲእኩም! 🎉",          ar: "أكملت كل شيء! 🎉",        en: "You finished everything! 🎉", nl: "U bent helemaal klaar! 🎉" },
  all_done_sub:    { ti: "ሕጂ ኣብ ኔዘርላንድ ናጻ ህይወት ክትመርሑ ትኽእሉ።", ar: "يمكنك الآن العيش باستقلالية في هولندا.", en: "You can now live independently in the Netherlands.", nl: "U kunt nu zelfstandig leven in Nederland." },

  /* ---- help sheet ---- */
  help_title:      { ti: "ሓገዝ ርከቡ",              ar: "احصل على مساعدة",         en: "Get help",               nl: "Hulp krijgen" },
  help_coa:        { ti: "COA መቐበሊ ዴስክ",          ar: "مكتب استقبال COA",        en: "COA reception desk",     nl: "COA-receptie" },
  help_coa_sub:    { ti: "ኣብ መቐበሊ ቦታኹም",          ar: "في مركز الاستقبال",       en: "At your reception centre", nl: "Bij uw opvangcentrum" },
  help_vw:         { ti: "VluchtelingenWerk",     ar: "VluchtelingenWerk",      en: "VluchtelingenWerk",      nl: "VluchtelingenWerk" },
  help_vw_sub:     { ti: "ናጻ ናይ ስደተኛታት ሓገዝ",     ar: "مساعدة مجانية للاجئين",   en: "Free refugee support",   nl: "Gratis vluchtelingenhulp" },
  help_call:       { ti: "ደውሉ",                  ar: "اتصل",                   en: "Call",                   nl: "Bellen" },
  help_interpreter:{ ti: "ኣስተርጓማይ ሕተት",          ar: "اطلب مترجمًا",            en: "Request an interpreter", nl: "Vraag een tolk aan" },
  close:           { ti: "ዕጸው",                   ar: "إغلاق",                  en: "Close",                  nl: "Sluiten" }
};

function t(key, lang) {
  const entry = I18N[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}
