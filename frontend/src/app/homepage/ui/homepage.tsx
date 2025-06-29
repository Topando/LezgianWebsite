"use client"

import styles from './homepage.module.css';

import { useRightNav } from '@/shared/context/RightNavContext';
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { useEffect } from 'react';


const sections = [
    { id: 'about-org', label: 'Об организации' },
    { id: 'structure', label: 'Структура' },
    { id: 'history', label: 'История' },
    { id: 'team', label: 'Команда' }
  ];

export function HomepageContent () {
    const { setContent } = useRightNav();

    useEffect(() => {
      setContent(<PageSectionsNav sections={sections} />);
      return () => setContent(null);
    }, [setContent]);

    return (
        <main className="space-y-8 pb-20">
      <section id="about-org" className="min-h-screen pt-20 px-4">
        <h2 className="text-2xl font-bold mb-4">Об организации</h2>
        <div className="space-y-4">
          <p>Мы - современная IT-компания, специализирующаяся на разработке инновационных решений.</p>
          <p>Основанная в 2010 году, наша компания прошла путь от небольшого стартапа до лидера рынка.</p>
          <p>Наши основные принципы: качество, инновации и забота о клиентах.</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>Ежегодно мы запускаем более 50 успешных проектов.</p>
          </div>
        </div>
      </section>

      <section id="structure" className="min-h-screen pt-20 px-4 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Структура компании</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Отдел разработки</h3>
            <p>50+ специалистов, 5 команд</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Отдел маркетинга</h3>
            <p>12 специалистов по digital-продвижению</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Отдел продаж</h3>
            <p>20 менеджеров по работе с клиентами</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">HR-отдел</h3>
            <p>8 специалистов по подбору персонала</p>
          </div>
        </div>
      </section>

      <section id="history" className="min-h-screen pt-20 px-4">
        <h2 className="text-2xl font-bold mb-4">История компании</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold">2010 - Основание</h3>
            <p>Компания начала работу с команды из 3 человек</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold">2014 - Первый миллион</h3>
            <p>Годовой оборот превысил $1 млн</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold">2018 - Выход на международный рынок</h3>
            <p>Открыты представительства в 3 странах</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold">2023 - Лидер рынка</h3>
            <p>Более 200 сотрудников, 5 офисов</p>
          </div>
        </div>
      </section>

      <section id="team" className="min-h-screen pt-20 px-4 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Наша команда</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3"></div>
              <h3 className="font-semibold">Сотрудник {i+1}</h3>
              <p className="text-gray-600 text-sm">Должность {i+1}</p>
              <p className="mt-2 text-sm">Опыт работы: {i+3} года</p>
            </div>
          ))}
        </div>
      </section>
    </main>
    )
}
