import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Factory,
  Headphones,
  LayoutGrid,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  TimerReset,
  Trophy,
  Users,
  Wallet,
  Briefcase,
  Building2,
  BadgePercent,
  MessageSquare,
  Armchair,
  Package,
  Ruler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const sections = [
  "О компании",
  "Услуги",
  "Калькулятор",
  "Каталог",
  "Кейсы",
  "FAQ",
  "Заявка",
];

const services = [
  {
    icon: LayoutGrid,
    title: "Комплексное оснащение офисов",
    text: "Проектируем и поставляем мебель под задачи компании: от open space до кабинетов руководителей и переговорных.",
  },
  {
    icon: Ruler,
    title: "Планировка и 3D-концепция",
    text: "Делаем посадочный план, сценарии рассадки, подбор материалов и визуализации до старта закупки.",
  },
  {
    icon: Package,
    title: "Поставка, сборка и сервис",
    text: "Доставка по графику, монтаж в нерабочее время, гарантийное сопровождение и постгарантийный сервис.",
  },
  {
    icon: BadgePercent,
    title: "Тендеры и корпоративные условия",
    text: "Фиксируем цены, готовим КП за 24 часа, работаем с договорами, этапностью и закупочными процедурами.",
  },
];

const products = [
  {
    id: 1,
    name: "Ergo Motion Pro",
    category: "Кресло сотрудника",
    price: 28900,
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
    tag: "Хит B2B",
  },
  {
    id: 2,
    name: "Focus Desk Sit/Stand",
    category: "Регулируемый стол",
    price: 64900,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    tag: "Премиум",
  },
  {
    id: 3,
    name: "Meet Round Oak",
    category: "Стол переговорный",
    price: 89700,
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80",
    tag: "Новинка",
  },
  {
    id: 4,
    name: "Silent Pod Mini",
    category: "Акустическая кабина",
    price: 249000,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    tag: "Для open space",
  },
];

const cases = [
  {
    company: "IT-компания Novera",
    result: "+42% к комфорту команды по внутреннему опросу",
    story:
      "За 21 день оснастили новый офис на 120 рабочих мест: столы sit/stand, эргономичные кресла, кабинеты руководителей, зоны ожидания и кофе-пойнты.",
    metrics: ["120 мест", "21 день", "0 дней простоя"],
  },
  {
    company: "Юрфирма LexPoint",
    result: "Открытие филиала точно в срок",
    story:
      "Подобрали премиальную мебель для кабинетов партнёров и переговорных. Согласовали материалы под фирменный стиль, организовали ночной монтаж.",
    metrics: ["37 помещений", "14 поставщиков", "1 подрядчик"],
  },
  {
    company: "Финтех Orbit Pay",
    result: "Экономия 18% бюджета без потери качества",
    story:
      "Оптимизировали спецификацию, объединили поставки и предложили альтернативные модели. Клиент сохранил визуальный уровень и уложился в бюджет.",
    metrics: ["-18% бюджет", "9 недель", "3 сценария комплектации"],
  },
];

const faqs = [
  {
    q: "Можно ли заказать мебель под наш брендбук и планировку?",
    a: "Да. Мы подбираем материалы, цвета, формы и конфигурации под ваш стиль, задачи команд и архитектуру помещения.",
  },
  {
    q: "Как быстро вы готовите коммерческое предложение?",
    a: "Предварительное КП — в течение 24 часов. Детальная спецификация и визуализация зависят от объёма проекта, обычно 2–5 рабочих дней.",
  },
  {
    q: "Вы работаете только с крупными заказами?",
    a: "Нет. Мы комплектуем как небольшие офисы от 10 рабочих мест, так и штаб-квартиры, коворкинги и филиальные сети.",
  },
  {
    q: "Есть ли гарантия и сервис после поставки?",
    a: "Да. На все позиции действует гарантия, а также сервисное сопровождение: регулировка, замена элементов, дооснащение и релокация мебели.",
  },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

export default function OfficeFurnitureLanding() {
  const [activeCase, setActiveCase] = useState(0);
  const [cart, setCart] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    company: "",
    phone: "",
    seats: 40,
    message: "Нужна комплектация офиса под ключ: рабочие места, переговорные, зона ожидания.",
  });

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const estimate = useMemo(() => {
    const perSeat = 73500;
    const base = lead.seats * perSeat;
    const service = Math.round(base * 0.12);
    return { base, service, total: base + service };
  }, [lead.seats]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const submitForm = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3500);
  };

  return (
    <div className="min-h-screen bg-[#f3f1ec] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[15%] h-80 w-80 rounded-full bg-stone-300/50 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-orange-100/50 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f3f1ec]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl shadow-black/10">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">NordAxis Office</div>
              <div className="text-xs text-zinc-500">Офисная мебель для компаний, которые растут</div>
            </div>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {sections.map((item) => (
              <button
                key={item}
                onClick={() => {
                  const map = {
                    "О компании": "about",
                    "Услуги": "services",
                    "Калькулятор": "calculator",
                    "Каталог": "catalog",
                    "Кейсы": "cases",
                    "FAQ": "faq",
                    "Заявка": "contact",
                  };
                  scrollToId(map[item]);
                }}
                className="text-sm text-zinc-600 transition hover:text-zinc-900"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden rounded-full border-zinc-300 bg-white/60 px-5 lg:inline-flex"
              onClick={() => scrollToId("catalog")}
            >
              Купить мебель
            </Button>
            <Button
              className="rounded-full bg-zinc-900 px-5 text-white hover:bg-zinc-800"
              onClick={() => scrollToId("contact")}
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-10 pt-8 lg:grid-cols-[1.15fr_.85fr] lg:px-10 lg:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,.8),rgba(255,255,255,.45))] p-8 shadow-[0_30px_90px_rgba(0,0,0,.08)] lg:p-12"
          >
            <Badge className="mb-5 rounded-full bg-zinc-900 px-4 py-1.5 text-white hover:bg-zinc-900">
              Поставка офисной мебели под ключ по всей России
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Офис, в который хочется приходить и работать сильнее
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 md:text-lg">
              NordAxis Office — компания по поставке современной офисной мебели для растущих команд.
              Проектируем пространства, поставляем мебель, собираем и запускаем офис без хаоса,
              срывов сроков и бесконечных согласований.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                className="group rounded-full bg-zinc-900 px-6 py-6 text-white hover:bg-zinc-800"
                onClick={() => scrollToId("contact")}
              >
                Получить КП за 24 часа
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-zinc-300 bg-white/80 px-6 py-6"
                onClick={() => scrollToId("cases")}
              >
                Смотреть кейсы
              </Button>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ["12 лет", "на рынке B2B-мебели"],
                ["850+", "реализованных проектов"],
                ["97%", "клиентов приходят повторно"],
              ].map(([value, label]) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-black/5 bg-white/70 p-5 backdrop-blur"
                >
                  <div className="text-3xl font-semibold">{value}</div>
                  <div className="mt-2 text-sm leading-6 text-zinc-600">{label}</div>

            <div className="mt-6">
              <Button
                variant="outline"
                className="rounded-full px-6 py-5"
                onClick={() => scrollToId("calculator")}
              >
                Рассчитать бюджет
              </Button>
            </div>

          </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-zinc-900 text-white shadow-[0_30px_90px_rgba(0,0,0,.15)]"
          >
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80"
              alt="Современный офис"
              className="h-full min-h-[560px] w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
                Дизайн + эргономика + логистика в одном подрядчике
              </div>
              <div className="grid gap-3">
                {[
                  "Быстрый запуск офиса от 10 до 500+ рабочих мест",
                  "Покупка, заказ и дооснащение мебели прямо на сайте",
                  "Персональный менеджер и прозрачные сроки на каждом этапе",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                    <Check className="mt-0.5 h-5 w-5 text-emerald-300" />
                    <span className="text-sm leading-6 text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="calculator" className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Trophy, title: "Премиальные бренды", text: "Подбираем мебель под статус компании и ваш бюджет." },
              { icon: TimerReset, title: "Точные сроки", text: "Фиксируем график поставки и соблюдаем дедлайны." },
              { icon: Headphones, title: "Один контакт", text: "От замера до монтажа вас ведет один менеджер." },
              { icon: ShieldCheck, title: "Гарантия результата", text: "Подменный фонд, сервис и гарантийное сопровождение." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card className="rounded-[1.75rem] border-black/5 bg-white/70 shadow-lg shadow-black/5 backdrop-blur">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-lg font-semibold">{item.title}</div>
                      <div className="mt-2 text-sm leading-6 text-zinc-600">{item.text}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-black/5 bg-zinc-900 p-8 text-white shadow-[0_30px_80px_rgba(0,0,0,.12)] lg:p-10"
            >
              <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">О компании</div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Мы превращаем пустые метры в офисы, которые работают на бизнес
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/75 md:text-base">
                NordAxis Office — это не просто поставщик мебели. Мы соединяем маркетинговое мышление,
                эргономику, эстетику и бизнес-прагматичность. Поэтому наши проекты не только красиво выглядят,
                но и помогают компаниям нанимать сильных людей, удерживать команды и производить нужное впечатление на клиентов.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Собственное проектное бюро",
                  "Подбор под HR-бренд компании",
                  "Работаем с закупками и тендерами",
                  "Сервис после запуска офиса",
                ].map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/90">
                    {point}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid gap-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/70 p-6 shadow-lg shadow-black/5">
                  <Users className="h-8 w-8" />
                  <div className="mt-5 text-4xl font-semibold">5000+</div>
                  <div className="mt-2 text-sm leading-6 text-zinc-600">сотрудников ежедневно работают на мебели, которую мы поставили</div>
                </div>
                <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/70 p-6 shadow-lg shadow-black/5">
                  <Factory className="h-8 w-8" />
                  <div className="mt-5 text-4xl font-semibold">38</div>
                  <div className="mt-2 text-sm leading-6 text-zinc-600">проверенных фабрик и брендов в нашей партнерской сети</div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border border-black/5 shadow-lg shadow-black/5">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80"
                  alt="Рабочее пространство"
                  className="h-[320px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
                <div className="absolute left-6 top-6 max-w-sm rounded-3xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-lg">
                  <div className="text-lg font-medium">Подход, ориентированный на результат</div>
                  <div className="mt-2 text-sm leading-6 text-white/80">
                    Сначала считаем эффективность пространства, потом подбираем мебель. Так вы не переплачиваете и получаете офис, который помогает команде работать быстрее.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">Услуги</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Все, что нужно для запуска офиса без стресса</h2>
            </div>
            <div className="max-w-xl text-sm leading-7 text-zinc-600 md:text-base">
              Берем на себя стратегию, подбор, спецификацию, согласование, закупку, логистику, сборку и сервис.
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-[2rem] border border-black/5 bg-white/75 p-6 shadow-lg shadow-black/5 backdrop-blur"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white transition group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-xl font-semibold">{item.title}</div>
                  <div className="mt-3 text-sm leading-7 text-zinc-600">{item.text}</div>
                  <button onClick={() => scrollToId("contact")} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-900">
                    Обсудить проект <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <Card className="overflow-hidden rounded-[2rem] border-black/5 bg-white/70 shadow-lg shadow-black/5">
              <CardContent className="p-8 lg:p-10">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
                  <Wallet className="h-4 w-4" />
                  Калькулятор ориентировочного бюджета
                </div>
                <h3 className="text-2xl font-semibold md:text-4xl">Посчитайте стоимость оснащения офиса за 30 секунд</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 md:text-base">
                  Для предварительной оценки используем среднюю комплектацию рабочего места. Финальная цена зависит от бренда, материалов, количества зон и сроков проекта.
                </p>

                <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <div className="mb-3 flex items-center justify-between text-sm text-zinc-600">
                      <span>Количество рабочих мест</span>
                      <span className="font-semibold text-zinc-900">{lead.seats}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={300}
                      step={5}
                      value={lead.seats}
                      onChange={(e) => setLead({ ...lead, seats: Number(e.target.value) })}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200"
                    />
                    <div className="mt-6 grid gap-3 text-sm text-zinc-600 sm:grid-cols-3">
                      <div className="rounded-2xl bg-zinc-100 p-4">Мебель: <span className="font-semibold text-zinc-900">{formatPrice(estimate.base)}</span></div>
                      <div className="rounded-2xl bg-zinc-100 p-4">Сервис: <span className="font-semibold text-zinc-900">{formatPrice(estimate.service)}</span></div>
                      <div className="rounded-2xl bg-zinc-900 p-4 text-white">Итого: <span className="font-semibold">{formatPrice(estimate.total)}</span></div>
                    </div>
                  </div>
                  <Button onClick={() => scrollToId("contact")} className="rounded-full bg-zinc-900 px-6 py-6 text-white">
                    Запросить точный расчет
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-black/5 bg-zinc-900 text-white shadow-[0_30px_80px_rgba(0,0,0,.12)]">
              <CardContent className="p-8 lg:p-10">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90">
                  <Rocket className="h-4 w-4" />
                  Как мы работаем
                </div>
                <div className="space-y-5">
                  {[
                    ["01", "Бриф и аудит пространства"],
                    ["02", "Планировка и подбор решения"],
                    ["03", "Коммерческое предложение и согласование"],
                    ["04", "Поставка, монтаж, сервис"],
                  ].map(([num, label]) => (
                    <div key={num} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-zinc-900 font-semibold">{num}</div>
                      <div className="text-sm leading-6 text-white/85">{label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="catalog" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">Каталог и покупка</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Выберите мебель и добавьте в заявку прямо на сайте</h2>
            </div>
            <div className="max-w-xl text-sm leading-7 text-zinc-600 md:text-base">
              Ниже — демонстрационный каталог. Вы можете протестировать кнопки, собрать корзину и отправить заявку на закупку.
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-[2rem] border border-black/5 bg-white/75 shadow-lg shadow-black/5"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium backdrop-blur">{product.tag}</div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-zinc-500">{product.category}</div>
                    <div className="mt-1 text-2xl font-semibold tracking-tight">{product.name}</div>
                    <div className="mt-4 text-2xl font-semibold">{formatPrice(product.price)}</div>
                    <div className="mt-5 flex gap-3">
                      <Button className="flex-1 rounded-full bg-zinc-900 text-white" onClick={() => addToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Купить / в заявку
                      </Button>
                      <Button variant="outline" className="rounded-full" onClick={() => scrollToId("contact")}>Заказать проект</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="sticky top-24 h-fit rounded-[2rem] border border-black/5 bg-zinc-900 p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,.12)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold">Корзина / заявка</div>
                  <div className="mt-1 text-sm text-white/60">Проверьте позиции и отправьте запрос менеджеру</div>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm">{cart.reduce((sum, item) => sum + item.qty, 0)} шт.</div>
              </div>

              <div className="mt-6 space-y-3">
                {cart.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    Пока пусто. Добавьте мебель из каталога, чтобы протестировать покупку и оформление заявки.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="mt-1 text-sm text-white/60">{formatPrice(item.price)}</div>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-1">
                          <button className="px-2 text-white/70" onClick={() => changeQty(item.id, -1)}>-</button>
                          <span className="min-w-6 text-center text-sm">{item.qty}</span>
                          <button className="px-2 text-white/70" onClick={() => changeQty(item.id, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 rounded-2xl bg-white p-4 text-zinc-900">
                <div className="flex items-center justify-between text-sm text-zinc-500">
                  <span>Предварительная сумма</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-lg font-semibold">
                  <span>Итого к заявке</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button className="mt-5 w-full rounded-full bg-white text-zinc-900 hover:bg-zinc-100" onClick={() => scrollToId("contact")}>
                Перейти к оформлению
              </Button>
            </div>
          </div>
        </section>

        <section id="cases" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">Кейсы и истории</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Проекты, которые доказывают: хороший офис влияет на результат</h2>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setActiveCase((prev) => (prev - 1 + cases.length) % cases.length)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setActiveCase((prev) => (prev + 1) % cases.length)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]"
            >
              <div className="overflow-hidden rounded-[2rem] border border-black/5 shadow-lg shadow-black/5">
                <img
                  src={[
                    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
                  ][activeCase]}
                  alt={cases[activeCase].company}
                  className="h-full min-h-[420px] w-full object-cover"
                />
              </div>
              <div className="rounded-[2rem] border border-black/5 bg-white/75 p-8 shadow-lg shadow-black/5">
                <div className="inline-flex rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">{cases[activeCase].company}</div>
                <h3 className="mt-5 text-3xl font-semibold tracking-tight">{cases[activeCase].result}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">{cases[activeCase].story}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {cases[activeCase].metrics.map((metric) => (
                    <div key={metric} className="rounded-2xl bg-zinc-100 p-4 text-center text-sm font-medium">
                      {metric}
                    </div>
                  ))}
                </div>
                <Button className="mt-8 rounded-full bg-zinc-900 text-white" onClick={() => scrollToId("contact")}>
                  Хочу похожий результат
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Почему у нас высокий конверт в заказ",
                text: "Мы говорим на языке бизнеса: сроки, экономика, бренд работодателя, удобство команд и прозрачность закупки.",
                icon: MessageSquare,
              },
              {
                title: "Что получает клиент",
                text: "Не набор столов и кресел, а управляемый проект с понятным бюджетом, результатом и персональной ответственностью подрядчика.",
                icon: Briefcase,
              },
              {
                title: "Что получает команда",
                text: "Эргономику, меньше усталости, лучшее впечатление от офиса и комфорт, который чувствуется каждый день.",
                icon: Armchair,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-[2rem] border border-black/5 bg-gradient-to-br from-white to-white/70 p-7 shadow-lg shadow-black/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-2xl font-semibold tracking-tight">{item.title}</div>
                  <div className="mt-3 text-sm leading-7 text-zinc-600">{item.text}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
          <div className="text-center">
            <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">FAQ</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Частые вопросы перед заказом</h2>
          </div>
          <div className="mt-10 space-y-4">
            {faqs.map((item, idx) => (
              <div key={item.q} className="overflow-hidden rounded-[1.75rem] border border-black/5 bg-white/75 shadow-lg shadow-black/5">
                <button
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                >
                  <span className="text-lg font-medium">{item.q}</span>
                  <ChevronDown className={`h-5 w-5 transition ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm leading-7 text-zinc-600">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[.92fr_1.08fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-black/5 bg-zinc-900 p-8 text-white shadow-[0_30px_80px_rgba(0,0,0,.12)] lg:p-10"
            >
              <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">Оставить заявку на заказ</div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
                Получите персональное предложение и план комплектации офиса
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
                Оставьте контакты — менеджер NordAxis Office свяжется с вами, уточнит задачу и подготовит сильное коммерческое предложение под ваш офис, бюджет и сроки.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  [Phone, "+7 (495) 180-24-88"],
                  [MapPin, "Москва, Пресненская наб., 12"],
                  [Star, "Рейтинг клиентского сервиса 4.9/5"],
                ].map(([Icon, text], idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Icon className="h-5 w-5 text-white/80" />
                    <span className="text-sm text-white/85">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={submitForm}
              className="rounded-[2rem] border border-black/5 bg-white/80 p-8 shadow-lg shadow-black/5 backdrop-blur lg:p-10"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-600">Ваше имя</label>
                  <Input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Анна" className="h-12 rounded-2xl border-zinc-200 bg-white" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-600">Компания</label>
                  <Input value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} placeholder="ООО Вектор" className="h-12 rounded-2xl border-zinc-200 bg-white" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-600">Телефон</label>
                  <Input value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} placeholder="+7 (999) 123-45-67" className="h-12 rounded-2xl border-zinc-200 bg-white" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-600">Рабочих мест</label>
                  <Input type="number" value={lead.seats} onChange={(e) => setLead({ ...lead, seats: Number(e.target.value || 0) })} placeholder="40" className="h-12 rounded-2xl border-zinc-200 bg-white" />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm text-zinc-600">Что нужно оснастить</label>
                <Textarea value={lead.message} onChange={(e) => setLead({ ...lead, message: e.target.value })} className="min-h-[140px] rounded-[1.5rem] border-zinc-200 bg-white" />
              </div>

              <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-sm leading-6 text-zinc-500">
                  Нажимая кнопку, вы тестируете форму отправки заявки. После отправки показывается интерактивное подтверждение.
                </div>
                <Button type="submit" className="rounded-full bg-zinc-900 px-6 py-6 text-white">
                  Отправить заявку
                </Button>
              </div>

              <AnimatePresence>
                {formSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="mt-5 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
                  >
                    Спасибо! Заявка успешно отправлена. Менеджер NordAxis Office свяжется с вами для уточнения деталей проекта.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-white/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.2fr_.8fr_.8fr_.8fr] lg:px-10">
          <div>
            <div className="text-2xl font-semibold">NordAxis Office</div>
            <div className="mt-3 max-w-sm text-sm leading-7 text-zinc-600">
              Современная офисная мебель, проекты под ключ, эргономика, логистика и сильный визуальный стиль для компаний, которые растут.
            </div>
          </div>
          <div>
            <div className="font-medium">Навигация</div>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <button className="block" onClick={() => scrollToId("about")}>О компании</button>
              <button className="block" onClick={() => scrollToId("services")}>Услуги</button>
              <button className="block" onClick={() => scrollToId("catalog")}>Каталог</button>
            </div>
          </div>
          <div>
            <div className="font-medium">Продажи</div>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <div>КП за 24 часа</div>
              <div>Тендерные поставки</div>
              <div>Поставка и монтаж</div>
            </div>
          </div>
          <div>
            <div className="font-medium">Контакты</div>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <div>+7 (495) 180-24-88</div>
              <div>sales@nordaxis-office.ru</div>
              <div>Москва, Пресненская наб., 12</div>
            </div>
          </div>
        </div>
      </footer>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-24px)] max-w-xl -translate-x-1/2 rounded-full border border-white/60 bg-white/80 p-2 shadow-[0_20px_60px_rgba(0,0,0,.12)] backdrop-blur-xl"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="px-3 text-sm text-zinc-600">
            Готовы обсудить проект на <span className="font-semibold text-zinc-900">{lead.seats} мест</span>?
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full" onClick={() => scrollToId("catalog")}>
              Купить мебель
            </Button>
            <Button className="rounded-full bg-zinc-900 text-white" onClick={() => scrollToId("contact")}>
              Оставить заявку
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
