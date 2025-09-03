import { useEffect, useRef, useState } from 'react';
import { useToasts } from '../components/ToastProvider.jsx';
import "./Contact.css";

const Contact = () => {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const firstInputRef = useRef(null);
  const { push } = useToasts();

  const endpoint = "https://formspree.io/f/xvgbvoel"; // e.g. https://formspree.io/f/xxxxxx

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  };

  useEffect(() => { firstInputRef.current?.focus(); }, []);

  const validate = () => {
    if (values.honeypot) return 'Spam blocked';
    if (!values.name.trim()) return 'Атыңыз қажет';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) return 'Email қате';
    if (values.subject.trim().length < 2) return 'Тақырып қысқа';
    if (values.message.trim().length < 5) return 'Хабарлама тым қысқа';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const vErr = validate();
    if (vErr) { setError(vErr); return; }
    if (!endpoint) { setError('Endpoint орнатылмады (VITE_CONTACT_ENDPOINT)'); return; }
    try {
      setStatus('sending');
      setProgress(0);
      const progInterval = setInterval(() => {
        setProgress(p => p < 90 ? p + 8 : p);
      }, 180);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(values)
      });
      clearInterval(progInterval);
      if (!res.ok) throw new Error('Сервер қате');
      setProgress(100);
      setStatus('success');
      setValues({ name: '', email: '', subject:'', message: '', honeypot:'' });
      push('Хабарлама жіберілді ✅','success');
      setTimeout(() => { setStatus('idle'); setProgress(0); }, 5000);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Қате болды');
      push('Қате: хабарлама жіберілмеді ❌','error');
    }
  };

  return (
    <main id="contact" className="section container">
      <div className="section-header">
        <h2 className="gradient-text">Байланыс</h2>
        <p className="muted">Жазуға болады ↑</p>
      </div>
      <div style={{textAlign:'center',marginTop:'1.2rem',fontSize:'1.08rem',color:'#2d8fa3',fontFamily:'Press Start 2P, monospace',marginBottom:'40px'}}>
        <span style={{color:'#13aa52'}}>Барлығы дұрыс жұмыс істейді!</span>
      </div>
      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input ref={firstInputRef} name="name" value={values.name} onChange={onChange} required placeholder="Атыңыз" style={styledInput(values.name, error)} />
          <input name="email" value={values.email} onChange={onChange} required type="email" placeholder="Email" style={styledInput(values.email, error)} />
          <input name="subject" value={values.subject} onChange={onChange} required placeholder="Тақырып" style={styledInput(values.subject, error)} />
          <textarea name="message" value={values.message} onChange={onChange} required rows={5} placeholder="Хабарлама" style={styledInput(values.message, error)} />
          <div style={{position:'absolute', left:'-5000px', top:'-5000px'}} aria-hidden="true">
            <label>Leave empty<input name="honeypot" value={values.honeypot} onChange={onChange} tabIndex={-1} autoComplete="off" /></label>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'18px'}}>
            <button disabled={status==='sending' || status==='success'} className="btn primary" style={{width: "fit-content", opacity: status==='sending'||status==='success'?0.75:1}}>
              {status === 'sending' ? 'Жіберілуде…' : status === 'success' ? '✔' : 'Жіберу'}
            </button>
            {status === 'success' && <span className="form-status success">✔ Жіберілді!</span>}
            {status === 'error' && <span className="form-status error">✖ {error}</span>}
          </div>
          {status==='sending' && <div className="progress-outer"><div className="progress-inner" style={{width: progress+'%'}} /></div>}
          {error && status!=='error' && <div className="form-status error" style={{marginTop:'6px'}}>{error}</div>}
          {!endpoint && <div className="form-status warn">ENV VITE_CONTACT_ENDPOINT жоқ</div>}
        </form>
        <div className="contact-info">
          <h3 className="contact-head">Тікелей байланыс</h3>
          <ul className="contact-list">
            <li>
              <a className="contact-link retro-wait" href="https://github.com/adskydrocher228" target="_blank" rel="noopener noreferrer">
                <span className="chest" aria-hidden="true"><span className="lid"/><span className="base"/><span className="loot"/></span>
                GitHub: adskydrocher228
              </a>
            </li>
            <li>
              <a className="contact-link retro-wait" href="mailto:underlowsky@gmail.com">
                <span className="chest" aria-hidden="true"><span className="lid"/><span className="base"/><span className="loot"/></span>
                Email: underlowsky@gmail.com
              </a>
            </li>
            <li>
              <a className="contact-link retro-wait" href="https://t.me/underlowsky" target="_blank" rel="noopener noreferrer">
                <span className="chest" aria-hidden="true"><span className="lid"/><span className="base"/><span className="loot"/></span>
                Telegram: @underlowsky
              </a>
            </li>
            <li>
              <a className="contact-link retro-wait" href="https://www.instagram.com/d.is1a" target="_blank" rel="noopener noreferrer">
                <span className="chest" aria-hidden="true"><span className="lid"/><span className="base"/><span className="loot"/></span>
                Instagram: d.is1a
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

const baseInput = { padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', transition:'border-color .25s, box-shadow .25s' };
const styledInput = (value, err) => ({ ...baseInput, borderColor: err && !value ? '#c03838' : 'rgba(0,0,0,0.15)', boxShadow: err && !value ? '0 0 0 3px #c03838,0 0 0 6px #fff' : 'none' });


export default Contact;