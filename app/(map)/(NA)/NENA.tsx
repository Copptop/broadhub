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
      <svg ref={svgRef} id="map_plane" width="100%" height="100%" viewBox="0 0 63 66" version="1.1" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
        clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g id="svgbounds">
          <g transform="matrix(1,0,0,1,-381.5,-195.5)">
            <path
              d="M385.2,221.5L389.2,222L393.8,219.9L394.4,217.4L394.2,216.5L401,212.1L403.7,211L411.5,210.9L420.8,210.9L421.9,209.4L423.6,209.1L426.1,208.1L428.9,205.2L432.1,200.3L437.6,195.6L438.7,197.2L442.4,196.2L444,198L441.1,206.5L443.3,210.1L443.5,212.2L437.1,215.2L431.1,217.4L425.1,219.3L421.1,223.1L419.8,224.5L418.6,227.9L419.3,231.2L421.4,231.4L421.6,229.1L422.7,230.5L421.7,232.3L417.9,233.3L415.4,233.2L411.2,234.3L408.9,234.6L405.8,234.9L400.8,236.8L408.9,235.6L410,236.8L402.1,238.7L398.8,238.7L399.2,237.9L397.1,239.7L398.5,240L396,244.6L390.7,249.5L390.8,247.8L389.7,247.5L388.5,245.9L388.5,249.4L389.5,250.5L388.9,252.9L386.5,255.4L382,260.5L381.6,260.3L384.5,255.9L382.5,253.5L383.5,248.1L385.2,221.5ZM383.5,248.1L385.2,221.5L383.5,248.1Z"
              fill="#ececec" stroke="#000" strokeWidth="0.2px" />
          </g>
          <g id="Selectable">
            <Link className='MapSelectable' href='NENA/Mt-Laurel'>
              <g id="Mt-Laurel" transform="matrix(0.321561,0,0,0.321561,-52.6124,-12.7827)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,199.033,173.13)">
                  </g>
                  <text x="176.456px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif" fontSize="5.416px">Mt
                    Laurel</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NENA/South-Windsor'>
              <g id="South-Windsor" transform="matrix(0.321561,0,0,0.321561,-25.3603,-26.9562)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,205.506,173.13)">
                  </g>
                  <text x="169.984px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif" fontSize="5.416px">South
                    Windsor</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NENA/Boston' >
              <g id="Boston" transform="matrix(0.321561,0,0,0.321561,-1.70002,-41.6311)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,196.176,173.13)">
                  </g>
                  <text x="179.314px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Boston</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NENA/Andover' >
              <g id="Andover" transform="matrix(0.321561,0,0,0.321561,-1.01587,-48.9857)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,197.831,173.13)">
                  </g>
                  <text x="177.658px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Andover</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NENA/Lake-Success' >
              <g id="Lake-Success" transform="matrix(0.321561,0,0,0.321561,-32.715,-16.5976)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,12.3154,15.5465)">
                  <g transform="matrix(5.41607,0,0,5.41607,203.25,173.13)">
                  </g>
                  <text x="169.531px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif" fontSize="5.416px">Lake
                    Success</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NENA/Edgewood-1' >
              <g id="Edgewood-1" transform="matrix(0.321561,0,0,0.321561,-36.219,-16.0845)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,202.801,173.13)">
                  </g>
                  <text x="172.688px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Edgewood 1</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NENA/Edgewood-2'>
              <g id="Edgewood-2-" transform="matrix(0.321561,0,0,0.321561,-39.723,-16.0845)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,18.6563)">
                  <g transform="matrix(5.41607,0,0,5.41607,202.801,173.13)">
                  </g>
                  <text x="172.688px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Edgewood 2</text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NENA/Thrid-Avenue' >
              <g id="Thrid-Avenue" transform="matrix(0.321561,0,0,0.321561,-43.1438,-16.8936)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-25.0026,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,203.653,173.13)">
                  </g>
                  <text x="171.836px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif" fontSize="5.416px">Thrid
                    <tspan x="185.382px 188.896px " y="173.13px 173.13px ">Av</tspan>enue
                  </text>
                </g>
              </g>
            </Link>
            <Link className='MapSelectable' href='NENA/Gateway-Center' >
              <g id="Gateway-Center" transform="matrix(0.321561,0,0,0.321561,-39.723,-20.8351)">
                <path d="M181.45,175.089L186.432,180.072L181.45,185.054L176.468,180.072L181.45,175.089Z"
                  fill="#1d4ed8" />
                <g transform="matrix(1,0,0,1,-6.34356,-0.00264457)">
                  <g transform="matrix(5.41607,0,0,5.41607,207.312,173.13)">
                  </g>
                  <text x="168.177px" y="173.13px" fontFamily="ArialMT, Arial, sans-serif"
                    fontSize="5.416px">Gateway Center</text>
                </g>
              </g>
            </Link>
          </g>
        </g>
      </svg>
    </>
  )
}
