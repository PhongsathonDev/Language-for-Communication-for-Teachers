import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';

const practiceParagraphs = [
  {
    id: 1,
    title: "ย่อหน้าที่ 1: คุณค่าของน้ำ (ใจความสำคัญอยู่ต้นย่อหน้า)",
    position: "ตอนต้นย่อหน้า",
    sentences: [
      { id: 's1', text: "น้ำมีความสำคัญและจำเป็นอย่างยิ่งต่อการดำรงชีวิตของสิ่งมีชีวิตทุกชนิดบนโลก", isMain: true, type: "ใจความสำคัญ (Topic Sentence)" },
      { id: 's2', text: "ร่างกายของมนุษย์ประกอบด้วยน้ำมากกว่าร้อยละ ๗๐ ของน้ำหนักตัวเพื่อช่วยในการไหลเวียนโลหิตและขับถ่ายของเสีย", isMain: false, type: "พลความ (ยกตัวอย่างมนุษย์)" },
      { id: 's3', text: "พืชทุกชนิดจำเป็นต้องใช้น้ำในกระบวนการสังเคราะห์ด้วยแสงเพื่อสร้างอาหารและเจริญเติบโต", isMain: false, type: "พลความ (ยกตัวอย่างพืช)" },
      { id: 's4', text: "หากโลกเราขาดแคลนทรัพยากรน้ำ สิ่งมีชีวิตทั้งมวลย่อมไม่สามารถดำรงเผ่าพันธุ์อยู่รอดได้เลย", isMain: false, type: "พลความ (อธิบายผลลัพธ์)" }
    ],
    explanation: "ใจความสำคัญของย่อหน้านี้อยู่ที่ประโยคแรก ('น้ำมีความสำคัญและจำเป็นอย่างยิ่ง...') โดยประโยคถัดมาทำหน้าที่เป็น 'พลความ' ยกตัวอย่างมนุษย์ พืช และผลกระทบขยายความให้ชัดเจนยิ่งขึ้น",
    summaryText: "น้ำเป็นทรัพยากรที่จำเป็นต่อการดำรงชีวิตและการอยู่รอดของสิ่งมีชีวิตทุกชนิด"
  },
  {
    id: 2,
    title: "ย่อหน้าที่ 2: พลังแห่งการอ่าน (ใจความสำคัญอยู่ท้ายย่อหน้า)",
    position: "ตอนท้ายย่อหน้า",
    sentences: [
      { id: 's1', text: "การอ่านหนังสือช่วยเปิดโลกทัศน์ให้เราได้รับรู้เรื่องราวและวิทยาการใหม่ ๆ จากทั่วทุกมุมโลก", isMain: false, type: "พลความ (ประโยชน์ด้านความรู้)" },
      { id: 's2', text: "การอ่านวรรณกรรมและบทกวียังช่วยกล่อมเกลาจิตใจ ผ่อนคลายความเครียด และสร้างความเพลิดเพลินใจ", isMain: false, type: "พลความ (ประโยชน์ด้านอารมณ์)" },
      { id: 's3', text: "นอกจากนี้ยังช่วยกระตุ้นการทำงานของสมอง ฝึกกระบวนการคิดวิเคราะห์อย่างมีเหตุผล", isMain: false, type: "พลความ (ประโยชน์ด้านสติปัญญา)" },
      { id: 's4', text: "ดังนั้น การอ่านจึงเป็นเครื่องมือสำคัญที่สุดในการพัฒนาสติปัญญาและยกระดับคุณภาพชีวิตของมนุษย์", isMain: true, type: "ใจความสำคัญ (สรุปประเด็นหลัก)" }
    ],
    explanation: "ผู้เขียนแจกแจงประโยชน์ของการอ่านด้านต่าง ๆ (ความรู้ อารมณ์ สมอง) มาเป็นพลความก่อน แล้วจึงสรุปใจความสำคัญที่เป็นแก่นไว้ในประโยคสุดท้าย ('ดังนั้น การอ่านจึงเป็นเครื่องมือสำคัญที่สุด...')",
    summaryText: "การอ่านเป็นเครื่องมือสำคัญในการพัฒนาสติปัญญาและยกระดับคุณภาพชีวิตของมนุษย์"
  },
  {
    id: 3,
    title: "ย่อหน้าที่ 3: ความซื่อสัตย์สุจริต (ใจความสำคัญอยู่ตรงกลางย่อหน้า)",
    position: "ตรงกลางย่อหน้า",
    sentences: [
      { id: 's1', text: "สังคมในยุคปัจจุบันมีความเจริญก้าวหน้าทางเทคโนโลยีและวัตถุอย่างรวดเร็วแต่กลับพบปัญหาความขัดแย้งมากมาย", isMain: false, type: "พลความ (เกริ่นนำสภาพปัญหา)" },
      { id: 's2', text: "ความซื่อสัตย์สุจริตจึงเป็นคุณธรรมพื้นฐานที่จำเป็นที่สุดในการสร้างความไว้วางใจและความสงบสุขในสังคม", isMain: true, type: "ใจความสำคัญ (ประเด็นหลักตรงกลาง)" },
      { id: 's3', text: "หากทุกคนปฏิบัติหน้าที่ด้วยความโปร่งใส ไม่คดโกง สังคมจะสามารถพัฒนาไปข้างหน้าได้อย่างมั่นคงและยั่งยืน", isMain: false, type: "พลความ (อธิบายเหตุผลสนับสนุน)" }
    ],
    explanation: "ผู้เขียนเกริ่นนำถึงบริบทสังคมก่อน แล้วจึงระบุใจความสำคัญตรงกลางย่อหน้า จากนั้นอธิบายผลดีที่เกิดขึ้นสนับสนุนในประโยคท้าย",
    summaryText: "ความซื่อสัตย์สุจริตเป็นคุณธรรมพื้นฐานที่จำเป็นต่อความสงบสุขและการพัฒนาสังคมอย่างยั่งยืน"
  },
  {
    id: 4,
    title: "ย่อหน้าที่ 4: ภาษาและการสื่อสาร (ใจความสำคัญอยู่ทั้งต้นและท้ายย่อหน้า)",
    position: "ทั้งตอนต้นและตอนท้าย",
    sentences: [
      { id: 's1', text: "การสื่อสารที่มีประสิทธิภาพเป็นหัวใจสำคัญอย่างยิ่งต่อความสำเร็จในการจัดการเรียนการสอนของครู", isMain: true, type: "ใจความสำคัญ (เปิดประเด็นหลัก)" },
      { id: 's2', text: "ครูที่ใช้ถ้อยคำชัดเจน น้ำเสียงอบอุ่น และใช้อวัจนภาษาอย่างเหมาะสมจะช่วยให้นักเรียนเข้าใจบทเรียนได้ง่ายขึ้น", isMain: false, type: "พลความ (อธิบายวิธีปฏิบัติ)" },
      { id: 's3', text: "บรรยากาศในห้องเรียนจะผ่อนคลายและกระตุ้นการมีส่วนร่วมของผู้เรียนอย่างเต็มศักยภาพ", isMain: false, type: "พลความ (อธิบายผลลัพธ์ในชั้นเรียน)" },
      { id: 's4', text: "ทักษะการสื่อสารของครูจึงเป็นปัจจัยชี้ขาดต่อประสิทธิผลของการเรียนรู้ในชั้นเรียนอย่างแท้จริง", isMain: true, type: "ใจความสำคัญ (สรุปย้ำประเด็นหลัก)" }
    ],
    explanation: "ผู้เขียนเปิดหัวข้อด้วยใจความสำคัญในประโยคแรก ขยายความด้วยพลความตรงกลาง และย้ำสรุปประเด็นหลักอีกครั้งในประโยคท้ายด้วยถ้อยคำใหม่",
    summaryText: "ทักษะการสื่อสารที่มีประสิทธิภาพของครูเป็นหัวใจและปัจจัยชี้ขาดต่อความสำเร็จในการเรียนรู้ของนักเรียน"
  }
];

export default function MainIdeaAnalyzer() {
  const [selectedParaIdx, setSelectedParaIdx] = useState(0);
  const [userSelections, setUserSelections] = useState({});
  const [isEvaluated, setIsEvaluated] = useState(false);

  const para = practiceParagraphs[selectedParaIdx];

  const handleToggle = (sId) => {
    if (isEvaluated) return;
    setUserSelections(prev => ({
      ...prev,
      [sId]: !prev[sId]
    }));
  };

  const handleEvaluate = () => {
    setIsEvaluated(true);
  };

  const handleReset = () => {
    setUserSelections({});
    setIsEvaluated(false);
  };

  const handleSelectPara = (idx) => {
    setSelectedParaIdx(idx);
    setUserSelections({});
    setIsEvaluated(false);
  };

  const calculateScore = () => {
    let correct = 0;
    para.sentences.forEach(s => {
      const userChose = !!userSelections[s.id];
      if (userChose === s.isMain) {
        correct++;
      }
    });
    return Math.round((correct / para.sentences.length) * 100);
  };

  return (
    <div className="analyzer-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
      <div className="tool-header-card" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', padding: '24px', borderRadius: '16px', marginBottom: '24px', boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <BookOpen size={28} />
          <h2 style={{ fontSize: '22px', fontWeight: '700' }}>เครื่องมือฝึกจำแนกใจความสำคัญ vs พลความ (Main Idea Analyzer)</h2>
        </div>
        <p style={{ opacity: 0.9, fontSize: '14px' }}>
          ฝึกฝนทักษะการอ่านจับใจความสำคัญ 5 รูปแบบตำแหน่ง คลิกเลือกประโยคที่เป็น <strong>"ใจความสำคัญ (Main Idea)"</strong> และกดปุ่มตรวจคำตอบ
        </p>
      </div>

      {/* Paragraph Selection Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px' }}>
        {practiceParagraphs.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => handleSelectPara(idx)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: selectedParaIdx === idx ? '600' : '400',
              background: selectedParaIdx === idx ? '#0284c7' : '#ffffff',
              color: selectedParaIdx === idx ? '#ffffff' : '#334155',
              border: '1px solid ' + (selectedParaIdx === idx ? '#0284c7' : '#e2e8f0'),
              whiteSpace: 'nowrap',
              boxShadow: selectedParaIdx === idx ? '0 2px 8px rgba(2, 132, 199, 0.25)' : 'none',
              cursor: 'pointer'
            }}
          >
            ย่อหน้าที่ {idx + 1} ({p.position})
          </button>
        ))}
      </div>

      {/* Interactive Paragraph Card */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{para.title}</h3>
          <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '9999px', fontWeight: '600' }}>
            รูปแบบ: {para.position}
          </span>
        </div>

        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
          💡 <strong>คำชี้แจง:</strong> คลิกที่ประโยคด้านล่างเพื่อเลือกประโยคที่ท่านคิดว่าเป็น <strong>"ใจความสำคัญ"</strong> (สามารถเลือกได้มากกว่า 1 ประโยค)
        </p>

        {/* Sentence Clickers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {para.sentences.map((s, sIdx) => {
            const isSelected = !!userSelections[s.id];
            let itemBg = isSelected ? '#eff6ff' : '#f8fafc';
            let itemBorder = isSelected ? '#3b82f6' : '#e2e8f0';

            if (isEvaluated) {
              if (s.isMain) {
                itemBg = '#ecfdf5';
                itemBorder = '#10b981';
              } else if (isSelected && !s.isMain) {
                itemBg = '#fef2f2';
                itemBorder = '#ef4444';
              }
            }

            return (
              <div
                key={s.id}
                onClick={() => handleToggle(s.id)}
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: itemBg,
                  border: `2px solid ${itemBorder}`,
                  cursor: isEvaluated ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  minWidth: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: isSelected ? '#3b82f6' : '#cbd5e1',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  marginTop: '2px'
                }}>
                  {sIdx + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '15px', color: '#1e293b', lineHeight: '1.7', fontWeight: isSelected ? '500' : '400' }}>
                    {s.text}
                  </p>

                  {isEvaluated && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {s.isMain ? (
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={14} /> {s.type}
                        </span>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ℹ️ {s.type}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {!isEvaluated ? (
            <button
              onClick={handleEvaluate}
              style={{
                padding: '10px 24px',
                background: '#0284c7',
                color: '#ffffff',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
              }}
            >
              <CheckCircle2 size={16} />
              ตรวจคำตอบ & วิเคราะห์โครงสร้าง
            </button>
          ) : (
            <button
              onClick={handleReset}
              style={{
                padding: '10px 20px',
                background: '#f1f5f9',
                color: '#334155',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw size={16} />
              ฝึกทำใหม่อีกครั้ง
            </button>
          )}
        </div>
      </div>

      {/* Evaluation Results & Pedagogical Analysis */}
      {isEvaluated && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={20} color="#0284c7" />
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>ผลการวิเคราะห์โครงสร้างย่อหน้า</h4>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: calculateScore() === 100 ? '#059669' : '#d97706' }}>
              ความถูกต้อง: {calculateScore()}%
            </span>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '16px', borderLeft: '4px solid #0284c7' }}>
            <strong style={{ color: '#0369a1', fontSize: '14px' }}>คำอธิบายตามหลักภาษาศาสตร์:</strong>
            <p style={{ marginTop: '6px', color: '#334155', fontSize: '14px', lineHeight: '1.7' }}>
              {para.explanation}
            </p>
          </div>

          <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
            <strong style={{ color: '#059669', fontSize: '14px' }}>ตัวอย่างการเขียนสรุปความที่สละสลวย (1 ใน 3):</strong>
            <p style={{ marginTop: '6px', color: '#065f46', fontSize: '14px', lineHeight: '1.7', fontWeight: '500' }}>
              "{para.summaryText}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
