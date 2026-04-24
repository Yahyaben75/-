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
    similar?: string; // Optional similar word for the spy if we want to play 'word vs word' mode
  }>;
}

export const CATEGORIES: Category[] = [
  {
    id: 'food',
    name: 'أكلات ومطاعم',
    icon: 'Utensils',
    pairs: [
      { word: 'بيتزا' },
      { word: 'برجر' },
      { word: 'شاورما' },
      { word: 'كبسة' },
      { word: 'سوشي' },
      { word: 'ورق عنب' },
      { word: 'منسف' },
      { word: 'فلافل' },
      { word: 'كشري' },
      { word: 'باستا' },
    ]
  },
  {
    id: 'players',
    name: 'لاعبين كرة قدم',
    icon: 'Trophy',
    pairs: [
      { word: 'ميسي' },
      { word: 'رونالدو' },
      { word: 'نيمار' },
      { word: 'محمد صلاح' },
      { word: 'مبابي' },
      { word: 'هالاند' },
      { word: 'بنزيمة' },
      { word: 'مودريتش' },
      { word: 'ليفاندوفسكي' },
      { word: 'فينيسيوس' },
    ]
  },
  {
    id: 'anime',
    name: 'أنمي مشهور',
    icon: 'Tv',
    pairs: [
      { word: 'ون بيس' },
      { word: 'ناروتو' },
      { word: 'هجوم العمالقة' },
      { word: 'دراجون بول' },
      { word: 'قاتل الشياطين' },
      { word: 'هنتر x هنتر' },
      { word: 'المحقق كونان' },
      { word: 'جوجيتسو كايسن' },
      { word: 'بليتش' },
      { word: 'ديث نوت' },
    ]
  },
  {
    id: 'countries',
    name: 'دول',
    icon: 'Globe',
    pairs: [
      { word: 'السعودية' },
      { word: 'مصر' },
      { word: 'اليابان' },
      { word: 'البرازيل' },
      { word: 'فرنسا' },
      { word: 'المغرب' },
      { word: 'ألمانيا' },
      { word: 'إسبانيا' },
      { word: 'الصين' },
      { word: 'روسيا' },
    ]
  },
  {
    id: 'cities',
    name: 'مدن',
    icon: 'MapPin',
    pairs: [
      { word: 'الرياض' },
      { word: 'دبي' },
      { word: 'القاهرة' },
      { word: 'لندن' },
      { word: 'باريس' },
      { word: 'طوكيو' },
      { word: 'نيويورك' },
      { word: 'مكة' },
      { word: 'إسطنبول' },
      { word: 'الدار البيضاء' },
    ]
  },
  {
    id: 'animals',
    name: 'حيوانات',
    icon: 'Dog',
    pairs: [
      { word: 'قطة' },
      { word: 'أسد' },
      { word: 'نمر' },
      { word: 'فيل' },
      { word: 'زرافة' },
      { word: 'دب' },
      { word: 'صقر' },
      { word: 'قرش' },
      { word: 'حصان' },
      { word: 'جمل' },
    ]
  },
  {
    id: 'games',
    name: 'ألعاب فيديو (PC/Mobile)',
    icon: 'Gamepad2',
    pairs: [
      { word: 'ببجي' },
      { word: 'ماين كرافت' },
      { word: 'فورتنايت' },
      { word: 'فيفا (FC)' },
      { word: 'روبلوكس' },
      { word: 'كول اوف ديوتي' },
      { word: 'ليج اوف ليجيندز' },
      { word: 'جي تي ايه (GTA)' },
      { word: 'كلاش اوف كلانز' },
      { word: 'فالورانت' },
    ]
  },
  {
    id: 'clubs',
    name: 'أندية كرة قدم (الدوريات الـ5)',
    icon: 'Trophy',
    pairs: [
      { word: 'ريال مدريد' },
      { word: 'برشلونة' },
      { word: 'مانشستر سيتي' },
      { word: 'ليفربول' },
      { word: 'بايرن ميونخ' },
      { word: 'يوفنتوس' },
      { word: 'باريس سان جيرمان' },
      { word: 'ميلان' },
      { word: 'إنتر ميلان' },
      { word: 'أرسنال' },
      { word: 'مانشستر يونايتد' },
      { word: 'بوروسيا دورتموند' },
      { word: 'أتلتيكو مدريد' },
      { word: 'نابولي' },
      { word: 'تشيلسي' },
    ]
  }
];
