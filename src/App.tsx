/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HeaderNav } from './components/HeaderNav.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { InteractiveEngineeringWidget } from './components/InteractiveEngineeringWidget.tsx';
import { ProductsAndSidebar } from './components/ProductsAndSidebar.tsx';
import { AiAnalyzerSection } from './components/AiAnalyzerSection.tsx';
import { FooterSection } from './components/FooterSection.tsx';
import { ModalDetail } from './components/ModalDetail.tsx';
import { DemoCalculatorModal } from './components/DemoCalculatorModal.tsx';
import { authorData } from './data/engineeringData.ts';

export default function App() {
  // Modal states
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  // Live Calculator Demo state
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  
  // Contact copy state
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(authorData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#f1f5f9] flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      {/* Navigation */}
      <HeaderNav onOpenDemo={() => setIsDemoOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero & Metrics */}
        <HeroSection 
          
          onOpenDemo={() => setIsDemoOpen(true)}
        />

        {/* Interactive Calculator & Telemetry Simulator */}
        <InteractiveEngineeringWidget />

        {/* Products Grid & Author Sidebar */}
        <ProductsAndSidebar
          onOpenModal={(id) => setActiveModalId(id)}
          
          onOpenDemo={() => setIsDemoOpen(true)}
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedEmail}
        />

        {/* ESP AI ANALYZER Deep Dive */}
        <AiAnalyzerSection />
      </main>

      {/* Footer */}
      <FooterSection />

      {/* Modals & Dialogs */}
      <ModalDetail
        modalId={activeModalId}
        onClose={() => setActiveModalId(null)}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      

      {/* Embedded Live Calculator Modal */}
      <DemoCalculatorModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
}
