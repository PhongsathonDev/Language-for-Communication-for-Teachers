import React, { useState } from 'react';
import { Sparkles, Search } from 'lucide-react';

export default function ThaiLinguisticsTool() {
  const [activeSubTab, setActiveSubTab] = useState('spelling'); // 'spelling' | 'matrix' | 'classifiers'
  const [searchQuery, setSearchQuery] = useState('');

  // Mini-Game state for spelling
  const [gameIdx, setGameIdx] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [answeredState, setAnsweredState] = useState(null); // 'correct' | 'wrong' | null

  const spellingData = [
    {
      correct: "ศีรษะ",
      wrong: "ศรีษะ",
      note: "สระอีวางอยู่บน ศ ศาลา มาจากภาษาสันสกฤต 'ศีรฺษ'"
    },
    {
      correct: "นะคะ",
      wrong: "นะค่ะ / น๊ะค๊ะ",
      note: "คำว่า 'นะ' เป็นอักษรต่ำเสียงตรี ไม่ต้องใส่วรรณยุกต์เอก ส่วน 'คะ' ใช้ถามหรือต่อท้าย 'นะ'"
    },
    {
      correct: "ปรากฏ",
      wrong: "ปรากฎ",
      note: "สะกดด้วย 'ฏ' ปฏัก ไม่ใช่ 'ฎ' ชฎา"
    },
    {
      correct: "เบญจเพส",
      wrong: "เบญจเพศ",
      note: "หมายถึง อายุ ๒๕ ปี มาจาก บาลี 'วีส' หรือ 'เพส' (ยี่สิบห้า) สะกดด้วย ส เสือ"
    },
    {
      correct: "บันได",
      wrong: "บรรได",
      note: "คำไทยแท้ใช้ 'บัน' ไม้หันอากาศ ไม่ใช่ 'บรร' (ร หัน)"
    },
    {
      correct: "บังสุกุล",
      wrong: "บังสกุล",
      note: "บังสุกุล แปลว่า ผ้าเปื้อนฝุ่น สะกดด้วย สระอุ"
    },
    {
      correct: "อะไหล่",
      wrong: "อะหลั่ย",
      note: "เขียนด้วย อะไหล่ ไม่มีรูปวรรณยุกต์เอกที่ ห"
    },
    {
      correct: "โน้ต",
      wrong: "โน๊ต",
      note: "อักษรต่ำ (น) ผันด้วยไม้โท ออกเสียงวรรณยุกต์ตรีอยู่แล้ว ไม่ต้องใช้ไม้ตรี"
    },
    {
      correct: "กะเพรา",
      wrong: "กระเพรา",
      note: "ไม่มี ร ควบกล้ำในพยางค์หน้า เขียนว่า 'กะเพรา'"
    },
    {
      correct: "ผัดไทย",
      wrong: "ผัดไท",
      note: "เป็นอาหารประจำชาติไทย ใช้ 'ไทย' มี ย ยักษ์การันต์"
    },
    {
      correct: "อนุญาต",
      wrong: "อนุญาติ",
      note: "ไม่มีสระอิ (ถ้ามีสระอิ คือ 'ญาติพี่น้อง')"
    },
    {
      correct: "ผูกพัน",
      wrong: "ผูกพันธ์",
      note: "ผูกพัน ไม่มี ธุ์ (ถ้า 'สัมพันธ์', 'เผ่าพันธุ์' มี ธ์/ธุ์)"
    }
  ];

  const classifiersData = [
    { noun: "ขลุ่ย, ปี่", classifier: "เลา", example: "ขลุ่ยไม้ไผ่ ๑ เลา, ปี่พาทย์ ๑ เลา" },
    { noun: "เลื่อย", classifier: "ปื้น", example: "ช่างไม้ซื้อเลื่อยลันดามา ๒ ปื้น" },
    { noun: "แห", classifier: "ปาก", example: "ชาวประมงเหวี่ยงแห ๑ ปาก" },
    { noun: "พระภิกษุ, สามเณร", classifier: "รูป", example: "วันนี้มีพระภิกษุสงฆ์มาฉันภัตตาหาร ๙ รูป" },
    { noun: "พระพุทธรูป", classifier: "องค์", example: "ในพระอุโบสถมีพระพุทธรูป ๑ องค์" },
    { noun: "ช้างป่า", classifier: "ตัว", example: "พบโขลงช้างป่า ๕ ตัว ในอุทยานแห่งชาติ" },
    { noun: "ช้างบ้าน (ช้างเลี้ยง)", classifier: "เชือก", example: "ควาญช้างเลี้ยงช้างบ้านไว้ ๒ เชือก" },
    { noun: "ช้างหลวง (ขึ้นระวาง)", classifier: "ช้าง", example: "พระบาทสมเด็จพระเจ้าอยู่หัวทรงมีช้างหลวง ๑ ช้าง" },
    { noun: "เกวียน", classifier: "เล่ม", example: "ชาวนานำเกวียน ๑ เล่ม บรรทุกข้าว" },
    { noun: "มุ้ง, เต็นท์", classifier: "หลัง", example: "กางมุ้ง ๑ หลัง, กางเต็นท์ ๑ หลัง" },
    { noun: "เทียนไข", classifier: "เล่ม", example: "จุดเทียนพรรษา ๒ เล่ม" }
  ];

  const handleGameAnswer = (chosenCorrect) => {
    if (answeredState !== null) return;
    if (chosenCorrect) {
      setGameScore(prev => prev + 1);
      setAnsweredState('correct');
    } else {
      setAnsweredState('wrong');
    }
  };

  const handleNextQuestion = () => {
    setAnsweredState(null);
    setGameIdx((prev) => (prev + 1) % spellingData.length);
  };

  const filteredClassifiers = classifiersData.filter(c =>
    c.noun.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.classifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.example.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentGame = spellingData[gameIdx];
  const isCorrectOrder = gameIdx % 2 === 0; // shuffle order slightly

  return (
    <div className="linguistics-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
      <div className="tool-header-card" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', color: '#fff', padding: '24px', borderRadius: '16px', marginBottom: '24px', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Sparkles size={28} />
          <h2 style={{ fontSize: '22px', fontWeight: '700' }}>เครื่องมือวิเคราะห์โครงสร้างภาษาไทย & คลังคำศัพท์ (Thai Linguistics Matrix)</h2>
        </div>
        <p style={{ opacity: 0.9, fontSize: '14px' }}>
          เจาะลึกระบบเสียง-อักษรไทย คลินิกทายคำถูก-คำผิด และคลังลักษณนามเฉพาะทางสำหรับครูผู้สอน
        </p>
      </div>

      {/* Sub Tab Navigation */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveSubTab('spelling')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: activeSubTab === 'spelling' ? '700' : '500',
            background: activeSubTab === 'spelling' ? '#7c3aed' : '#ffffff',
            color: activeSubTab === 'spelling' ? '#ffffff' : '#334155',
            border: '1px solid ' + (activeSubTab === 'spelling' ? '#7c3aed' : '#e2e8f0'),
            boxShadow: activeSubTab === 'spelling' ? '0 4px 12px rgba(124, 58, 237, 0.25)' : 'none',
            cursor: 'pointer'
          }}
        >
          ✍️ คลินิกคำถูก-คำผิด & มินิเกม
        </button>

        <button
          onClick={() => setActiveSubTab('matrix')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: activeSubTab === 'matrix' ? '700' : '500',
            background: activeSubTab === 'matrix' ? '#7c3aed' : '#ffffff',
            color: activeSubTab === 'matrix' ? '#ffffff' : '#334155',
            border: '1px solid ' + (activeSubTab === 'matrix' ? '#7c3aed' : '#e2e8f0'),
            boxShadow: activeSubTab === 'matrix' ? '0 4px 12px rgba(124, 58, 237, 0.25)' : 'none',
            cursor: 'pointer'
          }}
        >
          📊 ตารางระบบเสียง & อักษรไทย
        </button>

        <button
          onClick={() => setActiveSubTab('classifiers')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: activeSubTab === 'classifiers' ? '700' : '500',
            background: activeSubTab === 'classifiers' ? '#7c3aed' : '#ffffff',
            color: activeSubTab === 'classifiers' ? '#ffffff' : '#334155',
            border: '1px solid ' + (activeSubTab === 'classifiers' ? '#7c3aed' : '#e2e8f0'),
            boxShadow: activeSubTab === 'classifiers' ? '0 4px 12px rgba(124, 58, 237, 0.25)' : 'none',
            cursor: 'pointer'
          }}
        >
          🏷️ คลังลักษณนามเฉพาะ
        </button>
      </div>

      {/* SubTab 1: Spelling Mini-Game & Clinic */}
      {activeSubTab === 'spelling' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Mini-Game Card */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#7c3aed' }}>
                🎮 มินิเกมประลองคำสะกด (ข้อที่ {gameIdx + 1} / {spellingData.length})
              </span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#059669' }}>
                คะแนนสะสม: {gameScore} คะแนน
              </span>
            </div>

            <p style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600', textAlign: 'center', marginBottom: '20px' }}>
              คำใดสะกดถูกต้องตามพจนานุกรมฉบับราชบัณฑิตยสถาน?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '600px', margin: '0 auto 20px auto' }}>
              {isCorrectOrder ? (
                <>
                  <button
                    onClick={() => handleGameAnswer(true)}
                    style={{
                      padding: '16px',
                      fontSize: '18px',
                      fontWeight: '700',
                      borderRadius: '12px',
                      border: '2px solid #cbd5e1',
                      background: answeredState ? (answeredState === 'correct' ? '#ecfdf5' : '#ecfdf5') : '#f8fafc',
                      color: answeredState ? '#059669' : '#1e293b',
                      cursor: answeredState ? 'default' : 'pointer'
                    }}
                  >
                    {currentGame.correct}
                  </button>
                  <button
                    onClick={() => handleGameAnswer(false)}
                    style={{
                      padding: '16px',
                      fontSize: '18px',
                      fontWeight: '700',
                      borderRadius: '12px',
                      border: '2px solid #cbd5e1',
                      background: answeredState === 'wrong' ? '#fef2f2' : '#f8fafc',
                      color: answeredState === 'wrong' ? '#ef4444' : '#1e293b',
                      cursor: answeredState ? 'default' : 'pointer'
                    }}
                  >
                    {currentGame.wrong}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleGameAnswer(false)}
                    style={{
                      padding: '16px',
                      fontSize: '18px',
                      fontWeight: '700',
                      borderRadius: '12px',
                      border: '2px solid #cbd5e1',
                      background: answeredState === 'wrong' ? '#fef2f2' : '#f8fafc',
                      color: answeredState === 'wrong' ? '#ef4444' : '#1e293b',
                      cursor: answeredState ? 'default' : 'pointer'
                    }}
                  >
                    {currentGame.wrong}
                  </button>
                  <button
                    onClick={() => handleGameAnswer(true)}
                    style={{
                      padding: '16px',
                      fontSize: '18px',
                      fontWeight: '700',
                      borderRadius: '12px',
                      border: '2px solid #cbd5e1',
                      background: answeredState ? (answeredState === 'correct' ? '#ecfdf5' : '#ecfdf5') : '#f8fafc',
                      color: answeredState ? '#059669' : '#1e293b',
                      cursor: answeredState ? 'default' : 'pointer'
                    }}
                  >
                    {currentGame.correct}
                  </button>
                </>
              )}
            </div>

            {answeredState && (
              <div style={{ background: answeredState === 'correct' ? '#ecfdf5' : '#fef2f2', padding: '16px', borderRadius: '12px', borderLeft: `4px solid ${answeredState === 'correct' ? '#10b981' : '#ef4444'}`, maxWidth: '600px', margin: '0 auto 16px auto' }}>
                <p style={{ fontWeight: '700', color: answeredState === 'correct' ? '#059669' : '#b91c1c' }}>
                  {answeredState === 'correct' ? '✓ ถูกต้องยอดเยี่ยม!' : `✗ ยังไม่ถูกต้อง (คำที่ถูกคือ: ${currentGame.correct})`}
                </p>
                <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                  💡 <strong>หลักเกณฑ์:</strong> {currentGame.note}
                </p>
                <div style={{ marginTop: '12px', textAlign: 'right' }}>
                  <button
                    onClick={handleNextQuestion}
                    style={{
                      padding: '8px 16px',
                      background: '#7c3aed',
                      color: '#fff',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '13px'
                    }}
                  >
                    ข้อถัดไป →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Full Reference Table */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>
              📚 คลังรายการคำถูก - คำผิดที่พบบ่อย ๑๒ คำสำคัญ
            </h3>
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table className="modern-data-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>คำที่ถูกต้อง</th>
                    <th>คำที่มักเขียนผิด</th>
                    <th>หลักเกณฑ์ทางภาษาศาสตร์และที่มา</th>
                  </tr>
                </thead>
                <tbody>
                  {spellingData.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: '700', color: '#059669' }}>{item.correct}</td>
                      <td style={{ color: '#ef4444', textDecoration: 'line-through' }}>{item.wrong}</td>
                      <td style={{ fontSize: '13px', color: '#475569' }}>{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Sound & Script Matrix */}
      {activeSubTab === 'matrix' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
              1. ระบบพยัญชนะไทย (44 รูป 21 เสียง)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
                <strong style={{ color: '#1d4ed8', fontSize: '14px' }}>อักษรกลาง (9 ตัว)</strong>
                <p style={{ fontSize: '13px', color: '#334155', marginTop: '6px' }}>ก จ ด ต บ ป อ ฎ ฏ (ผันได้ครบ 5 เสียง)</p>
              </div>
              <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                <strong style={{ color: '#047857', fontSize: '14px' }}>อักษรสูง (11 ตัว)</strong>
                <p style={{ fontSize: '13px', color: '#334155', marginTop: '6px' }}>ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห (พื้นเสียงเป็นเสียงจัตวา)</p>
              </div>
              <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
                <strong style={{ color: '#b45309', fontSize: '14px' }}>อักษรต่ำ (24 ตัว)</strong>
                <p style={{ fontSize: '13px', color: '#334155', marginTop: '6px' }}>ต่ำคู่ 14 ตัว + ต่ำเดี่ยว 10 ตัว (ง ญ น ย ณ ร ว ม ฬ ล)</p>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              *หมายเหตุ: พยัญชนะ 2 ตัวที่ไม่ปรากฏที่ใช้แล้วในปัจจุบันคือ ฃ (ขวด) และ ฅ (คน)
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
              2. ระบบสระไทย (21 รูป 32 เสียง)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                <strong style={{ color: '#334155', fontSize: '14px' }}>สระแท้ (18 เสียง)</strong>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  • รัสสระ (สั้น 9 เสียง): อะ อิ อึ อุ เอะ แอะ โอะ เอาะ เออะ<br />
                  • ฑีฆสระ (ยาว 9 เสียง): อา อี อือ อู เอ แอ โอ ออ เออ
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                <strong style={{ color: '#334155', fontSize: '14px' }}>สระประสม (6 เสียง)</strong>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  • เอียะ / เอีย (อิ+อา)<br />
                  • เอือะ / เอือ (อึ+อา)<br />
                  • อัวะ / อัว (อุ+อา)
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                <strong style={{ color: '#334155', fontSize: '14px' }}>สระเกิน (8 เสียง)</strong>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  อำ ใอ ไอ เอา ฤ ฤๅ ฦ ฦๅ (มีเสียงพยัญชนะประสมอยู่ด้วย)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Classifiers */}
      {activeSubTab === 'classifiers' && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>
              คลังลักษณนามเฉพาะทางในภาษาไทย
            </h3>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="ค้นหาลักษณนาม (เช่น ขลุ่ย, แห)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px'
                }}
              />
            </div>
          </div>

          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table className="modern-data-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>คำนาม (Noun)</th>
                  <th>ลักษณนามที่ถูกต้อง (Classifier)</th>
                  <th>ตัวอย่างประโยคการใช้จริง</th>
                </tr>
              </thead>
              <tbody>
                {filteredClassifiers.map((c, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: '600', color: '#1e293b' }}>{c.noun}</td>
                    <td>
                      <span style={{ background: '#f3e8ff', color: '#7c3aed', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '13px' }}>
                        {c.classifier}
                      </span>
                    </td>
                    <td style={{ fontSize: '13px', color: '#475569' }}>{c.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
