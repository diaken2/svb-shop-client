"use client";

import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  trackColor?: string;
  handleColor?: string;
  railColor?: string;
  className?: string;
}

export default function RangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  trackColor = '#3B82F6',
  handleColor = '#3B82F6',
  railColor = '#E5E7EB',
  className = '',
}: RangeSliderProps) {
  return (
    <div className={className}>
      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(val) => Array.isArray(val) && onChange(val as [number, number])}
        trackStyle={[{ backgroundColor: trackColor }]}
        handleStyle={[
          { borderColor: handleColor, backgroundColor: handleColor }, 
          { borderColor: handleColor, backgroundColor: handleColor }
        ]}
        railStyle={{ backgroundColor: railColor }}
        className="w-full"
      />
    </div>
  );
}

interface SingleSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  trackColor?: string;
  handleColor?: string;
  railColor?: string;
  className?: string;
}

export function SingleSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  trackColor = '#3B82F6',
  handleColor = '#3B82F6',
  railColor = '#E5E7EB',
  className = '',
}: SingleSliderProps) {
  return (
    <div className={className}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(val) => typeof val === 'number' && onChange(val)}
        trackStyle={{ backgroundColor: trackColor }}
        handleStyle={{ borderColor: handleColor, backgroundColor: handleColor }}
        railStyle={{ backgroundColor: railColor }}
        className="w-full"
      />
    </div>
  );
} 