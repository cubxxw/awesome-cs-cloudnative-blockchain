/*!
 * reveal.js Mermaid plugin
 */

import mermaid from "mermaid";

const Plugin = {
  id: "mermaid",

  init: function (reveal) {

    let { ...mermaidConfig } = reveal.getConfig().mermaid || {};

    mermaid.mermaidAPI.initialize({
      // The node size will be calculated incorrectly if set `startOnLoad: start`,
      // so we need to manually render.
      startOnLoad: false,
      ...mermaidConfig,
    });

    const mermaidEls = reveal.getRevealElement().querySelectorAll(".mermaid");

    Array.from(mermaidEls).forEach(function (el) {
      var insertSvg = function (svgCode, bindFunctions) {
        el.innerHTML = svgCode;
      };

      var graphDefinition = el.textContent.trim();

      try {
        mermaid.mermaidAPI.render(
          `mermaid-${Math.random().toString(36).substring(2)}`,
          graphDefinition,
          insertSvg
        );
      } catch (error) {
        let errorStr = "";
        if (error?.str) {
          // From mermaid 9.1.4, error.message does not exists anymore
          errorStr = error.str;
        }
        if (error?.message) {
          errorStr = error.message;
        }
        console.error(errorStr, { error, graphDefinition, el });
        el.innerHTML = errorStr;
      }
    });
  },
};

export default () => Plugin;
