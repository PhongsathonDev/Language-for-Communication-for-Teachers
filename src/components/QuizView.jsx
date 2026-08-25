import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw, Award, Filter,
  ArrowRight, BookOpen, Layers, Shuffle, Star, Trash2, RefreshCw, BarChart2
} from 'lucide-react';

export default function QuizView({ allQuestions = [], set1Questions = [], set2Questions = [], quizSets = [] }) {
  const pool = allQuestions;

  // Persistent States from LocalStorage
  const [userAnswers, setUserAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('thai_teacher_quiz_answers_v1');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('thai_teacher_quiz_bookmarks_v1');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [selectedSet, setSelectedSet] = useState(() => {
    return localStorage.getItem('thai_teacher_quiz_set_v1') || 'all';
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mode, setMode] = useState('practice'); // 'practice' or 'exam'
  const [isShuffle, setIsShuffle] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('thai_teacher_quiz_answers_v1', JSON.stringify(userAnswers));
    } catch (e) {}
  }, [userAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem('thai_teacher_quiz_bookmarks_v1', JSON.stringify(bookmarks));
    } catch (e) {}
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('thai_teacher_quiz_set_v1', selectedSet);
    } catch (e) {}
  }, [selectedSet]);

  // Filter pool by question set
  const setFilteredQuestions = useMemo(() => {
    const targetSet = quizSets.find(s => s.id === selectedSet);
    if (targetSet && targetSet.questions) {
      return targetSet.questions;
    }
    if (selectedSet === 'set1') return set1Questions;
    if (selectedSet === 'set2') return set2Questions;
    return pool;
  }, [selectedSet, pool, set1Questions, set2Questions, quizSets]);

  // Categories list for active set
  const categories = useMemo(() => {
    const rawCats = [...new Set(setFilteredQuestions.map(q => q.unitTitle || `หน่วยที่ ${q.unit}`))];
    return ['All', '⭐ ข้อที่บันทึกไว้ (Starred)', '❌ ข้อที่ตอบผิด (Wrong)', ...rawCats];
  }, [setFilteredQuestions]);

  // Helper to get correct answer index safely
  const getCorrectAnswer = (q) => {
    return q.correctAnswer !== undefined ? q.correctAnswer : q.correctIndex;
  };

  // Filter by category / stars / wrong
  const baseFilteredQuestions = useMemo(() => {
    if (selectedCategory === 'All') return setFilteredQuestions;
    if (selectedCategory === '⭐ ข้อที่บันทึกไว้ (Starred)') {
      return setFilteredQuestions.filter(q => bookmarks[q.id]);
    }
    if (selectedCategory === '❌ ข้อที่ตอบผิด (Wrong)') {
      return setFilteredQuestions.filter(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== getCorrectAnswer(q));
    }
    return setFilteredQuestions.filter(q => (q.unitTitle || `หน่วยที่ ${q.unit}`) === selectedCategory);
  }, [selectedCategory, setFilteredQuestions, bookmarks, userAnswers]);

  // Shuffle questions if isShuffle is enabled
  const filteredQuestions = useMemo(() => {
    if (!isShuffle) return baseFilteredQuestions;
    const arr = [...baseFilteredQuestions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseFilteredQuestions, isShuffle, shuffleSeed]);

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0];

  const handleSelectOption = (qId, optionIdx) => {
    if (isSubmitted && mode === 'exam') return;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const toggleBookmark = (qId) => {
    setBookmarks(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleCalculateScore = () => {
    let score = 0;
    filteredQuestions.forEach(q => {
      if (userAnswers[q.id] === getCorrectAnswer(q)) {
        score++;
      }
    });
    return score;
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    const score = handleCalculateScore();
    const percent = Math.round((score / (filteredQuestions.length || 1)) * 100);
    if (percent >= 70) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleResetCurrentQuiz = () => {
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  // Full reset with confirmation
  const handleClearAllProgress = () => {
    if (window.confirm("คุณต้องการล้างประวัติการตอบข้อสอบทั้งหมด และเริ่มทำใหม่ใช่หรือไม่?")) {
      setUserAnswers({});
      setIsSubmitted(false);
      setCurrentIdx(0);
      try {
        localStorage.removeItem('thai_teacher_quiz_answers_v1');
      } catch (e) {}
    }
  };

  const handleToggleShuffle = () => {
    setIsShuffle(prev => !prev);
    setShuffleSeed(prev => prev + 1);
    setCurrentIdx(0);
  };

  const handleReShuffle = () => {
    setShuffleSeed(prev => prev + 1);
    setCurrentIdx(0);
  };

  const handleSetChange = (newSetId) => {
    setSelectedSet(newSetId);
    setSelectedCategory('All');
    handleResetCurrentQuiz();
  };

  const handleCategoryChange = (newCat) => {
    setSelectedCategory(newCat);
    handleResetCurrentQuiz();
  };

  // Statistics calculation
  const setTotalCount = setFilteredQuestions.length;
  const setAnsweredCount = setFilteredQuestions.filter(q => userAnswers[q.id] !== undefined).length;
  const setCorrectCount = setFilteredQuestions.filter(q => userAnswers[q.id] === getCorrectAnswer(q)).length;
  const setWrongCount = setFilteredQuestions.filter(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== getCorrectAnswer(q)).length;

  const currentScore = handleCalculateScore();
  const currentPercentage = Math.round((currentScore / (filteredQuestions.length || 1)) * 100);

  return (
    <div className="quiz-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Question Set Selection Tabs */}
      <div className="quiz-set-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', marginBottom: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Layers size={18} color="#4f46e5" />
          <strong style={{ color: '#0f172a', fontSize: '15px' }}>เลือกชุดข้อสอบ:</strong>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {quizSets.map((qs) => (
            <button
              key={qs.id}
              onClick={() => handleSetChange(qs.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: selectedSet === qs.id ? '600' : '400',
                background: selectedSet === qs.id ? '#4f46e5' : '#f8fafc',
                color: selectedSet === qs.id ? '#ffffff' : '#334155',
                border: '1px solid ' + (selectedSet === qs.id ? '#4f46e5' : '#cbd5e1'),
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {qs.title}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Persistence Overview Bar */}
      <div className="quiz-stats-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', marginBottom: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <BarChart2 size={16} color="#4f46e5" />
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>สถิติความคืบหน้าภาพรวม (บันทึกอัตโนมัติ):</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#475569' }}>
              <span>ทำแล้ว: <strong>{setAnsweredCount}/{setTotalCount}</strong></span>
              <span style={{ color: '#059669' }}>ตอบถูก: <strong>{setCorrectCount}</strong></span>
              <span style={{ color: '#e11d48' }}>ตอบผิด: <strong>{setWrongCount}</strong></span>
              <span>คงเหลือ: <strong>{setTotalCount - setAnsweredCount}</strong></span>
            </div>
          </div>

          <button
            onClick={handleClearAllProgress}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              padding: '6px 12px',
              color: '#e11d48',
              border: '1px solid #fecdd3',
              borderRadius: '8px',
              background: '#fff1f2',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <Trash2 size={14} /> ล้างประวัติ (Reset)
          </button>
        </div>

        {/* Progress Fill Bar */}
        <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: `${(setCorrectCount / (setTotalCount || 1)) * 100}%`, background: '#10b981', transition: 'width 0.3s ease' }} title="ตอบถูก" />
          <div style={{ width: `${(setWrongCount / (setTotalCount || 1)) * 100}%`, background: '#ef4444', transition: 'width 0.3s ease' }} title="ตอบผิด" />
        </div>
      </div>

      {/* Mode, Random & Category Toolbar */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b' }}>โหมด:</span>
          <button
            onClick={() => { setMode('practice'); setIsSubmitted(false); }}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: mode === 'practice' ? '600' : '400',
              background: mode === 'practice' ? '#4f46e5' : '#f8fafc',
              color: mode === 'practice' ? '#ffffff' : '#334155',
              border: '1px solid ' + (mode === 'practice' ? '#4f46e5' : '#cbd5e1'),
              cursor: 'pointer'
            }}
          >
            Practice (เฉลยทันที)
          </button>

          <button
            onClick={() => { setMode('exam'); setIsSubmitted(false); }}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: mode === 'exam' ? '600' : '400',
              background: mode === 'exam' ? '#4f46e5' : '#f8fafc',
              color: mode === 'exam' ? '#ffffff' : '#334155',
              border: '1px solid ' + (mode === 'exam' ? '#4f46e5' : '#cbd5e1'),
              cursor: 'pointer'
            }}
          >
            Exam (จำลองสอบจับคะแนน)
          </button>

          <button
            onClick={handleToggleShuffle}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              background: isShuffle ? '#eeefff' : '#f8fafc',
              color: isShuffle ? '#4f46e5' : '#475569',
              border: '1px solid ' + (isShuffle ? '#4f46e5' : '#cbd5e1'),
              cursor: 'pointer'
            }}
          >
            <Shuffle size={14} /> {isShuffle ? 'สุ่มข้อ: เปิด' : 'สุ่มลำดับข้อ'}
          </button>

          {isShuffle && (
            <button
              onClick={handleReShuffle}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                background: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={13} /> สุ่มใหม่
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '240px' }}>
          <Filter size={16} color="#64748b" />
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              width: '100%',
              background: '#ffffff',
              color: '#0f172a'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'All' ? `ทุกหน่วยการเรียนรู้ (${setFilteredQuestions.length} ข้อ)` : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exam Result Banner if submitted */}
      {isSubmitted && (
        <div
          style={{
            background: currentPercentage >= 70 ? '#ecfdf5' : '#fff1f2',
            border: `2px solid ${currentPercentage >= 70 ? '#10b981' : '#f43f5e'}`,
            borderRadius: '16px',
            textAlign: 'center',
            padding: '32px',
            marginBottom: '20px'
          }}
        >
          <Award size={48} color={currentPercentage >= 70 ? '#059669' : '#e11d48'} style={{ margin: '0 auto 12px auto' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: currentPercentage >= 70 ? '#065f46' : '#9f1239' }}>
            {currentPercentage >= 70 ? '🎉 ยอดเยี่ยมมาก! คุณผ่านเกณฑ์การทดสอบ' : '💪 พยายามอีกนิด! ลองทบทวนสรุปเนื้อหาเพิ่มเติม'}
          </h2>
          <p style={{ fontSize: '18px', margin: '8px 0 16px 0', color: '#1e293b' }}>
            คุณทำคะแนนได้ <strong>{currentScore}</strong> จากทั้งหมด <strong>{filteredQuestions.length}</strong> ข้อ ({currentPercentage}%)
          </p>
          <button
            onClick={handleResetCurrentQuiz}
            style={{
              padding: '10px 24px',
              background: '#4f46e5',
              color: '#ffffff',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={16} style={{ display: 'inline', marginRight: '6px' }} /> ทำข้อสอบใหม่อีกครั้ง
          </button>
        </div>
      )}

      {/* Main Question Card */}
      {currentQ ? (
        <div className="quiz-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', background: '#eeefff', color: '#4f46e5', padding: '4px 10px', borderRadius: '6px' }}>
                ข้อที่ {currentIdx + 1} / {filteredQuestions.length}
              </span>
              <span style={{ fontSize: '12px', background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '6px' }}>
                {currentQ.unitTitle || `หน่วยที่ ${currentQ.unit}`}
              </span>
            </div>

            {/* Bookmark Star Button */}
            <button
              onClick={() => toggleBookmark(currentQ.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                background: bookmarks[currentQ.id] ? '#fffbeb' : '#f8fafc',
                color: bookmarks[currentQ.id] ? '#d97706' : '#64748b',
                border: '1px solid ' + (bookmarks[currentQ.id] ? '#fcd34d' : '#e2e8f0'),
                padding: '5px 10px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <Star size={15} fill={bookmarks[currentQ.id] ? '#d97706' : 'none'} color={bookmarks[currentQ.id] ? '#d97706' : '#64748b'} />
              {bookmarks[currentQ.id] ? 'บันทึกแล้ว' : 'ติดดาวข้อนี้'}
            </button>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', lineHeight: '1.6', marginBottom: '20px' }}>
            {currentQ.question}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = userAnswers[currentQ.id] === optIdx;
              const isCorrect = optIdx === getCorrectAnswer(currentQ);

              let itemBg = '#ffffff';
              let itemBorder = '#e2e8f0';
              let itemColor = '#1e293b';

              if (mode === 'practice' && userAnswers[currentQ.id] !== undefined) {
                if (isCorrect) {
                  itemBg = '#ecfdf5';
                  itemBorder = '#10b981';
                  itemColor = '#065f46';
                } else if (isSelected && !isCorrect) {
                  itemBg = '#fef2f2';
                  itemBorder = '#ef4444';
                  itemColor = '#991b1b';
                }
              } else if (mode === 'exam') {
                if (isSelected) {
                  itemBg = '#eeefff';
                  itemBorder = '#4f46e5';
                }
                if (isSubmitted) {
                  if (isCorrect) {
                    itemBg = '#ecfdf5';
                    itemBorder = '#10b981';
                  } else if (isSelected && !isCorrect) {
                    itemBg = '#fef2f2';
                    itemBorder = '#ef4444';
                  }
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: `2px solid ${itemBorder}`,
                    background: itemBg,
                    color: itemColor,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    textAlign: 'left',
                    cursor: (isSubmitted && mode === 'exam') ? 'default' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{
                    minWidth: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    background: isSelected ? '#4f46e5' : '#f1f5f9',
                    color: isSelected ? '#ffffff' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '700',
                    marginTop: '2px'
                  }}>
                    {['ก', 'ข', 'ค', 'ง'][optIdx]}
                  </span>
                  <span style={{ fontSize: '15px', lineHeight: '1.6', flex: 1 }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Practice mode instant explanation */}
          {mode === 'practice' && userAnswers[currentQ.id] !== undefined && (
            <div style={{ marginTop: '20px', background: '#f8fafc', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #4f46e5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4f46e5', fontWeight: '700', fontSize: '13px', marginBottom: '4px' }}>
                <BookOpen size={16} />
                เฉลยและคำอธิบายละเอียด:
              </div>
              <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.7', margin: 0 }}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation between questions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#334155',
                cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
                opacity: currentIdx === 0 ? 0.5 : 1
              }}
            >
              ข้อก่อนหน้า
            </button>

            {currentIdx < filteredQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                ข้อถัดไป <ArrowRight size={16} />
              </button>
            ) : (
              mode === 'exam' && !isSubmitted && (
                <button
                  onClick={handleSubmitExam}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    background: '#059669',
                    color: '#ffffff',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  ส่งกระดาษคำตอบตรวจคะแนน
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#64748b' }}>ไม่พบข้อสอบในหมวดวิชาที่เลือก</p>
        </div>
      )}

      {/* Questions Palette Jump */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#334155', margin: 0 }}>
            แถบเลือกข้อสอบอย่างรวดเร็ว (Quick Jump Palette):
          </h4>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
            <span style={{ color: '#059669', fontWeight: '600' }}>🟢 ถูก</span>
            <span style={{ color: '#e11d48', fontWeight: '600' }}>🔴 ผิด</span>
            <span style={{ color: '#64748b' }}>⚪ ยังไม่ได้ทำ</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))', gap: '6px' }}>
          {filteredQuestions.map((q, idx) => {
            const answered = userAnswers[q.id] !== undefined;
            const isCorrect = userAnswers[q.id] === getCorrectAnswer(q);
            const isCurrent = idx === currentIdx;
            const isStarred = bookmarks[q.id];

            let btnBg = '#f8fafc';
            let btnBorder = '#e2e8f0';
            let btnColor = '#475569';

            if (mode === 'practice' || isSubmitted) {
              if (answered) {
                if (isCorrect) {
                  btnBg = '#dcfce7';
                  btnBorder = '#86efac';
                  btnColor = '#15803d';
                } else {
                  btnBg = '#fee2e2';
                  btnBorder = '#fca5a5';
                  btnColor = '#b91c1c';
                }
              }
            } else if (mode === 'exam' && answered) {
              btnBg = '#eeefff';
              btnBorder = '#c7d2fe';
              btnColor = '#4338ca';
            }

            if (isCurrent) {
              btnBorder = '#4f46e5';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                style={{
                  height: '36px',
                  borderRadius: '6px',
                  border: `2px solid ${btnBorder}`,
                  background: btnBg,
                  color: btnColor,
                  fontWeight: isCurrent ? '800' : '600',
                  fontSize: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={`ข้อที่ ${idx + 1}`}
              >
                {idx + 1}
                {isStarred && (
                  <span style={{ position: 'absolute', top: '-4px', right: '-2px', fontSize: '9px' }}>⭐</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
