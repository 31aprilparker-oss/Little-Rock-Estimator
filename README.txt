Azteca Elite Construction Estimator v4.3 - Blueprint Image Recognition

Replace the existing GitHub Pages files with index.html, manifest.webmanifest, sw.js, and icon.svg.

V4.3 adds browser-side image analysis for construction drawings: highlighted green/orange wall-run detection, an on-screen blueprint viewer with overlays, OCR for room labels/dimensions/wall notes, and two-point scale calibration for photographed/scanned drawings. Wall candidates remain editable and must be reviewed before being added to Areas.

PDF.js is loaded from cdnjs for selectable-text PDF extraction. Tesseract.js is loaded from jsDelivr for image OCR. Internet access is required the first time those libraries are loaded.

Important: a printed drawing scale such as 1/8" = 1'-0" does not by itself convert camera pixels into feet because the image may be cropped, resized, or photographed at an angle. V4.3 therefore uses two-point calibration. Pick two points spanning a known dimension, enter that dimension in feet, and then review the detected wall lengths.

This is an estimating aid, not a contractual measurement engine. Verify plans, specifications, assemblies, dimensions, scale, field conditions, supplier quotes and production rates before issuing a bid.


V4.3 fixes:
- Image wall candidates cannot be reviewed until image scale calibration is complete.
- Apply-to-Areas now reports calibration or dimension issues specifically instead of a generic review error.
- Mobile Takeoff Review uses stacked wall cards instead of a wide table.
- Editing a wall quantity or assembly automatically clears Reviewed so it must be rechecked.
- Calibration status is shown prominently above Takeoff Review.
