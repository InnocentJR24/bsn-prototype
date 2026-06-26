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
  /* RE-LABELLED after the cognitive walkthrough (Task 1, CW Q3): the old
     "I have applied for asylum" was ambiguous — Yonas could read it as the act
     of applying. It now names the checklist action explicitly. */
  asylum_confirm:  { ti: "ናይ IND ስጉምቲ ወዲአ — ከም ዝተወድአ ምልክት ግበር", ar: "أنهيت خطوة IND — ضع علامة كمكتمل", en: "I have finished the IND step — mark as done", nl: "Ik heb de IND-stap afgerond — markeer als klaar" },

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
  close:           { ti: "ዕጸው",                   ar: "إغلاق",                  en: "Close",                  nl: "Sluiten" },

  /* =====================================================================
   * NEW STRINGS — added in the post-cognitive-walkthrough revision.
   * Each block is keyed to a finding in the walkthrough (Group 9).
   * =================================================================== */

  /* --- shared --- */
  talk_person:     { ti: "ምስ ሰብ/ኣስተርጓማይ ተዛረብ",   ar: "تحدّث إلى شخص / مترجم",    en: "Talk to a person / interpreter", nl: "Praat met iemand / tolk" },

  /* --- Task 1 (asylum): in-app explainer of the IND hand-off (CW Q3) --- */
  asylum_explainer_title: { ti: "ኣብ IND መርበብ እንታይ ከም ዝገብሩ",  ar: "ماذا ستفعل على موقع IND",   en: "What you will do on the IND website", nl: "Wat u op de IND-website gaat doen" },
  asylum_explainer_intro: { ti: "ቅድሚ ምኻድኩም፣ እዚ ኣብኡ ዘጋጥመኩም ኢዩ፦", ar: "قبل أن تذهب، إليك ما سيحدث هناك:", en: "Before you go, here is what happens there:", nl: "Voordat u gaat, dit gebeurt daar:" },
  asylum_step1:    { ti: "ሰነዳት መንነትኩም ንሰራሕተኛ IND ተርእዩ።",     ar: "تُظهر وثائق هويتك لموظف IND.",  en: "You show your identity documents to an IND officer.", nl: "U toont uw identiteitsdocumenten aan een IND-medewerker." },
  asylum_step2:    { ti: "ካብ ሃገርኩም ስለምንታይ ከም ዝሃደምኩም ትነግሩ። ኣስተርጓማይ ክሕግዘኩም ይኽእል።", ar: "تشرح لماذا فررت من بلدك. يمكن لمترجم مساعدتك.", en: "You explain why you fled your country. An interpreter can help you.", nl: "U legt uit waarom u uw land bent ontvlucht. Een tolk kan u helpen." },
  asylum_step3:    { ti: "ኣሰር ኣጻብዕትኹምን ስእልኹምን ይውሰድ።",         ar: "تُؤخذ بصماتك وصورتك.",          en: "They take your fingerprints and photo.", nl: "Zij nemen uw vingerafdrukken en foto." },
  asylum_step4:    { ti: "ናይ ቃለ-መሕትት ዕለት ይውሃበኩም።",          ar: "تحصل على موعد لمقابلة اللجوء.", en: "You get a date for your asylum interview.", nl: "U krijgt een datum voor uw asielgesprek." },
  asylum_bring:    { ti: "ምሳኹም ውሰዱ",                          ar: "خذ معك",                       en: "Bring with you",          nl: "Neem mee" },
  asylum_ready:    { ti: "ምስ ተዳለኹም፣ ናብ IND መርበብ ኪዱ",        ar: "عندما تكون جاهزًا، افتح موقع IND", en: "When you are ready, open the IND website", nl: "Als u klaar bent, open de IND-website" },
  /* confirmation that the self-certify button does NOT submit anything (CW Q3 & Q4) */
  asylum_confirm_note: { ti: "ናይ ዝርዝርካ ምልክት ጥራይ ኢዩ ዝቕይር። ናብ IND ዝለኣኾ ነገር የለን።", ar: "هذا يحدّث قائمتك فقط. لا يُرسل أي شيء إلى IND.", en: "This only updates your checklist. It does not send anything to the IND.", nl: "Dit werkt alleen uw lijst bij. Er wordt niets naar de IND gestuurd." },
  asylum_confirm_q:    { ti: "ናይ IND ስጉምቲ ኣብ ወግዓዊ መርበብ ወዲእኩም ዲኹም?", ar: "هل أنهيت خطوة IND على الموقع الرسمي؟", en: "Have you finished the IND step on the official website?", nl: "Heeft u de IND-stap op de officiële website afgerond?" },
  yes_mark_done:   { ti: "እወ፣ ከም ዝተወድአ ምልክት ግበር",  ar: "نعم، ضع علامة كمكتمل",     en: "Yes, mark as done",      nl: "Ja, markeer als klaar" },
  not_yet:         { ti: "ገና",                    ar: "ليس بعد",                en: "Not yet",                nl: "Nog niet" },

  /* --- Task 2 (BSN): localised date of birth + approximate date (CW Q2/Q3) --- */
  dob_day:         { ti: "መዓልቲ",                  ar: "اليوم",                  en: "Day",                    nl: "Dag" },
  dob_month:       { ti: "ወርሒ",                   ar: "الشهر",                  en: "Month",                  nl: "Maand" },
  dob_year:        { ti: "ዓመት",                   ar: "السنة",                  en: "Year",                   nl: "Jaar" },
  dob_unsure:      { ti: "ልክዕ መዓልቲ ኣይፈልጥን እየ",     ar: "لست متأكدًا من اليوم بالضبط", en: "I'm not sure of the exact day", nl: "Ik weet de exacte dag niet zeker" },
  dob_unsure_hint: { ti: "እንተዘይፈሊጥኩም ዓመት ጥራይ ክትህቡ ትኽእሉ። ልሙድ ኢዩ፣ ጸገም የብሉን።", ar: "إن لم تكن متأكدًا يمكنك إعطاء السنة فقط. هذا أمر شائع ولا بأس به.", en: "If you are not sure, you can give only the year. This is common and it is okay.", nl: "Als u het niet zeker weet, kunt u alleen het jaar opgeven. Dit komt vaak voor en is prima." },
  month_1:  { ti: "ጥሪ",     ar: "يناير",   en: "January",   nl: "januari" },
  month_2:  { ti: "ለካቲት",  ar: "فبراير",  en: "February",  nl: "februari" },
  month_3:  { ti: "መጋቢት",  ar: "مارس",    en: "March",     nl: "maart" },
  month_4:  { ti: "ሚያዝያ",  ar: "أبريل",   en: "April",     nl: "april" },
  month_5:  { ti: "ግንቦት",  ar: "مايو",    en: "May",       nl: "mei" },
  month_6:  { ti: "ሰነ",     ar: "يونيو",   en: "June",      nl: "juni" },
  month_7:  { ti: "ሓምለ",   ar: "يوليو",   en: "July",      nl: "juli" },
  month_8:  { ti: "ነሓሰ",   ar: "أغسطس",   en: "August",    nl: "augustus" },
  month_9:  { ti: "መስከረም", ar: "سبتمبر",  en: "September", nl: "september" },
  month_10: { ti: "ጥቅምቲ",  ar: "أكتوبر",  en: "October",   nl: "oktober" },
  month_11: { ti: "ሕዳር",   ar: "نوفمبر",  en: "November",  nl: "november" },
  month_12: { ti: "ታሕሳስ",  ar: "ديسمبر",  en: "December",  nl: "december" },

  /* country of birth — tap-to-choose list instead of free Latin-text typing (CW Q2) */
  f_country_pick:  { ti: "ሃገርኩም ምረጹ",            ar: "اختر بلدك",              en: "Choose your country",    nl: "Kies uw land" },
  country_other:   { ti: "ካልእ ሃገር",              ar: "بلد آخر",                en: "Another country",        nl: "Ander land" },

  /* split save vs submit + plain-language note on what is sent (CW Q3) */
  save_for_later:  { ti: "ንደሓር ኣቐምጥ",            ar: "احفظ لوقت لاحق",          en: "Save for later",         nl: "Bewaar voor later" },
  send_application:{ ti: "ሕተተይ ስደድ",             ar: "أرسل طلبي",              en: "Send my application",    nl: "Verstuur mijn aanvraag" },
  send_note:       { ti: "“ስደድ” ምስ ጠወቕኩም፣ ሓበሬታኹም ናብ መንግስቲ ኔዘርላንድ ጥራይ ይኸይድ — BSN ንምስራሕ።", ar: "عند الضغط على «أرسل»، تذهب بياناتك إلى الحكومة الهولندية فقط — لإنشاء BSN.", en: "When you tap Send, your details go only to the Dutch government — to create your BSN.", nl: "Als u op Versturen tikt, gaan uw gegevens alleen naar de Nederlandse overheid — om uw BSN aan te maken." },

  /* inline, in-language validation (CW Q4) */
  err_summary:     { ti: "ብቐይሕ ዝተመልከቱ ቦታታት ኣርሙ።", ar: "يرجى مراجعة الحقول المحددة بالأحمر.", en: "Please check the fields marked in red.", nl: "Controleer de velden die rood zijn gemarkeerd." },
  err_given:       { ti: "ናይ መጀመርታ ስምኩም ጽሓፉ።",   ar: "يرجى كتابة اسمك الأول.",   en: "Please write your first name.", nl: "Schrijf uw voornaam." },
  err_family:      { ti: "ናይ ስድራ ስምኩም ጽሓፉ።",     ar: "يرجى كتابة اسم عائلتك.",   en: "Please write your family name.", nl: "Schrijf uw achternaam." },
  err_dob:         { ti: "እንተወሓደ ናይ ልደት ዓመት ምረጹ።", ar: "اختر سنة ميلادك على الأقل.", en: "Please choose at least your year of birth.", nl: "Kies ten minste uw geboortejaar." },
  err_photo:       { ti: "ናይ ሰነድ ስእሊ ወስኹ።",       ar: "أضف صورة لمستندك.",        en: "Please add a photo of your document.", nl: "Voeg een foto van uw document toe." },

  /* resilient photo upload (CW Q4) */
  photo_added:     { ti: "ስእሊ ተወሲኹ",             ar: "تمت إضافة الصورة",        en: "Photo added",            nl: "Foto toegevoegd" },
  photo_retake:    { ti: "ንምቕያር ጠውቑ",            ar: "اضغط لإعادة الالتقاط",     en: "Tap to retake",          nl: "Tik om opnieuw te maken" },
  photo_lowdata:   { ti: "ኣብ ዝደኸመ መስመር ስእሊ ባዕሉ ይንእስ። እንተፈሺሉ፣ እንደገና ጠውቑ።", ar: "على اتصال بطيء يتم تصغير الصورة تلقائيًا. إن فشلت، اضغط للمحاولة مجددًا.", en: "On a slow connection the photo is made smaller automatically. If it fails, tap to try again.", nl: "Bij een trage verbinding wordt de foto automatisch verkleind. Als het mislukt, tik om opnieuw te proberen." },

  /* --- Task 3 (bank): provider guidance + jargon explainers + reassurance --- */
  bank_recommended:{ ti: "ዝሕበር",                 ar: "موصى به",                en: "Recommended",            nl: "Aanbevolen" },
  bank_basis_desc: { ti: "ነጻ። ናይ ኔዘርላንድ ኣድራሻ ኣየድልን። ኣፕ ብዓረብኛን እንግሊዝኛን።", ar: "مجاني. لا حاجة لعنوان هولندي. التطبيق بالعربية والإنجليزية.", en: "Free. No Dutch address needed. App in Arabic & English.", nl: "Gratis. Geen Nederlands adres nodig. App in Arabisch & Engels." },
  bank_volk_desc:  { ti: "ነጻ። ኣብ ኩሉ ከተማ ጨንፈር ኣሎ።", ar: "مجاني. فروع في كل مدينة.", en: "Free. Branches in every city.", nl: "Gratis. Filialen in elke stad." },
  bank_stad_desc:  { ti: "ነጻ። ምስ COA ይሰርሕ።",      ar: "مجاني. يتعاون مع COA.",    en: "Free. Works together with COA.", nl: "Gratis. Werkt samen met COA." },
  bank_more:       { ti: "ካልኦት ባንክታት ርአ",        ar: "شاهد بنوكًا أخرى",         en: "See other banks",        nl: "Bekijk andere banken" },
  bank_what_basic_q:{ ti: "“መሰረታዊ ሕሳብ” እንታይ ማለት ኢዩ?", ar: "ما هو «الحساب الأساسي»؟",  en: "What is a basic account?", nl: "Wat is een basisrekening?" },
  bank_what_basic_a:{ ti: "ገንዘብ ንምቕባልን ንምኽፋልን ዝኾውን ቀሊል ነጻ ሕሳብ። ክፍሊት የብሉን።", ar: "حساب بسيط مجاني لاستلام ودفع الأموال. بدون رسوم.", en: "A simple, free account to receive and pay money. No costs.", nl: "Een eenvoudige, gratis rekening om geld te ontvangen en te betalen. Geen kosten." },
  bank_what_iban_q:{ ti: "IBAN እንታይ ኢዩ?",         ar: "ما هو IBAN؟",            en: "What is an IBAN?",       nl: "Wat is een IBAN?" },
  bank_what_iban_a:{ ti: "ናይ ሕሳብኩም ቁጽሪ ኢዩ። ገንዘብ ምእንቲ ክስደደልኩም ንቐጣሪኹም ወይ COA ትህብዎ።", ar: "هو رقم حسابك. تعطيه لصاحب العمل أو COA ليُرسَل إليك المال.", en: "Your account number. You give it to your employer or COA so money can be sent to you.", nl: "Uw rekeningnummer. U geeft het aan uw werkgever of COA zodat er geld naar u kan worden gestuurd." },
  bank_no_fee:     { ti: "እዚ ነጻ ሕሳብ ይኸፍት። ሕጂ ገንዘብ ኮነ ክፍሊት የለን። ጸኒሕኩም ባንክ ክትቅይሩ ትኽእሉ።", ar: "هذا يفتح حسابًا مجانيًا. لا مال ولا رسوم الآن. يمكنك تغيير البنك لاحقًا.", en: "This opens a free account. No money and no fee now. You can change bank later.", nl: "Dit opent een gratis rekening. Nu geen geld en geen kosten. U kunt later van bank wisselen." },
  info_what:       { ti: "እዚ እንታይ ኢዩ?",          ar: "ما هذا؟",                en: "What is this?",          nl: "Wat is dit?" },

  /* --- review-annotation layer (sticky notes for the assignment) --- */
  notes_show:      { ti: "ለውጥታት ኣርኢ",            ar: "إظهار التغييرات",         en: "Show changes",           nl: "Wijzigingen tonen" },
  notes_hide:      { ti: "ለውጥታት ሕባእ",            ar: "إخفاء التغييرات",         en: "Hide changes",           nl: "Wijzigingen verbergen" }
};

function t(key, lang) {
  const entry = I18N[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}
