'use client';

import Link from 'next/link';
import React, { useRef, useEffect } from 'react';

export default function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current as any;
    if (!svg) return;

    const getPointFromEvent = (event: MouseEvent | TouchEvent) => {
      const point = svg.createSVGPoint();
      if ((event as TouchEvent).targetTouches) {
        point.x = (event as TouchEvent).targetTouches[0].clientX;
        point.y = (event as TouchEvent).targetTouches[0].clientY;
      } else {
        point.x = (event as MouseEvent).clientX;
        point.y = (event as MouseEvent).clientY;
      }

      const invertedSVGMatrix = svg.getScreenCTM()!.inverse();

      return point.matrixTransform(invertedSVGMatrix);
    };

    let isPointerDown = false;
    let pointerOrigin: SVGPoint;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      isPointerDown = true;
      pointerOrigin = getPointFromEvent(event);
      svg.style.cursor = 'grabbing';
    };

    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      if (!isPointerDown) {
        return;
      }
      event.preventDefault();

      const pointerPosition = getPointFromEvent(event);
      const viewBox = svg.viewBox.baseVal;

      viewBox.x -= pointerPosition.x - pointerOrigin.x;
      viewBox.y -= pointerPosition.y - pointerOrigin.y;
    };

    const onPointerUp = () => {
      isPointerDown = false;
      svg.style.cursor = 'grab';
    };

    const onPointerWheel = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();

      const pointerPosition = getPointFromEvent(event);

      if (!svg) return;

      const scaleFactor = 1.1;
      const zoomSpeed = (event as WheelEvent).deltaY > 0 ? scaleFactor : 1 / scaleFactor;

      const CTM = svg.getScreenCTM()!;
      const point = svg.createSVGPoint();
      point.x = pointerPosition.x;
      point.y = pointerPosition.y;
      point.matrixTransform(CTM.inverse());

      const viewBox = svg.viewBox.baseVal;
      const newScale = viewBox.width * zoomSpeed / svg.width.baseVal.value;
      const newViewBoxWidth = svg.width.baseVal.value * newScale;
      const newViewBoxHeight = svg.height.baseVal.value * newScale;
      const newViewBoxX = pointerPosition.x - (pointerPosition.x - viewBox.x) * newScale;
      const newViewBoxY = pointerPosition.y - (pointerPosition.y - viewBox.y) * newScale;

      viewBox.x = newViewBoxX;
      viewBox.y = newViewBoxY;
      viewBox.width = newViewBoxWidth;
      viewBox.height = newViewBoxHeight;

      svg.setAttributeNS(null, 'viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);

      const cursorStyle = zoomSpeed > 1 ? 'zoom-out' : 'zoom-in';
      svg.style.cursor = cursorStyle;
    };

    if (svg.PointerEvent) {
      svg.addEventListener('pointerdown', onPointerDown);
      svg.addEventListener('pointerup', onPointerUp);
      svg.addEventListener('pointerleave', onPointerUp);
      svg.addEventListener('pointermove', onPointerMove);
      svg.addEventListener('wheel', onPointerWheel);
    } else {
      svg.addEventListener('mousedown', onPointerDown);
      svg.addEventListener('mouseup', onPointerUp);
      svg.addEventListener('mouseleave', onPointerUp);
      svg.addEventListener('mousemove', onPointerMove);
      svg.addEventListener('wheel', onPointerWheel);

      svg.addEventListener('touchstart', onPointerDown);
      svg.addEventListener('touchend', onPointerUp);
      svg.addEventListener('touchmove', onPointerMove);
    }
  }, []);

  return (
    <>
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 576 339" version="1.1" xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="NA">
          <g transform="matrix(1,0,0,1,-202.2,-2.4)">
            <g id="Canada">
              <path
                d="M665.9,203.6L669.3,204.5L674,204.3L670.7,206.9L668.7,207.3L663.2,204.6L662.6,202.5L665.1,200.6L665.9,203.6Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path d="M578.5,47.2L571.5,50.6L569.2,47L571.3,46.2L576.8,46L578.5,47.2Z" fill="#ececec"
                fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M687.1,48.8L686.4,50.2L678.2,50L673.3,50.7L672.4,50.3L670.3,47.6L672,45.8L674.2,45.4L682.6,46L687.1,48.8Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M647.3,48.5L647.6,51.7L654.8,47.6L666.5,45.5L668.8,50.8L665.6,54.2L674.6,52.7L679.9,50.6L686.7,53.2L690.4,55.7L689.3,58L697.5,56.8L699.4,60.2L707.8,62.3L710,64.4L710.9,69.5L701.8,72L709.5,75.6L715.4,76.8L718.7,81.8L725.2,82.2L721.9,86.1L711,92.6L707,90.2L703.2,84.8L697.3,85.5L695,88.8L697.7,92L702.2,94.6L703.2,96.1L703.1,101.8L699.5,105.9L694.8,104.3L686.2,99.8L689.8,104.7L692.6,108.2L692.3,110.2L681.4,107.9L673.8,104.5L670,101.8L672.4,100.1L667.6,97.2L662.9,94.5L662,96.1L648.9,97L646.5,95.1L651.9,90.9L660,90.8L669.3,90.1L669.1,88.1L672.2,85.3L681,79.9L681.4,77.4L680.9,75.6L676.2,72.9L669.1,71.1L672.6,69.7L670.6,66.3L667.2,66L665.3,64.2L662,65.8L654.1,66.5L640.1,65.3L632.7,63.7L626.8,62.9L624.9,61L631.2,58.6L625.5,58.6L628.8,53.3L635.9,48.7L641.9,46.6L653.1,45.2L647.3,48.5Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M596.9,45L600.5,46.1L608.1,45.4L607.6,46.9L601.5,49.4L605.3,51.6L600.1,56.3L591.7,58.3L588.3,57.9L587.4,55.9L581.5,51.9L583.2,50.2L590.6,50.8L589.7,47.5L596.9,45Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M619.5,50.5L611.7,54.4L607.3,54.2L609.1,49.6L611.7,47.1L615.9,44.9L621.1,43.5L629,43.7L635.2,44.9L625.1,49.5L619.5,50.5Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M503.7,57.7L490.2,60.3L490.8,58L484.8,55.2L489.2,53L496.7,49.2L504.3,45.8L504.7,42.7L518.7,41.9L522.9,43L532.4,43.3L534.3,44.7L535.9,46.9L529.4,48.2L515.5,51.8L506.3,55.5L503.7,57.7Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path d="M628.9,39.3L624.8,41.2L619.6,40.8L616.4,39.5L620.9,37.3L627.8,35.9L629.2,37.7L628.9,39.3Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M620.1,30.6L620.3,32.9L617.5,35.4L611.7,39.2L604.8,39.7L601.6,38.9L605,36L598.4,36.3L602.7,32.5L606.5,32.7L614.2,31L619.1,31.3L620.1,30.6Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M580.7,33.2L580,34.9L584.4,34.1L588,34.3L585.7,36.8L580.6,39.1L566.7,39.9L554.4,42.1L548.4,42.2L549.9,40.6L560.6,38.3L542.7,38.9L538.5,38L550.2,33.2L555.6,31.8L563.9,33.5L566.8,36.4L572.9,36.8L573.6,32.1L579.4,30.3L582.5,30.8L580.7,33.2Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M636.4,28.8L638.7,30.4L646.1,30.4L647.5,32L644.7,33.8L647.8,34.9L649,36.1L653.9,36.3L659,36.7L666.1,35.7L674.2,35.2L680,35.6L682.3,37.5L681.3,39.5L677.7,40.9L671,42L666.7,41.3L654.9,42.1L646.9,42.2L641.3,41.6L632.7,40L634.3,37.2L636.4,34.8L635,32.6L628,32L625.4,30.5L629.2,28.5L636.4,28.8Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M560.7,26.2L554.9,29.9L549.6,31.6L545.8,31.8L535.9,33.9L528.8,34.7L525.2,33.6L536.9,29.9L549.1,26.8L554.6,26.9L560.7,26.2Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path d="M641.9,26.8L640.1,26.9L633.5,26.6L634.2,25.3L641.4,25.4L643,26.2L641.9,26.8Z" fill="#ececec"
                fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path d="M583.1,25.9L574.3,27.3L571,25.8L576.1,24.3L582.1,23.8L586.2,24.5L583.1,25.9Z" fill="#ececec"
                fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path d="M590.9,21.7L585.2,22.6L579.2,22.6L580.2,21.9L585.9,20.6L587.6,20.8L590.9,21.7Z" fill="#ececec"
                fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M637.7,24.2L631.1,25.2L629.5,24.1L630.1,22.4L632.3,20.5L636.7,20.7L638.4,21L640.7,22.6L637.7,24.2Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M623.9,23L622.8,24.9L617.5,24.4L613.5,22.9L605.7,22.7L611,21.4L608.2,20.3L610.4,18.5L616.5,19.1L624,20.8L623.9,23Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M678,16.9L680.7,18.4L674.2,19.7L663.6,23.2L656.8,23.5L650,22.9L648.4,21L650.5,19.4L654.8,18.2L648.2,18.2L646.2,16.7L646.6,14.8L651.5,12.9L655.6,11.6L659.6,11.3L659.3,10.3L667.6,10.1L669.2,12.3L673.9,13.2L678.7,14.1L678,16.9Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M757.2,2.9L765.9,3.2L772.6,3.7L777.8,4.7L776.7,5.7L766.9,7.4L757.9,8.2L753.9,9.1L761.4,9.1L750.9,11.6L744.1,12.8L734.8,16.3L726.7,17L723.6,18L712.3,18.4L716.7,19L713.4,19.8L714.1,22.1L709.1,23.7L702.2,25L698.7,26.8L692.1,28.3L691.6,29.4L698.1,29.2L697,30.4L684.3,33.3L675.8,31.9L664.1,32.7L659.1,32.1L652.3,31.8L654.4,29.5L662.4,28.4L664.4,25L667,24.7L674.5,26.7L672.8,23.7L667.9,22.8L672.9,21L680.5,19.9L683.3,18.3L680.3,16.6L681.4,14.4L690.8,14.5L693,15L700.3,13.4L693,12.9L680.4,13.2L676,11.8L675.2,10.1L672.7,8.9L673.8,7.6L679.8,6.8L684,6.7L691.4,6.1L698.2,4.6L702.1,4.8L704.5,5.9L709.5,3.9L714.7,3.3L721.2,2.9L731.6,2.7L732.9,3.1L743.2,2.5L757.2,2.9Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M680.3,187.6L677.9,187.7L672.1,185.8L668.6,182.8L670.5,182.3L676.4,183.9L680.6,186.5L680.3,187.6Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M711.5,177.8L706.5,183.2L710.4,181.1L713.3,182.5L710.9,184.6L714.7,186.3L717.5,184.8L721.8,186.7L719,191.3L722.8,190.2L722.5,193.5L723,197.4L719.4,203L717,203.2L714.1,202L716.6,196.9L715.4,196.1L708.1,201.5L705.1,201.3L709.5,198.3L705.1,196.8L699.6,197.2L690,197L689.8,195.2L693.6,192.9L691.9,191.3L697.3,187.5L705.5,177.6L709.7,174.1L714.7,172L716.8,172.2L715.3,173.9L711.5,177.8Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M634.9,108.9L631.3,111.9L629.6,111.4L629.5,109.7L629.9,109.3L632.7,107.6L634.4,107.7L634.9,108.9Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path d="M625.2,105.7L618,108.9L615,108.7L615,107.2L620,104.5L626,104.6L625.2,105.7Z" fill="#ececec"
                fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M622.1,88.9L621.2,91.4L623.9,90.5L625.4,92L628.9,94L632.7,95.7L631.3,98.4L634.8,98L636.7,99.9L631.7,101.7L625.8,100.3L625,97.7L618.7,100.8L610.5,103.7L611.2,100.4L604.9,100.9L610.6,98.1L614.2,93.6L619.3,88.5L622.1,88.9Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path d="M667,80.6L662.1,80.9L662.8,78.2L666.6,75.1L670.9,74.4L673.2,75.9L671.7,78.2L670.8,79L667,80.6Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M592.5,69.9L588.4,71.8L584.2,70.2L580.3,70.7L576.9,68.3L581.9,66.6L586.8,64.3L589.8,65.8L591.4,66.8L591.8,67.8L592.5,69.9Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M539,48.7L534.3,51.1L544.8,49.6L547.4,52.2L554.7,49.5L556.5,51.2L554.3,56.3L558.6,54.2L561.4,48.9L565.7,48.1L568.7,48.9L570.9,51L568.2,56.1L565.8,59.8L570,62.4L575,65L572.4,67.3L565.3,67.8L566.1,69.8L562.9,71.8L556.2,71L550.5,69.5L545.4,69.8L535.9,71.7L524.6,72.5L516.7,73L517,70.4L512.9,69L508.6,69.6L508,65.3L511.3,64.7L518.6,63.8L524.1,64.1L530.3,63.1L523.8,61.9L514.7,62.3L509,62.2L509,60.3L520.7,58.1L514.4,58.2L509,56.8L516.8,52.9L522,50.8L536.2,47.7L539,48.7Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path id="Curve"
                d="M645.5,212.5L643.3,208.9L646.2,200.4L644.6,198.6L640.9,199.6L639.8,198L634.3,202.7L631.1,207.6L628.3,210.5L625.8,211.5L624.1,211.8L623,213.3L613.7,213.3L605.9,213.4L603.2,214.5L596.4,218.9L596.4,218.8L595.5,218.4L593.5,219.3L591.6,220.6L589.8,219.5L585.1,220.3L581.2,221.2L579.3,222L577,224.1L578.8,224.8L580.5,224.4L580.8,224.4L580.5,226.3L575.7,227L572.9,227.8L571.2,228.8L568.6,228.2L567,228.5L564.1,230.3L559.5,232.3L556.8,231.9L558.8,229.7L562.5,226.2L566.6,224.1L567.7,222.3L568.6,219.3L572.4,215.8L573.3,211.8L574.4,215.7L578.2,216.6L580.6,214.5L579.2,209.7L578.3,207.7L574.3,206.5L570.5,205.8L566.6,205.8L563.2,205L562.8,203.6L561.4,204.5L560.2,204.3L562.1,202.2L560.3,201.4L562.2,199L561,197.2L562.7,195.4L557.5,194.5L557.4,190.9L556.6,190.1L553.3,189.9L549.2,188.7L547.7,189.5L545.9,191L542.6,192L539.5,194.5L534.1,192.8L529.7,193.6L525.8,191.7L521.2,190.7L517.9,190.3L516.9,189.3L517.8,185.9L516.1,185.9L514.8,188.3L377,188.3L371.6,182.2L370,179.5L363,176.9L364.3,171.4L367.9,167.7L363.8,165L366.9,160.1L364.8,155.7L367.3,152.5L372.4,149.6L375.6,145.8L371,142L372.4,135.1L373.5,130.9L371.9,128.2L371.1,125.8L371.7,122.7L365.2,124.6L357.6,127.9L357.3,124.1L356.8,121.5L354,119.9L349.8,119.7L385.4,87L410,66.6L416,67.9L419.3,70.5L423,71L429.3,68.8L436.3,67.1L441.6,67.7L450.5,65.4L458.7,64.1L458.9,66.3L463.4,65L467.3,62.5L469.4,63.1L470.8,67.9L480.3,64.2L476.4,68.3L482.4,67.4L485.6,65.9L490.2,66.2L494.1,68.4L501.6,70.4L506.3,71.3L510.7,71L513.6,73.8L505.1,76.5L511.5,77.6L523.4,77L527.8,76L529.2,79.3L536.3,76.6L534.2,74.2L538.7,72.4L543.9,72.1L547.8,71.6L549.9,72.9L551.4,75.8L556.4,75.4L561.7,77.9L568.9,77L574.9,77.1L577.3,73.7L581.8,72.8L586.7,74.6L582.4,79.8L588.6,75.4L591.8,75.6L598.2,70.1L596.6,66.8L593.7,64.6L599.2,58.7L607.4,54.9L611.9,55.8L613.9,58.1L614.3,64.1L608.5,66.7L615.2,67.8L610.8,73.3L619.7,69.1L621.9,72.6L617.6,76.6L618.9,80.3L626.2,76.4L632.7,71.6L637.4,65.7L642.9,66.1L648.3,66.9L651.9,69.6L650.2,72.3L645.1,75.2L646,78.1L643.6,80.8L632.7,84.7L626.2,85.6L623,83.9L619.7,86.7L612.3,91.4L609.3,93.9L601.6,97.7L595.1,98.1L590,100.5L587.1,104.3L581.4,105L572.7,109.7L563.3,116.2L558.3,120.8L553.4,127.7L559.4,128.7L557.9,134.2L557.1,138.8L564.4,137.6L571.4,140.2L574.7,142.5L576.4,145.3L581.3,147L584.9,149.5L592.5,149.9L597.3,150.5L593.7,155.7L592,161.8L592.1,168.7L596.5,174.6L601.2,172.6L606.8,166.2L609.1,156.6L607.4,153.4L616.4,150.5L623.9,146.3L628.7,142.1L630.4,138.1L630,133L626.8,128.5L635.7,122.3L636.7,117L640.6,108L644.4,106.6L651.1,108.2L655.3,108.8L659.8,107.2L662.9,109.2L666.5,112.6L666.7,114.8L674.4,115.3L671.8,120.2L669.5,127.6L673.3,128.6L674.9,132.1L683.1,128.8L690.6,122.2L694.8,119.5L695.9,124.8L698.5,132.3L700.5,139.5L697.1,143.3L701.9,146.7L704.8,150.1L711.7,151.7L714.1,153.6L714.1,158.8L717.5,159.6L718.6,161.9L716.6,168.8L712.3,171.1L708.1,173.3L699.3,175.5L691.4,180.5L682.8,181.6L672.7,180.2L665.4,180.2L660.1,180.6L654.4,185.1L647,187.9L636.9,196.1L629,201.9L633.7,200.9L644.6,192.6L656.9,187.4L664.5,186.8L667.8,189.9L661.7,194.1L661.1,200.8L661.2,205.6L666.8,208.7L675.4,207.8L682.6,200.7L681.6,205.3L684.1,207.6L676.7,211.7L664.3,215.5L658.5,218L651.3,222.6L647.6,222.1L649.1,216.8L659.5,211.5L651.4,211.7L645.5,212.5Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
            </g>
            <g id="USA">
              <g transform="matrix(1,0,0,1,202.2,2.4)">
                <path
                  d="M383.5,248.1L381.6,250.9L381.6,255L378.4,254L381.4,256L379.9,262.1L381.3,262.6L381.3,264.8L380.3,271.2L375.7,275.9L369.6,277.8L365.2,281.6L362.4,282L359,284.4L357.7,286.5L350.8,290.7L347,293.8L343.5,297.6L341.6,302.1L341.6,306.6L342.2,312.1L343.7,316.6L343.2,319.4L344.5,326.8L343.5,331.2L342.9,333.7L340.9,337.6L339.1,338.4L336.5,337.6L336.1,334.8L334.3,333.3L332.3,327.8L330.7,322.9L330.3,320.4L332.3,316.1L331.5,312.6L328.4,307.2L326.5,306.2L320.4,309.2L319.5,308.8L317.5,305.8L314.5,304.2L308.1,305.1L303.5,304.3L299.2,304.8L296.7,305.8L297.3,307.5L296.6,310.1L297.4,311.4L296.2,312.2L294.4,311.3L292.1,312.5L288.2,312.3L284.9,308.9L280,309.7L276.4,308.2L272.9,308.7L267.9,310.2L261.8,314.9L255.7,317.7L252,320.7L250.1,323.6L249.1,328.1L248.7,331.1L249.3,333.3L247.1,333.5L243.5,332.1L239.6,330.1L238.7,327.1L238.5,322.6L236.1,319L235.2,315.2L233.6,310.8L230.4,308.2L225.9,308.4L221.1,313.4L217.1,311.5L214.8,309.6L214.4,306L213.6,302.7L211.2,299.9L209.1,297.8L207.8,295.5L198.4,295.5L197.6,298.2L182.5,298.2L171.6,293.7L164.6,290.6L165.5,289.3L158.4,290L152.1,290.5L152.4,287.3L150.3,283.6L148.1,282.8L148.2,281L145.3,280.6L144.1,278.9L139.3,278.3L138.4,277.2L139.2,273.7L136.7,267.3L136.2,258.4L137.1,256.9L135.8,254.8L134.3,249.4L136.1,244.2L135.2,240.7L139.1,235.4L141.9,230L143,225.1L148.5,219.1L156.5,207.7L160.8,199.2L162.6,193.9L163,191L164.4,189.7L170.2,191.9L169.2,197.8L171.4,196.1L173.9,191L175.5,185.9L312.6,185.9L313.9,183.5L315.6,183.5L314.7,186.9L315.7,187.9L319,188.3L323.6,189.3L327.5,191.2L331.9,190.4L337.3,192.1L331.2,194.1L326.5,196.6L321.9,199.3L321.4,200.2L327.1,198.9L329.2,201L333.8,199.5L338.7,197.4L344.1,195.3L341,198.6L343.5,199.4L346,201.8L351.1,200.4L356.2,199.9L356.5,201.7L358,201.9L359.2,202.1L360.7,204.6L356,205.2L355.9,205.2L352.2,204.5L347.7,205.7L344,206.3L339.3,210.4L336.3,212.7L336.7,213.4L342.2,209.3L342.9,209.3L338.2,214.2L335.3,218.6L332.8,222.2L332.2,225.3L331.4,226.8L330.8,228.5L330.9,231.8L331.2,232.3L333,232.2L334.6,231.5L336,230.7L339.3,227.6L341.1,223.4L341,219.5L342.4,216.8L345,213.7L347.1,211.5L349.8,210L349.4,212.1L351.6,209L352.9,208.4L354.6,206L358.4,207.3L361.2,209.7L360.4,212.6L358.8,215.5L355,218L354.6,219.6L355.6,219.6L359.9,216.9L361.5,217.5L361,221.2L360.3,223.8L356.6,227.3L354.6,229.5L351.9,231.9L354.6,233.2L357.1,233.6L361.1,232.7L364.8,231L367.8,230.1L372.4,228.3L378.2,224.5L378.3,223.9L378.6,222L381.3,221.2L385.2,221.5L383.5,248.1Z"
                  fill="#ececec" stroke="#000" stroke-width="0.2px" />
              </g>
              <path
                d="M410,66.6L385.4,87L349.8,119.7L354,119.9L356.8,121.5L357.3,124.1L357.6,127.9L365.2,124.6L371.7,122.7L371.1,125.8L371.9,128.2L373.5,130.9L372.4,135.1L371,142L375.6,145.8L372.4,149.6L367.3,152.5L366.7,150.3L364.2,148.3L367.5,143.1L365.9,138.2L368.6,132.6L364.5,132.2L357.4,132.1L353.6,130.3L350.3,124.2L347,123.1L341.3,121L334.5,121.5L328.5,118.8L325.8,116.3L319.5,117.5L316,121.6L313.1,122L306.5,123.2L300.3,125.2L293.9,126.5L297.1,123L305.5,117.2L312.3,115.4L312.7,114L303.3,117.2L295.9,121.1L284.7,125.3L284.9,128.2L275.9,132.4L268.2,134.9L261.6,136.8L257.6,139.4L247,142.5L242.5,145.3L234.3,147.9L231.6,147.5L225.4,149.1L218.4,151.2L212.3,153.2L202.3,155L202.7,153.9L210.9,151.1L217.5,149.2L226.1,145.9L232.6,145.3L237.6,142.8L248,139.2L250.3,138L256,135.9L261.8,131.4L268,127.9L260.7,129.7L260.4,128.6L255.5,130.8L255.9,127.8L252.3,129.9L253.9,127L246.6,129.3L243.8,129.3L247.5,125.8L250.8,123.6L250.4,121.5L243.2,122.7L242.6,119.9L241.3,118.5L245.3,115.2L244.9,112.7L250.8,109.4L258.5,106.1L263.8,103.2L267.9,102.8L269.7,103.7L276.8,100.9L279.3,101.4L284.9,99.6L287.4,97L286.3,96L292.3,93.8L289.5,93.9L283.3,95.1L280.4,96.4L278.6,95.1L271.7,95.8L267.1,94.4L268.3,92.1L267.3,88.9L276.5,86.5L289.7,83.8L293.2,83.8L288.9,86.6L298.1,86.4L299.3,82.9L297,80.8L297.8,78L297.1,75.7L293.8,74L300.3,71.1L307.8,70.9L316.6,68.5L321.4,65.9L329.3,63.3L334.1,62.7L345.3,60.3L348.4,60.7L358.8,57.9L363.2,59L362.7,61.4L366,60.4L372.3,60.7L370.4,61.9L375.3,62.8L380.2,62.3L386.4,63.9L393.6,64.5L395.8,65.1L402.4,64.3L406.5,65.9L410,66.6Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M372.4,191.3L369.3,192.2L363,189.4L363,187.2L360.1,185L360.4,183.2L356.1,182.1L356.7,178.7L358.2,177.3L362.3,178.6L364.7,179.6L368.8,180.2L369,182.4L369.4,185.3L372.6,187.9L372.4,191.3Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M351.5,156.4L353,157.2L358,156.7L350.8,163.6L351.1,168.6L349.2,168.6L348.5,165.8L349,162.9L348.2,161L349.5,158.3L351.5,156.4Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M275,138.6L268,140.9L267.2,139.3L269.5,136.5L275.9,134.4L279.4,133.5L282,133.9L282,135.8L275,138.6Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path d="M236,122L232.1,122.9L230.4,121.8L229.6,120.2L235.3,119.2L238.3,119.8L236,122Z" fill="#ececec"
                fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
              <path
                d="M237.2,99.6L238.4,100.6L241.9,100.1L243.5,101.6L246.8,102.3L245.6,103L240.7,104.2L239,102.9L238.7,101.9L234.4,102.2L234.1,101.7L237.2,99.6Z"
                fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
            </g>
          </g>
          <g id="Selectable">
            <Link className='MapSelectable' href='NENA'>
              <path id="NE"
                d="M385.2,221.5L389.2,222L393.8,219.9L394.4,217.4L394.2,216.5L401,212.1L403.7,211L411.5,210.9L420.8,210.9L421.9,209.4L423.6,209.1L426.1,208.1L428.9,205.2L432.1,200.3L437.6,195.6L438.7,197.2L442.4,196.2L444,198L441.1,206.5L443.3,210.1L443.5,212.2L437.1,215.2L431.1,217.4L425.1,219.3L421.1,223.1L419.8,224.5L418.6,227.9L419.3,231.2L421.4,231.4L421.6,229.1L422.7,230.5L421.7,232.3L417.9,233.3L415.4,233.2L411.2,234.3L408.9,234.6L405.8,234.9L400.8,236.8L408.9,235.6L410,236.8L402.1,238.7L398.8,238.7L399.2,237.9L397.1,239.7L398.5,240L396,244.6L390.7,249.5L390.8,247.8L389.7,247.5L388.5,245.9L388.5,249.4L389.5,250.5L388.9,252.9L386.5,255.4L382,260.5L381.6,260.3L384.5,255.9L382.5,253.5L383.5,248.1L385.2,221.5ZM383.5,248.1L385.2,221.5L383.5,248.1Z"
                fill="#ececec" fill-rule="nonzero" stroke="#1d4ed8" stroke-width="0.67px" />
            </Link>
            <Link className='MapSelectable' href='NA/Vancouver' >
              <g id="Vancouver" transform="matrix(1,0,0,1,-2.57712,0)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,200.49,173.13)">
                  </g>
                  <text x="174.999px" y="173.13px" font-family="ArialMT, Arial, sans-serif" font-size="5.416px">V
                    <tspan x="178.21px 181.222px " y="173.13px 173.13px ">an</tspan>couver
                  </text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NA/El-Dorado' >
              <g id="El-Dorado" transform="matrix(1,0,0,1,-26.0211,66.458)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,199.787,173.13)">
                  </g>
                  <text x="175.703px" y="173.13px" font-family="ArialMT, Arial, sans-serif" font-size="5.416px">El
                    Dorado</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NA/Denver'>
              <g id="Denver" transform="matrix(1,0,0,1,44.2374,65.4094)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,196.474,173.13)">
                  </g>
                  <text x="179.015px" y="173.13px" font-family="ArialMT, Arial, sans-serif"
                    font-size="5.416px">Denver</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NA/Kansas-City'>
              <g id="Kansas-City" transform="matrix(1,0,0,1,90.9016,71.7012)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,202.193,173.13)">
                  </g>
                  <text x="173.296px" y="173.13px" font-family="ArialMT, Arial, sans-serif" font-size="5.416px">Kansas
                    City</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NA/Coppell'>
              <g id="Coppell" transform="matrix(1,0,0,1,70.9775,100.539)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,196.928,173.13)">
                  </g>
                  <text x="178.561px" y="173.13px" font-family="ArialMT, Arial, sans-serif"
                    font-size="5.416px">Coppell</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NA/Toronto'>
              <g id="Toronto" transform="matrix(1,0,0,1,196.814,34.999)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,196.777,173.13)">
                  </g>
                  <text x="178.712px" y="173.13px" font-family="ArialMT, Arial, sans-serif" font-size="5.416px">T
                    <tspan x="181.42px 184.432px " y="173.13px 173.13px ">or</tspan>onto
                  </text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NA/Pittsburgh' >
              <g id="Pittsburgh" transform="matrix(1,0,0,1,179.511,62.7878)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,199.937,173.13)">
                  </g>
                  <text x="175.552px" y="173.13px" font-family="ArialMT, Arial, sans-serif"
                    font-size="5.416px">Pittsburgh</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NA/Markham' >
              <g id="Markham" transform="matrix(1,0,0,1,216.738,26.6099)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,199.03,173.13)">
                  </g>
                  <text x="176.459px" y="173.13px" font-family="ArialMT, Arial, sans-serif"
                    font-size="5.416px">Markham</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NA/Ottawa'>
              <g id="Ottawa" transform="matrix(1,0,0,1,236.662,20.3181)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,196.324,173.13)">
                  </g>
                  <text x="179.166px" y="173.13px" font-family="ArialMT, Arial, sans-serif"
                    font-size="5.416px">Ottawa</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NA/Phoenix'>
              <g id="Phoenix" transform="matrix(1,0,0,1,0.719066,99.4899)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,197.531,173.13)">
                  </g>
                  <text x="177.958px" y="173.13px" font-family="ArialMT, Arial, sans-serif"
                    font-size="5.416px">Phoenix</text>
                </g>
              </g>
            </Link>
          </g>
        </g>
      </svg>
    </>
  )
}
