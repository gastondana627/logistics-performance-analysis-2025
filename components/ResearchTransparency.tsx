import { Database, ExternalLink } from "lucide-react";

export function ResearchTransparency() {
  return (
    <section className="border-t border-zinc-900 bg-zinc-950/50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Data Source */}
          <div className="text-center md:text-left">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2 font-semibold">
              Data Source
            </div>
            <a
              href="https://www.kaggle.com/code/gastondana/exploratory-analysis-quantifying-human-cost-final"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-ups-gold transition-colors group"
            >
              <Database className="w-4 h-4" />
              <span className="font-mono">Kaggle Dataset</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Column 2: Research Identity */}
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2 font-semibold">
              ORCID Verified
            </div>
            <a
              href="https://orcid.org/0009-0007-1011-860X"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-[#A6CE39] transition-colors group"
            >
              {/* ORCID Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  fill="#A6CE39"
                  d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z"
                />
                <path
                  fill="#FFF"
                  d="M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 111.2 178 93 148 93h-23.7v79.4zM71.3 54.8c0-5.2 4.2-9.4 9.4-9.4s9.4 4.2 9.4 9.4c0 5.1-4.2 9.4-9.4 9.4s-9.4-4.3-9.4-9.4z"
                />
              </svg>
              <span className="font-mono text-xs">0009-0007-1011-860X</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Column 3: Citation */}
          <div className="text-center md:text-right">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2 font-semibold">
              DOI Citation
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              <div className="font-mono">Dana, G. (2025).</div>
              <div className="text-zinc-500">Human Logistics Biometric Audit.</div>
              <div className="font-mono text-amber-400/70">DOI: Pending</div>
            </div>
          </div>
        </div>

        {/* Optional: Research Ethics Note */}
        <div className="mt-6 pt-6 border-t border-zinc-900/50 text-center">
          <p className="text-[10px] text-zinc-600 max-w-3xl mx-auto">
            This research adheres to open science principles. All data processing scripts, 
            methodology documentation, and reproducibility materials are publicly available 
            via the linked Kaggle notebook.
          </p>
        </div>
      </div>
    </section>
  );
}
