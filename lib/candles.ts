export interface Candle {
  id: string;
  name_en: string;
  name_cn: string;
  description_en: string;
  description_cn: string;
  price: number;
  color?: string;
  image_path: string;
}

export const CANDLES: Candle[] = [
  {
    id: "slim-taper",
    name_en: "Classic Slim Taper Candles",
    name_cn: "经典细长蜡烛",
    description_en: "Elegant and timeless slim tapered candles for refined celebrations",
    description_cn: "优雅经典的细长蜡烛，为精致庆典增添韵味",
    price: 8,
    color: "#FFD700",
    image_path: "/candles/slim-taper.svg",
  },
  {
    id: "spiral-twist",
    name_en: "Spiral Twist Candles",
    name_cn: "螺旋纹蜡烛",
    description_en: "Modern spiral-designed candles with mesmerizing twisted patterns",
    description_cn: "现代螺旋纹设计，充满视觉吸引力的缠绕图案",
    price: 10,
    color: "#FF6B9D",
    image_path: "/candles/spiral-twist.svg",
  },
  {
    id: "mini-birthday",
    name_en: "Mini Birthday Candles Pack",
    name_cn: "迷你生日蜡烛套装",
    description_en: "Colorful small candles perfect for cake decoration, 12-pack",
    description_cn: "五彩缤纷的迷你蜡烛，完美装饰蛋糕，12支装",
    price: 6,
    color: "#FF6B6B",
    image_path: "/candles/mini-birthday.svg",
  },
  {
    id: "number-candles",
    name_en: "Number Birthday Candles",
    name_cn: "数字生日蜡烛",
    description_en: "Elegant number-shaped candles for milestone birthdays (0-9 available)",
    description_cn: "优雅的数字蜡烛，庆祝周年和里程碑时刻",
    price: 12,
    color: "#FFE66D",
    image_path: "/candles/number-candles.svg",
  },
  {
    id: "pearl-cluster",
    name_en: "Pearl Cluster Candles",
    name_cn: "珍珠球形蜡烛簇",
    description_en: "Sophisticated pearl-shaped candle clusters for luxurious presentation",
    description_cn: "精致珍珠球蜡烛簇，彰显高端奢华感",
    price: 15,
    color: "#E2B4D9",
    image_path: "/candles/mini-birthday.svg",
  },
  {
    id: "glitter-candles",
    name_en: "Glitter Sparkle Candles",
    name_cn: "闪粉亮片蜡烛",
    description_en: "Dazzling glitter-coated candles that catch the light beautifully",
    description_cn: "闪闪发光的闪粉蜡烛，光彩璀璨",
    price: 11,
    color: "#87CEEB",
    image_path: "/candles/spiral-twist.svg",
  },
];
