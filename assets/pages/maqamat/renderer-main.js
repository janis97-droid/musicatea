(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};
  const { renderAll, renderSidebar, renderPageShell, updateDisplayedName } = ns.rendererLayout;
  const { renderTonicSelector, renderStaff, renderKeys, renderJinsRow } = ns.rendererScale;

  ns.renderer = {
    renderAll,
    renderSidebar,
    renderPageShell,
    renderTonicSelector,
    renderStaff,
    renderKeys,
    renderJinsRow,
    updateDisplayedName,
  };
})();