import React, { useState } from 'react';
import { MessageSquare, Users, Award, RefreshCw } from 'lucide-react';

const scenarios = [
  {
    id: 's1',
    category: "ครูกับนักเรียน (Teacher-Student)",
    title: "สถานการณ์ที่ 1: การตักเตือนนักเรียนที่ไม่ส่งงานและแสดงท่าทีก้าวร้าว",
    context: "นักเรียนชั้นมัธยมศึกษาปีที่ 3 ไม่ส่งงานติดต่อกันหลายสัปดาห์ เมื่อครูเรียกมาสอบถามที่โต๊ะทำงาน นักเรียนยืนกอดอก แสดงสีหน้าไม่พอใจ และตอบสั้น ๆ ห้วน ๆ",
    verbalOptions: [
      {
        id: 'v1',
        text: "'ทำไมเธอถึงทำตัวแย่แบบนี้! ไม่ส่งงานแล้วยังมาก้าวร้าวใส่ครูอีก ถ้าไม่ปรับปรุงตัวจะปรับตกและเชิญผู้ปกครองมารับทราบ!'",
        type: "ภาษาใช้อารมณ์และคำข่มขู่ (Aggressive)",
        score: 30,
        feedback: "การใช้อารมณ์และคำข่มขู่จะยิ่งสร้างกำแพงในใจนักเรียน ทำลายสัมพันธภาพ และไม่ช่วยค้นหาสาเหตุที่แท้จริงของการไม่ส่งงาน"
      },
      {
        id: 'v2',
        text: "'ครูสังเกตว่าช่วงนี้เรามีงานค้างหลายชิ้น มีปัญหาหรือความกังวลใจตรงไหนที่อยากให้ครูช่วยไหม ลองเล่าให้ครูฟังได้นะ'",
        type: "ภาษากัลยาณมิตรและการตั้งคำถามเชิงบวก (Empathic & Constructive)",
        score: 100,
        feedback: "ยอดเยี่ยมมาก! การใช้ภาษาเชิงบวกแสดงความห่วงใย ช่วยลดความหวาดระแวง และเปิดโอกาสให้นักเรียนกล้าเปิดใจบอกปัญหาที่แท้จริง"
      },
      {
        id: 'v3',
        text: "'ก็ตามใจเธอนะ ไม่ส่งก็ศูนย์ ครูเหนื่อยจะพูดแล้ว โต ๆ กันแล้วคิดเองได้'",
        type: "ภาษาประชดประชันและตัดความรับผิดชอบ (Passive-Aggressive)",
        score: 20,
        feedback: "การตัดพ้อและประชดประชันทำให้นักเรียนรู้สึกแปลกแยกและสูญเสียศรัทธาต่อครูผู้สอน"
      }
    ],
    nonVerbalOptions: [
      {
        id: 'nv1',
        text: "นั่งตัวตรง ชี้หน้า สบตาเขม็ง และขึ้นเสียงดังเพื่อให้เกรงกลัว",
        type: "อวัจนภาษาเชิงคุกคาม (Intimidating Body Language)",
        score: 30,
        feedback: "การชี้นิ้วและขึ้นเสียงเป็นการคุกคามทางกายภาพ (Kinesics & Paralanguage) ที่กระตุ้นพฤติกรรมต่อต้าน"
      },
      {
        id: 'nv2',
        text: "เชิญนักเรียนนั่งในระดับเดียวกัน ใช้น้ำเสียงนุ่มนวล สบตาด้วยความอบอุ่น และเว้นระยะห่างที่เหมาะสม (1-1.5 เมตร)",
        type: "อวัจนภาษาที่เปิดกว้างและให้เกียรติ (Open & Reassuring)",
        score: 100,
        feedback: "ถูกต้องอย่างยิ่ง! การปรับระดับสายตาให้เท่ากัน (เทศภาษา) และใช้น้ำเสียงอบอุ่น (ปริภาษา) สร้างบรรยากาศที่ปลอดภัยและเป็นมิตร"
      }
    ]
  },
  {
    id: 's2',
    category: "ครูกับผู้ปกครอง (Teacher-Parent)",
    title: "สถานการณ์ที่ 2: การประชุมเพื่อแจ้งผลการเรียนและพฤติกรรมของนักเรียน",
    context: "ผู้ปกครองเดินทางมาร่วมประชุมผู้ปกครองภาคเรียนที่ 1 นักเรียนมีผลการเรียนลดลงอย่างมากเนื่องจากติดเกมและหลับในห้องเรียนบ่อยครั้ง",
    verbalOptions: [
      {
        id: 'v1',
        text: "'ลูกของคุณแม่มีปัญหามาก วัน ๆ เอาแต่นอนหลับและเล่นเกม ถ้าคุณแม่ไม่ดูแลที่บ้าน ครูคงช่วยอะไรไม่ได้'",
        type: "การกล่าวโทษและผลักภาระ (Blaming)",
        score: 40,
        feedback: "การกล่าวโทษตรง ๆ ทำให้ผู้ปกครองรู้สึกตั้งรับและเกิดทัศนคติเชิงลบต่อโรงเรียน"
      },
      {
        id: 'v2',
        text: "'สวัสดีครับคุณแม่ น้องเป็นเด็กที่มีศักยภาพและมีน้ำใจมาก แต่ช่วงนี้สังเกตว่าน้องดูอ่อนเพลียในชั่วโมงเรียน เรามาร่วมมือกันหาแนวทางดูแลการจัดสรรเวลาการเล่นเกมและการพักผ่อนของน้องร่วมกันดีไหมครับ'",
        type: "เทคนิคคำชมนำหน้าตามด้วยข้อเสนอแนะร่วมมือ (Compliment-Problem-Solution)",
        score: 100,
        feedback: "ยอดเยี่ยมมาก! การเริ่มต้นด้วยจุดเด่นของนักเรียน แล้วชวนผู้ปกครองเป็น 'หุ้นส่วนในการพัฒนา' (Partnership) ช่วยสร้างความร่วมมือที่ยั่งยืน"
      }
    ],
    nonVerbalOptions: [
      {
        id: 'nv1',
        text: "ยกมือไหว้ทักทายอย่างนอบน้อม ยิ้มแย้ม สบตา และผายมือเชิญนั่งเก้าอี้พร้อมเตรียมสมุดรายงานผลที่จัดเรียงอย่างเป็นระเบียบ",
        type: "มารยาทไทยและอวัจนภาษาเพื่อความร่วมมือ",
        score: 100,
        feedback: "แสดงถึงความเป็นมืออาชีพ ความพร้อม และการให้เกียรติผู้ปกครองอย่างสมบูรณ์แบบ"
      },
      {
        id: 'nv2',
        text: "นั่งก้มหน้าดูโทรศัพท์มือถือขณะพูดคุย และส่งเอกสารให้นักเรียนเซ็นแบบเร่งรีบ",
        type: "ขาดความใส่ใจและไม่ให้เกียรติ",
        score: 20,
        feedback: "การไม่สบตาและก้มดูมือถือสะท้อนการขาดมารยาทวิชาชีพครูและการสื่อสารที่ล้มเหลว"
      }
    ]
  },
  {
    id: 's3',
    category: "ครูกับผู้บริหารสถานศึกษา (Teacher-Principal)",
    title: "สถานการณ์ที่ 3: การรายงานผลการจัดโครงการพัฒนาทักษะวิชาชีพ",
    context: "ครูได้รับมอบหมายให้นำเสนอสรุปผลการดำเนินโครงการอบรมสะเต็มศึกษาต่อนายกสภาโรงเรียนและผู้อำนวยการสถานศึกษาในที่ประชุมใหญ่",
    verbalOptions: [
      {
        id: 'v1',
        text: "'กราบเรียนท่านผู้อำนวยการและคณะกรรมการบริหาร โครงการสะเต็มศึกษาได้ดำเนินการสำเร็จลุล่วงตามวัตถุประสงค์ โดยมีนักเรียนเข้าร่วม ๑๕๐ คน คิดเป็นร้อยละ ๙๘ และมีผลความพึงพอใจในระดับมากที่สุดครับ'",
        type: "ภาษาแบบแผน กระชับ รัดกุม ตรงประเด็น (Formal & Concise)",
        score: 100,
        feedback: "สมบูรณ์แบบ! ใช้ภาษาแบบแผนทางการ มีโครงสร้างเอกภาพ สัมพันธภาพ และรายงานตัวเลขสถิติที่ชัดเจน"
      },
      {
        id: 'v2',
        text: "'สวัสดีทุกคนครับ งานสะเต็มครั้งนี้สนุกมาก เด็ก ๆ ชอบกันตรึมเลย จัดไปเมื่อสัปดาห์ก่อน ก็มีปัญหาขลุกขลักนิดหน่อยแต่ก็โอเคผ่านไปได้ด้วยดีครับ'",
        type: "ภาษาปากและขาดความเป็นมืออาชีพ (Informal & Vague)",
        score: 40,
        feedback: "การใช้ภาษาปากและคำสแลงในที่ประชุมทางการแสดงถึงความไม่พร้อมและขาดทักษะการใช้ภาษาระดับแบบแผน"
      }
    ],
    nonVerbalOptions: [
      {
        id: 'nv1',
        text: "แต่งกายเครื่องแบบข้าราชการ/ชุดสูทสุภาพ ยืนตัวตรงหลังตรงหน้าโพเดียม กวาดสายตามองผู้บริหาร และใช้รีโมตเปลี่ยนสไลด์อย่างมั่นใจ",
        type: "บุคลิกภาพสง่างามและวัตถุภาษาที่เหมาะสม",
        score: 100,
        feedback: "เสริมสร้างความน่าเชื่อถือและความเชื่อมั่นในผลงานโครงการวิชาการ"
      },
      {
        id: 'nv2',
        text: "ยืนพิงโพเดียม เอามือล้วงกระเป๋า และพูดด้วยน้ำเสียงเบาไม่มั่นใจ",
        type: "ภาษากายที่ขาดความมั่นคง",
        score: 30,
        feedback: "ทำให้ผู้บริหารไม่มั่นใจในคุณภาพและผลสัมฤทธิ์ของโครงการ"
      }
    ]
  }
];

export default function TeacherCommSimulator() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [selectedVerbal, setSelectedVerbal] = useState(null);
  const [selectedNonVerbal, setSelectedNonVerbal] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scenario = scenarios[activeScenarioIdx];

  const handleScenarioChange = (idx) => {
    setActiveScenarioIdx(idx);
    setSelectedVerbal(null);
    setSelectedNonVerbal(null);
    setIsSubmitted(false);
  };

  const handleReset = () => {
    setSelectedVerbal(null);
    setSelectedNonVerbal(null);
    setIsSubmitted(false);
  };

  const currentVerbalObj = scenario.verbalOptions.find(v => v.id === selectedVerbal);
  const currentNonVerbalObj = scenario.nonVerbalOptions.find(nv => nv.id === selectedNonVerbal);

  const totalScore = isSubmitted && currentVerbalObj && currentNonVerbalObj
    ? Math.round((currentVerbalObj.score + currentNonVerbalObj.score) / 2)
    : 0;

  return (
    <div className="simulator-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
      <div className="tool-header-card" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#fff', padding: '24px', borderRadius: '16px', marginBottom: '24px', boxShadow: '0 10px 25px -5px rgba(5, 150, 105, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <MessageSquare size={28} />
          <h2 style={{ fontSize: '22px', fontWeight: '700' }}>เครื่องมือจำลองสถานการณ์การสื่อสารสำหรับครู (Teacher Comm Simulator)</h2>
        </div>
        <p style={{ opacity: 0.9, fontSize: '14px' }}>
          ทดลองสวมบทบาทครูในสถานการณ์จริง เลือกใช้ <strong>วัจนภาษา (ระดับภาษาและถ้อยคำ)</strong> และ <strong>อวัจนภาษา (ภาษากายและน้ำเสียง)</strong> ที่เหมาะสมที่สุด
        </p>
      </div>

      {/* Scenario Selection Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px' }}>
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => handleScenarioChange(idx)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: activeScenarioIdx === idx ? '600' : '400',
              background: activeScenarioIdx === idx ? '#059669' : '#ffffff',
              color: activeScenarioIdx === idx ? '#ffffff' : '#334155',
              border: '1px solid ' + (activeScenarioIdx === idx ? '#059669' : '#e2e8f0'),
              whiteSpace: 'nowrap',
              boxShadow: activeScenarioIdx === idx ? '0 2px 8px rgba(5, 150, 105, 0.25)' : 'none',
              cursor: 'pointer'
            }}
          >
            {sc.category}
          </button>
        ))}
      </div>

      {/* Scenario Briefing Card */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Users size={20} color="#059669" />
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{scenario.title}</h3>
        </div>
        <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '10px', borderLeft: '4px solid #059669', marginBottom: '20px' }}>
          <strong style={{ color: '#047857', fontSize: '13px' }}>บริบทสถานการณ์:</strong>
          <p style={{ marginTop: '4px', color: '#334155', fontSize: '14px', lineHeight: '1.6' }}>{scenario.context}</p>
        </div>

        {/* Section 1: Verbal Choices */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: '#059669', color: '#fff', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>1</span>
            เลือกการใช้ถ้อยคำและระดับภาษา (Verbal Communication):
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {scenario.verbalOptions.map((v) => {
              const isSelected = selectedVerbal === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => !isSubmitted && setSelectedVerbal(v.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: `2px solid ${isSelected ? '#059669' : '#e2e8f0'}`,
                    background: isSelected ? '#ecfdf5' : '#ffffff',
                    cursor: isSubmitted ? 'default' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <p style={{ fontSize: '14px', color: '#1e293b', lineHeight: '1.6', fontWeight: isSelected ? '600' : '400' }}>
                    {v.text}
                  </p>
                  <span style={{ fontSize: '12px', color: isSelected ? '#059669' : '#64748b', marginTop: '6px', display: 'inline-block' }}>
                    รูปแบบ: {v.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Non-Verbal Choices */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: '#059669', color: '#fff', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>2</span>
            เลือกอวัจนภาษา ภาษากาย และน้ำเสียง (Non-Verbal Communication):
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {scenario.nonVerbalOptions.map((nv) => {
              const isSelected = selectedNonVerbal === nv.id;
              return (
                <div
                  key={nv.id}
                  onClick={() => !isSubmitted && setSelectedNonVerbal(nv.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: `2px solid ${isSelected ? '#059669' : '#e2e8f0'}`,
                    background: isSelected ? '#ecfdf5' : '#ffffff',
                    cursor: isSubmitted ? 'default' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <p style={{ fontSize: '14px', color: '#1e293b', lineHeight: '1.6', fontWeight: isSelected ? '600' : '400' }}>
                    {nv.text}
                  </p>
                  <span style={{ fontSize: '12px', color: isSelected ? '#059669' : '#64748b', marginTop: '6px', display: 'inline-block' }}>
                    รูปแบบ: {nv.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {!isSubmitted ? (
            <button
              onClick={() => setIsSubmitted(true)}
              disabled={!selectedVerbal || !selectedNonVerbal}
              style={{
                padding: '10px 24px',
                background: (!selectedVerbal || !selectedNonVerbal) ? '#cbd5e1' : '#059669',
                color: '#ffffff',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: (!selectedVerbal || !selectedNonVerbal) ? 'not-allowed' : 'pointer',
                boxShadow: (!selectedVerbal || !selectedNonVerbal) ? 'none' : '0 4px 12px rgba(5, 150, 105, 0.3)'
              }}
            >
              ประเมินผลการสื่อสาร
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
              ทดลองเลือกรูปแบบอื่น
            </button>
          )}
        </div>
      </div>

      {/* Feedback & Pedagogical Breakdown */}
      {isSubmitted && currentVerbalObj && currentNonVerbalObj && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={22} color="#059669" />
              <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>ผลการประเมินทักษะการสื่อสารวิชาชีพครู</h4>
            </div>
            <span style={{ fontSize: '16px', fontWeight: '800', color: totalScore >= 80 ? '#059669' : '#d97706' }}>
              คะแนนรวม: {totalScore} / 100 คะแนน
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: currentVerbalObj.score === 100 ? '#ecfdf5' : '#fffbeb', padding: '14px', borderRadius: '10px', borderLeft: `4px solid ${currentVerbalObj.score === 100 ? '#10b981' : '#f59e0b'}` }}>
              <strong style={{ fontSize: '13px', color: '#1e293b' }}>วิเคราะห์การใช้วัจนภาษา: ({currentVerbalObj.score} คะแนน)</strong>
              <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>{currentVerbalObj.feedback}</p>
            </div>

            <div style={{ background: currentNonVerbalObj.score === 100 ? '#ecfdf5' : '#fffbeb', padding: '14px', borderRadius: '10px', borderLeft: `4px solid ${currentNonVerbalObj.score === 100 ? '#10b981' : '#f59e0b'}` }}>
              <strong style={{ fontSize: '13px', color: '#1e293b' }}>วิเคราะห์การใช้อวัจนภาษา: ({currentNonVerbalObj.score} คะแนน)</strong>
              <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>{currentNonVerbalObj.feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
