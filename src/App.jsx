import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SummaryViewer from './components/SummaryViewer';
import QuizView from './components/QuizView';
import FlashcardsView from './components/FlashcardsView';
import MainIdeaAnalyzer from './components/MainIdeaAnalyzer';
import TeacherCommSimulator from './components/TeacherCommSimulator';
import ThaiLinguisticsTool from './components/ThaiLinguisticsTool';

import { courseModules } from './data/courseData';
import { allQuizQuestions, quizQuestionsSet1, quizQuestionsSet2, quizSets } from './data/quizData';

export default function App() {
  const [activeTab, setActiveTab] = useState('summary');
  const [activeModuleId, setActiveModuleId] = useState(courseModules[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalQuestions={allQuizQuestions.length}
      />

      <div className="layout-body">
        {activeTab === 'summary' && (
          <div className="summary-layout">
            <Sidebar
              modules={courseModules}
              activeModuleId={activeModuleId}
              setActiveModuleId={setActiveModuleId}
              searchQuery={searchQuery}
            />
            <SummaryViewer
              modules={courseModules}
              activeModuleId={activeModuleId}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {activeTab === 'quiz' && (
          <QuizView
            allQuestions={allQuizQuestions}
            set1Questions={quizQuestionsSet1}
            set2Questions={quizQuestionsSet2}
            quizSets={quizSets}
          />
        )}

        {activeTab === 'flashcards' && <FlashcardsView />}

        {activeTab === 'main-idea' && <MainIdeaAnalyzer />}

        {activeTab === 'teacher-comm' && <TeacherCommSimulator />}

        {activeTab === 'linguistics' && <ThaiLinguisticsTool />}
      </div>

      <footer className="main-footer">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p style={{ fontWeight: '600', color: '#334155', fontSize: '15px' }}>
            รายวิชา 020033401 ภาษาเพื่อการสื่อสารสำหรับครู (Language for Communication for Teachers)
          </p>
          <p style={{ marginTop: '6px', color: '#475569', fontSize: '13px' }}>
            อาจารย์ผู้สอน: รองศาสตราจารย์ ดร.พรวิไล สุขมาก | คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ (KMUTNB)
          </p>
          <p style={{ fontSize: '12px', marginTop: '10px', color: '#94a3b8' }}>
            สรุปเนื้อหาเข้มข้น ๘ หน่วยการเรียนรู้ + คลังข้อสอบ ๕๐ ข้อละเอียด 100% พร้อม ๓ เครื่องมือฝึกทักษะ Interactive
          </p>
        </div>
      </footer>
    </div>
  );
}
