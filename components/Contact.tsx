'use client';

import { useState } from 'react';
import { Mail, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: infoRef, isVisible: infoVisible } = useScrollAnimation();
  const { elementRef: formRef, isVisible: formVisible } = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-10 ${titleVisible ? 'slide-in-left' : 'opacity-0'}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">ping</h2>
          <p className="text-gray-500 font-mono text-sm mt-4">/* let's connect */</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div ref={infoRef as React.RefObject<HTMLDivElement>} className={infoVisible ? 'slide-in-left' : 'opacity-0'}>
            <p className="text-gray-300 mb-6">
              Got a security audit that needs doing? A web app that needs building?
              Or just want to talk shop about the latest CVEs? I'm all ears.
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 border border-[#0fa]/10 hover:border-[#0fa]/30 hover:bg-[#0fa]/5 transition-all group"
              >
                <Mail className="w-5 h-5 text-[#0fa]" />
                <div>
                  <p className="font-mono text-[10px] text-gray-500">EMAIL</p>
                  <p className="text-white group-hover:text-[#0fa] transition-colors text-sm">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 border border-[#0fa]/10">
                <MapPin className="w-5 h-5 text-[#0fa]" />
                <div>
                  <p className="font-mono text-[10px] text-gray-500">LOCATION</p>
                  <p className="text-white text-sm">New Delhi, India</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-[#0fa]/20 hover:border-[#0fa] hover:bg-[#0fa]/10 transition-all"
              >
                <Github className="w-5 h-5 text-[#0fa]" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-[#0fa]/20 hover:border-[#0fa] hover:bg-[#0fa]/10 transition-all"
              >
                <Linkedin className="w-5 h-5 text-[#0fa]" />
              </a>
            </div>
          </div>

          <div ref={formRef as React.RefObject<HTMLDivElement>} className={`hacker-card p-6 ${formVisible ? 'slide-in-right' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#0fa]/10">
              <div className="status-dot" />
              <span className="font-mono text-xs text-[#0fa]/60">secure_channel</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] text-gray-500 block mb-1.5">NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-[#0fa]/20 text-white text-sm"
                  placeholder="your_name"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-500 block mb-1.5">EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-[#0fa]/20 text-white text-sm"
                  placeholder="you@domain.com"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-500 block mb-1.5">MESSAGE</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-[#0fa]/20 text-white text-sm resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-3 font-mono text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  status === 'success' 
                    ? 'bg-emerald-500 text-white' 
                    : status === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-[#0fa] text-[#0a0a0f] hover:bg-[#0fa]/90'
                }`}
              >
                {status === 'sending' ? (
                  <>Sending...</>
                ) : status === 'success' ? (
                  <>Message sent!</>
                ) : status === 'error' ? (
                  <>Failed to send</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    send_message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
