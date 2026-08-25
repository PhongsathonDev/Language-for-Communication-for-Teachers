import React, { useState } from 'react';
import { Layers, RotateCcw, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

export default function FlashcardsView() {
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const allCards = [
    // Unit 1
    {
      category: "หน่วยที่ 1: ภาษาและการสื่อสาร",
      front: "ภาษา หมายถึงอะไรตามพจนานุกรมฉบับราชบัณฑิตยสถาน?",
      back: "1. ถ้อยคำที่ใช้พูดหรือเขียนเพื่อสื่อความของชนกลุ่มใดกลุ่มหนึ่งหรือเฉพาะวงการ\n2. เสียง ตัวหนังสือ หรือกิริยาอาการที่สื่อความได้ (ภาษาพูด, ภาษาเขียน, ภาษาท่าทาง, ภาษามือ)\n3. คนหรือชาติที่พูดภาษานั้น ๆ"
    },
    {
      category: "หน่วยที่ 1: ภาษาและการสื่อสาร",
      front: "ความสำคัญของภาษา 5 มิติหลักมีอะไรบ้าง?",
      back: "1. ภาษาเป็นวัฒนธรรม\n2. ภาษาเป็นสมบัติของสังคม\n3. ภาษาเป็นสื่อ/เครื่องมือติดต่อสื่อสาร\n4. ภาษาเป็นเครื่องมือพัฒนามนุษย์\n5. ภาษาเป็นทั้งศาสตร์และศิลป์"
    },
    {
      category: "หน่วยที่ 1: ภาษาและการสื่อสาร",
      front: "องค์ประกอบ 5 ประการของกระบวนการสื่อสาร (SMCRF) มีอะไรบ้าง?",
      back: "1. ผู้ส่งสาร (Sender/Encoder)\n2. สาร (Message)\n3. ช่องทาง/สื่อ (Channel)\n4. ผู้รับสาร (Receiver/Decoder)\n5. ผลของการสื่อสาร / ผลสะท้อนกลับ (Feedback/Effect)"
    },

    // Unit 2
    {
      category: "หน่วยที่ 2: ความรู้ทั่วไปภาษาไทย",
      front: "วัจนภาษา (Verbal) กับ อวัจนภาษา (Non-Verbal) แตกต่างกันอย่างไร?",
      back: "วัจนภาษา = ภาษาถ้อยคำ ทั้งภาษาพูดและภาษาเขียนที่เป็นลายลักษณ์อักษร\nอวัจนภาษา = ภาษาที่ไม่ใช่ถ้อยคำ สื่อสารผ่านรูป รส กลิ่น เสียง กิริยาท่าทาง และสิ่งแวดล้อม"
    },
    {
      category: "หน่วยที่ 2: ความรู้ทั่วไปภาษาไทย",
      front: "อวัจนภาษา 11 ประเภทมีอะไรบ้าง?",
      back: "1. สัมผัสภาษา (จับมือ/แตะไหล่)\n2. อาการภาษา (กิริยาท่าทาง)\n3. วัตถุภาษา (เครื่องแต่งกาย/สิ่งของ)\n4. เทศภาษา (ระยะห่าง/ระดับ)\n5. กาลภาษา (เวลา/นัดหมาย)\n6. ปริภาษา (น้ำเสียง/จังหวะ)\n7. เนตรภาษา (สายตา)\n8. กลิ่น\n9. ภาพ\n10. สี\n11. ลักษณะอักษร/วรรคตอน"
    },
    {
      category: "หน่วยที่ 2: ความรู้ทั่วไปภาษาไทย",
      front: "ระบบเสียงและอักษรไทย มีจำนวนรูปและเสียงอย่างไร?",
      back: "• พยัญชนะ: 44 รูป 21 เสียง (ไตรยางศ์: สูง 11, กลาง 9, ต่ำ 24)\n• สระ: 21 รูป 32 เสียง (สระแท้ 18, สระประสม 6, สระเกิน 8)\n• วรรณยุกต์: 4 รูป 5 เสียง (สามัญ, เอก, โท, ตรี, จัตวา)"
    },
    {
      category: "หน่วยที่ 2: ความรู้ทั่วไปภาษาไทย",
      front: "ลักษณนามของ 'ขลุ่ย', 'เลื่อย', 'แห' และ 'พระภิกษุ' คืออะไร?",
      back: "• ขลุ่ย = เลา (ขลุ่ย ๑ เลา)\n• เลื่อย = ปื้น (เลื่อย ๑ ปื้น)\n• แห = ปาก (แห ๑ ปาก)\n• พระภิกษุ = รูป (พระภิกษุ ๑ รูป)"
    },
    {
      category: "หน่วยที่ 2: ความรู้ทั่วไปภาษาไทย",
      front: "คำว่า 'ศีรษะ', 'นะคะ', 'ปรากฏ', 'เบญจเพส' สะกดอย่างไรให้ถูกต้อง?",
      back: "• ศีรษะ (สระอีบน ศ ศาลา - ไม่ใช่ ศรีษะ)\n• นะคะ (รูปสามัญเสียงตรี - ไม่ใช่ นะค่ะ/น๊ะค๊ะ)\n• ปรากฏ (ใช้ ฏ ปฏัก - ไม่ใช่ ปรากฎ)\n• เบญจเพส (สะกดด้วย ส เสือ - ไม่ใช่ เบญจเพศ)"
    },
    {
      category: "หน่วยที่ 2: ความรู้ทั่วไปภาษาไทย",
      front: "ระดับของภาษาไทยแบ่งออกเป็นกี่ระดับ อะไรบ้าง?",
      back: "แบ่งออกเป็น 3 ระดับหลัก:\n1. ภาษาแบบแผน (Formal) - งานวิชาการ หนังสือราชการ ปาฐกถา\n2. ภาษากึ่งแบบแผน (Semi-formal) - ข่าว จดหมายธุรกิจ บทความทั่วไป\n3. ภาษาปาก/กันเอง (Informal) - สนทนาในครอบครัว เพื่อนฝูง"
    },

    // Unit 3
    {
      category: "หน่วยที่ 3: ทักษะการฟัง",
      front: "การได้ยิน (Hearing) กับ การฟัง (Listening) แตกต่างกันอย่างไร?",
      back: "• การได้ยิน: ปฏิกิริยาทางกายภาพ คลื่นเสียงกระทบหู ไม่จำเป็นต้องมีสมาธิ\n• การฟัง: กระบวนการทางปัญญา (Cognitive) ต้องใช้สมาธิ คิด วิเคราะห์ ตีความ และประเมินสาร"
    },
    {
      category: "หน่วยที่ 3: ทักษะการฟัง",
      front: "5 ขั้นตอนในกระบวนการฟัง (Listening Process) มีอะไรบ้าง?",
      back: "1. รับเสียง (Receiving)\n2. จดจ่อใส่ใจ (Attending)\n3. ทำความเข้าใจ (Understanding)\n4. ประเมินค่า (Evaluating)\n5. ตอบสนอง (Responding)"
    },

    // Unit 4
    {
      category: "หน่วยที่ 4: ทักษะการพูด",
      front: "ประเภทของการพูดจำแนกตามการเตรียมตัว 4 รูปแบบมีอะไรบ้าง?",
      back: "1. การพูดแบบกะทันหัน (Impromptu Speaking) - ไม่ได้เตรียมตัวล่วงหน้า\n2. การพูดโดยมีโครงร่าง (Extemporaneous Speaking) - เตรียมโครงร่างซักซ้อมแต่ไม่ท่องจำ\n3. การพูดโดยอ่านจากต้นฉบับ (Manuscript Speaking) - อ่านตามเอกสารทุกคำ\n4. การพูดโดยการท่องจำ (Memorized Speaking) - ท่องจำขึ้นใจทุกประโยค"
    },
    {
      category: "หน่วยที่ 4: ทักษะการพูด",
      front: "สัดส่วนโครงสร้างเวลาในการพูด (คำนำ, เนื้อเรื่อง, สรุป) ที่เหมาะสมคือเท่าใด?",
      back: "• คำนำ: 10 - 15% (เร้าความสนใจ สร้างบรรยากาศ บอกหัวข้อ)\n• เนื้อเรื่อง: 75 - 80% (ลำดับประเด็นชัดเจน มีตัวอย่างสนับสนุน)\n• บทสรุป: 10 - 15% (สรุปประเด็นหลัก ฝากข้อคิดเตือนใจ)"
    },

    // Unit 5
    {
      category: "หน่วยที่ 5: ทักษะการอ่าน",
      front: "4 ระดับของทักษะการอ่าน (Reading Levels) มีอะไรบ้าง?",
      back: "1. อ่านรู้เรื่อง (Literal) - ใคร ทำอะไร ที่ไหน เมื่อใด\n2. อ่านเข้าใจและตีความ (Interpretive) - ความหมายแฝง/เจตนาผู้เขียน\n3. อ่านอย่างมีวิจารณญาณ (Critical) - แยกข้อเท็จจริง vs ข้อคิดเห็น\n4. อ่านเพื่อประเมินค่าและประยุกต์ใช้ (Evaluative/Applied) - นำไปแก้ปัญหา"
    },
    {
      category: "หน่วยที่ 5: ทักษะการอ่าน",
      front: "ข้อบกพร่องที่ทำให้อ่านหนังสือได้ช้าที่ควรแก้ไขมีอะไรบ้าง?",
      back: "1. การส่ายศีรษะตามบรรทัด\n2. ใช้นิ้วมือหรือปากกาชี้ตามตัวหนังสือตลอดเวลา\n3. การขยับปากหรืออ่านพึมพำขณะอ่านในใจ\n4. การกวาดสายตาย้อนกลับไปมา (Regression)\n5. การอ่านคำต่อคำ (ควรอ่านเป็นกลุ่มคำ Phrase Reading)"
    },

    // Unit 6
    {
      category: "หน่วยที่ 6: การอ่านจับใจความ",
      front: "ใจความสำคัญ (Main Idea) กับ พลความ (Supporting Details) ต่างกันอย่างไร?",
      back: "• ใจความสำคัญ: แก่นหรือประเด็นหลักที่ครอบคลุมข้อความทั้งหมด ตัดออกไม่ได้\n• พลความ: ส่วนขยายความ เช่น ตัวอย่าง เหตุผล สถิติ คำอธิบาย หากตัดออกยังคงเข้าใจเรื่องได้"
    },
    {
      category: "หน่วยที่ 6: การอ่านจับใจความ",
      front: "5 ตำแหน่งของใจความสำคัญในย่อหน้ามีที่ใดบ้าง?",
      back: "1. อยู่ตอนต้นย่อหน้า (พบบ่อยที่สุด)\n2. อยู่ตอนท้ายย่อหน้า\n3. อยู่ตรงกลางย่อหน้า\n4. อยู่ทั้งตอนต้นและตอนท้ายย่อหน้า\n5. แฝงอยู่ทั่วทั้งย่อหน้า (ไม่มีประโยคเดี่ยว ผู้อ่านต้องสรุปเอง)"
    },
    {
      category: "หน่วยที่ 6: การอ่านจับใจความ",
      front: "หลักการตั้งคำถาม 5W1H ในการอ่านจับใจความคืออะไร?",
      back: "• Who (ใคร)\n• What (ทำอะไร)\n• Where (ที่ไหน)\n• When (เมื่อใด)\n• Why (ทำไม)\n• How (อย่างไร)"
    },

    // Unit 7
    {
      category: "หน่วยที่ 7: ทักษะการเขียน",
      front: "3 เสาหลักของลักษณะงานเขียนที่ดีมีอะไรบ้าง?",
      back: "1. เอกภาพ (Unity): มีวัตถุประสงค์และประเด็นหลักเพียงเรื่องเดียว ไม่นอกเรื่อง\n2. สัมพันธภาพ (Coherence): มีความต่อเนื่อง เชื่อมโยง สอดคล้องกันอย่างมีเหตุผล\n3. สารัตถภาพ (Emphasis): การเน้นย้ำประเด็นสำคัญให้เด่นชัดในตำแหน่งที่เหมาะสม"
    },
    {
      category: "หน่วยที่ 7: ทักษะการเขียน",
      front: "4 ขั้นตอนของกระบวนการเขียน (Writing Process) คืออะไร?",
      back: "1. ขั้นก่อนเขียน (Prewriting) - วางแผน ค้นคว้า กำหนดโครงเรื่อง\n2. ขั้นยกร่าง (Drafting) - เขียนเนื้อหาตามโครงร่าง\n3. ขั้นปรับปรุงแก้ไข (Revising & Editing) - ตรวจสอบเนื้อหาและไวยากรณ์\n4. ขั้นเผยแพร่ (Publishing) - นำเสนอหรือตีพิมพ์"
    },

    // Unit 8
    {
      category: "หน่วยที่ 8: การเขียนสรุปความ",
      front: "กฎเหล็ก 5 ข้อด้านการใช้ภาษาในการเขียนสรุปความคืออะไร?",
      back: "1. ใช้คำง่าย ตรงความหมาย\n2. ใช้ประโยคความเดียวสั้น ๆ กระชับ\n3. สะกดคำถูกต้องตามพจนานุกรม\n4. ห้ามใช้อักษรย่อในข้อความสรุป (ต้องเขียนคำเต็ม)\n5. คงคำราชาศัพท์ตามต้นฉบับเดิม"
    },
    {
      category: "หน่วยที่ 8: การเขียนสรุปความ",
      front: "ข้อควรระวังสำคัญที่สุดในการเขียนสรุปความคืออะไร?",
      back: "1. ห้ามใส่ความคิดเห็น อคติ หรือข้อวิจารณ์ส่วนตัวของผู้สรุปปนลงไปเด็ดขาด (ต้องคงเจตนาเดิมของผู้เขียน)\n2. ความยาวที่เหมาะสมควรอยู่ที่ประมาณ 1 ใน 3 หรือ 1 ใน 4 ของต้นฉบับเดิม"
    }
  ];

  const categories = ['all', ...Array.from(new Set(allCards.map(c => c.category)))];

  const filteredCards = activeCategory === 'all'
    ? allCards
    : allCards.filter(c => c.category === activeCategory);

  const currentCard = filteredCards[cardIdx] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCardIdx(0);
    setIsFlipped(false);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIdx = Math.floor(Math.random() * filteredCards.length);
    setCardIdx(randomIdx);
  };

  return (
    <div className="flashcards-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>
      <div className="tool-header-card" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#fff', padding: '24px', borderRadius: '16px', marginBottom: '24px', boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Layers size={28} />
          <h2 style={{ fontSize: '22px', fontWeight: '700' }}>Flashcards บัตรคำช่วยจำ (Active Recall)</h2>
        </div>
        <p style={{ opacity: 0.9, fontSize: '14px' }}>
          ทบทวนแก่นความรู้สำคัญ 8 หน่วยการเรียนรู้ คลิกที่การ์ดเพื่อพลิกดูคำตอบด้านหลัง ฝึกความจำระยะยาวก่อนลงสนามสอบ
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: activeCategory === cat ? '600' : '400',
              background: activeCategory === cat ? '#4f46e5' : '#ffffff',
              color: activeCategory === cat ? '#ffffff' : '#475569',
              border: '1px solid ' + (activeCategory === cat ? '#4f46e5' : '#e2e8f0'),
              boxShadow: activeCategory === cat ? '0 2px 8px rgba(79, 70, 229, 0.25)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {cat === 'all' ? `ทั้งหมด (${allCards.length} ใบ)` : cat}
          </button>
        ))}
      </div>

      {/* Card Counter & Shuffle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>
          บัตรคำที่ {cardIdx + 1} จากทั้งหมด {filteredCards.length} ใบ
        </span>
        <button
          onClick={handleShuffle}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#4f46e5', background: '#eeefff', padding: '6px 12px', borderRadius: '8px', fontWeight: '500' }}
        >
          <RefreshCw size={14} />
          สุ่มบัตรคำ
        </button>
      </div>

      {/* Flashcard Interactive Area */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          minHeight: '300px',
          background: isFlipped ? '#ffffff' : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: isFlipped ? '2px solid #4f46e5' : '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '36px 28px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: isFlipped ? '0 15px 30px -5px rgba(79, 70, 229, 0.15)' : '0 4px 20px rgba(0,0,0,0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontSize: '12px',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '6px',
            background: isFlipped ? '#ecfdf5' : '#f1f5f9',
            color: isFlipped ? '#059669' : '#475569'
          }}>
            {isFlipped ? '✓ เฉลยคำตอบ (BACK)' : '❓ คำถามทบทวน (FRONT)'}
          </span>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            {currentCard?.category}
          </span>
        </div>

        <div style={{ margin: '24px 0', textAlign: 'center' }}>
          {!isFlipped ? (
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', lineHeight: '1.6' }}>
              {currentCard?.front}
            </h3>
          ) : (
            <div style={{ fontSize: '16px', color: '#1e293b', lineHeight: '1.8', whiteSpace: 'pre-line', textAlign: 'left' }}>
              {currentCard?.back}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
          {isFlipped ? '💡 คลิกอีกครั้งเพื่อดูคำถาม' : '👆 แตะหรือคลิกที่การ์ดเพื่อพลิกดูคำตอบ'}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
        <button
          onClick={handlePrev}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '10px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#334155',
            fontWeight: '600'
          }}
        >
          <ArrowLeft size={16} />
          ก่อนหน้า
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '10px',
            background: isFlipped ? '#059669' : '#4f46e5',
            color: '#ffffff',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}
        >
          <RotateCcw size={16} />
          {isFlipped ? 'ดูคำถาม' : 'พลิกดูคำตอบ'}
        </button>

        <button
          onClick={handleNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '10px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#334155',
            fontWeight: '600'
          }}
        >
          ถัดไป
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
