declare module '*.svg' {
  import React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

export {};

declare global {
  interface Window {
    kakao: any;
  }
}
