import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function BackgroundCanvas() {
  const containerRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let scene, camera, renderer;
    let devSymbol;
    let mouseX = 0, mouseY = 0;
    let animationFrameId;

    const container = containerRef.current;
    if (!container) return;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    try {
      // Create scene
      scene = new THREE.Scene();

      // Set up camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 100;

      // Create developer symbol group
      devSymbol = new THREE.Group();

      // Create left angle bracket <
      const leftBracketPoints = [
        new THREE.Vector3(-10, -15, 0),
        new THREE.Vector3(-20, 0, 0),
        new THREE.Vector3(-10, 15, 0)
      ];
      const leftBracketGeometry = new THREE.BufferGeometry().setFromPoints(leftBracketPoints);
      const leftBracketMaterial = new THREE.LineBasicMaterial({
        color: 0x4a90e2,
        linewidth: 3
      });
      const leftBracket = new THREE.Line(leftBracketGeometry, leftBracketMaterial);
      leftBracket.position.x = -15;
      devSymbol.add(leftBracket);

      // Create slash /
      const slashPoints = [
        new THREE.Vector3(-5, -15, 0),
        new THREE.Vector3(5, 15, 0)
      ];
      const slashGeometry = new THREE.BufferGeometry().setFromPoints(slashPoints);
      const slashMaterial = new THREE.LineBasicMaterial({
        color: 0x4a90e2,
        linewidth: 3
      });
      const slash = new THREE.Line(slashGeometry, slashMaterial);
      devSymbol.add(slash);

      // Create right angle bracket >
      const rightBracketPoints = [
        new THREE.Vector3(10, -15, 0),
        new THREE.Vector3(20, 0, 0),
        new THREE.Vector3(10, 15, 0)
      ];
      const rightBracketGeometry = new THREE.BufferGeometry().setFromPoints(rightBracketPoints);
      const rightBracketMaterial = new THREE.LineBasicMaterial({
        color: 0x4a90e2,
        linewidth: 3
      });
      const rightBracket = new THREE.Line(rightBracketGeometry, rightBracketMaterial);
      rightBracket.position.x = 15;
      devSymbol.add(rightBracket);

      // Add the symbol to the scene
      scene.add(devSymbol);

      // Set up renderer
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      container.appendChild(renderer.domElement);

      // Event listeners
      const onWindowResize = () => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      const onDocumentMouseMove = (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.01;
        mouseY = (event.clientY - windowHalfY) * 0.01;
      };

      window.addEventListener('resize', onWindowResize);
      window.addEventListener('mousemove', onDocumentMouseMove);

      const render = () => {
        // Very minimal rotation for subtle movement
        devSymbol.rotation.y += 0.001;

        // Subtle movement based on mouse position
        camera.position.x += (mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        render();
      };

      animate();

      // Return cleanup function
      return () => {
        window.removeEventListener('resize', onWindowResize);
        window.removeEventListener('mousemove', onDocumentMouseMove);
        cancelAnimationFrame(animationFrameId);
        if (container && renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        
        // Clean up geometries/materials
        leftBracketGeometry.dispose();
        leftBracketMaterial.dispose();
        slashGeometry.dispose();
        slashMaterial.dispose();
        rightBracketGeometry.dispose();
        rightBracketMaterial.dispose();
        if (renderer) renderer.dispose();
      };
    } catch (e) {
      console.error("Three.js animation error:", e);
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return (
      <div className="bg-container" id="canvas-container">
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '100px',
            color: 'rgba(74, 144, 226, 0.2)',
            zIndex: -1,
            pointerEvents: 'none',
            userSelect: 'none',
            fontFamily: 'monospace'
          }}
        >
          &lt;/&gt;
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="bg-container" id="canvas-container" />;
}
