import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HUDLayout from './components/HUDLayout';

// Import public demonstration pages
import Overview from './pages/Overview';
import GuidedDemo from './pages/GuidedDemo';
import Evidence from './pages/Evidence';
import Assets from './pages/Assets';
import Findings from './pages/Findings';
import ReviewQueue from './pages/ReviewQueue';
import Reports from './pages/Reports';
import AuditTrail from './pages/AuditTrail';
import HowItWorks from './pages/HowItWorks';
import Simulator from './pages/Simulator';

export default function App() {
  return (
    <Router>
      <HUDLayout>
        <Routes>
          {/* Default base route redirect to /overview */}
          <Route path="/" element={<Navigate to="/overview" replace />} />
          
          {/* Clean route nodes */}
          <Route path="/overview" element={<Overview />} />
          <Route path="/guided-demo" element={<GuidedDemo />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/findings" element={<Findings />} />
          <Route path="/review-queue" element={<ReviewQueue />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/audit-trail" element={<AuditTrail />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          
          {/* Policy Test Lab (Simulator) route - open access */}
          <Route path="/simulator" element={<Simulator />} />
          
          {/* Redirect rules to support compatibility for old ASP routes */}
          <Route path="/Overview.asp" element={<Navigate to="/overview" replace />} />
          <Route path="/GuidedDemo.asp" element={<Navigate to="/guided-demo" replace />} />
          <Route path="/Evidence.asp" element={<Navigate to="/evidence" replace />} />
          <Route path="/Assets.asp" element={<Navigate to="/assets" replace />} />
          <Route path="/Findings.asp" element={<Navigate to="/findings" replace />} />
          <Route path="/ReviewQueue.asp" element={<Navigate to="/review-queue" replace />} />
          <Route path="/Reports.asp" element={<Navigate to="/reports" replace />} />
          <Route path="/AuditTrail.asp" element={<Navigate to="/audit-trail" replace />} />
          <Route path="/HowItWorks.asp" element={<Navigate to="/how-it-works" replace />} />
          <Route path="/Home.asp" element={<Navigate to="/simulator" replace />} />
          <Route path="/Projects.asp" element={<Navigate to="/assets" replace />} />
          <Route path="/Showcase.asp" element={<Navigate to="/overview" replace />} />
          <Route path="/About.asp" element={<Navigate to="/how-it-works" replace />} />
          <Route path="/Contact.asp" element={<Navigate to="/overview" replace />} />

          {/* Catch-all redirects back to secure landing overview */}
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </HUDLayout>
    </Router>
  );
}
