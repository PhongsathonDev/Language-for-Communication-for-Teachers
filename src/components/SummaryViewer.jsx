import React, { useState } from 'react';
import {
  AlertTriangle, ArrowRight, Sparkles, Activity, GitCommit, Copy, Check
} from 'lucide-react';

export default function SummaryViewer({ modules, activeModuleId, searchQuery }) {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  const displayModules = searchQuery
    ? modules.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : modules.filter(m => m.id === activeModuleId);

  const handleCopyCode = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  // Convert inline markdown like **bold**, `code`, *italic*
  const formatInlineMarkdown = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  };

  // Parse table rows from markdown
  const parseMarkdownTable = (tableLines) => {
    if (tableLines.length < 2) return null;
    const headerLine = tableLines[0];
    const headerCols = headerLine.split('|').map(c => c.trim()).filter((c, i, a) => i > 0 && i < a.length - 1);
    
    const bodyLines = tableLines.slice(2); // Skip separator row |---|---|
    const rows = bodyLines.map(row => 
      row.split('|').map(c => c.trim()).filter((c, i, a) => i > 0 && i < a.length - 1)
    );

    return { headerCols, rows };
  };

  // Render parsed markdown
  const renderMarkdown = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        i++;
        continue;
      }

      // 1. Code Blocks (```...```)
      if (trimmed.startsWith('```')) {
        let codeText = '';
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeText += lines[i] + '\n';
          i++;
        }
        i++; // Skip closing ```

        // Check if code contains an arrow flow like "PC -> MAR -> ..."
        const isFlowchart = codeText.includes('->') || codeText.includes('-->');

        if (isFlowchart) {
          const flowLines = codeText.trim().split('\n');
          elements.push(
            <div key={`flow-${i}`} className="modern-flowchart-card">
              <div className="flowchart-header">
                <GitCommit size={16} className="flowchart-icon" />
                <span>แผนผังลำดับขั้นตอนการทำงาน (Process Flow)</span>
              </div>
              <div className="flowchart-body">
                {flowLines.map((fLine, fIdx) => {
                  const parts = fLine.split(/\s*(?:->|-->)\s*/);
                  if (parts.length > 1) {
                    return (
                      <div key={fIdx} className="flow-step-sequence">
                        {parts.map((p, pIdx) => (
                          <React.Fragment key={pIdx}>
                            <div className="flow-step-node">
                              <span className="flow-node-text">{p.trim()}</span>
                            </div>
                            {pIdx < parts.length - 1 && (
                              <div className="flow-arrow-connector">
                                <ArrowRight size={16} />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <div key={fIdx} className="flow-plain-line">
                      {fLine}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        } else {
          const curIdx = i;
          elements.push(
            <div key={`code-${i}`} className="code-block-wrapper">
              <div className="code-block-header">
                <span className="code-lang-tag">ASSEMBLY / DIAGRAM</span>
                <button
                  className="code-copy-btn"
                  onClick={() => handleCopyCode(codeText.trim(), curIdx)}
                  title="คัดลอกโค้ด"
                >
                  {copiedCodeIdx === curIdx ? (
                    <>
                      <Check size={14} color="#10b981" />
                      <span>คัดลอกแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>คัดลอก</span>
                    </>
                  )}
                </button>
              </div>
              <div className="code-block-body">
                <pre>{codeText.trim()}</pre>
              </div>
            </div>
          );
        }
        continue;
      }

      // 2. Markdown Tables (| Col 1 | Col 2 |)
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const tableLines = [];
        while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }
        const parsedTable = parseMarkdownTable(tableLines);
        if (parsedTable) {
          elements.push(
            <div key={`table-${i}`} className="modern-table-container">
              <div className="table-responsive">
                <table className="modern-data-table">
                  <thead>
                    <tr>
                      {parsedTable.headerCols.map((col, cIdx) => (
                        <th key={cIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(col) }} />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedTable.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cell) }} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }
        continue;
      }

      // 3. Headings
      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="section-h3">
            {trimmed.replace('### ', '')}
          </h3>
        );
        i++;
        continue;
      }

      if (trimmed.startsWith('#### ')) {
        elements.push(
          <h4 key={`h4-${i}`} className="section-h4">
            {trimmed.replace('#### ', '')}
          </h4>
        );
        i++;
        continue;
      }

      // 4. Horizontal Rules
      if (trimmed === '---') {
        elements.push(<hr key={`hr-${i}`} className="section-divider" />);
        i++;
        continue;
      }

      // 5. Blockquotes / Callouts (> ...)
      if (trimmed.startsWith('> ')) {
        let quoteText = '';
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          quoteText += lines[i].trim().replace(/^>\s*/, '') + ' ';
          i++;
        }
        elements.push(
          <div key={`quote-${i}`} className="callout callout-purple">
            <Sparkles size={18} className="callout-icon" />
            <div className="callout-content" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(quoteText.trim()) }} />
          </div>
        );
        continue;
      }

      // 6. Ordered Lists (1. ...)
      const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (olMatch) {
        const listItems = [];
        const startNum = parseInt(olMatch[1], 10);
        while (i < lines.length) {
          const lTrimmed = lines[i].trim();
          const match = lTrimmed.match(/^(\d+)\.\s+(.*)/);
          if (match) {
            listItems.push({ num: parseInt(match[1], 10), text: match[2] });
            i++;
            // Check for indented sub-bullets
            while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
              listItems.push({ isSub: true, text: lines[i].trim().replace(/^[-*]\s+/, '') });
              i++;
            }
          } else {
            break;
          }
        }

        elements.push(
          <ol key={`ol-${i}`} start={startNum} className="modern-ordered-list">
            {listItems.map((it, idx) => (
              it.isSub ? (
                <li key={idx} className="sub-list-item" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(it.text) }} />
              ) : (
                <li key={idx} value={it.num} className="main-list-item" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(it.text) }} />
              )
            ))}
          </ol>
        );
        continue;
      }

      // 7. Unordered Lists (- ... or * ...)
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const listItems = [];
        while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
          listItems.push(lines[i].trim().replace(/^[-*]\s+/, ''));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="modern-unordered-list">
            {listItems.map((it, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(it) }} />
            ))}
          </ul>
        );
        continue;
      }

      // 8. Regular Paragraphs
      elements.push(
        <p key={`p-${i}`} className="prose-paragraph" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />
      );
      i++;
    }

    return elements;
  };

  return (
    <main className="summary-viewer">
      {displayModules.map((module) => (
        <article key={module.id} className="content-card">
          <div className="card-header">
            <div className="card-header-left">
              <span className="module-badge">MODULE {module.moduleNumber}</span>
              <h2 className="card-title">{module.title}</h2>
            </div>
            <span className="page-ref-badge">{module.pageRef}</span>
          </div>

          <div className="callout callout-info" style={{ marginBottom: '24px' }}>
            <Activity size={18} className="callout-icon" />
            <div className="callout-content">
              <strong>สรุปย่อ:</strong> {module.summary}
            </div>
          </div>

          <div className="prose">
            {renderMarkdown(module.content)}
          </div>
        </article>
      ))}

      {displayModules.length === 0 && (
        <div className="content-card empty-search-card">
          <AlertTriangle size={48} color="#f59e0b" style={{ margin: '0 auto 16px auto' }} />
          <h3>ไม่พบข้อมูลที่ตรงกับคำค้นหา "{searchQuery}"</h3>
          <p style={{ color: '#64748b', marginTop: '8px' }}>ลองเปลี่ยนคำค้นหา หรือกดปุ่มรีเซ็ตการค้นหาที่แถบด้านบน</p>
        </div>
      )}
    </main>
  );
}
