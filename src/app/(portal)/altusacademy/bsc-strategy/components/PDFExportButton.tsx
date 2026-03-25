/**
 * PDF Export Button Component - BSC Strategy Session
 * Generates Altus-branded PDF with cyan accents
 * Uses html2pdf for client-side generation
 */

'use client';

import { useState } from 'react';

interface PDFExportButtonProps {
  fileName?: string;
  brandName?: string;
  accentColor?: string;
}

export default function PDFExportButton({
  fileName = 'BSC-Strategy-2025-Altus.pdf',
  brandName = 'ALTUS COLLECTIVE',
  accentColor = '#5DADE2',
}: PDFExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;

      const element = document.createElement('div');
      element.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 40px; background: white;">
          <div style="border-bottom: 3px solid ${accentColor}; padding-bottom: 20px; margin-bottom: 30px;">
            <div style="font-size: 24px; font-weight: bold; color: #1A1A1A; margin-bottom: 5px;">
              ${brandName}
            </div>
            <div style="font-size: 12px; color: #666; letter-spacing: 2px; text-transform: uppercase;">
              BSC Strategy Session 2025
            </div>
          </div>

          <h1 style="font-size: 36px; font-weight: bold; color: #1A1A1A; margin: 30px 0 10px 0;">
            Building Service Contractor Strategy Session
          </h1>
          <p style="font-size: 16px; color: ${accentColor}; font-weight: bold; margin-bottom: 20px;">
            Industry Strategy & Market Insights
          </p>

          <div style="background: #F5F5F5; padding: 20px; border-left: 4px solid ${accentColor}; margin: 30px 0;">
            <p style="margin: 0; line-height: 1.6;">
              This document contains the strategic framework, market insights, and actionable recommendations from the BSC Strategy Session. 
              Key topics include market dynamics, workforce challenges, digital transformation, sustainability initiatives, and growth strategies.
            </p>
          </div>

          <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #999;">
            <p style="margin: 0 0 10px 0;">
              <strong>Generated:</strong> ${new Date().toLocaleDateString()}
            </p>
            <p style="margin: 0; color: ${accentColor}; font-weight: bold;">
              ${brandName}
            </p>
            <p style="margin: 5px 0 0 0; font-size: 10px;">
              altuscollective.us
            </p>
          </div>
        </div>
      `;

      const opt = {
        margin: 10,
        filename: fileName,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };

      html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="px-6 py-3 bg-white text-gray-900 font-bold border-2 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      style={{
        borderColor: accentColor,
        color: accentColor,
      }}
    >
      {isGenerating ? (
        <>
          <div
            className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: accentColor }}
          />
          Generating...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-4-2m4 2l4-2"
            />
          </svg>
          Download PDF
        </>
      )}
    </button>
  );
}
