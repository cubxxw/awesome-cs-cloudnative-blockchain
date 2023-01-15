if (!window.wvWindowMessageListener) {
  // console.error("add message EventListener");
  const eventHandlerMap = {
    openFile: function(data) {
      instance.UI.loadDocument(data.blob,{extension:data.extension});
      instance.xfdfString = data.xfdfString;
      instance.targetPage = data.page;
    },
    fitWidth: function(dat) {
      instance.UI.setFitMode(instance.UI.FitMode.FitWidth);
    },
    showAnnotation: function(data) {
      const anno = instance.Core.annotationManager.getAnnotationById(data);
      if (!anno) {
        console.error("annot:"+data+"doesn't exists");
        return;
      }
			instance.Core.annotationManager.deselectAllAnnotations();
      instance.Core.annotationManager.jumpToAnnotation(anno,{verticalOffset:"50%"});
      instance.Core.annotationManager.selectAnnotation(anno);
    },
    showBookPage: function(data) {
      instance.Core.documentViewer.setCurrentPage(data);
    },
    copyCurrentPageLink: function(data) {
      const page = instance.Core.documentViewer.getCurrentPage();
      window.postObsidianBookNoteMessage("copyCurrentPageLink",page);
    }
  }

  window.wvWindowMessageListener = function(event) {
    const data = event.data;
    if (event.origin !== "app://obsidian.md" || !data["app"] || data["app"] !== "obsidian-book")return;
    if (eventHandlerMap[data.type]) {
      eventHandlerMap[data.type](data.data);
    }
  };

  this.addEventListener("message",window.wvWindowMessageListener);

  window.postObsidianBookNoteMessage = function(type, data) {
    window.parent.postMessage({
          app: instance.customData["id"],
          type: type,
          data: data,
        },"*")
  }
}

if (!window.viewerLoadedListener) {
  // console.error("add viewerLoad EventListener");
  window.viewerLoadedListener = function() {

  // instance.UI.setFitMode(instance.UI.FitMode.FitWidth)
  instance.UI.setTheme("dark");
  instance.UI.setAnnotationContentOverlayHandler(anno => {
      return null;
  });
  instance.UI.setLanguage("zh_cn");

  instance.UI.annotationPopup.add([
    {
      type: "actionButton",
      title: "复制回链",
      img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v9l-3.794-3.793-5.999 6-1.414-1.414 5.999-6L12 3h9z"/></svg>',
      onClick: () => {
        annots = instance.Core.annotationManager.getSelectedAnnotations();
        if (annots.length) {
          window.postObsidianBookNoteMessage("copyAnnotationLink",{
            id: annots[annots.length-1].Id,
            ctrlKey: window.event.ctrlKey,
            zoom: instance.Core.documentViewer.getZoom(),
          })
        }
      }
    }
  ])


  const {annotationManager} = instance.Core;
  annotationManager.addEventListener("annotationChanged", (annotations, action, {imported}) => {
    if (imported) return;

    instance.Core.annotationManager.exportAnnotCommand().then(xfdfString => {
      window.postObsidianBookNoteMessage("annotationChanged",{
        action: action,
        xfdf: xfdfString,
        zoom: instance.Core.documentViewer.getZoom(),
      })
    });

  });

  
    instance.customData = JSON.parse(instance.UI.getCustomData());
    window.postObsidianBookNoteMessage("viewerLoaded");
  };

  window.addEventListener('viewerLoaded',window.viewerLoadedListener);
}

if (!window.documentLoadedListener) {
  // console.error("add documentLoaded EventListener");
  window.documentLoadedListener = function() {
    console.log("documentLoaded");

    if (instance.targetPage) {
      instance.Core.documentViewer.setCurrentPage(instance.targetPage);
      instance.targetPage = null;
    }

    if (instance.xfdfString) {
      instance.Core.annotationManager.importAnnotations(instance.xfdfString);
    } 
    
    instance.Core.annotationManager.exportAnnotations({links:false, widgets:false}).then((xfdfString) => {
      window.postObsidianBookNoteMessage("documentLoaded",xfdfString);
    });
    // instance.UI.setFitMode(instance.UI.FitMode.FitWidth)
  };

  window.addEventListener('documentLoaded', window.documentLoadedListener);
}



