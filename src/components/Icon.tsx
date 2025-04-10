import React from 'react';
import { IconProps, IconSize } from '../types';
import { useTheme } from './ThemeProvider';

interface SizeStyles {
  width: string;
  height: string;
}

interface EnhancedIconProps extends IconProps {
  component: React.ComponentType<IconProps>;
}

const Icon: React.FC<EnhancedIconProps> = ({ component: IconComponent, size = 'medium', color, className, style: customStyle, ...props }) => {
  const { theme } = useTheme();
  const sizeClasses: Record<IconSize, SizeStyles> = {
    small: { width: '24px', height: '24px' },
    medium: { width: '48px', height: '48px' },
    large: { width: '96px', height: '96px' },
    xlarge: { width: '144px', height: '144px' }
  };

  // If no color is provided, use the current color from the context
  const iconColor = color || 'currentColor';
  
  const style = { ...sizeClasses[size], ...customStyle };

  return (
    <div className={`icon icon-${size} ${className || ''}`} style={style}>
      <IconComponent color={iconColor} {...props} />
    </div>
  );
};

export default Icon;
