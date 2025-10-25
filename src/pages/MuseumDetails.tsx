import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const museums = [
  {
    id: 1,
    name: 'Музей современного искусства',
    description: 'Уникальная коллекция современного искусства и интерактивные инсталляции',
    fullDescription: 'Один из крупнейших музеев современного искусства в регионе. Здесь представлены работы ведущих художников XX и XXI века, включая живопись, скульптуру, инсталляции и медиа-арт. Музей регулярно проводит временные выставки, мастер-классы и образовательные программы.',
    images: [
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/91a270d3-1185-489d-bbce-0e2a52ce896b.jpg',
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/629ca2c2-81fd-419a-b2e4-63185088c637.jpg',
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/0a851476-2d06-4639-94a8-e569a11c7574.jpg'
    ],
    price: 500,
    category: 'Искусство',
    schedule: 'Вт-Вс 10:00-20:00',
    address: 'ул. Искусств, д. 10'
  },
  {
    id: 2,
    name: 'Исторический музей',
    description: 'Погрузитесь в историю через уникальные артефакты и экспозиции',
    fullDescription: 'Исторический музей предлагает уникальное путешествие сквозь века. Экспозиция охватывает период от древних времён до современности. В коллекции представлены археологические находки, предметы быта, оружие, документы и фотографии, рассказывающие о ключевых событиях истории.',
    images: [
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/629ca2c2-81fd-419a-b2e4-63185088c637.jpg',
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/0a851476-2d06-4639-94a8-e569a11c7574.jpg',
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/91a270d3-1185-489d-bbce-0e2a52ce896b.jpg'
    ],
    price: 400,
    category: 'История',
    schedule: 'Ср-Вс 11:00-19:00',
    address: 'пл. Истории, д. 1'
  },
  {
    id: 3,
    name: 'Музей науки и техники',
    description: 'Интерактивные экспонаты, демонстрации и научные эксперименты',
    fullDescription: 'Современный интерактивный музей науки и техники, где можно не только смотреть, но и трогать экспонаты. Представлены разделы физики, химии, астрономии, робототехники и других научных направлений. Проводятся научные шоу, лекции и практические занятия для всех возрастов.',
    images: [
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/0a851476-2d06-4639-94a8-e569a11c7574.jpg',
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/91a270d3-1185-489d-bbce-0e2a52ce896b.jpg',
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/629ca2c2-81fd-419a-b2e4-63185088c637.jpg'
    ],
    price: 450,
    category: 'Наука',
    schedule: 'Ежедневно 10:00-21:00',
    address: 'просп. Науки, д. 25'
  },
  {
    id: 4,
    name: 'Художественная галерея',
    description: 'Произведения классического и современного изобразительного искусства',
    fullDescription: 'Художественная галерея представляет обширную коллекцию живописи, графики и скульптуры. В постоянной экспозиции представлены шедевры русской и зарубежной живописи от эпохи Возрождения до наших дней. Регулярно проводятся персональные выставки современных художников и тематические проекты.',
    images: [
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/08e35c00-8b7a-426c-8366-025fa7c26fa9.jpg',
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/91a270d3-1185-489d-bbce-0e2a52ce896b.jpg',
      'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/629ca2c2-81fd-419a-b2e4-63185088c637.jpg'
    ],
    price: 550,
    category: 'Живопись',
    schedule: 'Вт-Вс 11:00-19:00',
    address: 'ул. Галерейная, д. 5'
  }
];

export default function MuseumDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [date, setDate] = useState<Date>();
  const [ticketCount, setTicketCount] = useState(1);

  const museum = museums.find(m => m.id === Number(id));

  if (!museum) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Музей не найден</h1>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const totalPrice = museum.price * ticketCount;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Icon name="ArrowLeft" size={20} />
            Назад
          </Button>
          <div className="flex items-center gap-2">
            <Icon name="Building2" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Музеи</h1>
          </div>
          <div className="w-24"></div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative h-[500px] rounded-xl overflow-hidden group">
              <img
                src={museum.images[currentImageIndex]}
                alt={museum.name}
                className="w-full h-full object-cover"
              />
              
              {museum.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + museum.images.length) % museum.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-3 rounded-full transition-all shadow-lg"
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </button>
                  
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % museum.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-3 rounded-full transition-all shadow-lg"
                  >
                    <Icon name="ChevronRight" size={24} />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {museum.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white w-8'
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {museum.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-32 rounded-lg overflow-hidden transition-all ${
                    index === currentImageIndex
                      ? 'ring-4 ring-primary'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${museum.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">{museum.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{museum.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{museum.description}</p>
              <p className="text-lg leading-relaxed">{museum.fullDescription}</p>
            </div>

            <div className="space-y-4 p-6 bg-muted rounded-xl">
              <div className="flex items-center gap-3">
                <Icon name="Clock" size={24} className="text-primary" />
                <div>
                  <p className="font-semibold">Режим работы</p>
                  <p className="text-muted-foreground">{museum.schedule}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Icon name="MapPin" size={24} className="text-primary" />
                <div>
                  <p className="font-semibold">Адрес</p>
                  <p className="text-muted-foreground">{museum.address}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Icon name="Ticket" size={24} className="text-primary" />
                <div>
                  <p className="font-semibold">Стоимость билета</p>
                  <p className="text-2xl font-bold text-primary">{museum.price}₽</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Купить билеты</CardTitle>
            <CardDescription className="text-base">Выберите дату и количество билетов</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base">Дата посещения</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-12"
                  >
                    <Icon name="Calendar" className="mr-2" size={20} />
                    {date ? format(date, 'PPP', { locale: ru }) : 'Выберите дату'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tickets" className="text-base">Количество билетов</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                >
                  <Icon name="Minus" size={20} />
                </Button>
                <Input
                  id="tickets"
                  type="number"
                  min="1"
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-center text-xl font-semibold h-12"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setTicketCount(ticketCount + 1)}
                >
                  <Icon name="Plus" size={20} />
                </Button>
              </div>
            </div>

            <div className="p-6 bg-muted rounded-lg">
              <div className="flex items-center justify-between text-lg mb-2">
                <span className="text-muted-foreground">Цена билета:</span>
                <span className="font-semibold">{museum.price}₽</span>
              </div>
              <div className="flex items-center justify-between text-lg mb-4">
                <span className="text-muted-foreground">Количество:</span>
                <span className="font-semibold">{ticketCount}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-2xl">
                  <span className="font-bold">Итого:</span>
                  <span className="font-bold text-primary">{totalPrice}₽</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full h-14 text-lg" 
              size="lg"
              disabled={!date}
            >
              <Icon name="Ticket" size={24} className="mr-2" />
              Купить билеты
            </Button>
          </CardFooter>
        </Card>
      </div>

      <footer className="bg-secondary text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Building2" size={32} />
            <h3 className="text-2xl font-bold">Музеи</h3>
          </div>
          <p className="text-white/80 mb-6">Откройте мир культуры и искусства</p>
          <div className="flex justify-center gap-6">
            <Icon name="Mail" size={24} className="cursor-pointer hover:text-primary transition-colors" />
            <Icon name="Phone" size={24} className="cursor-pointer hover:text-primary transition-colors" />
            <Icon name="MapPin" size={24} className="cursor-pointer hover:text-primary transition-colors" />
          </div>
          <p className="mt-8 text-sm text-white/60">© 2024 Музеи. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}