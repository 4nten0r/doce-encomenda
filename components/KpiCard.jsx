'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function KpiCard({
  title,
  value,
  subtitle,
  trend = null,
  trendType = 'positive',
  icon: Icon,
  badge = null
}) {
  const getTrendBadge = () => {
    if (!trend) return null;

    if (trendType === 'positive') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
          <ArrowUpRight className="w-3 h-3" />
          {trend}
        </span>
      );
    }

    if (trendType === 'negative') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
          <ArrowDownRight className="w-3 h-3" />
          {trend}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
        <Minus className="w-3 h-3" />
        {trend}
      </span>
    );
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            {title}
          </span>
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            {value}
          </h3>
          {badge && (
            <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-100">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 text-[11px]">
          {subtitle}
        </span>
        {getTrendBadge()}
      </div>
    </div>
  );
}
