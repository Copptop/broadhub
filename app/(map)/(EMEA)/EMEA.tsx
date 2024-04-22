'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Get a reference to the SVG element 
    const svg = svgRef.current as any;
    if (!svg) return;

    // Function to get the point coordinates from a mouse or touch event
    const getPointFromEvent = (event: MouseEvent | TouchEvent) => {
      const point = svg.createSVGPoint();
      if ((event as TouchEvent).targetTouches) {
        point.x = (event as TouchEvent).targetTouches[0].clientX;
        point.y = (event as TouchEvent).targetTouches[0].clientY;
      } else {
        point.x = (event as MouseEvent).clientX;
        point.y = (event as MouseEvent).clientY;
      }

      // Transform the point coordinates using the inverted matrix
      const invertedSVGMatrix = svg.getScreenCTM()!.inverse();
      return point.matrixTransform(invertedSVGMatrix);
    };

    let isPointerDown = false;
    let pointerOrigin: SVGPoint;

    // Event handler for pointer down event
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      isPointerDown = true;
      pointerOrigin = getPointFromEvent(event);
      svg.style.cursor = 'grabbing';
    };

    // Event handler for pointer move event
    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      if (!isPointerDown) {
        return;
      }
      event.preventDefault();

      const pointerPosition = getPointFromEvent(event);
      const viewBox = svg.viewBox.baseVal;

      // Update the viewBox coordinates based on the pointer movement
      viewBox.x -= pointerPosition.x - pointerOrigin.x;
      viewBox.y -= pointerPosition.y - pointerOrigin.y;
    };

    // Event handler for pointer up event
    const onPointerUp = () => {
      isPointerDown = false;
      svg.style.cursor = 'grab';
    };

    // Event handler for pointer wheel event
    const onPointerWheel = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();
      const pointerPosition = getPointFromEvent(event);
      if (!svg) return;

      // Define the zooming speed and direction
      const scaleFactor = 1.1;
      const zoomSpeed = (event as WheelEvent).deltaY > 0 ? scaleFactor : 1 / scaleFactor;

      // Calculate the new scale based on the zooming speed
      const viewBox = svg.viewBox.baseVal;
      const newScale = viewBox.width * zoomSpeed / viewBox.width;
      const deltaWidth = viewBox.width * (newScale - 1);
      const deltaHeight = viewBox.height * (newScale - 1);

      // Update the viewBox coordinates and dimensions based on the zooming
      viewBox.x -= deltaWidth * (pointerPosition.x - viewBox.x) / viewBox.width;
      viewBox.y -= deltaHeight * (pointerPosition.y - viewBox.y) / viewBox.height;
      viewBox.width *= newScale;
      viewBox.height *= newScale;

      // Set the new viewBox coordinates and dimensions
      svg.setAttributeNS(null, 'viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);

      // Set the cursor style based on the zooming state
      const cursorStyle = zoomSpeed > 1 ? 'zoom-out' : 'zoom-in';
      svg.style.cursor = cursorStyle;
    };


    if (svg.PointerEvent) {
      // Add event listeners for pointer events
      svg.addEventListener('pointerdown', onPointerDown);
      svg.addEventListener('pointerup', onPointerUp);
      svg.addEventListener('pointerleave', onPointerUp);
      svg.addEventListener('pointermove', onPointerMove);
      svg.addEventListener('wheel', onPointerWheel);
    } else {
      // Add event listeners for mouse events
      svg.addEventListener('mousedown', onPointerDown);
      svg.addEventListener('mouseup', onPointerUp);
      svg.addEventListener('mouseleave', onPointerUp);
      svg.addEventListener('mousemove', onPointerMove);
      svg.addEventListener('wheel', onPointerWheel);

      // Add event listeners for touch events
      svg.addEventListener('touchstart', onPointerDown);
      svg.addEventListener('touchend', onPointerUp);
      svg.addEventListener('touchmove', onPointerMove);
    }
  }, []);

  return (
    <>
      <svg ref={svgRef} id="map_plane" width="100%" height="100%" viewBox="0 0 368 219" version="1.1" xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g id="svgbounds" >
          <g transform="matrix(1,0,0,1,-882.2,-58.8)">
            <path id="AL"
              d="M1088,228L1088.4,229.2L1089.8,228.6L1091,230.3L1092.3,231L1092.9,233.3L1092.4,235.5L1093.4,238.2L1095.7,239.7L1095.8,241.4L1094.1,242.3L1094,244.4L1091.8,247.5L1090.9,247.1L1090.7,245.7L1087.6,243.5L1086.9,240.5L1087,236.1L1087.5,234.2L1086.6,233.2L1086.1,231.1L1088,228Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="AT"
              d="M1070.6,190.8L1070.3,191.6L1071,193.7L1070.8,196.3L1068,196.3L1069.1,197.7L1067.8,201.7L1066.9,202.8L1062.5,202.9L1060.1,204.4L1055.9,203.9L1048.6,202.2L1047.3,200.1L1042.4,201.2L1041.9,202.4L1038.8,201.5L1036.2,201.3L1033.9,200.1L1034.6,198.6L1034.4,197.5L1035.8,197.2L1038.5,198.9L1039.1,197.2L1043.5,197.5L1047,196.4L1049.4,196.6L1051.1,197.9L1051.5,196.8L1050.5,192.7L1052.2,191.9L1053.8,189L1057.6,191.1L1060.2,188.5L1061.9,188L1065.9,189.9L1068.2,189.6L1070.6,190.8Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="BE"
              d="M1016.5,177.1L1016.1,181.3L1014.8,181.5L1014.4,185L1010,182.1L1007.5,182.6L1004,179.7L1001.6,177.2L999.4,177.1L998.6,174.9L1002.5,173.7L1006.1,174.2L1010.6,172.9L1013.7,175.6L1016.5,177.1Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="BG"
              d="M1132.6,221.6L1130.3,224.2L1129,228.7L1131.1,232.3L1126.5,231.5L1121.5,233.5L1121.8,236.7L1117.2,237.3L1113.3,235L1109.3,236.8L1105.5,236.6L1104.7,232.4L1101.9,230.3L1102.6,229.5L1102,228.7L1102.6,226.7L1104.4,224.7L1101.6,222L1100.9,219.6L1102,218.2L1103.8,220.8L1105.7,220.4L1109.7,221.3L1117.3,221.7L1119.6,220.1L1125.5,218.6L1129.5,220.9L1132.6,221.6Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="BA"
              d="M1083,214.3L1084.9,214.2L1083.8,217L1086.5,219.5L1086,222.4L1084.9,222.7L1084,223.3L1082.4,224.8L1082,228.3L1077.2,225.9L1075.1,223.2L1073,221.8L1070.5,219.4L1069.2,217.5L1066.5,214.5L1067.3,211.9L1069.3,213.4L1070.3,212L1072.6,211.9L1077.1,213L1080.6,212.9L1083,214.3Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="CZ"
              d="M1059.7,175.2L1062.2,177.2L1065.9,177.7L1065.7,179.4L1068.5,180.7L1069.1,179.1L1072.5,179.8L1073.2,181.8L1076.9,182.1L1079.5,185.2L1078,185.2L1077.3,186.3L1076.2,186.6L1076,188L1075.1,188.3L1075,188.9L1073.4,189.5L1071.2,189.4L1070.6,190.8L1068.2,189.6L1065.9,189.9L1061.9,188L1060.2,188.5L1057.6,191.1L1053.8,189L1050.8,186.4L1048.2,184.9L1047.5,182.2L1046.5,180.4L1049.9,179.1L1051.6,177.5L1055.1,176.3L1056.2,175.1L1057.5,175.8L1059.7,175.2Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="DE"
              d="M1053.9,158.9L1055.3,162L1054.1,163.7L1056,165.8L1057.5,169.1L1057.3,171.3L1059.7,175.2L1057.5,175.8L1056.2,175.1L1055.1,176.3L1051.6,177.5L1049.9,179.1L1046.5,180.4L1047.5,182.2L1048.2,184.9L1050.8,186.4L1053.8,189L1052.2,191.9L1050.5,192.7L1051.5,196.8L1051.1,197.9L1049.4,196.6L1047,196.4L1043.5,197.5L1039.1,197.2L1038.5,198.9L1035.8,197.2L1034.4,197.5L1028.9,195.6L1027.9,196.9L1023.7,196.9L1024.1,192.4L1026.5,188.2L1019.3,187L1016.9,185.4L1017.1,182.7L1016.1,181.3L1016.5,177.1L1015.4,170.6L1018.3,170.6L1019.5,168.3L1020.4,162.7L1019.5,160.6L1020.3,159.3L1024.3,159L1025.3,160.3L1028.4,157.3L1027.1,155L1026.7,151.6L1030.4,152.4L1033.3,151.5L1033.6,153.8L1038.5,155.2L1038.6,157.4L1043.3,156.2L1045.9,154.6L1051.5,157L1053.9,158.9Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path d="M1046.1,147.7L1043.7,152.6L1038.5,149.1L1037.6,146.6L1044.4,144.6L1046.1,147.7Z" fill="#ececec"
              fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1033.3,151.5L1030.4,152.4L1026.7,151.6L1024.6,148.2L1024.2,142.1L1024.8,140.4L1026.1,138.6L1030.1,138.3L1031.7,136.6L1035.3,134.9L1035.3,138L1034.1,140L1034.8,141.6L1037.4,142.5L1036.4,144.8L1035,144.2L1031.9,148.5L1033.3,151.5Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="EE"
              d="M1113.7,124.6L1114.6,125.6L1112,129L1114.4,134.6L1112.8,136.5L1109,136.4L1104.6,134.2L1102.5,133.5L1098.7,134.5L1098.6,131L1097.1,131.8L1093.8,129.7L1092.8,126.3L1098.3,124.6L1103.9,123.8L1109,124.7L1113.7,124.6Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="FI"
              d="M1104.1,70.1L1104.5,73.9L1111.8,77.6L1108.9,81.8L1115.4,88.1L1113.7,92.9L1118.6,97.1L1117.7,100.9L1125.1,104.8L1124.2,107.7L1120.8,111.1L1112.8,118.5L1104.8,119L1097.2,121.1L1090.1,122.4L1086.9,119.2L1082.2,117.3L1082.3,111.5L1079.3,106.3L1080.9,102.9L1084.2,99.4L1093,93.2L1095.6,92L1094.7,89.6L1088.2,87L1086.4,84.8L1084.6,76.3L1077.4,72.6L1071.4,69.9L1073.6,68.5L1078.7,71.3L1084,71.1L1088.7,72.4L1092.1,70L1093.2,66L1099.1,64.2L1104.9,66.3L1104.1,70.1Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1112.7,272.6L1115.8,274.8L1119.9,274.4L1123.9,274.8L1123.9,276L1126.7,275.2L1126.2,277.1L1118.6,277.6L1118.5,276.6L1111.9,275.3L1112.7,272.6Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1121.9,239.9L1118.7,239.7L1116,239.1L1109.8,240.7L1113.8,244.3L1111.3,245.4L1108.4,245.4L1105.3,242.1L1104.4,243.5L1106,247.3L1108.9,250.3L1107,251.7L1110.2,254.6L1113,256.5L1113.4,260.1L1108.4,258.4L1110.2,261.7L1106.9,262.3L1109.4,268L1105.9,268.1L1101.3,265.3L1098.9,260.2L1097.6,255.9L1095.3,253L1092.3,249.3L1091.8,247.5L1094,244.4L1094.1,242.3L1095.8,241.4L1095.7,239.7L1099.1,239.2L1100.9,237.8L1103.7,237.9L1104.5,236.8L1105.5,236.6L1109.3,236.8L1113.3,235L1117.2,237.3L1121.8,236.7L1121.5,233.5L1124.2,235.2L1123.1,239.2L1121.9,239.9Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="HR"
              d="M1081.5,207.6L1083,210.1L1084.7,211.9L1083,214.3L1080.6,212.9L1077.1,213L1072.6,211.9L1070.3,212L1069.3,213.4L1067.3,211.9L1066.5,214.5L1069.2,217.5L1070.5,219.4L1073,221.8L1075.1,223.2L1077.2,225.9L1082,228.3L1081.5,229.3L1076.5,227L1073.3,224.7L1068.5,222.8L1063.8,218.2L1064.8,217.7L1062.3,215L1062,212.9L1058.7,211.9L1057.3,214.6L1055.7,212.5L1055.7,210.3L1055.8,210.2L1059.4,210.4L1060.2,209.4L1062,210.4L1064,210.5L1063.9,208.8L1065.6,208.1L1065.9,205.6L1069.8,203.9L1071.4,204.7L1075.4,207.4L1079.7,208.6L1081.5,207.6Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="HU"
              d="M1096.2,191.9L1099.2,193.6L1099.7,195.3L1096.8,196.6L1094.9,200.8L1092.3,205.1L1088.4,206.3L1085.2,206L1081.5,207.6L1079.7,208.6L1075.4,207.4L1071.4,204.7L1069.8,203.9L1068.6,201.8L1067.8,201.7L1069.1,197.7L1068,196.3L1070.8,196.3L1071,193.7L1073.7,195.4L1075.6,196L1079.7,195.3L1080,194L1081.9,193.8L1084.2,192.9L1084.8,193.3L1087.1,192.5L1088.1,191L1089.7,190.6L1095.2,192.5L1096.2,191.9Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="IS"
              d="M924.8,84.5L923.4,88.1L927.8,91.9L921.7,96.2L908.6,100.1L904.7,101.2L899.1,100.3L887.2,98.5L892,96L883,93.3L890.9,92.2L891,90.5L882.2,89.2L885.8,85.5L892.4,84.7L898.4,88.5L905.4,85.5L910.5,87L917.8,84.1L924.8,84.5Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1068.2,256.4L1066.5,261.5L1067.4,263.4L1066.5,266.7L1062.3,264.3L1059.6,263.6L1052.1,260.4L1052.6,257.1L1058.8,257.7L1064.2,257L1068.2,256.4Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1034.2,237.4L1037.5,241.9L1037.1,250.4L1034.7,250L1032.6,252.1L1030.6,250.4L1030.1,242.7L1028.8,239.1L1031.7,239.4L1034.2,237.4Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1055.9,203.9L1055.5,207L1056.9,209.7L1052.8,208.7L1048.9,211L1049.3,214.1L1048.8,215.9L1050.7,219.1L1055.7,222.3L1058.6,227.6L1064.7,232.7L1068.7,232.6L1070.1,234L1068.7,235.3L1073.5,237.6L1077.5,239.5L1082.2,242.9L1082.8,244L1082,246.3L1078.9,243.3L1074.3,242.3L1072.4,246.4L1076.3,248.8L1075.9,252.1L1073.8,252.5L1071.3,258L1069.1,258.5L1069,256.5L1069.9,253.1L1071,251.7L1068.7,248L1066.9,244.8L1064.7,244L1062.9,241.3L1059.5,240.1L1057.1,237.5L1053.3,237.1L1049,234.3L1044.1,230.1L1040.4,226.5L1038.5,220.2L1035.9,219.5L1031.7,217.4L1029.4,218.2L1026.5,221.2L1024.4,221.6L1024.9,218.9L1022.1,218.1L1020.6,213.2L1022.3,211.3L1020.8,208.9L1020.9,207.1L1023.1,208.5L1025.6,208.2L1028.3,206L1029.2,207L1031.6,206.8L1032.6,204.3L1036.4,205.1L1038.5,204L1038.8,201.5L1041.9,202.4L1042.4,201.2L1047.3,200.1L1048.6,202.2L1055.9,203.9Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="LT"
              d="M1111.1,147.6L1112.1,150.3L1108.5,152.3L1108,155.7L1103.2,158L1098.5,158L1097.1,156.1L1094.6,155.4L1094,153.9L1094.2,152.2L1092,151.3L1086.9,150.2L1085.2,145.1L1090.3,143.3L1098.2,143.7L1102.7,143.1L1103.6,144.3L1106.1,144.7L1111.1,147.6Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="LU" d="M1016.9,185.4L1015.5,185.5L1014.4,185L1014.8,181.5L1016.1,181.3L1017.1,182.7L1016.9,185.4Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="LV"
              d="M1112.8,136.5L1115.3,137.8L1116.3,140.7L1118.4,144.3L1113.8,146.6L1111.1,147.6L1106.1,144.7L1103.6,144.3L1102.7,143.1L1098.2,143.7L1090.3,143.3L1085.2,145.1L1084.7,140.6L1086.4,136.8L1090.5,134.8L1094.9,139.3L1098.6,139.1L1098.7,134.5L1102.5,133.5L1104.6,134.2L1109,136.4L1112.8,136.5Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="MK"
              d="M1105.5,236.6L1104.5,236.8L1103.7,237.9L1100.9,237.8L1099.1,239.2L1095.7,239.7L1093.4,238.2L1092.4,235.5L1092.9,233.3L1093.6,233.4L1093.7,232.1L1096.6,231.1L1097.8,230.8L1099.5,230.5L1101.9,230.3L1104.7,232.4L1105.5,236.6Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1113.7,67.5L1107.3,69.6L1104.1,70.1L1104.9,66.3L1099.1,64.2L1093.2,66L1092.1,70L1088.7,72.4L1084,71.1L1078.7,71.3L1073.6,68.5L1071.4,69.9L1068.8,70.1L1068.9,73.7L1060.9,72.8L1060.3,75.9L1056.3,75.9L1054,79.8L1050.6,85.9L1044.9,93.8L1046.7,95.8L1045.4,98L1041.1,97.9L1038.7,103.3L1039.7,111L1042.8,113.9L1042,120.8L1038.6,124.8L1036.8,128.2L1033.5,124.6L1024.9,131.4L1018.8,132.8L1012.3,129.8L1010.5,123.5L1008.5,110L1012.5,106.3L1023.8,101.4L1031.9,95.5L1039.1,87.7L1048,77L1054.4,72.9L1064.7,66.1L1073.2,63.7L1079.9,64L1085.1,59.6L1092.5,59.8L1099.5,58.8L1113.2,62.7L1108.3,64.1L1113.7,67.5Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="PL"
              d="M1079.9,154.8L1085.8,155.5L1094.6,155.4L1097.1,156.1L1098.5,158L1099.1,160.7L1100.8,163L1101.2,165.4L1098.4,166.7L1100.3,169.5L1100.8,172.3L1104,177.7L1103.7,179.4L1101.4,180.1L1097.6,185.3L1099.2,188.1L1098.1,187.7L1093.1,185.3L1089.6,186.2L1087.2,185.6L1084.4,186.9L1081.7,184.7L1079.8,185.6L1079.5,185.2L1076.9,182.1L1073.2,181.8L1072.5,179.8L1069.1,179.1L1068.5,180.7L1065.7,179.4L1065.9,177.7L1062.2,177.2L1059.7,175.2L1057.3,171.3L1057.5,169.1L1056,165.8L1054.1,163.7L1055.3,162L1053.9,158.9L1057,157.1L1064.1,154.3L1069.9,152.3L1074.7,153.3L1075.3,154.8L1079.9,154.8Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="RO"
              d="M1118.9,193.1L1120.5,193.8L1122.3,195.6L1124.3,198.2L1127.7,202L1128.3,204.7L1128.1,207.4L1129.4,210.3L1131.8,211.5L1134.1,210.4L1136.5,211.5L1136.9,213.2L1134.6,214.5L1133,213.9L1132.6,221.6L1129.5,220.9L1125.5,218.6L1119.6,220.1L1117.3,221.7L1109.7,221.3L1105.7,220.4L1103.8,220.8L1102,218.2L1101,217.1L1102,216L1100.7,215.3L1099.2,216.7L1096.1,214.8L1095.4,212.2L1092.2,210.8L1091.4,208.7L1088.4,206.3L1092.3,205.1L1094.9,200.8L1096.8,196.6L1099.7,195.3L1101.7,193.9L1104.9,194.6L1108.1,194.6L1110.6,196.2L1112.2,195.2L1115.8,194.6L1116.8,193.1L1118.9,193.1Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="RS"
              d="M1102,218.2L1100.9,219.6L1101.6,222L1104.4,224.7L1102.6,226.7L1102,228.7L1102.6,229.5L1101.9,230.3L1099.5,230.5L1097.8,230.8L1097.5,230.3L1098.1,229.6L1098.5,228L1097.8,228.1L1096.7,226.9L1095.8,226.6L1095,225.6L1094,225.2L1093.2,224.3L1092.3,224.7L1091.8,226.8L1090.6,227.2L1091,226.7L1088.9,225.4L1087.2,224.7L1086.3,223.8L1084.9,222.7L1086,222.4L1086.5,219.5L1083.8,217L1084.9,214.2L1083,214.3L1084.7,211.9L1083,210.1L1081.5,207.6L1085.2,206L1088.4,206.3L1091.4,208.7L1092.2,210.8L1095.4,212.2L1096.1,214.8L1099.2,216.7L1100.7,215.3L1102,216L1101,217.1L1102,218.2Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="SK"
              d="M1098.1,187.7L1096.9,189.4L1096.2,191.9L1095.2,192.5L1089.7,190.6L1088.1,191L1087.1,192.5L1084.8,193.3L1084.2,192.9L1081.9,193.8L1080,194L1079.7,195.3L1075.6,196L1073.7,195.4L1071,193.7L1070.3,191.6L1070.6,190.8L1071.2,189.4L1073.4,189.5L1075,188.9L1075.1,188.3L1076,188L1076.2,186.6L1077.3,186.3L1078,185.2L1079.5,185.2L1079.8,185.6L1081.7,184.7L1084.4,186.9L1087.2,185.6L1089.6,186.2L1093.1,185.3L1098.1,187.7Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="SI"
              d="M1069.8,203.9L1065.9,205.6L1065.6,208.1L1063.9,208.8L1064,210.5L1062,210.4L1060.2,209.4L1059.4,210.4L1055.8,210.2L1056.9,209.7L1055.5,207L1055.9,203.9L1060.1,204.4L1062.5,202.9L1066.9,202.8L1067.8,201.7L1068.6,201.8L1069.8,203.9Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="SE"
              d="M1088.2,87L1081.2,88.6L1077.7,92.5L1079,96L1072.8,100.5L1065,105.5L1062.9,113.6L1066.6,117.7L1071.4,121L1068.1,127.6L1063.5,129L1062.9,139L1060.8,144.7L1055.1,144.1L1052.9,148.9L1047.4,149.2L1045.5,143.5L1041,136.6L1036.8,128.2L1038.6,124.8L1042,120.8L1042.8,113.9L1039.7,111L1038.7,103.3L1041.1,97.9L1045.4,98L1046.7,95.8L1044.9,93.8L1050.6,85.9L1054,79.8L1056.3,75.9L1060.3,75.9L1060.9,72.8L1068.9,73.7L1068.8,70.1L1071.4,69.9L1077.4,72.6L1084.6,76.3L1086.4,84.8L1088.2,87Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1201.7,235.3L1207.2,235L1212.8,238.2L1214.1,240.4L1214.2,243.5L1218.4,245.1L1220.8,246.9L1217.5,248.8L1220.4,256.1L1219.7,258.1L1223.5,263.2L1221.1,264.3L1219,262.7L1212.7,261.8L1210.6,262.8L1204.7,263.8L1201.8,263.7L1196.1,266.1L1191.7,266.1L1188.7,264.9L1183.1,266.7L1181.2,265.5L1181.4,269L1180.2,270.4L1178.9,271.8L1176.6,268.9L1178.3,266.5L1175.1,267.1L1170.5,265.6L1167.3,269.3L1159.3,270L1154.6,266.6L1148.9,266.4L1147.9,269L1144.3,269.8L1138.9,266.4L1133.1,266.5L1129.3,260.1L1125.1,256.6L1127.1,251.6L1123.5,248.5L1128.6,242.4L1136.6,242.2L1138.2,237.3L1148.2,238.2L1153.8,234.1L1159.6,232.3L1168.1,232.1L1177.9,236.6L1185.8,239.1L1191.6,238.1L1196.2,238.7L1201.7,235.3Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1121.9,239.9L1123.1,239.2L1124.2,235.2L1121.5,233.5L1126.5,231.5L1131.1,232.3L1132,234.8L1136.8,236.8L1136.1,238.4L1129.9,238.7L1127.9,240.7L1124,244.1L1122,241.2L1121.9,239.9Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="UA"
              d="M1157.2,174.6L1159.5,177.3L1159.6,178.5L1166.3,180.7L1169.9,179.7L1173.5,182.6L1176.4,182.5L1184.1,184.5L1184.5,186.4L1183.2,189.6L1185,193.1L1184.7,195.2L1179.9,195.6L1177.7,197.4L1178.1,200.1L1174.2,200.6L1171.2,202.7L1166.6,203L1162.6,205.4L1163.6,209.3L1166.4,210.8L1171.5,210.4L1170.9,212.7L1165.5,213.8L1159.2,217.4L1156.1,216.1L1156.8,213.2L1150.9,211.3L1151.6,210.1L1156.2,208L1154.5,206.6L1146.4,205L1145.6,202.6L1141.1,203.4L1139.8,206.9L1136.5,211.5L1134.1,210.4L1131.8,211.5L1129.4,210.3L1130.6,209.6L1131.2,207.5L1132.3,205.4L1131.7,204.3L1132.7,203.8L1133.3,204.7L1136.3,204.9L1137.6,204.4L1136.6,203.8L1136.8,202.8L1134.8,201.2L1133.7,198.6L1131.7,197.6L1131.8,195.5L1129.2,193.8L1127.2,193.5L1123.2,191.6L1120,192.2L1118.9,193.1L1116.8,193.1L1115.8,194.6L1112.2,195.2L1110.6,196.2L1108.1,194.6L1104.9,194.6L1101.7,193.9L1099.7,195.3L1099.2,193.6L1096.2,191.9L1096.9,189.4L1098.1,187.7L1099.2,188.1L1097.6,185.3L1101.4,180.1L1103.7,179.4L1104,177.7L1100.8,172.3L1103.1,172L1105.5,170.4L1109.3,170.2L1114.2,170.7L1119.9,172.2L1123.8,172.3L1125.7,173.2L1127.4,172.1L1128.9,173.6L1133.2,173.3L1135.3,173.9L1135,170.8L1136.3,169.4L1140.4,169.1L1142.2,169.3L1143.2,167.9L1144.7,168.2L1149.6,167.6L1153.4,171.1L1152.5,172.4L1153.3,174.3L1157.2,174.6Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="XK"
              d="M1097.8,230.8L1096.6,231.1L1093.7,232.1L1093.6,233.4L1092.9,233.3L1092.3,231L1091,230.3L1089.8,228.6L1090.6,227.2L1091.8,226.8L1092.3,224.7L1093.2,224.3L1094,225.2L1095,225.6L1095.8,226.6L1096.7,226.9L1097.8,228.1L1098.5,228L1098.1,229.6L1097.5,230.3L1097.8,230.8Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="NL"
              d="M1016.5,177.1L1013.7,175.6L1010.6,172.9L1006.1,174.2L1002.5,173.7L1005,172L1009,163L1015.5,160.4L1019.5,160.6L1020.4,162.7L1019.5,168.3L1018.3,170.6L1015.4,170.6L1016.5,177.1Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="PT"
              d="M946.9,263.7L944.7,265.3L941.9,264.4L939.2,265.1L940.1,260.1L939.8,256.2L937.4,255.6L936.3,253.2L936.8,249L939,246.7L939.5,244.1L940.7,240.3L940.7,237.6L939.8,235.3L939.6,233.1L941.5,231.5L943.7,230.6L944.9,233.7L947.9,233.7L948.8,232.9L951.9,233.1L953.2,236.3L950.8,238L950.5,243L949.7,243.9L949.4,247L947.1,247.5L949.1,251.3L947.5,255.5L949.3,257.4L948.5,259.1L946.5,261.5L946.9,263.7Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1094.6,155.4L1085.8,155.5L1079.9,154.8L1080.6,152.2L1086.9,150.2L1092,151.3L1094.2,152.2L1094,153.9L1094.6,155.4Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <g transform="matrix(1,0,0,1,882.1,10.1)">
              <path
                d="M364.843,163.537L358.6,161.3L351,161.5L342.9,168.2L343.5,172.7L337.5,169.1L335.3,176L337.1,177.2L335.4,182L340.7,186.2L344.3,186L348.6,190.2L348.8,193.4L351.6,194.5L350.2,198.2L345.6,199.2L342,205.7L348,211.8L348.4,216L355.7,223.5L353.2,226.1L352.6,227.7L350.2,227.2L345.9,223.4L344.4,223.2L340.8,221.7L338.7,219.1L333.6,217.8L330.7,218.8L329.5,217.6L321.9,214.5L314.2,213.5L309.6,212.4L309.2,213.2L301.6,207.8L295.4,205.4L290.3,201.7L293.9,200.7L297.1,195.5L293.8,193L300.7,190.4L300.3,189L296,190L295.6,187.3L297.8,185.5L302.6,185.1L302.9,183L301.1,179.5L302.4,176.3L302,174.4L294.3,172.4L291.4,172.5L287.8,169.6L284.2,170.6L277.5,168.4L277.4,167.2L275.1,164.5L271.2,164.2L270.4,162.3L271.3,161L267.5,157.5L262.6,158.1L261.1,157.8L260.1,159.2L258.3,159L256.3,155L254.8,153L255.6,152.4L259.5,152.6L261.1,151.3L259.4,149.7L256,148.6L256,147.5L253.9,146.4L250.1,142.4L250.8,140.8L249.7,137.9L244.9,136.5L242.5,137.2L241.6,135.7L236.3,134.2L234.2,130.6L233.2,127.7L230.7,126.4L232.3,124.5L229.9,118.9L232.5,115.5L231.6,114.5L236.1,111.2L230.7,108.4L238.7,101L242.1,97.6L243,94.7L235.6,90.8L236.5,87L231.6,82.8L233.3,78L226.8,71.7L229.7,67.5L222.4,63.8L222,60L225.2,59.5L231.6,57.4L235.3,55.5L243,58.7L254.7,60L272.4,66.2L276.5,68.8L278,72.5L274.3,75.4L267.8,76.9L247.6,72.7L244.7,73.4L252.8,77.5L253.8,80.1L255.7,85.9L261.8,87.6L265.6,89.1L265.4,86.3L262,83.9L264.1,81.7L275.7,85.3L278.9,83.9L274.6,79.7L282.7,74.3L286.8,74.6L291.4,76.5L292.5,72.7L287.8,69.4L288.6,66.1L284.3,62.7L296.6,64.5L300.2,67.5L295.1,68.2L296.3,71.3L300.4,73.2L306.4,72L306,68.5L313.7,65.8L326.1,61.2L329.3,61.4L326.8,64.7L332.2,65.3L334.3,63.4L342,63.3L347,61L353.4,64.3L356.2,60.7L350.2,57.6L351.4,55.8L364.4,57.4L364.597,57.451C365.865,62.404 363.989,68.804 365.56,73.515C368.308,81.76 364.697,91.42 366.816,99.895C368.271,105.714 367.235,113.125 367.235,119.157C367.235,120.91 367.77,124.903 366.816,125.857C366.349,126.324 366.816,129.729 366.816,130.463C366.816,134.297 366.397,138.526 366.397,142.607C366.397,149.368 365.604,156.461 364.843,163.537Z"
                fill="#ececec" stroke="#000" strokeWidth="0.2px" />
            </g>
            <path id="ES"
              d="M976.6,223.4L978.6,225.8L988.1,228.7L990,227.3L995.8,230.2L1001.7,229.4L1002.1,233.1L997.2,237.3L990.6,238.7L990.1,240.8L986.9,244.3L984.9,249.5L986.9,253.2L983.9,256L982.7,260.2L978.7,261.5L975,266.4L968.2,266.5L963.2,266.4L959.8,268.6L957.7,271L955.1,270.5L953.2,268.3L951.8,264.7L946.9,263.7L946.5,261.5L948.5,259.1L949.3,257.4L947.5,255.5L949.1,251.3L947.1,247.5L949.4,247L949.7,243.9L950.5,243L950.8,238L953.2,236.3L951.9,233.1L948.8,232.9L947.9,233.7L944.9,233.7L943.7,230.6L941.5,231.5L939.6,233.1L940.1,228.6L938.1,225.9L945.5,221.3L951.7,222.4L958.6,222.4L964,223.5L968.3,223.1L976.6,223.4Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path d="M1035.7,231.4L1034.2,236.3L1031.8,235L1030.5,230.8L1031.4,228.4L1034.6,226L1035.7,231.4Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path
              d="M1014.4,185L1015.5,185.5L1016.9,185.4L1019.3,187L1026.5,188.2L1024.1,192.4L1023.7,196.9L1022.4,198L1020.1,197.4L1020.3,199L1016.7,202.5L1016.7,205.4L1019.1,204.4L1020.9,207.1L1020.8,208.9L1022.3,211.3L1020.6,213.2L1022.1,218.1L1024.9,218.9L1024.4,221.6L1019.9,225.2L1009.7,223.5L1002.3,225.6L1001.7,229.4L995.8,230.2L990,227.3L988.1,228.7L978.6,225.8L976.6,223.4L979.3,219.6L980.3,207L975.2,200.4L971.5,197.2L963.9,194.8L963.5,190.2L970,188.9L978.3,190.5L976.8,183.4L981.5,186.1L992.9,181.3L994.4,176.2L998.6,174.9L999.4,177.1L1001.6,177.2L1004,179.7L1007.5,182.6L1010,182.1L1014.4,185Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path d="M1062.3,270.6L1061.8,270.5L1061.8,270.3L1062.2,270.2L1062.6,270.5L1062.3,270.6Z" fill="#ececec"
              fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="BY"
              d="M1141.6,162.7L1137.7,162.5L1136.9,163.1L1138.4,165.1L1140.4,169.1L1136.3,169.4L1135,170.8L1135.3,173.9L1133.2,173.3L1128.9,173.6L1127.4,172.1L1125.7,173.2L1123.8,172.3L1119.9,172.2L1114.2,170.7L1109.3,170.2L1105.5,170.4L1103.1,172L1100.8,172.3L1100.3,169.5L1098.4,166.7L1101.2,165.4L1100.8,163L1099.1,160.7L1098.5,158L1103.2,158L1108,155.7L1108.5,152.3L1112.1,150.3L1111.1,147.6L1113.8,146.6L1118.4,144.3L1123.7,145.8L1124.6,147.3L1127,146.6L1131.8,148L1132.9,150.9L1132.2,152.5L1136,156.5L1138.1,157.6L1138.1,158.7L1141.5,159.8L1143.2,161.4L1141.6,162.7Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="CH"
              d="M1034.4,197.5L1034.6,198.6L1033.9,200.1L1036.2,201.3L1038.8,201.5L1038.5,204L1036.4,205.1L1032.6,204.3L1031.6,206.8L1029.2,207L1028.3,206L1025.6,208.2L1023.1,208.5L1020.9,207.1L1019.1,204.4L1016.7,205.4L1016.7,202.5L1020.3,199L1020.1,197.4L1022.4,198L1023.7,196.9L1027.9,196.9L1028.9,195.6L1034.4,197.5Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="MD"
              d="M1129.4,210.3L1128.1,207.4L1128.3,204.7L1127.7,202L1124.3,198.2L1122.3,195.6L1120.5,193.8L1118.9,193.1L1120,192.2L1123.2,191.6L1127.2,193.5L1129.2,193.8L1131.8,195.5L1131.7,197.6L1133.7,198.6L1134.8,201.2L1136.8,202.8L1136.6,203.8L1137.6,204.4L1136.3,204.9L1133.3,204.7L1132.7,203.8L1131.7,204.3L1132.3,205.4L1131.2,207.5L1130.6,209.6L1129.4,210.3Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
            <path id="ME"
              d="M1090.6,227.2L1089.8,228.6L1088.4,229.2L1088,228L1086.1,231.1L1086.6,233.2L1085.5,232.7L1083.8,230.6L1081.5,229.3L1082,228.3L1082.4,224.8L1084,223.3L1084.9,222.7L1086.3,223.8L1087.2,224.7L1088.9,225.4L1091,226.7L1090.6,227.2Z"
              fill="#ececec" fillRule="nonzero" stroke="#000" strokeWidth="0.2px" />
          </g>
          <g id="Selectable" transform="matrix(1,0,0,1,-7.64954,10.6098)">
            <Link className='MapSelectable' href='UK' >
              <g id="UK" transform="matrix(1,0,0,1,-874.55,-69.4098)">
                <path
                  d="M956.7,158.2L953.2,157L950.2,157.1L951.4,153.8L950.5,150.6L954.5,150.3L959.4,154.1L956.7,158.2Z"
                  fill="#ececec" fillRule="nonzero" stroke="#1d4ed8" strokeWidth="0.67px" />
                <path
                  d="M972.6,129.5L967.5,136L972.2,135.2L977.3,135.2L976,140.1L971.7,145.5L976.6,145.8L976.9,146.5L981.1,153.6L984.3,154.6L987.2,161.6L988.6,164L994.5,165.1L993.9,169.1L991.5,170.9L993.4,174.1L989,177.3L982.5,177.2L974.1,179L971.9,177.7L968.6,180.6L964.1,179.9L960.5,182.3L958,181.1L965.3,174.6L969.7,173.2L962.1,172.2L960.8,169.7L965.9,167.8L963.4,164.5L964.4,160.5L971.5,161.1L972.3,157.5L969.2,153.8L969.1,153.7L963.4,152.6L962.3,151L964.1,148.3L962.6,146.6L960,149.5L959.9,143.6L957.7,140.6L959.6,134.4L963.4,129.6L967,130L972.6,129.5Z"
                  fill="#ececec" fillRule="nonzero" stroke="#1d4ed8" strokeWidth="0.67px" />
                <path id="IE"
                  d="M956.7,158.2L957.4,162.6L953.5,168.1L944.7,171.7L937.9,170.8L942.2,164.4L940.1,158.2L946.8,153.4L950.5,150.6L951.4,153.8L950.2,157.1L953.2,157L956.7,158.2Z"
                  fill="#ececec" fillRule="nonzero" stroke="#1d4ed8" strokeWidth="0.67px" />
              </g>
            </Link>
            <Link className='MapSelectable' href='EMEA/Paris'>
              <g id="Paris" transform="matrix(1,0,0,1,-61.5005,-51.9689)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,193.914,173.13)">
                  </g>
                  <text x="181.575px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Paris</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='EMEA/Frankfurt' >
              <g id="Frankfurt" transform="matrix(1,0,0,1,-24.9818,-63.8641)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,198.579,173.13)">
                  </g>
                  <text x="176.91px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Frankfurt</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='EMEA/Prague'>
              <g id="Prague" transform="matrix(1,0,0,1,0.559475,-67.6522)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,15.9974)">
                  <g transform="matrix(5.41607,0,0,5.41607,196.477,173.13)">
                  </g>
                  <text x="179.012px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Prague</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='EMEA/Cluj'>
              <g id="Cluj" transform="matrix(1,0,0,1,48.3995,-44.3342)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,15.9974)">
                  <g transform="matrix(5.41607,0,0,5.41607,192.41,173.13)">
                  </g>
                  <text x="183.08px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Cluj</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='EMEA/Berlin'>
              <g id="Berlin" transform="matrix(1,0,0,1,-10.3745,-81.9737)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,194.668,173.13)">
                  </g>
                  <text x="180.821px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Berlin</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='EMEA/Gdansk'>
              <g id="Gdansk" transform="matrix(1,0,0,1,15.1667,-91.2323)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,197.077,173.13)">
                  </g>
                  <text x="178.412px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Gdansk</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='EMEA/Stockholm'>
              <g id="Stockholm" transform="matrix(1,0,0,1,3.85063,-125.523)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,200.387,173.13)">
                  </g>
                  <text x="175.102px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Stockholm</text>
                </g>
              </g>
            </Link>
          </g>
        </g>
      </svg>
    </>
  )
}
