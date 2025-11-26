// This file guarantees bwip-js is available globally as window.bwipjs
// It is imported only once in the browser (client-side)

if (typeof window !== 'undefined') {
  // @ts-ignore – bwip-js is loaded as a <script> tag, not a module
  window.bwipjs = window.bwipjs || window.bwipjs || (await import('./bwip-js.min.js')).default;
  // Expose the same object as BWIPJS for our old code
  window.BWIPJS = window.bwipjs;
  console.log('bwip-js loaded successfully');
}