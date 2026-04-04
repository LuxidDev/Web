import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useTheme } from '@/contexts/ThemeContext';
import { Earcut } from 'three/src/extras/Earcut.js';

const drawThreeGeo = ({
  json,
  radius,
  darkMode,
}: {
  json: any;
  radius: number;
  darkMode: boolean;
}) => {
  const container = new THREE.Object3D();

  // Solid land fill colors
  const landColor = darkMode ? 0x2a4a6a : 0x4a8cba;
  const lineColor = darkMode ? 0x88aaff : 0x3366cc;

  // Material for filled land polygons
  const fillMat = new THREE.MeshBasicMaterial({
    color: landColor,
    transparent: true,
    opacity: 0.95,
    side: THREE.DoubleSide,
    depthWrite: true,
  });

  // Material for country outlines
  const lineMat = new THREE.LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.9,
  });

  const latLonToVec3 = (lon: number, lat: number, r: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
    );
  };

  const needsInterp = (a: number[], b: number[]) =>
    Math.abs(a[0] - b[0]) > 5 || Math.abs(a[1] - b[1]) > 5;

  const interpolate = (pts: number[][]): number[][] => {
    const out: number[][] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      out.push(pts[i]);
      if (needsInterp(pts[i], pts[i + 1]))
        out.push([(pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2]);
    }
    out.push(pts[pts.length - 1]);
    return out.length > pts.length ? interpolate(out) : out;
  };

  const buildCoords = (raw: number[][]): number[][] => {
    const out: number[][] = [];
    for (let i = 0; i < raw.length; i++) {
      if (i > 0 && needsInterp(raw[i - 1], raw[i]))
        interpolate([raw[i - 1], raw[i]]).forEach(p => out.push(p));
      else
        out.push(raw[i]);
    }
    return out;
  };

  const makePolygon = (coords: number[][]) => {
    const pts = buildCoords(coords);
    if (pts.length < 3) return;

    // Fix anti-meridian: normalize all longitudes relative to the first point
    const refLon = pts[0][0];
    const normalized = pts.map(([lon, lat]) => {
      let dlon = lon - refLon;
      while (dlon > 180) dlon -= 360;
      while (dlon < -180) dlon += 360;
      return [refLon + dlon, lat];
    });

    // Flatten to [x, y, x, y, ...] for earcut
    const flat = normalized.flatMap(c => [c[0], c[1]]);

    // Run earcut (operates in 2D lon/lat space)
    const indices = Earcut.triangulate(flat, undefined, 2);
    if (!indices || indices.length === 0) return;

    // Map triangulated 2D points back to 3D sphere positions
    const positions = normalized.map(c => latLonToVec3(c[0], c[1], radius));
    const vertices: number[] = [];
    positions.forEach(v => vertices.push(v.x, v.y, v.z));

    const shapeGeo = new THREE.BufferGeometry();
    shapeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    shapeGeo.setIndex(indices);
    shapeGeo.computeVertexNormals();

    container.add(new THREE.Mesh(shapeGeo, fillMat));

    // Outline
    const positions3D = pts.map(c => latLonToVec3(c[0], c[1], radius));
    const lineGeo = new THREE.BufferGeometry().setFromPoints(positions3D);
    container.add(new THREE.Line(lineGeo, lineMat));
  };

  const getGeometries = (geoJson: any): any[] => {
    if (geoJson.type === 'Feature') return [geoJson.geometry];
    if (geoJson.type === 'FeatureCollection') return geoJson.features.map((f: any) => f.geometry);
    throw new Error('Invalid GeoJSON');
  };

  for (const geom of getGeometries(json)) {
    if (!geom) continue;
    if (geom.type === 'Polygon') {
      geom.coordinates.forEach((ring: number[][]) => makePolygon(ring));
    } else if (geom.type === 'MultiPolygon') {
      geom.coordinates.forEach((poly: number[][][]) =>
        poly.forEach((ring: number[][]) => makePolygon(ring))
      );
    }
  }

  return container;
};

export default function Globe() {
  const { darkMode } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.8;
    controls.target.set(0, 0, 0);

    // NO rotation inversion - keep globe right-side up
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Globe sphere (semi-transparent background)
    const sphereGeo = new THREE.SphereGeometry(1, 128, 128);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: darkMode ? 0x0a1a2a : 0xc8d8f0,
      emissive: darkMode ? 0x051015 : 0x90a8c0,
      emissiveIntensity: 0.05,
      metalness: 0.1,
      roughness: 0.6,
      transparent: true,
      opacity: 0.15,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0x88aaff, 0.5);
    backLight.position.set(-3, -2, -4);
    scene.add(backLight);

    // Grid lines - subtle
    const gridMat = new THREE.LineBasicMaterial({
      color: darkMode ? 0xffffff : 0x000000,
      transparent: true,
      opacity: darkMode ? 0.2 : 0.15,
    });

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts: THREE.Vector3[] = [];
      for (let lon = 0; lon <= 360; lon += 2) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        pts.push(new THREE.Vector3(
          -Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta),
        ));
      }
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 20) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 2) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        pts.push(new THREE.Vector3(
          -Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta),
        ));
      }
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }

    // Country outlines with solid fill
    fetch('/geojson/ne_110m_land.json')
      .then(r => r.json())
      .then(data => {
        const countries = drawThreeGeo({ json: data, radius: 1.001, darkMode });
        globeGroup.add(countries);
        console.log('Land masses loaded successfully!');
      })
      .catch(err => console.error('GeoJSON load error:', err));

    // Stars - only in dark mode
    if (darkMode) {
      const verts: number[] = [];
      const colors: number[] = [];
      for (let i = 0; i < 1200; i++) {
        const r = 8 + Math.random() * 4;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        verts.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        );
        const brightness = 0.4 + Math.random() * 0.3;
        colors.push(brightness, brightness, brightness);
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
      starGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.6 })));
    }

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const W = mountRef.current.clientWidth;
      const H = mountRef.current.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [darkMode]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ cursor: 'grab' }}
      onMouseDown={e => { (e.currentTarget as HTMLDivElement).style.cursor = 'grabbing'; }}
      onMouseUp={e => { (e.currentTarget as HTMLDivElement).style.cursor = 'grab'; }}
    />
  );
}
