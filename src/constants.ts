/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Category {
  id: string;
  name: string;
  icon: string;
  pairs: Array<{
    word: string;
    spyHint: string;
    similar?: string; // Optional similar word for the spy if we want to play 'word vs word' mode
  }>;
}

export const CATEGORIES: Category[] = [
  {
    id: 'food',
    name: 'أكلات ومطاعم',
    icon: 'Utensils',
    pairs: [
      { word: 'بيتزا', spyHint: 'أكلة إيطالية دائرية' },
      { word: 'برجر', spyHint: 'ساندوتش أمريكي مشهور' },
      { word: 'شاورما', spyHint: 'لحم مشوي في سيخ' },
      { word: 'كبسة', spyHint: 'أرز ولحم سعودي' },
      { word: 'سوشي', spyHint: 'أكل ياباني بحري' },
      { word: 'ورق عنب', spyHint: 'محشي حامض ولذيذ' },
      { word: 'منسف', spyHint: 'أكلة أردنية باللبن' },
      { word: 'فلافل', spyHint: 'كرات مقلية من الحمص' },
      { word: 'كشري', spyHint: 'مزيج مصري من الأرز والمكرونة' },
      { word: 'باستا', spyHint: 'مكرونة إيطالية' },
    ]
  },
  {
    id: 'players',
    name: 'لاعبين كرة قدم',
    icon: 'Trophy',
    pairs: [
      { word: 'ميسي', spyHint: 'أسطورة برشلونة والأرجنتين' },
      { word: 'رونالدو', spyHint: 'الدون والهداف التاريخي' },
      { word: 'نيمار', spyHint: 'مهاري برازيلي' },
      { word: 'محمد صلاح', spyHint: 'الملك المصري' },
      { word: 'مبابي', spyHint: 'جوهرة فرنسا السريعة' },
      { word: 'هالاند', spyHint: 'المدمر النرويجي' },
      { word: 'بنزيمة', spyHint: 'الحكومة والمهاجم الفرنسي' },
      { word: 'مودريتش', spyHint: 'ساحر خط الوسط الكرواتي' },
      { word: 'ليفاندوفسكي', spyHint: 'القناص البولندي' },
      { word: 'فينيسيوس', spyHint: 'نجم ريال مدريد البرازيلي' },
    ]
  },
  {
    id: 'anime',
    name: 'أنمي مشهور',
    icon: 'Tv',
    pairs: [
      { word: 'ون بيس', spyHint: 'رحلة البحث عن الكنز' },
      { word: 'ناروتو', spyHint: 'عالم النينجا والشهاب' },
      { word: 'هجوم العمالقة', spyHint: 'القتال خلف الجدران' },
      { word: 'دراجون بول', spyHint: 'البحث عن كرات التنين' },
      { word: 'قاتل الشياطين', spyHint: 'تانيجرو يقاتل الأوني' },
      { word: 'هنتر x هنتر', spyHint: 'قناصين وقوة النين' },
      { word: 'المحقق كونان', spyHint: 'تقلص وحل الجرائم' },
      { word: 'جوجيتسو كايسن', spyHint: 'لعنات وسحرة' },
      { word: 'بليتش', spyHint: 'عالم الشينيغامي' },
      { word: 'ديث نوت', spyHint: 'مفكرة تقتل من يكتب فيها' },
    ]
  },
  {
    id: 'countries',
    name: 'دول',
    icon: 'Globe',
    pairs: [
      { word: 'السعودية', spyHint: 'أكبر دولة في شبه الجزيرة' },
      { word: 'مصر', spyHint: 'دولة النيل والأهرامات' },
      { word: 'اليابان', spyHint: 'كوكب التكنولوجيا' },
      { word: 'البرازيل', spyHint: 'بلد السامبا وكرة القدم' },
      { word: 'فرنسا', spyHint: 'دولة في أوروبا الغربية' },
      { word: 'المغرب', spyHint: 'دولة مغاربية عريقة' },
      { word: 'ألمانيا', spyHint: 'عملاق الصناعة الأوروبي' },
      { word: 'إسبانيا', spyHint: 'موطن مصارعة الثيران' },
      { word: 'الصين', spyHint: 'أكبر عدد سكان في آسيا' },
      { word: 'روسيا', spyHint: 'أكبر دولة مساحةً' },
    ]
  },
  {
    id: 'cities',
    name: 'مدن',
    icon: 'MapPin',
    pairs: [
      { word: 'الرياض', spyHint: 'عاصمة عربية كبرى' },
      { word: 'دبي', spyHint: 'مدينة الأبراج والتسوق' },
      { word: 'القاهرة', spyHint: 'مدينة الألف مئذنة' },
      { word: 'لندن', spyHint: 'ضباب وعاصمة بريطانية' },
      { word: 'باريس', spyHint: 'مدينة الأضواء' },
      { word: 'طوكيو', spyHint: 'عاصمة يابانية مزدحمة' },
      { word: 'نيويورك', spyHint: 'المدينة التي لا تنام' },
      { word: 'مكة', spyHint: 'أقدس مدينة' },
      { word: 'إسطنبول', spyHint: 'مدينة تصل قارتين' },
      { word: 'الدار البيضاء', spyHint: 'أكبر مدينة مغربية' },
    ]
  },
  {
    id: 'animals',
    name: 'حيوانات',
    icon: 'Dog',
    pairs: [
      { word: 'قطة', spyHint: 'حيوان أليف مشهور' },
      { word: 'أسد', spyHint: 'ملك الغابة القوي' },
      { word: 'نمر', spyHint: 'حيوان مفترس مخطط' },
      { word: 'فيل', spyHint: 'أكبر حيوان بري' },
      { word: 'زرافة', spyHint: 'أطول رقبة في العالم' },
      { word: 'دب', spyHint: 'حيوان ضخم يحب العسل' },
      { word: 'صقر', spyHint: 'طائر جارح حاد البصر' },
      { word: 'قرش', spyHint: 'ملك البحار المفترس' },
      { word: 'حصان', spyHint: 'حيوان يركب للسباق' },
      { word: 'جمل', spyHint: 'يصبر على العطش في الصحراء' },
    ]
  },
  {
    id: 'games',
    name: 'ألعاب فيديو (PC/Mobile)',
    icon: 'Gamepad2',
    pairs: [
      { word: 'ببجي', spyHint: 'لعبة باتل رويال مشهورة' },
      { word: 'ماين كرافت', spyHint: 'عالم مكعبات وبناء' },
      { word: 'فورتنايت', spyHint: 'بناء وقتال ورقصات' },
      { word: 'فيفا (FC)', spyHint: 'أشهر لعبة كرة قدم' },
      { word: 'روبلوكس', spyHint: 'منصة ألعاب متنوعة' },
      { word: 'كول اوف ديوتي', spyHint: 'حرب وإطلاق نار واقعي' },
      { word: 'ليج اوف ليجيندز', spyHint: 'لعبة موبا استراتيجية' },
      { word: 'جي تي ايه (GTA)', spyHint: 'عالم مفتوح وسيارات' },
      { word: 'كلاش اوف كلانز', spyHint: 'بناء قرية وهجوم' },
      { word: 'فالورانت', spyHint: 'لعبة تصويب تكتيكية' },
    ]
  },
  {
    id: 'clubs',
    name: 'أندية كرة قدم (الدوريات الـ5)',
    icon: 'Trophy',
    pairs: [
      { word: 'ريال مدريد', spyHint: 'ملك أوروبا والنادي الملكي' },
      { word: 'برشلونة', spyHint: 'نادي إقليم كتالونيا التاريخي' },
      { word: 'مانشستر سيتي', spyHint: 'بطل إنجلترا القوي حالياً' },
      { word: 'ليفربول', spyHint: 'نادي الريدز والأنفيلد' },
      { word: 'بايرن ميونخ', spyHint: 'كبير ألمانيا والبافاري' },
      { word: 'يوفنتوس', spyHint: 'السيدة العجوز في إيطاليا' },
      { word: 'باريس سان جيرمان', spyHint: 'عملاق العاصمة الفرنسية' },
      { word: 'ميلان', spyHint: 'عملاق إيطاليا بـ7 أبطال' },
      { word: 'إنتر ميلان', spyHint: 'النيرازوري وبطل إيطاليا' },
      { word: 'أرسنال', spyHint: 'المدفعجية في لندن' },
      { word: 'مانشستر يونايتد', spyHint: 'الشياطين الحمر العريق' },
      { word: 'بوروسيا دورتموند', spyHint: 'نادي الجدار الأصفر' },
      { word: 'أتلتيكو مدريد', spyHint: 'نادي الروخي بلانكوس' },
      { word: 'نابولي', spyHint: 'نادي الجنوب الإيطالي ومارادونا' },
      { word: 'تشيلسي', spyHint: 'نادي البلوز في لندن' },
    ]
  }
];
