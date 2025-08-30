"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var monaco = require("monaco-editor");
var updateCharacterFn = function () { };
// require.config({
//   paths: {
//     'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs'
//   }
// });
window.editor = monaco.editor.create(document.getElementById('editor'), {
    value: "// \u30AD\u30E3\u30E9\u30AF\u30BF\u30FC\u3092\u524D\u9032\u3055\u305B\u308B\u30B5\u30F3\u30D7\u30EB\nfunction updateCharacter(character) {\n  character.position.x += 0.01;\n}",
    language: 'javascript',
    theme: 'vs-dark'
});
// three.js 初期化
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight);
document.getElementById('game').appendChild(renderer.domElement);
// キューブ作成
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;
// アニメーションループ
function animate() {
    requestAnimationFrame(animate);
    try {
        updateCharacterFn(cube);
    }
    catch (e) {
        console.error(e);
    }
    renderer.render(scene, camera);
}
animate();
// 実行ボタンの処理
document.getElementById('runBtn').addEventListener('click', function () {
    var code = window.editor.getValue();
    try {
        var func = new Function(code + '; return updateCharacter;');
        updateCharacterFn = func();
        console.log('新しいコードを反映しました');
    }
    catch (e) {
        console.error('コード実行エラー:', e);
    }
});
// ウィンドウサイズ変更対応
window.addEventListener('resize', function () {
    camera.aspect = (window.innerWidth / 2) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
});
