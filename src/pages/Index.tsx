import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const museums = [
  {
    id: 1,
    name: 'Музей современного искусства',
    description: 'Коллекция современных произведений, инсталляций и скульптур',
    image: 'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/3e72b7f7-60f5-43ca-a216-a305beaef83d.jpg',
    price: 500,
    category: 'Искусство',
    icon: 'Palette'
  },
  {
    id: 2,
    name: 'Музей истории и культуры',
    description: 'Античные артефакты и культурное наследие цивилизаций',
    image: 'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/662d3793-11e4-43b9-b7ef-b3d88ef1c2dc.jpg',
    price: 400,
    category: 'История',
    icon: 'Landmark'
  },
  {
    id: 3,
    name: 'Музей науки и технологий',
    description: 'Интерактивные экспонаты и технологические инновации',
    image: 'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/18fa8389-2213-4b5a-885d-f65e880176ed.jpg',
    price: 450,
    category: 'Наука',
    icon: 'Atom'
  }
];

export default function Index() {
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const navigate = useNavigate();

  const heroImages = museums.map(m => m.image);

  return (
    <div className="min-h-screen">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Building2" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Музеи</h1>
          </div>
          <div className="flex gap-6">
            <a href="#museums" className="text-foreground hover:text-primary transition-colors">Музеи</a>
            <a href="#tickets" className="text-foreground hover:text-primary transition-colors">Билеты</a>
          </div>
        </div>
      </nav>

      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${heroImages[heroImageIndex]})`,
            filter: 'brightness(0.35)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-black/50" />
        
        <button
          onClick={() => setHeroImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all border border-white/20"
          aria-label="Предыдущее фото"
        >
          <Icon name="ChevronLeft" size={28} />
        </button>
        
        <button
          onClick={() => setHeroImageIndex((prev) => (prev + 1) % heroImages.length)}
          className="absolute right-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all border border-white/20"
          aria-label="Следующее фото"
        >
          <Icon name="ChevronRight" size={28} />
        </button>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroImageIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === heroImageIndex 
                  ? 'bg-white w-12' 
                  : 'bg-white/40 hover:bg-white/60 w-2'
              }`}
              aria-label={`Фото ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl animate-fade-in">
          <div className="mb-6">
            <Icon name="Building2" size={64} className="mx-auto opacity-90" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">Музеи города</h1>
          <p className="text-2xl md:text-3xl mb-10 text-blue-100 font-light">Откройте мир культуры, истории и науки</p>
          <Button size="lg" className="text-lg px-10 py-7 bg-white text-primary hover:bg-blue-50 shadow-2xl" onClick={() => {
            document.getElementById('museums')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Выбрать музей
            <Icon name="ArrowDown" size={22} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="museums" className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Наши музеи</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">Выберите музей для посещения и погрузитесь в мир знаний</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {museums.map((museum, index) => (
              <Card 
                key={museum.id} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-scale-in cursor-pointer border-2 hover:border-primary"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => navigate(`/museum/${museum.id}`)}
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={museum.image} 
                    alt={museum.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <Icon name={museum.icon} size={18} className="text-primary" />
                    <span className="text-sm font-semibold text-gray-900">{museum.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="text-lg font-bold">{museum.price}₽</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{museum.name}</h3>
                  </div>
                </div>
                <CardHeader className="pt-6">
                  <CardDescription className="text-base text-gray-600 leading-relaxed">{museum.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:scale-105 transition-all" 
                    size="lg"
                    variant="outline"
                  >
                    Посетить музей
                    <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>



      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 max-w-5xl mx-auto shadow-xl">
            <div className="text-center mb-12">
              <Icon name="Info" size={48} className="text-primary mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Информация для посетителей</h2>
              <p className="text-lg text-gray-600">Планируйте ваше посещение заранее</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
                <Icon name="Clock" size={40} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Режим работы</h3>
                <p className="text-gray-600">Вторник - Воскресенье</p>
                <p className="text-2xl font-bold text-primary mt-2">10:00 - 20:00</p>
                <p className="text-sm text-gray-500 mt-2">Понедельник - выходной</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
                <Icon name="Ticket" size={40} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Билеты</h3>
                <p className="text-gray-600">Стоимость входа</p>
                <p className="text-2xl font-bold text-primary mt-2">От 400 ₽</p>
                <p className="text-sm text-gray-500 mt-2">Льготные билеты доступны</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
                <Icon name="MapPin" size={40} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Адрес</h3>
                <p className="text-gray-600">Центр города</p>
                <p className="text-2xl font-bold text-primary mt-2">ул. Музейная, 1</p>
                <p className="text-sm text-gray-500 mt-2">Рядом с метро</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12">
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