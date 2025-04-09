export interface IconEntry {
  id: string;
  componentName: string;
  svgContent: string;
  contributor: string;
  message: string;
  date?: string;
}

export type IconSize = 'small' | 'medium' | 'large' | 'xlarge';
