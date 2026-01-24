// Postprocessor para inicializar mermaid en reveal-md
module.exports = (markdown, options) => {
  return new Promise((resolve) => {
    // Agregar script de inicialización de mermaid al final
    const mermaidInit = `
<script>
  // Inicializar mermaid cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#3498db',
        primaryTextColor: '#fff',
        primaryBorderColor: '#2980b9',
        lineColor: '#ecf0f1',
        secondaryColor: '#2c3e50',
        tertiaryColor: '#34495e',
        background: '#1a1a2e',
        mainBkg: '#1a1a2e',
        secondBkg: '#16213e'
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    });
  });

  // Re-renderizar mermaid cuando cambie de slide
  Reveal.on('slidechanged', function() {
    if (typeof mermaid !== 'undefined') {
      mermaid.contentLoaded();
    }
  });
</script>
`;
    resolve(markdown + mermaidInit);
  });
};
