import React from 'react';
import { BookOpen, HelpCircle, Layers, Search, BookCheck, MessageSquare, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, searchQuery, setSearchQuery, totalQuestions }) {
  return (
    <header className="main-header">
      <div className="header-top">
        <div className="brand-logo">
          <div className="logo-badge" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#fff' }}>
            020033401
          </div>
          <div className="title-group">
            <h1>ภาษาเพื่อการสื่อสารสำหรับครู</h1>
            <p className="desktop-only">
              Language for Communication for Teachers | รศ.ดร.พรวิไล สุขมาก (สรุปเข้ม 8 หน่วย + คลังข้อสอบ {totalQuestions} ข้อ + 3 เครื่องมือ Interactive)
            </p>
          </div>
        </div>

        <div className="header-search">
          <div className="search-input-wrapper">
            <Search size={16} color="#64748b" />
            <input
              type="text"
              placeholder="ค้นหา (เช่น วัจนภาษา, อวัจนภาษา, ใจความสำคัญ, การฟัง, การพูด)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ fontSize: '12px', color: '#94a3b8', background: '#cbd5e1', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="nav-tabs-wrapper">
        <nav className="nav-tabs">
          <button
            className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            <BookOpen size={18} />
            <span>สรุปเนื้อหา <small className="tab-sub">8 หน่วย</small></span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <HelpCircle size={18} />
            <span>คลังข้อสอบ</span>
            <span className="tab-badge" style={{ background: '#dcfce7', color: '#15803d' }}>{totalQuestions} ข้อ</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
            onClick={() => setActiveTab('flashcards')}
          >
            <Layers size={18} />
            <span>Flashcards บัตรคำ</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'main-idea' ? 'active' : ''}`}
            onClick={() => setActiveTab('main-idea')}
          >
            <BookCheck size={18} />
            <span>วิเคราะห์ใจความสำคัญ</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'teacher-comm' ? 'active' : ''}`}
            onClick={() => setActiveTab('teacher-comm')}
          >
            <MessageSquare size={18} />
            <span>จำลองการสื่อสารของครู</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'linguistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('linguistics')}
          >
            <Sparkles size={18} />
            <span>โครงสร้างภาษา & คำถูก-ผิด</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
