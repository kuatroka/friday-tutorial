import React from 'react';
import { IconSize } from '../types';

interface IconProps {
  svgContent: string;
  size?: IconSize;
}

interface SizeStyles {
  width: string;
  height: string;
}

const Icon: React.FC<IconProps> = ({ svgContent, size = 'medium' }) => {
  const sizeClasses: Record<IconSize, SizeStyles> = {
    small: { width: '24px', height: '24px' },
    medium: { width: '48px', height: '48px' },
    large: { width: '96px', height: '96px' },
    xlarge: { width: '144px', height: '144px' }
  };

  const style = sizeClasses[size] || sizeClasses.medium;

  return (
    <div 
      className={`icon icon-${size}`} 
      style={style}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default Icon;
