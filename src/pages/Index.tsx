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
    description: 'Уникальная коллекция современного искусства и интерактивные инсталляции',
    image: 'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/91a270d3-1185-489d-bbce-0e2a52ce896b.jpg',
    price: 500,
    category: 'Искусство'
  },
  {
    id: 2,
    name: 'Исторический музей',
    description: 'Погрузитесь в историю через уникальные артефакты и экспозиции',
    image: 'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/629ca2c2-81fd-419a-b2e4-63185088c637.jpg',
    price: 400,
    category: 'История'
  },
  {
    id: 3,
    name: 'Музей науки и техники',
    description: 'Интерактивные экспонаты, демонстрации и научные эксперименты',
    image: 'https://cdn.poehali.dev/projects/7e7c7725-c77f-4448-88a5-a4f85ace8939/files/0a851476-2d06-4639-94a8-e569a11c7574.jpg',
    price: 450,
    category: 'Наука'
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

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${heroImages[heroImageIndex]})`,
            filter: 'brightness(0.4)'
          }}
        />
        
        <button
          onClick={() => setHeroImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
          aria-label="Предыдущее фото"
        >
          <Icon name="ChevronLeft" size={32} />
        </button>
        
        <button
          onClick={() => setHeroImageIndex((prev) => (prev + 1) % heroImages.length)}
          className="absolute right-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
          aria-label="Следующее фото"
        >
          <Icon name="ChevronRight" size={32} />
        </button>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === heroImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Фото ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Откройте мир культуры</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Выберите музей и начните ваше путешествие</p>
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => {
            document.getElementById('museums')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Посмотреть музеи
            <Icon name="ChevronDown" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="museums" className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши музеи</h2>
            <p className="text-xl text-muted-foreground">Выберите музей для посещения</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {museums.map((museum, index) => (
              <Card 
                key={museum.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/museum/${museum.id}`)}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={museum.image} 
                    alt={museum.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{museum.category}</Badge>
                    <span className="text-2xl font-bold text-primary">{museum.price}₽</span>
                  </div>
                  <CardTitle className="text-2xl">{museum.name}</CardTitle>
                  <CardDescription className="text-base">{museum.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                  >
                    Подробнее
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>



      <footer className="bg-secondary text-white py-12">
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