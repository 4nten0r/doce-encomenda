'use client';

import React from 'react';

export default function KpiCard({
  title,
  value,
  subtitle,
  badge = null,
  icon: Icon
}) {
  return (
    <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-muted">
            {title}
          </span>
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-brand-surfaceSubtle border border-brand-border flex items-center justify-center text-brand-primary">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-serif font-black text-brand-text tracking-tight">
            {value}
          </h3>
          {badge && (
            <span className="text-[10px] font-bold text-brand-primary uppercase px-1.5 py-0.5 rounded bg-brand-surfaceSubtle border border-brand-border">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-brand-border/60 flex items-center justify-between text-[11px] text-brand-muted">
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
