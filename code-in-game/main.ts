import * as THREE from 'three';
import * as monaco from 'monaco-editor';

let updateCharacterFn: (character: THREE.Mesh) => void = () => {};

// Monaco Editor 初期化
declare const require: any; // Monaco Loader用

// require.config({
//   paths: {
//     'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs'
//   }
// });

(window as any).editor = monaco.editor.create(
  document.getElementById('editor')!,
  {
    value: `// キャラクターを前進させるサンプル
function updateCharacter(character) {
  character.position.x += 0.01;
}`,
    language: 'javascript',
    theme: 'vs-dark'
  }
);

// three.js 初期化
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight);
document.getElementById('game')!.appendChild(renderer.domElement);

// キューブ作成
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);
  try {
    updateCharacterFn(cube);
  } catch (e) {
    console.error(e);
  }
  renderer.render(scene, camera);
}
animate();

// 実行ボタンの処理
document.getElementById('runBtn')!.addEventListener('click', () => {
  const code = (window as any).editor.getValue();
  try {
    const func = new Function(code + '; return updateCharacter;');
    updateCharacterFn = func();
    console.log('新しいコードを反映しました');
  } catch (e) {
    console.error('コード実行エラー:', e);
  }
});

// ウィンドウサイズ変更対応
window.addEventListener('resize', () => {
  camera.aspect = (window.innerWidth / 2) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / 2, window.innerHeight);
});
