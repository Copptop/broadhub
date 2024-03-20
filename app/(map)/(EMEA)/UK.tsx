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
    
      const viewBox = svg.viewBox.baseVal;
      const newScale = viewBox.width * zoomSpeed / viewBox.width;
      const deltaWidth = viewBox.width * (newScale - 1);
      const deltaHeight = viewBox.height * (newScale - 1);
    
      viewBox.x -= deltaWidth * (pointerPosition.x - viewBox.x) / viewBox.width;
      viewBox.y -= deltaHeight * (pointerPosition.y - viewBox.y) / viewBox.height;
      viewBox.width *= newScale;
      viewBox.height *= newScale;
    
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
      <svg ref={svgRef} id="map_plane" width="100%" height="100%" viewBox="0 0 57 53" version="1.1" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
        clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="svgbounds" >
          <g transform="matrix(1,0,0,1,-937.8,-129.4)">
            <path d="M956.7,158.2L953.2,157L950.2,157.1L951.4,153.8L950.5,150.6L954.5,150.3L959.4,154.1L956.7,158.2Z"
              fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
            <path
              d="M972.6,129.5L967.5,136L972.2,135.2L977.3,135.2L976,140.1L971.7,145.5L976.6,145.8L976.9,146.5L981.1,153.6L984.3,154.6L987.2,161.6L988.6,164L994.5,165.1L993.9,169.1L991.5,170.9L993.4,174.1L989,177.3L982.5,177.2L974.1,179L971.9,177.7L968.6,180.6L964.1,179.9L960.5,182.3L958,181.1L965.3,174.6L969.7,173.2L962.1,172.2L960.8,169.7L965.9,167.8L963.4,164.5L964.4,160.5L971.5,161.1L972.3,157.5L969.2,153.8L969.1,153.7L963.4,152.6L962.3,151L964.1,148.3L962.6,146.6L960,149.5L959.9,143.6L957.7,140.6L959.6,134.4L963.4,129.6L967,130L972.6,129.5Z"
              fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
            <path id="IE"
              d="M956.7,158.2L957.4,162.6L953.5,168.1L944.7,171.7L937.9,170.8L942.2,164.4L940.1,158.2L946.8,153.4L950.5,150.6L951.4,153.8L950.2,157.1L953.2,157L956.7,158.2Z"
              fill="#ececec" fill-rule="nonzero" stroke="#000" stroke-width="0.2px" />
          </g>
          <g id="Selectable">
            <Link className='MapSelectable' href="UK/Arthur-Street" >
              <g id="Arthur-Street" transform="matrix(0.38824,0,0,0.38824,-28.8549,-27.8554)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-14.0707,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,203.096,173.13)">
                  </g>
                  <text x="172.393px" y="173.13px" font-family="ArialMT, Arial, sans-serif" font-size="5.416px">Arthur
                    Street</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href="UK/Marsh-Wall" >
              <g id="Marsh-Wall" transform="matrix(0.38824,0,0,0.38824,-23.3303,-29.113)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-3.76784,18.0274)">
                  <g transform="matrix(5.41607,0,0,5.41607,201.186,173.13)">
                  </g>
                  <text x="174.304px" y="173.13px" font-family="ArialMT, Arial, sans-serif" font-size="5.416px">Marsh
                    W<tspan x="195.767px 198.779px " y="173.13px 173.13px ">al</tspan>l</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href="UK/Edinburgh" >
              <g id="Edinburgh" transform="matrix(0.38824,0,0,0.38824,-37.8379,-51.6155)">
                <g transform="matrix(1,0,0,1,-0.249891,0)">
                  <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                    fill="#1d4ed8" />
                </g>
                <g transform="matrix(1,0,0,1,-6.57494,16.7723)">
                  <g transform="matrix(5.41607,0,0,5.41607,200.091,173.13)">
                  </g>
                  <text x="175.398px" y="173.13px" font-family="ArialMT, Arial, sans-serif"
                    font-size="5.416px">Edinburgh</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href="UK/Dundrum" >
              <g id="Dundrum" transform="matrix(0.38824,0,0,0.38824,-54.232,-36.3443)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,198.882,173.13)">
                  </g>
                  <text x="176.607px" y="173.13px" font-family="ArialMT, Arial, sans-serif"
                    font-size="5.416px">Dundrum</text>
                </g>
              </g>
            </Link>
          </g>
        </g>
      </svg>
    </>
  );
}